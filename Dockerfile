FROM node:18-alpine AS runtime

WORKDIR /usr/src/app

ENV PORT=3000 \
    NODE_ENV=production \
    TZ=Europe/Oslo

COPY schema /usr/src/app/schema
COPY package*.json codegen.yml .npmrc /usr/src/app/
COPY next.config.js ./
COPY public ./public
COPY .next/standalone ./
COPY .next/static ./.next/static

EXPOSE 3000
USER node

CMD ["node", "server.js"]

