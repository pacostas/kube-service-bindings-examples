const odbc = require("odbc");

const serviceBindings = require("kube-service-bindings");
let connectionConfig;
try {
  connectionConfig = serviceBindings.getBinding("MYSQL", "odbc");
} catch (err) {
  // handle error
}

let odbcConnection;

const createProductsTable = [
  `CREATE TABLE IF NOT EXISTS products (
    id        SERIAL PRIMARY KEY,
    name      VARCHAR(40) NOT NULL,
    stock     BIGINT
  )`
].join("");

const deleteAllProducts = "DELETE FROM products";

const initQuery = [
  "INSERT INTO products (name, stock) VALUES",
  "('Apple', 10),",
  "('Orange', 10),",
  "('Pear', 10)"
].join("");

async function didInitHappen() {
  try {
    await odbcConnection.query("select * from products");
    return true;
  } catch (err) {
    return false;
  }
}
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
    await odbcConnection.query(createProductsTable);
    await odbcConnection.query(deleteAllProducts);
    await odbcConnection.query(initQuery);
  }
}
module.exports = {
  query,
  init
};
