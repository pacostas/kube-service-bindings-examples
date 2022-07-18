const http = require("http");
const mysql = require("mysql");
const serviceBindings = require("kube-service-bindings");

const PORT = process.env.PORT || 8080;

let mysqlOpts;
const dbName = "mydb";
const dbTable = "item";
try {
  mysqlOpts = serviceBindings.getBinding("MYSQL", "mysql");
} catch (err) {
  mysqlOpts = {
    host: process.env.MYSQL_HOST || "localhost",
    port: process.env.MYSQL_PORT || 3306,
    database: process.env.MYSQL_DATABASE_NAME || "mysql",
    user: process.env.MYSQL_USERNAME || "root",
    password: process.env.MYSQL_PASSWORD || "password"
  };
  console.log(err);
}
console.log("----options----->", mysqlOpts, "<-----------");

const connection = mysql.createConnection(mysqlOpts);

const server = http.createServer((req, res) => {
  if (req.url === "/api/information_schema" && req.method === "GET") {
    connection.query(
      "SELECT * FROM information_schema.tables;",
      function (err, results) {
        if (err) {
          console.log(err);
          res.writeHead(500);
          res.send("an error occured");
        }
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(results);
      }
    );
  } else if (
    req.url === "/api/db/create" &&
    (req.method === "POST" || req.method === "GET")
  ) {
    connection.query(
      `CREATE DATABASE IF NOT EXISTS ${dbName}`,
      function (err, result) {
        if (err) {
          console.log(err);
          res.writeHead(500);
          res.send("an error occured");
        }
        res.writeHead(200);
        res.send(result);
      }
    );
  } else if (
    req.url === "/api/db/drop" &&
    (req.method === "POST" || req.method === "GET")
  ) {
    connection.query(
      `DROP DATABASE IF EXISTS ${dbName}`,
      function (err, result) {
        if (err) {
          console.log(err);
          res.writeHead(500);
          res.send("an error occured");
        }
        res.writeHead(200);
        res.send(result);
      }
    );
  } else if (
    req.url === "/api/db/table/create" &&
    (req.method === "POST" || req.method === "GET")
  ) {
    connection.query(
      `CREATE TABLE IF NOT EXISTS ${dbTable} (itemtype VARCHAR(255))`,
      function (err, result) {
        if (err) {
          console.log(err);
          res.writeHead(500);
          res.send("an error occured");
        }
        res.writeHead(200);
        res.send(result);
      }
    );
  } else if (
    req.url === "/api/db/table/drop" &&
    (req.method === "DELETE" || req.method === "GET")
  ) {
    connection.query(`DROP TABLE IF EXISTS ${dbTable}`, function (err, result) {
      if (err) {
        console.log(err);
        res.writeHead(500);
        res.send("an error occured");
      }
      res.writeHead(200);
      res.send(result);
    });
  } else if (
    req.url === "/api/db/item/add" &&
    (req.method === "POST" || req.method === "GET")
  ) {
    connection.query(
      `INSERT INTO ${dbTable} VALUES ('vehicle')`,
      function (err, result) {
        if (err) {
          console.log(err);
          res.writeHead(500);
          res.send("an error occured");
        }
        res.writeHead(200);
        res.send(result);
      }
    );
  } else if (req.url === "/api/db/item/getAll" && req.method === "GET") {
    connection.query(`SELECT * FROM ${dbTable}`, function (err, result) {
      if (err) {
        console.log(err);
        res.writeHead(500);
        res.send("an error occured");
      }
      res.writeHead(200);
      res.send(result);
    });
  } else if (
    req.url === "/api/db/item/dropAll" &&
    (req.method === "DELETE" || req.method === "GET")
  ) {
    connection.query(`DELETE FROM ${dbTable}`, function (err, result) {
      if (err) {
        console.log(err);
        res.writeHead(500);
        res.send("an error occured");
      }
      res.writeHead(200);
      res.send(result);
    });
  } else if (req.url === "/ready" && req.method === "GET") {
    res.end();
    res.writeHead(200);
    res.end();
  } else if (req.url === "/live" && req.method === "GET") {
    res.writeHead(200);
    res.end();
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Not found" }));
  }
});

server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
