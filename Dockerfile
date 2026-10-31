FROM node:24-bookworm-slim@sha256:c86ecead9e55a5210ac1727de38a4ca840bf03dcaf34dc9749addbf383b1920c AS build
WORKDIR /app
COPY . .
RUN npm ci --no-audit --no-fund

# These values are public: Vite embeds them in browser JavaScript.
ARG APP_API_URL=/api
ARG APP_UMAMI_SCRIPT_URL=""
ARG APP_UMAMI_WEBSITE_ID=""
ARG APP_SENTRY_DSN=""
RUN test -n "$APP_API_URL" && npm --workspace=@pluox/web run build

FROM caddy:2.11.7-alpine AS runtime
# The base binary requests CAP_NET_BIND_SERVICE. Our server uses port 8080
# and runs with cap_drop: ALL, so remove that file capability before startup.
RUN setcap -r /usr/bin/caddy
COPY deploy/Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/apps/web/build /srv
USER 10001:10001
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD curl --fail --silent --show-error --max-time 3 --output /dev/null http://127.0.0.1:8080/healthz || exit 1
