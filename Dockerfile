FROM abiosoft/caddy:latest
COPY ./Caddyfile /etc/Caddyfile
RUN \
  mkdir -p /site/
COPY ./dist/ /site/
COPY ./backends-templates/ /site/backends
