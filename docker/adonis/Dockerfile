FROM node:lts-alpine

RUN mkdir -p ../../back:/home/node/app/node_modules

WORKDIR ../../back:/home/node/app

COPY ../../back/package.json yarn.* ./

RUN apk add --no-cache git

COPY . ../../back:/home/node/app/
#COPY . /home/node/app/
#copy pede dois argumentos . é um
RUN chown -R node:node /home/node

RUN yarn

USER node

EXPOSE 3333

ENTRYPOINT ["node"]