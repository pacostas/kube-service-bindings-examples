# Node.js - MySQL with mysql client

## Prerequisites

- [Install Cluster locally on your PC](/README.md#setup-an-openshift-cluster-locally-on-you-pc)

**\*_NOTE:_** This tutorials is not available for **OpenShift cluster Sandbox** due to `Percona MySQL Operator` is not available/installed on **OpenShift Sandbox**.

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

## Viewing the logs

Follow below instructions for further details on how to view the logs of the application

- [Instructions](../../README.md#viewing-logs-of-the-app)
