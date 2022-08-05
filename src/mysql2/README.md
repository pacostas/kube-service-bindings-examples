# Node.js - MySQL with mysql2 client

The steps are exactly the same as on mysql [example](../mysql/README.md) except as below sections 

## Option 1: Deploy Node.js app with Nodeshift

1. [Install and Login with Nodeshift to Openshift](../../README.md#install-nodeshift)
1. Clone Node.js app repository

   ```
   git clone https://github.com/nodeshift-blog-examples/kube-service-bindings-examples.git
   ```

1. Navigate to mysql2 app source code

   ```
   cd kube-service-bindings-examples/src/mysql2
   ```

1. Deploy with Nodeshift
   ```
   nodeshift --namespace.name=pxc --expose
   ```
