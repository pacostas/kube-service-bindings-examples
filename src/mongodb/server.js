const http = require("http");
const { MongoClient } = require("mongodb");

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

let db;

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

const mongoClient = new MongoClient(url, connectionOptions);

async function run() {
  await mongoClient.connect();
  db = mongoClient.db(dbName);
  console.log("Connected successfully to database");
  return "ok";
}

run()
  .then()
  .catch((err) => console.log(err));

const server = http.createServer((req, res) => {
  console.log(` Method: ${req.method}\tPath: ${req.url}`);
  if (req.url === "/" && req.method === "GET") {
    serveIndex(req, res);
  } else if (req.url.match(/\/api\/fruits\/\w+/) && req.method === "GET") {
    getOne(req, res, db);
  } else if (req.url.match(/\/api\/fruits\/?/) && req.method === "GET") {
    getAll(req, res, db);
  } else if (req.url.match(/\/api\/fruits\/?/) && req.method === "POST") {
    createOne(req, res, db);
  } else if (req.url.match(/\/api\/fruits\/\w+/) && req.method === "PUT") {
    updateOne(req, res, db);
  } else if (req.url.match(/\/api\/fruits\/\w+/) && req.method === "DELETE") {
    deleteOne(req, res, db);
  } else if (req.url === "/ready" && req.method === "GET") {
    ready(req, res);
  } else if (req.url === "/live" && req.method === "GET") {
    live(req, res);
  } else {
    notFound404(req, res);
  }
});

server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
