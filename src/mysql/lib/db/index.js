const { promisify } = require("node:util");

const mysql = require("mysql");

const serviceBindings = require("kube-service-bindings");

let connectionOptions;
try {
  connectionOptions = serviceBindings.getBinding("MYSQL", "mysql");
} catch (error) {
  connectionOptions = {
    host: process.env.MYSQL_HOST || "127.0.0.1",
    port: process.env.MYSQL_PORT || 3306,
    database: process.env.MYSQL_DATABASE_NAME || "mysql",
    user: process.env.MYSQL_USERNAME || "root",
    password: process.env.MYSQL_PASSWORD || "my-secret-pw"
  };
}

const pool = mysql.createPool(connectionOptions);
const promiseQuery = promisify(pool.query).bind(pool);

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
    await promiseQuery("select * from products");
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function query(text, parameters) {
  const initHappened = await didInitHappen();
  if (!initHappened) {
    await init();
  }
  return promiseQuery(text, parameters);
}

async function init() {
  const initHappened = await didInitHappen();
  if (!initHappened) {
    await promiseQuery(createProductsTable);
    await promiseQuery(deleteAllProducts);
    await promiseQuery(initQuery);
  }
}

module.exports = {
  query,
  init
};
