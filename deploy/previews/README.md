# PR previews

A host timer checks GitHub every five minutes. It deploys the three oldest open,
non-draft PRs authored by the repository owner, from this repository to `main`.
Forks are excluded. The head SHA must have successful Woodpecker push CI.
Keep Woodpecker PR builds disabled: PR pipelines never receive the Docker socket.
All repository writers remain trusted, as in production.

Each preview uses `https://pr-N.<PREVIEW_DOMAIN>`, the existing API, and separate
browser storage. There is no isolated backend or database. Preview code is public;
use test data. Closing, merging, drafting, or making a PR ineligible removes its
preview on the next successful cycle. PRs beyond the limit wait for a free slot.

## Install on the VPS

Install only from a reviewed commit merged into `main`. The controller image and
host script are snapshots; PRs cannot replace them. After controller changes,
stop the timer, rebuild the image, and reinstall the host files.

1. Add a **DNS-only** wildcard A record for `*.preview.<your-domain>` pointing to
   the VPS. Use the same suffix in `PREVIEW_DOMAIN`. The host Caddy's existing
   DNS-01 provider obtains the wildcard certificate; its token needs zone access.
2. In a checkout of the reviewed commit, run:

   ```sh
   sudo docker build -f deploy/previews/Dockerfile -t pluox/preview-controller:installed .
   sudo install -d -m 0755 /opt/pluox-previews /opt/pluox-preview-controller
   sudo install -m 0755 deploy/previews/previewCycle.sh /opt/pluox-preview-controller/
   sudo install -m 0644 deploy/previews/pluoxPreviews.service deploy/previews/pluoxPreviews.timer /etc/systemd/system/
   sudo install -m 0600 deploy/previews/config.env.example /etc/pluoxPreviews.env
   sudoedit /etc/pluoxPreviews.env
   ```

   Set the real domain and HTTPS API origin in that file, without quotes. Optional
   `PREVIEW_GITHUB_TOKEN` is a fine-grained token with read-only commit statuses;
   public PR reads need no additional access. Without it GitHub's shared anonymous
   rate limit can delay previews. Never add the file or token to Git.

3. Create an initial route file:

   ```sh
   sudo sh -c 'printf "handle {\n respond 404\n}\n" > /opt/pluox-previews/routes.caddy'
   ```

   Append the block in `hostCaddy.example` to `/etc/caddy/Caddyfile`, replacing
   its domain and public address locally. Keep the existing production blocks.
   Reload Caddy using its existing service environment:

   ```sh
   sudo systemctl reload caddy-gerasimov.service
   sudo systemctl daemon-reload
   sudo systemctl start pluoxPreviews.service
   sudo systemctl enable --now pluoxPreviews.timer
   ```

## Operation

The service shares production's deployment lock, so builds and deployments do
not overlap. New containers use a second localhost port and are checked for
health, SPA routing, and API rates before routes change. A failed update keeps
the previous preview. Caddy reload failure restores its previous routes; cleanup
runs only after a successful reload. GitHub listing failures preserve previews.

Each serving container is limited to 128 MiB and 0.5 CPU. An update temporarily
needs another container; builds consume additional resources. Containers receive
neither host mounts nor GitHub credentials. This supports trusted author code,
not hostile builds; Docker builds still use the host daemon.

Old preview containers and tagged images are removed without pruning production
images. Docker build cache is retained; monitor disk usage with `docker system df`.
A stopped or forcibly killed cycle may leave candidates until a successful cycle.
The service restarts neither production nor CI.

```sh
sudo journalctl -u pluoxPreviews.service -n 100 --no-pager
sudo systemctl list-timers pluoxPreviews.timer
curl --fail https://pr-N.YOUR_PREVIEW_DOMAIN/healthz
```

Verify creation, a second commit, a failing build, and PR closure after installation.
Public HTTPS and DNS require this live check; unit tests do not verify them.
Stop previews with `sudo systemctl disable --now pluoxPreviews.timer` and wait for
any running service to finish. Existing previews remain until a successful cleanup.
