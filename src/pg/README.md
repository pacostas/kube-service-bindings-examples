# Node.js - POSTGRESQL with pg client

## Prerequisites

- [Install Cluster locally on your PC](/README.md#setup-an-openshift-cluster-locally-on-you-pc)

**\*_NOTE:_** This tutorials is not available for **OpenShift cluster Sandbox** due to `Crunchy Postgres for Kubernetes` is not available/installed on **OpenShift Sandbox**.

- Login to OpenShift Web console as Administrator

* [Login to OpenShift with CLI](/README.md#login-to-openshift-with-cli)

## Install Crunchy DB operator & create postgres-operator namespace

- [instructions](/README.md#install-crunchy-db-operator)

## Install Service Binding Operator

- [Instructions](../../README.md#install-service-binding-operator)

## Deploy Crunchy DB in OpenShift

- [instructions](/README.md#deploy-postgresql---crunchy-db-in-openshift)

## Option 1: Deploy Node.js app with Nodeshift

1. [Install and Login with Nodeshift to Openshift](../../README.md#install-nodeshift)
1. Clone Node.js app repository

   ```
   git clone https://github.com/nodeshift-blog-examples/kube-service-bindings-examples.git
   ```

1. Navigate to pg app source code

   ```
   cd kube-service-bindings-examples/src/pg
   ```

1. Deploy with Nodeshift
   ```
   nodeshift --namespace.name=postgres-operator --expose
   ```

## Option 2: Deploy Node.js App through the OpenShift UI

- [Instructions](../../README.md#deploy-nodejs-app-from-openshift-ui)

## Connect Node.js app with PSQL - Binding

- [Instructions](../../README.md#connecting-nodejs-app-using-service-binding-operator)

## Interact with the Application

By visiting application's UI, you are able to interact with the application by adding, fetching, editing and removing fruits.

- [Further instructions](../../README.md#interact-with-the-application)

## Viewing the logs

Follow below instructions for further details on how to view the logs of the application

- [Instructions](../../README.md#viewing-logs-of-the-app)
