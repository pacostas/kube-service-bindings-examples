# MySQL - mysql client

## Prerequisites

- [OpenShift Cluster](/README.md#setup-an-openshift-cluster-on-a-red-hat-sandbox)
- [Login to OpenShift](/README.md#login-to-openshift)

## MySQL DB - Node.js App

1. Install Service binding operator -> [instructions](/README.md#install-service-binding-operator)

1. Install Percona MySQL Operator -> [instructions](/README.md#install-percona-distribution-for-mysql-operator)

1. Deploy MySQL -> [instructions](/README.md#deploying-mysql---percona-xtradb-cluster)

1. Deploy Node.js App

   - Using Nodeshift -> [instructions](/README.md#deploy-nodejs-application-with-nodeshift)

   - Using OpenShift UI
     [instructions](/README.md#deploy-nodejs-app-from-openshift-ui)

1. Connecting Node.js app using service binding operator
   [instructions](/README.md#connecting-nodejs-app-using-service-binding-operator)
