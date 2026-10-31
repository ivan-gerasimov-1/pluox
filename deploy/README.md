# Frontend deployment

This repository owns the pipeline, Dockerfile, `.dockerignore` and runtime
`deploy/Caddyfile`. Deployment tools, Compose, preview controllers and their tests
live in the private [VPS infrastructure repository](https://github.com/ivan-gerasimov-1/vps).

## Central infrastructure

An administrator installs the deployment tools on the VPS. Both deployment steps
mount `/opt/vps-infra` read-only and call its `current` entry point under the
existing shared deployment lock. There is no infrastructure version pin, manifest,
launcher or infrastructure test suite in this repository. Updating the central
installation updates the tools used by subsequent deployments.

Application CI does not clone private infrastructure or receive its GitHub
credentials. The infrastructure installer does not run in application CI.

The VPS must have production state at `/opt/pluox`, working HTTPS, and the
existing `/run/lock/pluox-deploy.lock`. Woodpecker repository settings require:

- Secret `pluox_api_origin`, allowed for Push and Deploy events, used only by deploy.
- Trusted Volumes and Allow deployments enabled; trusted network/security,
  PR builds and automatic cancellation disabled.
- Trusted writers and protected `main`: Docker socket access grants host control.

Pushes to `main` deploy automatically. Branch pushes and ordinary manual runs
validate the app without deploying. Production image builds use the app checkout;
deployment preserves the app's CI identity, pipeline ordering and resource limits.

## Manual deployment and rollback

Open a successful pipeline for **current main** and select **Deploy**:

- Target environment: `production`.
- Task: `deploy` to run checks/build and deploy current main.
- Task: `rollback` to restore the previous verified release without install,
  build or pull. Optionally set `PLUOX_ROLLBACK_SHA` to a saved app release SHA.
- Otherwise leave additional variables empty.

Deployment verifies current remote main, container health, SPA routing, asset
404s, currency rates and public HTTPS. Failed checks restore the preceding release;
hard termination can interrupt recovery.

App releases retain their image IDs, Compose and API origin under `/opt/pluox`.
Keep release history and cached images for rollback; rebuilding a tag does not
recreate the same image. Code rollback does not undo browser data migrations.
Use task `deploy` to return to current main.

## PR previews

The central dispatcher starts named manual jobs on trusted app `main` for eligible
owner PRs after successful push CI. GitHub Deployments publish the exact app SHA,
preview URL and pipeline log link. Closing, merging or drafting a PR removes it.

Each preview has its own browser-storage namespace and demo data but shares the
external API: it is not a separate backend/database. **Reset demo** clears only
that preview namespace. Production builds disable demo mode. For failures, follow
the GitHub Deployment pipeline log; do not copy host scripts or credentials here.

Host setup and recovery: [infra preview guide](https://github.com/ivan-gerasimov-1/vps/blob/main/apps/pluox/deploy/previews/README.md).

## Application configuration

`APP_API_URL` defaults to `/api`; optional build arguments configure analytics.
All `APP_` values are public browser configuration. Keep credentials outside Git
and build arguments. Cloudflare browser challenges need an infrastructure fix.
