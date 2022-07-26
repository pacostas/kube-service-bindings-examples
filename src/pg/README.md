# POSTGRESQL - pg client

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

## Deploy Node.js App

- with Nodeshift [Instructions](../../README.md#deploy-nodejs-application-with-nodeshift)

or

- through the OpenShift UI [Instructions](../../README.md#deploy-nodejs-app-from-openshift-ui)

## Connect Node.js app with PSQL - Binding

- [Instructions](../../README.md#connecting-nodejs-app-using-service-binding-operator)

## Interact with the Application

By visiting application's UI, you are able to interact with the application by adding, fetching, editing and removing fruits.

- [Further instructions](../../README.md#interact-with-the-application)

## Viewing the logs

Follow below instructions for further details on how to view the logs of the application

- [Instructions](../../README.md#viewing-logs-of-the-app)
