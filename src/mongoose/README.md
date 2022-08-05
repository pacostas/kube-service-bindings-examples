# Node.js - MongoDB with mongoose client

The steps are exactly the same as on mongodb [example](../mongodb/README.md) except as below sections

## Option 1: Deploy Node.js app with Nodeshift

1. [Install and Login with Nodeshift to Openshift](../../README.md#install-nodeshift)
1. Clone Node.js app repository

   ```
   git clone https://github.com/nodeshift-blog-examples/kube-service-bindings-examples.git
   ```

1. Navigate to mongodb app source code

   ```
   cd kube-service-bindings-examples/src/mongoose
   ```

1. Deploy with Nodeshift
   ```
   nodeshift --namespace.name=<selected-namespace> --expose
   ```
