FROM docker:29.9.2-cli
RUN apk add --no-cache 'nodejs~24' git
WORKDIR /app
COPY deploy/autoDeploy.mjs ./autoDeploy.mjs
COPY deploy/previews/controller.mjs ./previews/controller.mjs
ENTRYPOINT ["node", "/app/previews/controller.mjs"]
