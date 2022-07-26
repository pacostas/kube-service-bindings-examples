# AMQP1.0 on RabbitMQ- rhea client

## Prerequisites

- [OpenShift Cluster](/README.md#setup-an-openshift-cluster-on-a-red-hat-sandbox)
- [Login to OpenShift](/README.md#login-to-openshift)

## Install Service Binding Operator

- [Instructions](../../README.md#install-service-binding-operator)

## Deploy RabbitMQ

Tutorial Reference:

- https://github.com/rabbitmq/cluster-operator

```
oc apply -f https://github.com/rabbitmq/cluster-operator/releases/latest/download/cluster-operator.yml
```

```
oc apply -f https://raw.githubusercontent.com/rabbitmq/cluster-operator/main/docs/examples/hello-world/rabbitmq.yaml

```

## Configure RabbitMQ to use amqp1.0 protocol

Configuration Reference:

- https://www.rabbitmq.com/plugins.html

Steps:

1. Visit Openshift Dashboard
1. Choose you workspace
1. Developer (upper left) -> Topology
1. Click on your rabbitMQ Cluster
1. Go to terminal of the RabbitMq cluster
1. Set command rabbitmq-plugins enable rabbitmq_amqp1_0

Done! RabbitMQ is ready to accept AMQP1.0 connections.

## Deploy Node.js

- with Nodeshift [Instructions](../../README.md#deploy-nodejs-application-with-nodeshift)

or

- through the OpenShift UI [Instructions](../../README.md#deploy-nodejs-app-from-openshift-ui)

## Connect Node.js app with RabbitMQ - Binding

- [Instructions](../../README.md#connecting-nodejs-app-using-service-binding-operator)
