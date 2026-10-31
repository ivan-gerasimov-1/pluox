# Frontend deployment

The frontend runs in Docker behind host Caddy and proxies `/api` to the existing
Cloudflare backend. Provisioning stays outside this repository.

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

Node 24 runs `autoDeploy.mjs` under a shared `flock`, uses the shared one-core Buildx builder to build
`pluox/web:<commit SHA>`, and updates Compose. Older or repeated pipeline numbers
are skipped. Before accepting a release it checks health, SPA routing, asset
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

Rollback runs deployment tests, skips dependency installation and frontend
compilation, and uses the saved local image ID without rebuilding or pulling.
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
node --test deploy/autoDeploy.test.mjs
```

See [Woodpecker deployment variables](https://woodpecker-ci.org/docs/usage/environment)
and [secrets](https://woodpecker-ci.org/docs/usage/secrets).
