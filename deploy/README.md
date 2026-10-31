# Frontend deployment

The frontend runs in Docker behind host Caddy and proxies `/api` to the existing
Cloudflare backend. Deployment implementation and host provisioning live in the
private [VPS infrastructure repository](https://github.com/ivan-gerasimov-1/vps).
This public repository keeps the application Dockerfile, runtime `deploy/Caddyfile`,
and a small verified-release bridge.

## Pinned infrastructure release

`infraRelease.lock` pins a full infra commit and the SHA-256 digest of its source
manifest. Before merging this workflow, an administrator must install that release
at `/opt/vps-infra/releases/<commit>` using the infra repository's
`scripts/installPluoxRelease.sh`. Installation is a separate operational step;
this PR does not install a bundle or change running services.

Both deployment steps mount that directory read-only. `infraRelease.sh` verifies
the manifest and source files before executing anything. It uses no network,
GitHub token or private checkout. A missing or corrupt release fails closed;
there is no fallback to the old local deploy implementation.

Production passes the absolute application checkout as `PLUOX_SOURCE`, preserving
app CI identity and pipeline numbers. Preview uses an exact controller image ID
from the bundle, verifies its OCI revision label, and preserves the per-PR action,
SHA and pipeline URL. Existing locks, state paths and resource limits stay in place.
The receiver/dispatcher remain the installed compatible per-PR version.

Legacy `autoDeploy`, rollback and preview implementation files are temporarily
retained for rollback of this wiring. CI no longer runs their implementation tests.
Remove them only after production deploy/rollback and preview create/update/close
have been verified. Keep the application runtime `deploy/Caddyfile`.

## CI setup

The VPS must have the Compose stack in `/opt/pluox`, working HTTPS, and
`/run/lock/pluox-deploy.lock`. In Woodpecker repository settings:

- Set secret `pluox_api_origin` to the HTTPS API origin without path or credentials.
  Allow **Push** and **Deploy** events; it is passed only to the deploy step.
- Enable **Trusted → Volumes** and **Allow deployments**. Leave trusted
  network/security disabled, PR builds disabled, and automatic cancellation off.
- Trust every repository writer and protect `main`: Docker socket access gives
  deployment code control of the host.

Successful pushes to `main` deploy automatically. Branch pushes and ordinary
manual runs validate without deploying.

For optional per-PR frontend environments, see [PR previews](previews/README.md).

## Manual deployment

After merging this workflow, open a successful pipeline for the current `main`
commit and select **Deploy**:

- Target environment: `production`.
- Deployment task: `deploy`.
- Additional pipeline variables: leave empty.

This creates a `deployment` event and reruns all checks before deploying.
Other targets/tasks are filtered out except the rollback action below. Under the deployment lock, the script
verifies the selected SHA still matches remote `main`; older commits are
rejected. Use the rollback procedure for an intentional rollback.

## Checks and state

Under the existing shared `flock`, the bridge invokes Node 24 and
`autoDeploy.mjs` from the pinned infra bundle. The shared one-core Buildx builder
builds `pluox/web:<commit SHA>` from the app checkout; Compose comes from infra.
Older or repeated pipeline numbers are skipped. Before accepting a release it checks health, SPA routing, asset
404s, currency rates, and public HTTPS.

Failed checks or normal cancellation restore the previous image, Compose file,
and API origin. Hard termination can interrupt recovery. State is kept in
`.env`, `compose.yaml`, and `release.json` under `/opt/pluox`; retain rollback images.

## Rollback

After the first successful deployment with this workflow, open a pipeline for the
**current main commit** and select **Deploy**:

- Target environment: `production`.
- Deployment task: `rollback`.
- Additional variables: leave empty for the previous verified release, or set
  `PLUOX_ROLLBACK_SHA` to a saved release's full commit SHA.

Rollback runs bridge tests, skips dependency installation and frontend
compilation, and uses the saved local image ID without rebuilding or pulling.
Implementation tests belong to the pinned infra revision and must pass before
that release is installed.
The release restores its Compose file and API origin. Health, SPA, assets, API,
and public HTTPS are checked; a failure restores the release that was running.
Older workflow commits, unknown releases, and missing cached images are rejected
before switching containers. The new pipeline marker prevents stale retries.

Verified release records are kept in `/opt/pluox/releases/<SHA>.json`; the default
target is `previous.release.json`. Keep their images when cleaning Docker storage.
Rebuilding the same SHA preserves the previous image ID for default rollback.
Code rollback does not undo browser data migrations. To deliberately roll forward,
use the current main pipeline with task `deploy`.

## Configuration and tests

`APP_API_URL` defaults to `/api`; optional build arguments configure analytics.
All `APP_` values are public browser configuration. Keep credentials outside Git
and build arguments. Cloudflare browser challenges need an infrastructure fix.

```sh
node --test deploy/infraRelease.test.mjs
```

See [Woodpecker deployment variables](https://woodpecker-ci.org/docs/usage/environment)
and [secrets](https://woodpecker-ci.org/docs/usage/secrets).
