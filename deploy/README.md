# Frontend deployment

The frontend runs in Docker behind host Caddy. Browser requests to `/api` are
proxied to the existing Cloudflare API. User data stays in browser localStorage;
changing the site's origin does not transfer that data.

## CI setup

The VPS must already have the frontend Compose stack in `/opt/pluox`, working
HTTPS, and `/run/lock/pluox-deploy.lock`. Host DNS, addresses, TLS credentials,
and initial provisioning belong in private infrastructure configuration.

In Woodpecker repository settings:

- Add secret `pluox_api_origin`: the HTTPS API origin, with no path or credentials;
  enable it for **push** events. It is passed to the deployment step only.
- Enable **Trusted → Volumes**; leave trusted network/security disabled.
- Keep PR builds disabled and **Cancel previous pipelines** off for push events.
- Trust every repository writer and protect `main`: the Docker socket gives
  deployment code control of the host.

Merge the workflow, then verify `deployFrontend` and the site in a browser.
Branch pushes and manual runs execute tests and builds without deploying.

## Updates and checks

Successful pushes to `main` run `autoDeploy.mjs` using Node 24. The workflow
holds a shared `flock` while the script builds `pluox/web:<commit SHA>` and
updates Compose. Older or repeated pipeline numbers are skipped.

Before accepting a release, the script checks container health, SPA routing,
missing assets returning 404, currency rates, and public HTTPS. A failed check
or normal cancellation restores the previous image and Compose configuration.
Hard termination or host failure can interrupt recovery; avoid cancelling an
active deployment.

State is stored in `.env`, `compose.yaml`, and `release.json` under `/opt/pluox`.
The saved API origin is restored during rollback.
Images remain local; publishing, cleanup, and backups are configured separately.

## Rollback

Pause automatic runs, then on the VPS:

```sh
sudo cp /opt/pluox/previous.env /opt/pluox/.env
sudo cp /opt/pluox/previous.compose.yaml /opt/pluox/compose.yaml
sudo docker compose --env-file /opt/pluox/.env -f /opt/pluox/compose.yaml up -d --wait
```

Keep `release.json` unchanged so old pipelines cannot redeploy the failed
version. Verify the site before resuming updates. Code rollback does not undo
browser data migrations.

## Configuration and tests

`APP_API_URL` defaults to `/api`. Optional build arguments configure Umami and
Sentry; all `APP_` values are public browser configuration. Keep API keys and
other secrets outside the repository and build arguments.

Run deployment tests without Docker or network access:

```sh
node --test deploy/autoDeploy.test.mjs
```

A Cloudflare response with `Cf-Mitigated: challenge` requires an infrastructure
security change; the server proxy cannot complete a browser challenge.
See [Woodpecker volumes](https://woodpecker-ci.org/docs/usage/volumes) and
[Cloudflare challenge responses](https://developers.cloudflare.com/cloudflare-challenges/challenge-types/challenge-pages/detect-response/).
