FROM registry.access.redhat.com/ubi8/nodejs-16

USER root

RUN rpm -ivh https://repo.mysql.com/mysql80-community-release-el8.rpm

RUN yum install --nogpgcheck -y unixODBC mysql-connector-odbc

RUN sed -i -e 's|Driver64=/usr/lib64/libmyodbc5.so|Driver64=/usr/lib64/libmyodbc8w.so|g' /etc/odbcinst.ini

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --production

COPY . .

USER 1001

EXPOSE 8080

CMD [ "node", "app.js" ]
