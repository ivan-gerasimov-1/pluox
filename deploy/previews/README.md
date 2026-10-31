# PR previews

Signed GitHub `pull_request` and successful Woodpecker `status` events queue a
host reconciliation. A timer checks hourly if an event is missed. The controller
deploys the three oldest open, non-draft PRs authored by the owner, from this
repository to `main`, after successful push CI. Forks are excluded. Keep
Woodpecker PR builds disabled and trust all repository writers.

Preview URLs are `https://pr-N.<PREVIEW_DOMAIN>`. They share the existing API and
have separate browser storage. Closing, merging, or drafting a PR removes its
preview. PRs beyond the limit wait. The webhook only queues work; it cannot select
arbitrary commits or execute payload commands.

## Host setup

Install from reviewed `main`, not a PR checkout. The installed controller image
and scripts are snapshots. Keep domain, API origin, and credentials outside Git.

- `/etc/pluoxPreviews.env`: `PREVIEW_DOMAIN` and `PLUOX_API_ORIGIN`, as in
  `config.env.example`. Optional read-only `PREVIEW_GITHUB_TOKEN` raises API limits.
- `/etc/pluoxPreviewWebhook.env`: a random `PLUOX_WEBHOOK_SECRET` of at least
  32 characters; root-owned, mode 0600. Never send it in chat or logs.
- `/opt/pluox-previews`: controller state and generated routes, directory 0755.
- `/opt/pluox-preview-events`: queue directory, owned by UID/GID 10001, mode 0700.
- `/opt/pluox-buildx`: shared Buildx configuration, mounted at
  `/root/.docker/buildx` in production deploy and controller containers.

Build `deploy/previews/Dockerfile` into `pluox/preview-controller:installed`.
Install `previewCycle.sh` executable under `/opt/pluox-preview-controller`, and
all `.service`, `.timer`, and `.path` files from this directory under
`/etc/systemd/system`. The service shares production's existing deployment lock.

Configure DNS-only `*.PREVIEW_DOMAIN` to the VPS. Add the block in
`hostCaddy.example` to host Caddy, replacing its placeholders locally. Existing
DNS-01 configuration supplies TLS. Initialize `routes.caddy` with
`handle { respond 404 }` before importing it; preserve existing routes on upgrades.
Reload Caddy and systemd, then enable/start `pluoxPreviewWebhook.service`,
`pluoxPreviewEvents.path`, and `pluoxPreviews.timer`.

Create a GitHub repository webhook at `https://hooks.PREVIEW_DOMAIN/github`, with
JSON content, SSL verification enabled, the matching secret, and events
**Pull requests** and **Statuses**. `setupWebhook.mjs` can configure only that
endpoint using an administrative token supplied to a one-shot container; it
preserves the existing CI webhook. Do not store that token in the listener or CI.

## One-core build budget

Configure the Woodpecker agent with `WOODPECKER_MAX_WORKFLOWS=1`,
`WOODPECKER_BACKEND_DOCKER_LIMIT_CPU_QUOTA=100000`, and
`WOODPECKER_BACKEND_DOCKER_LIMIT_CPU_SET=0`; restart it while idle.

Both deployment scripts use `pluox-one-cpu`, a Docker-container Buildx builder
with a 100000/100000 CPU quota, CPU set 0, and 2 GiB memory. CI steps and image
builds share that logical CPU, bounding their aggregate compute even when a
preview build overlaps CI. Host daemon overhead is outside this budget. Images
are loaded into the local engine; there is no fallback to unrestricted builds.

## Verification and recovery

The receiver verifies HMAC-SHA256 over the raw body, limits requests to 1 MiB,
and acknowledges only after a queue marker is written. Repeated events coalesce;
events arriving during a build queue another cycle. Failed deliveries can be
redelivered in GitHub; the hourly timer repairs missed work.

A new container uses a second localhost port. Health, SPA, and API checks precede
route reload. Failed updates keep the prior preview; failed reloads restore its
routes. Cleanup follows successful reload and removes only obsolete preview
containers and image tags. Build cache remains; monitor `docker system df`.

Check `journalctl -u pluoxPreviews.service` and GitHub webhook deliveries. Verify
create/update/close and public HTTPS after installation. Each preview serves with
128 MiB and 0.5 CPU. Stop the timer and path unit to pause reconciliation; stop
the listener to pause webhook intake. Existing previews remain running.
