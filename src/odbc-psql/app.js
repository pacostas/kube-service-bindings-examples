const http = require("http");
const odbc = require("odbc");

const PORT = process.env.PORT || 3003;

const serviceBindings = require("kube-service-bindings");
let connectionConfig;
try {
  connectionConfig = serviceBindings.getBinding("POSTGRESQL", "odbc");
} catch (err) {
  const host = process.env.PSQL_HOST || "localhost";
  const port = process.env.PSQL_PORT || 5432;
  const database = process.env.PSQL_DATABASE_NAME || "db1";
  const user = process.env.PSQL_USERNAME || "postgresql";
  const password = process.env.PSQL_PASSWORD || "p1";

  const pqopt = [
    "{",
    "sslrootcert=/bindings/odbc-example-worker-dc-hippo-pc/ca.crt",
    "sslcert=/bindings/odbc-example-worker-dc-hippo-pc/tls.crt",
    "sslkey=/bindings/odbc-example-worker-dc-hippo-pc/tls.key",
    "{",
  ].join(" ");

  const connectionString = [
    `Pqopt=${pqopt}`,
    "DRIVER=PostgreSQL",
    `Servername=${host}`,
    `DATABASE=${database}`,
    `Port=${port}`,
    `Username=${user}`,
    `Password=${password}`,
    "SSLmode=verify-ca",
  ].join(";");

  connectionConfig = {
    connectionString,
  };
  console.log(err);
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

console.log("connectionConfig:", connectionConfig);

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
