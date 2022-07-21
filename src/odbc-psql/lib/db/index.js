const odbc = require("odbc");

const serviceBindings = require("kube-service-bindings");
let connectionConfig;
try {
  connectionConfig = serviceBindings.getBinding("POSTGRESQL", "odbc", {
    allowCopy: true
  });
} catch (err) {
  // handle error
}

let odbcConnection;

async function didInitHappen() {
  try {
    await odbcConnection.query("select * from products");
    return true;
  } catch (err) {
    return false;
  }
}

const initQuery = [
  `CREATE TABLE IF NOT EXISTS products (
  id        SERIAL PRIMARY KEY,
  name      VARCHAR(40) NOT NULL,
  stock     BIGINT
)`,
  "DELETE FROM products",
  "INSERT INTO products (name, stock) values ('Apple', 10)",
  "INSERT INTO products (name, stock) values ('Orange', 10)",
  "INSERT INTO products (name, stock) values ('Pear', 10)"
].join(";");

async function query(text, parameters) {
  const initHappened = await didInitHappen();
  if (!initHappened) {
    await init();
  }
  return odbcConnection.query(text, parameters);
}

async function init() {
  const initHappened = await didInitHappen();
  if (!initHappened) {
    odbcConnection = await odbc.pool(connectionConfig.connectionString);
    odbcConnection.query(initQuery);
  }
}
module.exports = {
  query,
  init
};
