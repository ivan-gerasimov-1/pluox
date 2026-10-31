#!/bin/sh
set -eu

# The flock is held before consuming the marker. Events during this cycle queue another.
rm -f /opt/pluox-preview-events/pending

controller() {
    docker run --rm --init --network host --memory 256m --cpus 0.5 --cpuset-cpus 0 \
        --env-file /etc/pluoxPreviews.env \
        -v /var/run/docker.sock:/var/run/docker.sock \
        -v /opt/pluox-buildx:/root/.docker/buildx \
        -v /opt/pluox-previews:/opt/pluox-previews \
        pluox/preview-controller:installed "$1"
}

controller sync
if ! systemctl reload caddy-gerasimov.service; then
    controller restore
    systemctl reload caddy-gerasimov.service
    exit 1
fi
controller finalize
