#!/bin/sh
# Runs synchronously in a trusted main Woodpecker job, under the deployment lock.
set -eu

controller() {
    docker run --rm --init --network host --memory 256m --cpus 0.5 --cpuset-cpus 0 \
        --env-file /etc/pluoxPreviews.env \
        -e PREVIEW_PIPELINE_URL \
        -e PLUOX_PREVIEW_ACTION -e PLUOX_PREVIEW_PR -e PLUOX_PREVIEW_SHA \
        -v /var/run/docker.sock:/var/run/docker.sock \
        -v /opt/pluox-buildx:/root/.docker/buildx \
        -v /opt/pluox-previews:/opt/pluox-previews \
        pluox/preview-controller:installed "$1"
}

reload() {
    # Use the installed static Caddy binary (including DNS plugins). The host's
    # admin endpoint stays on loopback; no SSH, privileged container or host PID access.
    docker run --rm --network host --env-file /etc/caddy/gerasimov.env \
        -v /usr/local/bin/caddy:/usr/local/bin/caddy:ro \
        -v /etc/caddy:/etc/caddy:ro \
        -v /opt/pluox-previews:/opt/pluox-previews:ro \
        --entrypoint /usr/local/bin/caddy pluox/preview-controller:installed \
        reload --config /etc/caddy/Caddyfile --adapter caddyfile --force
}

if ! controller sync; then
    controller restore
    exit 1
fi
if ! reload; then
    controller restore
    reload
    exit 1
fi
controller finalize
