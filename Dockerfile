FROM node:18 AS builder

WORKDIR /usr/src/app

COPY schema /usr/src/app/schema
COPY package*.json codegen.yml .npmrc /usr/src/app/
RUN --mount=type=secret,id=NODE_AUTH_TOKEN \
    NODE_AUTH_TOKEN=$(cat /run/secrets/NODE_AUTH_TOKEN) \
    npm ci --prefer-offline --no-audit

COPY . /usr/src/app

RUN npm run build && npm prune --production

FROM node:18-alpine AS runtime

WORKDIR /usr/src/app

ENV PORT=3000 \
    NODE_ENV=production \
    TZ=Europe/Oslo

COPY next.config.js ./
COPY public ./public
COPY .next/standalone ./
COPY .next/static ./.next/static

EXPOSE 3000
USER node

CMD ["node", "server.js"]
