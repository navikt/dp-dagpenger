FROM node:22-alpine AS runtime

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