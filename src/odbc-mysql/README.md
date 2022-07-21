# MySQL - mysql2-odbc

## Prerequisites

- [OpenShift Cluster](/README.md#setup-an-openshift-cluster-on-a-red-hat-sandbox)
- [Login to OpenShift](/README.md#login-to-openshift)

## Tutorial Reference

- https://access.crunchydata.com/documentation/postgres-operator/5.1.0/tutorial/

## Install Service Binding Operator

- [Instructions](../../README.md#install-service-binding-operator)

## Deploy MySQL

- [instructions](/README.md#deploy-mysql---percona-xtradb-cluster-in-openshift)

## Install Percona MySQL Operator

- [instructions](/README.md#install-percona-distribution-for-mysql-operator)

## Create base image for odbc mysql

1. clone example app

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

## Deploy Node.js App with OpenShift Web Console

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

## Deploy Node.js App WITH Nodeshift

1. Install nodeshift (https://www.npmjs.com/package/nodeshift)

   ```
   npm install -g nodeshift
   ```

1. Login with nodeshift `nodeshift login --token=sha256~aaaaaaaa-aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa --server=https://your.oc.instance.url:6443`

1. Deploy Node.js with nodeshift using as base image the base image stream we created previously

   ```
   nodeshift --imageStream=odbc-mysql-base --expose
   ```
