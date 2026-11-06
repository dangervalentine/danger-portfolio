# The portfolio on the remote server (deploy/deploy.sh): built with every package, run
# with the production ones. It needs no settings: RESUME_PHONE only feeds the private
# résumé PDF, built on a desktop (npm run resume), never here.
FROM node:24-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --include=dev
COPY . .
RUN npm run build && npm prune --omit=dev && rm -rf .next/cache

FROM node:24-slim
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1
WORKDIR /app
COPY --from=build --chown=node:node /app ./
USER node
EXPOSE 3100
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s \
    CMD node -e "fetch('http://127.0.0.1:3100/').then(r => process.exit(r.ok ? 0 : 1), () => process.exit(1))"
# Bound to every interface inside the container: only the docker network (Caddy) reaches it.
CMD ["node_modules/.bin/next", "start", "--port", "3100", "--hostname", "0.0.0.0"]
