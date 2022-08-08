# Node.js - MySQL with mysql client

## Prerequisites

- [Install Cluster locally on your PC](/README.md#setup-an-openshift-cluster-locally-on-your-pc)

**\*_NOTE:_** This tutorial is not available for **OpenShift cluster Sandbox** due to `Percona MySQL Operator` is not available/installed on **OpenShift Sandbox**.

- Login to OpenShift Web console as Administrator

* [Login to OpenShift with CLI](/README.md#login-to-openshift-with-cli)

## Install Service Binding Operator

- [Instructions](../../README.md#install-service-binding-operator)

## Deploy MySQL

- [instructions](/README.md#deploy-mysql---percona-xtradb-cluster-in-openshift)

## Install Percona MySQL Operator

- [instructions](/README.md#install-percona-distribution-for-mysql-operator)

## Option 1: Deploy Node.js app with Nodeshift

1. [Install and Login with Nodeshift to Openshift](../../README.md#install-nodeshift)
1. Clone Node.js app repository

   ```
   git clone https://github.com/nodeshift-blog-examples/kube-service-bindings-examples.git
   ```

1. Navigate to mysql app source code

   ```
   cd kube-service-bindings-examples/src/mysql
   ```

1. Deploy with Nodeshift
   ```
   nodeshift --namespace.name=pxc --expose
   ```

## Option 2: Deploy Node.js App through the OpenShift UI

- [Instructions](../../README.md#deploy-nodejs-app-from-openshift-ui)

## Connect Node.js app with MySQL - Binding

- [Instructions](../../README.md#connecting-nodejs-app-using-service-binding-operator)

## Interact with the Application

By visiting application's UI, you are able to interact with the application by adding, fetching, editing and removing fruits.

- [Further instructions](../../README.md#interact-with-the-application)

## kube-service-bindings usage for MySQL

For fetching populated data provided by Service Binding Operator under the /binding directory, we need to invoke `getBinding` function from `kube-service-bindings` npm package.

First we require/import `kube-service-bindings` package

```javascript
const serviceBindings = require("kube-service-bindings");
```

Then we invoke the geBinding function by specifying the type and the client.

```javascript
 const connectionOptions = serviceBindings.getBinding("MYSQL", "mysql");

```

**_NOTE:_** _A full list of the supported types and clients, is available on the kube-service-bindings [documentation](https://github.com/nodeshift/kube-service-bindings#usage)_

We can now easily connect to our database by passing the object, provided by getBinding function.

```javascript
const pool = mysql.createPool(connectionOptions);
```

Due to kube-service-bindings throws an error in case binding data are not available, we should wrap getBinding invocation.

```javascript
const mysql = require("mysql");

const serviceBindings = require("kube-service-bindings");

let connectionOptions;
try {
  connectionOptions = serviceBindings.getBinding("MYSQL", "mysql");
} catch (error) {
  connectionOptions = {
    host: process.env.MYSQL_HOST || "127.0.0.1",
    port: process.env.MYSQL_PORT || 3306,
    database: process.env.MYSQL_DATABASE_NAME || "mysql",
    user: process.env.MYSQL_USERNAME || "root",
    password: process.env.MYSQL_PASSWORD || "my-secret-pw"
  };
}

const pool = mysql.createPool(connectionOptions);
```

Thats the exact code we use on the mysql example [/lib/db/index.js](../mysql/lib/db/index.js), for establishing a connection with the database.

## Viewing the logs

Follow below instructions for further details on how to view the logs of the application

- [Instructions](../../README.md#viewing-logs-of-the-app)

## Application's File/Folder Structure

More information about the structure of the Node.js App we deployed, please follow below link

- [Application's structure](../../README.md#nodejs-applications-folder-structure)
