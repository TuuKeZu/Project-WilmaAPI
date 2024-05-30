
ARG NODE_VERSION=18.0.0

FROM node:${NODE_VERSION}-alpine

ENV NODE_ENV production

WORKDIR /otawilma

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

USER node

COPY ./src ./src
COPY ./public ./public
COPY ./static/ ./static
COPY ./package.json ./package.json

EXPOSE 3001

CMD node ./src/main.js