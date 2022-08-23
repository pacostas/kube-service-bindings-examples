# Node.js - MySQL with odbc client

The steps are exactly the same as on mysql [example](../mysql/README.md) except as below sections

## Create base image for odbc mysql

**\*_NOTE:_** This step is after the step [Deploy MySQL](../mysql/README.md#deploy-mysql)

1. Clone example app

   ```
   git clone https://github.com/nodeshift-blog-examples/kube-service-bindings-examples.git
   cd kube-service-bindings-examples/src/odbc-mysql
   ```

1. Create base imagestream

   ```
   oc apply -f odbc-mysql-base-imagestream.yaml
   ```

1. Create base build config

   ```
   oc apply -f odbc-mysql-base-build.yaml
   ```

1. Build the **base build** config which will point to **base imagestream** we created previously

   ```
   oc start-build odbc-mysql-base
   ```

1. Wait till the build finishes. Follow below link, with instructions on how to watch the build progress.

   - [Instructions](../../README.md#watch-build-progress-of-build-config)

## Option 1: Deploy Node.js App WITH Nodeshift

1. Install nodeshift (https://www.npmjs.com/package/nodeshift)

   ```
   npm install -g nodeshift
   ```

1. Login with nodeshift `nodeshift login --token=sha256~aaaaaaaa-aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa --server=https://your.oc.instance.url:6443`

1. Deploy Node.js with nodeshift using as base image the base image stream we created previously

   ```
   nodeshift --imageStream=odbc-mysql-base --expose
   ```

## Option 2: Deploy Node.js App with OpenShift Web Console

1. Create app as imagestream

   ```
   oc apply -f odbc-mysql-app-imagestream.yaml
   ```

1. Create the app build config

   ```
   oc apply -f odbc-mysql-app-build.yaml
   ```

1. build the build app config which will output to imagestream we created

   ```
   oc start-build odbc-mysql-app
   ```

1. Wait till the build finishes. Follow below link, with instructions on how to watch the build progress.

   - [Instructions](../../README.md#watch-build-progress-of-build-config)

1. Switch to developer mode
1. Select +Add from the sidebar menu
1. In case you havent select any namespace/project choose the `pxc`
1. click on container image
1. Click on the radio button `Image stream tag from internal registry`
1. Select the `odbc-mysql-app` image stream and set as tag the `latest`
1. Click on Create button

## kube-service-bindings usage for ODBC MySQL

For fetching populated data provided by Service Binding Operator under the /binding directory, we need to invoke `getBinding` function from `kube-service-bindings` npm package.

First we require/import `kube-service-bindings` package

```javascript
const serviceBindings = require("kube-service-bindings");
```

Then we invoke the geBinding function by specifying the type and the client.

```javascript
const connectionOptions = serviceBindings.getBinding("MYSQL", "odbc");
```

**_NOTE:_** _A full list of the supported types and clients, is available on the kube-service-bindings [documentation](https://github.com/nodeshift/kube-service-bindings#usage)_

We can now easily connect to our database by passing the object, provided by getBinding function.

```javascript
const odbcConnection = await odbc.pool(connectionConfig.connectionString);
```

Due to kube-service-bindings throws an error in case binding data are not available, we should wrap getBinding invocation.

```javascript
const odbc = require("odbc");

const serviceBindings = require("kube-service-bindings");
let connectionConfig;
try {
  connectionConfig = serviceBindings.getBinding("MYSQL", "odbc");
} catch (err) {
  // handle error
}
```

Thats the exact code we use on the odbc-mysql example [/lib/db/index.js](../odbc-mysql/lib//db/index.js), for establishing a connection with the database.
