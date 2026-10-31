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

## Manual deployment

After merging this workflow, open a successful pipeline for the current `main`
commit and select **Deploy**:

- Target environment: `production`.
- Deployment task: `deploy`.
- Additional pipeline variables: leave empty.

This creates a `deployment` event and reruns all checks before deploying.
Other targets/tasks are filtered out. Under the deployment lock, the script
verifies the selected SHA still matches remote `main`; older commits are
rejected. Use the rollback procedure for an intentional rollback.

## Checks and state

Node 24 runs `autoDeploy.mjs` under a shared `flock`, builds
`pluox/web:<commit SHA>`, and updates Compose. Older or repeated pipeline numbers
are skipped. Before accepting a release it checks health, SPA routing, asset
404s, currency rates, and public HTTPS.

Failed checks or normal cancellation restore the previous image, Compose file,
and API origin. Hard termination can interrupt recovery. State is kept in
`.env`, `compose.yaml`, and `release.json` under `/opt/pluox`; retain rollback images.

## Rollback

Pause automatic runs, then on the VPS:

```sh
sudo cp /opt/pluox/previous.env /opt/pluox/.env
sudo cp /opt/pluox/previous.compose.yaml /opt/pluox/compose.yaml
sudo docker compose --env-file /opt/pluox/.env -f /opt/pluox/compose.yaml up -d --wait
```

Keep `release.json` unchanged to prevent old retries from redeploying the bad
release. Verify the site before resuming updates. Code rollback does not undo
browser data migrations.

## Configuration and tests

`APP_API_URL` defaults to `/api`; optional build arguments configure analytics.
All `APP_` values are public browser configuration. Keep credentials outside Git
and build arguments. Cloudflare browser challenges need an infrastructure fix.

```sh
node --test deploy/autoDeploy.test.mjs
```

See [Woodpecker deployment variables](https://woodpecker-ci.org/docs/usage/environment)
and [secrets](https://woodpecker-ci.org/docs/usage/secrets).
