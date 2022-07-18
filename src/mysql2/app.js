const http = require("http");
const mysql = require("mysql2");
const serviceBindings = require("kube-service-bindings");

const PORT = process.env.PORT || 8080;

let mysqlOpts;

try {
  mysqlOpts = serviceBindings.getBinding("MYSQL", "mysql2");
} catch (err) {
  mysqlOpts = {
    host: process.env.MYSQL_HOST || "localhost",
    port: process.env.MYSQL_PORT || 3306,
    database: process.env.MYSQL_DATABASE_NAME || "mysql",
    user: process.env.MYSQL_USERNAME || "root",
    password: process.env.MYSQL_PASSWORD || "password",
  };
  console.log(err);
}
console.log("----options----->", mysqlOpts, "<-----------");

const pool = mysql.createPool(mysqlOpts);

const server = http.createServer((req, res) => {
  if (req.url === "/api/db" && req.method === "GET") {
    const sql = "SELECT * FROM information_schema.tables;";
    pool.execute(sql, function (err, result) {
      console.log(err);
      console.log(result);
    });

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ hello: "Im a json object" }));
  } else if (req.url === "/ready" && req.method === "GET") {
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
