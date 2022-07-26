const mysql = require("mysql2");

const serviceBindings = require("kube-service-bindings");

let connectionOptions;
try {
  connectionOptions = serviceBindings.getBinding("MYSQL", "mysql2");
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

const promisePool = pool.promise();

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
    await promisePool.query("select * from products");
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

  const [rows] = await promisePool.query(text, parameters);
  return rows;
}

async function init() {
  const initHappened = await didInitHappen();
  if (!initHappened) {
    await promisePool.query(createProductsTable);
    await promisePool.query(deleteAllProducts);
    await promisePool.query(initQuery);
  }
}

module.exports = {
  query,
  init
};
