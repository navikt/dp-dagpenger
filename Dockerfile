FROM node:16 AS builder

WORKDIR /usr/src/app

ARG SENTRY_RELEASE

COPY scripts /usr/src/app/scripts
COPY schema /usr/src/app/schema
COPY codegen.yml package*.json /usr/src/app/
RUN npm ci --prefer-offline --no-audit && rm -r scripts

COPY . /usr/src/app
RUN --mount=type=secret,id=SENTRY_AUTH_TOKEN,dst=/root/.sentryclirc npm run build && npm prune --production

FROM node:16-alpine AS runtime

WORKDIR /usr/src/app

ENV PORT=3000 \
    NODE_ENV=production

COPY --from=builder /usr/src/app/ /usr/src/app/

EXPOSE 3000
USER node

CMD ["./node_modules/.bin/next", "start"]
