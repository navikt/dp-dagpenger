FROM node:14 AS builder

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/
RUN npm ci

ENV NODE_ENV=production

COPY . /usr/src/app
RUN npm run build

FROM node:15-alpine AS runtime

WORKDIR /usr/src/app

ENV PORT=3000 \
    NODE_ENV=production

EXPOSE 3000
USER node

COPY --from=builder /usr/src/app/ /usr/src/app/

CMD ["npm", "start"]
