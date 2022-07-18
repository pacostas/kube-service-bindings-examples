FROM docker.io/library/node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i --production

COPY . .

# ENV SERVICE_BINDING_ROOT=bindings

EXPOSE 3003

CMD [ "node", "app.js" ]
