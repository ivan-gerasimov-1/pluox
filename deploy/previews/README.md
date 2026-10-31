# PR previews

> Infrastructure implementation now lives in the private
> [VPS repo](https://github.com/ivan-gerasimov-1/vps). The new app workflow runs the
> worker from a pinned, verified host bundle; see [deployment wiring](../README.md).
> The files and host setup instructions below describe the retained legacy
> implementation. Do not reinstall them or delete them until the new wiring has
> passed production deploy/rollback and preview create/update/close acceptance.

Signed GitHub `pull_request` and successful Woodpecker `status` events queue a
host dispatcher. Every two minutes a timer retries missed events and updates
that arrived during a running pipeline. The dispatcher starts a **manual
Woodpecker pipeline on current `main`**, with `PLUOX_PREVIEW_RECONCILE=true`.
It never builds images, runs PR code, or changes routes. The dispatcher compares
selected PRs with `applied.json`; empty checks, pending CI, and already deployed
heads do not create pipelines.

Each pipeline targets one PR and exact SHA. Its title is **Preview PR #139 ·
9608536d**, or **Remove preview PR #139 · 9608536d** for cleanup. Woodpecker still
adds its native `MANUAL` and `@ main` decorations: the job is API-triggered, and
its workflow comes from trusted `main`, not the PR branch.

The pipeline's `previewDeployment` step synchronously builds, checks, and
activates only that PR, or removes only its preview. The three oldest open,
non-draft PRs authored by the owner, from this repository to `main`, are eligible
after successful push CI. Its logs and exit status belong to Woodpecker. Forks
are excluded. Keep Woodpecker PR builds disabled and trust all repository
writers. PRs cannot choose the workflow ref or dispatch arguments. Before acting,
the worker validates `PLUOX_PREVIEW_ACTION`, `PLUOX_PREVIEW_PR`, and
`PLUOX_PREVIEW_SHA`, rechecks eligibility and CI, and skips stale requests. Other
applied previews and their deployment log links are preserved.

Preview URLs are `https://pr-N.<PREVIEW_DOMAIN>`. They share the existing API and
have separate browser storage. Closing, merging, or drafting a PR removes its
preview. PRs beyond the limit wait. The webhook only queues work; it cannot select
arbitrary commits or execute payload commands.

## Host setup

Install from reviewed `main`, not a PR checkout. The installed controller image
and scripts are snapshots. Keep domain, API origin, and credentials outside Git.

- `/etc/pluoxPreviews.env`: `PREVIEW_DOMAIN` and `PLUOX_API_ORIGIN`, as in
  `config.env.example`, plus the deployment reporting token described below.
  This file is mounted only into the trusted main preview job.
- `/etc/pluoxPreviewDispatch.env`: `PREVIEW_CI_ORIGIN` (HTTPS origin),
  `PREVIEW_CI_REPOSITORY` (numeric Woodpecker repository ID), `PREVIEW_CI_TOKEN`
  (a Woodpecker user API token allowed to read/start pipelines), and optional
  read-only `PREVIEW_GITHUB_TOKEN` for PR/status API limits. Root-owned, mode
  0600. Never pass the CI token to PR builds or the preview worker.
  Woodpecker user tokens are not repository-scoped: use a dedicated account
  limited to this repository where available; treat this token as sensitive.
- `/etc/pluoxPreviewWebhook.env`: a random `PLUOX_WEBHOOK_SECRET` of at least
  32 characters; root-owned, mode 0600. Never send it in chat or logs.
- `/opt/pluox-previews`: controller state and generated routes, directory 0755.
- `/opt/pluox-preview-events`: queue directory, owned by UID/GID 10001, mode 0700.
- `/opt/pluox-buildx`: shared Buildx configuration, mounted at
  `/root/.docker/buildx` in production deploy and controller containers.

Build `deploy/previews/Dockerfile` into `pluox/preview-controller:installed`.
Install `previewCycle.sh` and `previewPipeline.sh` executable under
`/opt/pluox-preview-controller`, and
all `.service`, `.timer`, and `.path` files from this directory under
`/etc/systemd/system`. The dispatcher uses its own lock; the Woodpecker preview
step holds production's existing deployment lock until activation and cleanup
finish. The installed controller must match the reviewed workflow release.

The trusted main job mounts `/etc/caddy` read-only. The worker uses the installed
static `/usr/local/bin/caddy` (including DNS plugins) in a host-network container
with `/etc/caddy/gerasimov.env` to reload the host's loopback admin endpoint.
Do not expose that endpoint publicly. This uses the same configuration and
credentials as the existing systemd reload; it needs neither privileged mode,
SSH access, nor host PID access. These mounts and Docker access are restricted
to a manual `main` preview job, not an ordinary branch push.

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

## Migrating from background deployment

Merge and review the workflow on `main` **before** enabling the new dispatcher.
Do not install a PR snapshot with Docker socket or Caddy configuration access.

1. Stop `pluoxPreviews.timer` and `pluoxPreviewEvents.path`. Wait for any running
   `pluoxPreviews.service` and production/preview pipelines to finish; do not
   interrupt a route switch.
2. Create `/etc/pluoxPreviewDispatch.env` from `dispatch.env.example` with mode
   0600 and a dedicated Woodpecker API token. Keep deployment reporting
   credentials in `/etc/pluoxPreviews.env`; they are not needed by the dispatcher.
3. Build the controller image from the reviewed main checkout and install both
   shell scripts and the updated service/timer as described above. Preserve all
   state files, routes, existing containers, and the webhook secret.
4. Run `systemctl daemon-reload`, start `pluoxPreviews.service`, then enable/start
   the timer and path unit. If previews already match selected PR heads, no
   pipeline should appear. The journal logs queued PR/SHA/pipeline identities,
   not application build output.
5. Open or update a test PR and wait for successful push CI. Open its named
   pipeline in Woodpecker. Verify `previewDeployment` logs the build/check/reload
   work, its result is green, and GitHub Deployment links its logs and the ready
   environment. Push another update and verify the new SHA. Close the PR and
   verify a named removal pipeline cleans it up.

When upgrading from the earlier generic CI reconciliation release, pause the
same units and wait for running pipelines, then update **both** the trusted main
workflow and installed controller/scripts before resuming dispatch. Old dispatch
records are accepted, but cannot produce empty jobs. No new credentials are
needed. Do not mix a targeted worker with an older dispatcher that sends no
PR/SHA identity.

To roll back, pause the timer/path unit, wait for CI to finish, and reinstall the
previous reviewed controller image, shell script, and service/timer. Preserve
preview state and routes. Never run the old background worker alongside the new
CI worker.

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
redelivered in GitHub; the two-minute timer repairs missed work. Pending/running
pipelines coalesce events; after completion the next cycle schedules one PR
that still needs work. Removals take priority, then eligible undeployed heads.
Failed/cancelled jobs retry while their target remains relevant, including
cleanup failures after applied state was persisted. A successful unchanged
preview does not dispatch another pipeline.
A crash between CI accepting a dispatch and its ID being saved can create a
duplicate pipeline; the shared deployment lock and unchanged-head check prevent
concurrent activation or unnecessary rebuilding.

A new container uses a second localhost port. Health, SPA, and API checks precede
route reload. Failed updates keep the prior preview; failed reloads restore its
routes. Cleanup follows successful reload and removes only obsolete preview
containers and image tags. Build cache remains; monitor `docker system df`.

Check the Woodpecker `previewDeployment` logs for build, application-check,
and route-reload failures. A failed candidate makes the pipeline fail instead
of silently succeeding; previous applied routes remain active. Check
`journalctl -u pluoxPreviews.service` for dispatch/API failures, and GitHub
webhook deliveries for intake failures. Verify
create/update/close and public HTTPS after installation. Each preview serves with
128 MiB and 0.5 CPU. Stop the timer and path unit to pause reconciliation; stop
the listener to pause webhook intake. Existing previews remain running.

## Deployment links and demo data

Set `PREVIEW_GITHUB_TOKEN` in `/etc/pluoxPreviews.env` to a fine-grained token
restricted to this repository: **Deployments: read/write**, **Commit statuses:
read**. The controller publishes pending, building, failure, ready, and inactive
states to native GitHub Deployments, with the preview URL and exact SHA. It never
auto-merges branches. Reporting failures are logged and retried without stopping
serving containers; ready is published only after Caddy reload succeeds. Pending/building/failure
statuses link to the Woodpecker pipeline logs, not an unready environment URL;
the environment URL is published only with success.

Preview image builds pass `APP_PREVIEW=true`. They initialize a separate browser
storage namespace with a guest user, categories, venues, sample expenses, and
illustrative exchange rates. A visible preview banner offers **Reset demo** with
confirmation. Edits persist across reloads; reset only clears that namespace.
Production builds explicitly pass `APP_PREVIEW=false`. Existing PRs gain demo
mode after their branches include this change and a new head is built.
