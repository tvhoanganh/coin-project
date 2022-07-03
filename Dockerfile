FROM node:lts-alpine as prod-deps
WORKDIR /app
COPY package.json .
RUN yarn install --production

FROM node:lts-alpine as dependencies
WORKDIR /app
COPY --from=prod-deps /app .
RUN yarn install

FROM node:lts-alpine as builder
WORKDIR /app
COPY --from=dependencies /app .
COPY . .
RUN yarn build

FROM node:lts-alpine as production
WORKDIR /test
COPY --from=builder /app/.next ./.next
COPY --from=prod-deps /app/node_modules ./node_modules
WORKDIR /app
COPY --from=builder /app .
EXPOSE 3000
CMD ["node_modules/.bin/next", "start"]

FROM node:lts-alpine as develop
WORKDIR /app
COPY --from=dependencies /app .
EXPOSE 3000
CMD ["yarn", "dev"]
