const http = require("http");
const odbc = require("odbc");
const serviceBindings = require("kube-service-bindings");

const PORT = process.env.PORT || 8080;

let connectionConfig;

try {
  connectionConfig = serviceBindings.getBinding("MYSQL", "odbc");
} catch (err) {
  console.log(err);

  const host = process.env.MYSQL_HOST || "localhost";
  const port = process.env.MYSQL_PORT || 3306;
  const database = process.env.MYSQL_DATABASE_NAME || "mysql2";
  const user = process.env.MYSQL_USERNAME || "root";
  const password = process.env.MYSQL_PASSWORD || "my-secret-pw";

  connectionConfig = {
    connectionString: [
      "DRIVER=MySQL",
      `SERVER=${host}`,
      `DATABASE=${database}`,
      `PORT=${port}`,
      `USER=${user}`,
      `PASSWORD=${password}`,
    ].join(";"),
  };
}

const server = http.createServer((req, res) => {
  if (req.url === "/api/hello" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ hello: "Im a json object" }));
  } else if (req.url === "/ready" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ hello: "Im a json object" }));
  } else if (req.url === "/live" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end();
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Not found" }));
  }
});

console.log("connnectionConfig:", connectionConfig);

odbc.connect(connectionConfig, (error, connection) => {
  if (error) {
    console.log("Connection error:", error);
    return;
  }
  connection.query(
    "SELECT * FROM information_schema.tables;",
    (error, result) => {
      if (error) {
        console.error("Query error:", error);
      }
      console.log("Query result:", result);
    }
  );
});

server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
