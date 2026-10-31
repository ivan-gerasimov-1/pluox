#!/bin/sh
set -eu

# This service only dispatches CI. It never builds images or changes Caddy routes.
rm -f /opt/pluox-preview-events/pending
docker run --rm --init --network host --memory 256m --cpus 0.5 --cpuset-cpus 0 \
    --env-file /etc/pluoxPreviewDispatch.env \
    -v /opt/pluox-previews:/opt/pluox-previews \
    --entrypoint node pluox/preview-controller:installed /app/previews/dispatch.mjs
