FROM node:14 AS builder

WORKDIR /usr/src/app

COPY scripts /usr/src/app/scripts
COPY schema /usr/src/app/schema
COPY codegen.yml package*.json /usr/src/app/
RUN npm ci --prefer-offline --no-audit && rm -r scripts

COPY . /usr/src/app
RUN npm run build && npm prune --production

FROM node:14-alpine AS runtime

WORKDIR /usr/src/app

ENV PORT=3000 \
    NODE_ENV=production

COPY --from=builder /usr/src/app/ /usr/src/app/

EXPOSE 3000
USER node

CMD ["./node_modules/.bin/next", "start"]
