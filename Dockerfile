FROM node:lts-alpine as builder

WORKDIR /app

COPY package.json .
COPY pnpm-lock.yaml .

RUN rm -rf node_modules
RUN npm install -g pnpm
RUN npm install -g ts-node
RUN pnpm install

COPY . .

CMD ts-node .