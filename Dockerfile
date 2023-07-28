FROM node:18 AS builder

WORKDIR /usr/src/app

COPY schema /usr/src/app/schema
COPY package*.json codegen.yml .npmrc /usr/src/app/
RUN --mount=type=secret,id=NODE_AUTH_TOKEN \
    NODE_AUTH_TOKEN=$(cat /run/secrets/NODE_AUTH_TOKEN) \
    npm ci --prefer-offline --no-audit

COPY . /usr/src/app

ARG SENTRY_RELEASE
RUN --mount=type=secret,id=SENTRY_AUTH_TOKEN \
    SENTRY_AUTH_TOKEN=$(cat /run/secrets/SENTRY_AUTH_TOKEN) \
    npm run build && npm prune --production

FROM node:18-alpine AS runtime

WORKDIR /usr/src/app

ENV PORT=3000 \
    NODE_ENV=production

COPY --from=builder /usr/src/app/ /usr/src/app/

EXPOSE 3000
USER node

CMD ["./node_modules/.bin/next", "start"]
