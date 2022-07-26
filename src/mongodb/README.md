# MongoDB - mongodb client

## Prerequisites

- [OpenShift Cluster on SandBox](/README.md#setup-an-openshift-cluster-on-a-red-hat-sandbox) or [OpenShift Cluster locally on your PC](/README.md#setup-an-openshift-cluster-locally-on-you-pc)
<!-- - [Login to OpenShift with CLI](/README.md#login-to-openshift-with-cli) -->

## Install Service Binding Operator

**\*_NOTE:_** In case of **OpenShift cluster Sandbox**, Service binding Operator is already installed so you can skip this step.

- [Instructions](../../README.md#install-service-binding-operator)

## Install OpenShift Database Access Operator

**\*_NOTE:_** In case of **OpenShift cluster Sandbox**, OpenShift Database Access Operator is already installed so you can skip this step.

**\*_NOTE:_** In **OpenShift locally** Database Access Operator is not yet available, so in that case use OpenShift Sandbox to continue with the tutorial.

## Create a mongoDB on mongoDB Atlas

1.  Create an account on mongoDB Atlas, if you don't already have one visit below link to register https://www.mongodb.com/cloud/atlas/register
1.  Sign in
1.  Create a Project by clicking on Projects (in left sidebar) -> New Project -> Choose a name for your project -> Create Project
1.  Create a mongoDB database inside this project by clicking on the Build Database button and on the next page click on the Create button on the FREE plan -> create cluster. Leave the values to default while creating the cluster.
1.  Create a user for the mongoDB database: Database Access (left sidebar) -> Add new Database user -> Choose a username and password -> Create user

## Allowing access between OpenShift and mongoDB Database with "OpenShift Database Access operator".

1.  Select a project/namespace you would like to work on, by selecting developer (top of left sidebar) -> Topology -> Project -> (on dropdown) select your project
1.  Select Administrator perspective (Top of left sidebar)
1.  Expand the Data Services navigation menu (bottom of left sidebar), and click Database Access.
1.  Click on the Configuration button (upper right) -> Select “Import Database provider Account”

1.  On the form, select first MongoDB Atlas Cloud Database on the Database provider drop down menu and then fill the rest fields -> Import. For additional help on filling out the Account Credentials, follow below with detailed instructions for each field of the form. https://access.redhat.com/documentation/en-us/red_hat_openshift_database_access/1/html-single/quick_start_guide/index#find-your-mongodb-atlas-account-credentials_rhoda-qsg

## Deploying mongoDB database as Cloud-Hosted Database

1.  Visit topology view, by selecting developer perspective (left sidebar menu) -> topology
1.  Validate you have selecTed to deploy the DB on the correct project/namespace. For further instructions on selecting a namespace please follow below link.

    - [Project/namespace selection instructions](../../README.md#select-namespaceproject)

1.  Click on +Add button (left sidebar menu)-> Cloud-Hosted Database -> MongoDB Atlas Cloud Database Service -> Add to Topology -> Select your Database instance -> Add to topology -> Continue
1.  Upon successful Connection you are taken to the Topology view, where the Cloud-Hosted Database is deployed and visible on the Topology view.

## Deploy Node.js App

- with Nodeshift [Instructions](../../README.md#deploy-nodejs-application-with-nodeshift)

or

- through the OpenShift UI [Instructions](../../README.md#deploy-nodejs-app-from-openshift-ui)

## Connect Node.js app with mongoDB - Binding

- [Instructions](../../README.md#connecting-nodejs-app-using-service-binding-operator)

## Interact with the Application

By visiting application's UI, you are able to interact with the application by adding, fetching, editing and removing fruits.

- [Further instructions](../../README.md#interact-with-the-application)

## Viewing the logs

Follow below instructions for further details on how to view the logs of the application

- [Instructions](../../README.md#viewing-logs-of-the-app)
