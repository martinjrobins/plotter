FROM node:13-alpine AS builder
ENV DEPLOY_ENV=DOCKER
WORKDIR /app
COPY . .
RUN apk --no-cache add python3 build-base && npm ci && npm run build && npm run generate

FROM caddy:2-alpine
COPY ./Caddyfile /etc/caddy/Caddyfile
COPY --from=builder /app/dist/ /srv/
COPY ./backends-templates/ /srv/backends
RUN mkdir /srv/datasets && echo '[]' > /srv/datasets/datasets.json
