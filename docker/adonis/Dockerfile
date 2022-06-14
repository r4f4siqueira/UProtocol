ARG NODE_IMAGE=node:16.13.1-alpine

FROM $NODE_IMAGE AS base
RUN apk --no-cache add dumb-init
RUN mkdir -p ../back:/home/node/app && chown node:node ../back:/home/node/app
WORKDIR /back
RUN mkdir -p tmp
RUN chown node tmp
USER node

FROM base AS dependencies
COPY --chown=node:node ../package*.json /.
RUN npm ci
COPY --chown=node:node . .

FROM dependencies AS build
RUN node ace build --production

FROM base AS production
ENV NODE_ENV=production
ENV PORT=$PORT
ENV HOST=0.0.0.0
COPY --chown=node:node ./package*.json ./
RUN npm ci --production
COPY --chown=node:node --from=build ..back:/home/node/app/build .
EXPOSE $PORT
CMD [ "dumb-init", "node", "server.js" ]