FROM registry.access.redhat.com/ubi8/nodejs-16

# USER root

# WORKDIR /usr/src/app

WORKDIR ./..

COPY package*.json ./

RUN npm ci --production

COPY . .

# USER 1001

EXPOSE 8080

CMD [ "node", "app.js" ]
