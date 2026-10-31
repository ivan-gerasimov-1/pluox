FROM docker:29.9.2-cli
RUN apk add --no-cache 'nodejs~24' git
WORKDIR /app
COPY deploy/autoDeploy.mjs deploy/buildImage.mjs ./
COPY deploy/previews/webhook.mjs deploy/previews/setupWebhook.mjs ./previews/
COPY deploy/previews/controller.mjs ./previews/controller.mjs
ENTRYPOINT ["node", "/app/previews/controller.mjs"]
