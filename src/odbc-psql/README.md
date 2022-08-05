# Node.js - POSTGRESQL with odbc client

The steps are exactly the same as on pg [example](../pg/README.md) except as below sections

## Create base image for odbc psql

**\*_NOTE:_** This step is after the step [Deploy Crunchy DB in OpenShift](../pg/README.md#deploy-crunchy-db-in-openshift)

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

## Option 1: Deploy Node.js app with Nodeshift

1. Install nodeshift (https://www.npmjs.com/package/nodeshift)

```
npm install -g nodeshift
```

1. login with nodeshift `nodeshift login --token=sha256~aaaaaaaa-aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa --server=https://your.oc.instance.url:6443`

1. Deploy Node.js with nodeshift using as base image the base image stream we created previously

```
nodeshift --imageStream=odbc-psql-base --expose
```

## Option 2: Deploy Node.js App through the OpenShift UI

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
