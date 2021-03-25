FROM caddy:2-alpine
COPY ./Caddyfile /etc/caddy/Caddyfile
COPY --from=builder /app/dist/ /srv/
COPY ./backends-templates/ /srv/backends
