#!/bin/sh
# Thin bridge to a reviewed, host-published infra release. No network or credentials.
set -eu

fail() {
    printf '%s\n' "$1" >&2
    exit 1
}

[ "$#" -eq 1 ] || fail 'Usage: infraRelease.sh production|preview'
case "$1" in production|preview) ;; *) fail 'Unknown infrastructure action.' ;; esac
base=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
read -r revision manifest_hash extra < "$base/infraRelease.lock"
[ -z "$extra" ] || fail 'Malformed infrastructure lock.'
printf '%s\n' "$revision" | grep -Eq '^[a-f0-9]{40}$' || fail 'Expected a full infra commit SHA.'
printf '%s\n' "$manifest_hash" | grep -Eq '^[a-f0-9]{64}$' || fail 'Invalid manifest digest.'
releases=${VPS_INFRA_RELEASES:-/opt/vps-infra/releases}
case "$releases" in /*) ;; *) fail 'Release directory must be absolute.' ;; esac
release="$releases/$revision"
[ -d "$release" ] || fail 'Pinned infra release is not installed. See deploy/README.md.'
# The app pins the manifest digest, not just a writable revision marker.
printf '%s  %s\n' "$manifest_hash" "$release/SHA256SUMS" | sha256sum -c - >/dev/null
(cd -- "$release" && sha256sum -c SHA256SUMS >/dev/null)
[ "$(cat "$release/REVISION")" = "$revision" ] || fail 'Infrastructure revision mismatch.'

if [ "$1" = production ]; then
    PLUOX_SOURCE=$(CDPATH= cd -- "$base/.." && pwd)
    export PLUOX_SOURCE
    exec node "$release/apps/pluox/deploy/autoDeploy.mjs"
fi

# This host-created metadata is separate from the deterministic source manifest.
# Resolve and use an image ID, never the mutable controller:installed tag.
PLUOX_PREVIEW_IMAGE=$(cat "$release/PREVIEW_IMAGE_ID")
[ "${#PLUOX_PREVIEW_IMAGE}" -eq 71 ] || fail 'Invalid release controller image ID.'
printf '%s\n' "$PLUOX_PREVIEW_IMAGE" | grep -Eq '^sha256:[a-f0-9]{64}$' || fail 'Invalid release controller image ID.'
label=$(docker image inspect --format '{{index .Config.Labels "org.opencontainers.image.revision"}}' "$PLUOX_PREVIEW_IMAGE")
[ "$label" = "$revision" ] || fail 'Controller image does not match the pinned infra revision.'
export PLUOX_PREVIEW_IMAGE
exec sh "$release/apps/pluox/deploy/previews/previewPipeline.sh"
