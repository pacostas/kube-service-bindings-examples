const http = require("http");
const mongoose = require("mongoose");

const serviceBindings = require("kube-service-bindings");

const {
  getOne,
  getAll,
  createOne,
  updateOne,
  deleteOne
} = require("./controllers/fruits.js");

const { ready, live, notFound404 } = require("./handlers/index.js");

const { serveIndex } = require("./public/index.js");

const PORT = process.env.PORT || 8080;
const dbName = process.env.MONGO_DB_NAME || "my_app_db";

const fruitSchema = new mongoose.Schema({
  name: String,
  stock: Number
});

const Fruit = mongoose.model("fruit", fruitSchema);

let url;
let connectionOptions;

try {
  ({ url, connectionOptions } = serviceBindings.getBinding(
    "MONGODB",
    "mongodb"
  ));
} catch (err) {
  url = "mongodb://root:root@127.0.0.1:27017";
  connectionOptions = { auth: { password: "password", username: "root" } };
}

async function main() {
  await mongoose.connect(url, { ...connectionOptions, dbName });
  console.log(
    "mongoose connection state is ",
    !!mongoose.connection.readyState
  );
}

main()
  .then(console.log("Connected successfully to server"))
  .catch(console.error);

const server = http.createServer((req, res) => {
  console.log(` Method: ${req.method}\tPath: ${req.url}`);
  if (req.url === "/" && req.method === "GET") {
    serveIndex(req, res);
  } else if (req.url.match(/\/api\/fruits\/\w+/) && req.method === "GET") {
    getOne(req, res, Fruit);
  } else if (req.url.match(/\/api\/fruits\/?/) && req.method === "GET") {
    getAll(req, res, Fruit);
  } else if (req.url.match(/\/api\/fruits\/?/) && req.method === "POST") {
    createOne(req, res, Fruit);
  } else if (req.url.match(/\/api\/fruits\/\w+/) && req.method === "PUT") {
    updateOne(req, res, Fruit);
  } else if (req.url.match(/\/api\/fruits\/\w+/) && req.method === "DELETE") {
    deleteOne(req, res, Fruit);
  } else if (req.url === "/ready" && req.method === "GET") {
    ready(req, res);
  } else if (req.url === "/live" && req.method === "GET") {
    live(req, res);
  } else {
    notFound404(req, res);
  }
});

server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
