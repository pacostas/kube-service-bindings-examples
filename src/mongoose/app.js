const http = require("http");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 8080;
const dbName = process.env.MONGO_DB_NAME || "myApp";

const serviceBindings = require("kube-service-bindings");

let mongooseConnection;

const helloWorldSchema = new mongoose.Schema({
  hello: String
});

const HelloWorld = mongoose.model("HelloWorld", helloWorldSchema);

try {
  mongooseConnection = serviceBindings.getBinding("MONGODB", "mongoose");
} catch (err) {
  const mongoUser = process.env.MONGO_USER || "root";
  const mongoPassword = process.env.MONGO_PASSWORD || "password";
  const mongoHost = process.env.MONGO_URL || "127.0.0.1";
  const mongoPort = process.env.MONGO_PORT || 27017;

  const srv = "true";

  const auth = {
    password: mongoPassword,
    username: mongoUser
  };

  const encodedMongoUser = encodeURIComponent(mongoUser);
  const encodedMongoPassword = mongoUser ? encodeURIComponent(mongoUser) : "";

  const url = [
    "mongodb",
    srv === "true" ? "+srv" : "",
    `://${encodedMongoUser}:${encodedMongoPassword}@${mongoHost}`,
    srv !== "true" && mongoPort ? `:${mongoPort}` : ""
  ].join("");

  mongooseConnection = {
    connectionOptions: {
      auth
    },
    url
  };
}

const { url, connectionOptions } = mongooseConnection;

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
  if (req.url === "/api/getAll" && req.method === "GET") {
    HelloWorld.find({})
      .then((result) => {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result));
      })
      .catch((err) => console.error(`Something went wrong: ${err}`));
  } else if (
    req.url === "/api/addOne" &&
    (req.method === "POST" || req.method === "GET")
  ) {
    const itemToDB = new HelloWorld({ hello: "world" });

    itemToDB
      .save()
      .then((result) => {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result));
      })
      .catch((err) => console.error(`Something went wrong: ${err}`));
  } else if (
    req.url === "/api/deleteAll" &&
    (req.method === "DELETE" || req.method === "GET")
  ) {
    HelloWorld.deleteMany()
      .then((result) => {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result));
      })
      .catch((err) => console.error(`Something went wrong: ${err}`));
  } else if (req.url === "/ready" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end();
  } else if (req.url === "/live" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end();
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Not found" }));
  }
});

server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
