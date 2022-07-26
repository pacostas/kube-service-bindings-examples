# POSTGRESQL - with odbc client

## Prerequisites

- [OpenShift Cluster](/README.md#setup-an-openshift-cluster-on-a-red-hat-sandbox)
- [Login to OpenShift](/README.md#login-to-openshift)

## Tutorial Reference

- https://access.crunchydata.com/documentation/postgres-operator/5.1.0/tutorial/

## Install Crunchy DB operator

- [Instructions](../../README.md#install-crunchy-db-operator)

## Install Service binding operator

- [Instructions](../../README.md#install-service-binding-operator)

## Deploy Crunchy DB

- [Instructions](../../README.md#deploy-postgresql---crunchy-db-in-openshift)

## Create base image for odbc psql

1. clone example app

```
git clone https://github.com/nodeshift-blog-examples/kube-service-bindings-examples.git
cd kube-service-bindings-examples/src/odbc-psql
```

1. Create base imagestream

```
oc apply -f odbc-psql-base-imagestream.yaml
```

1. Create base build config

```
oc apply -f odbc-psql-base-build-config.yaml
```

## Deploy Node.js App WITH Nodeshift

1. Install nodeshift (https://www.npmjs.com/package/nodeshift)

```
npm install -g nodeshift
```

1. login with nodeshift `nodeshift login --token=sha256~aaaaaaaa-aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa --server=https://your.oc.instance.url:6443`

1. Deploy Node.js with nodeshift using as base image the base image stream we created previously

```
nodeshift --imageStream=odbc-psql-base --expose
```

## Deploy Node.js App with OpenShift Web Console

1. Create an imagestream

```
   oc apply -f odbc-psql-app-imagestream.yaml
```

1. Create a build config

```
   oc apply -f odbc-psql-app-build-config.yaml
```

1. Switch to developer mode
1. Select +Add from the sidebar menu
1. In case you havent select any namespace/project choose the `postgres-operator`
1. click on container image
1. Click on the radio button `Image stream tag from internal registry`
1. Select the `odbc-psql-app` image stream and set as tag the `latest`
1. Click on Create button

## Connect Node.js app with PSQL - Binding

- [Instructions](../../README.md#connecting-nodejs-app-using-service-binding-operator)

## Interact with the Application

By visiting application's UI, you are able to interact with the application by adding, fetching, editing and removing fruits.

- [Further instructions](../../README.md#interact-with-the-application)

## Viewing the logs

Follow below instructions for further details on how to view the logs of the application

- [Instructions](../../README.md#viewing-logs-of-the-app)
