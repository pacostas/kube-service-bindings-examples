const serviceBindings = require("kube-service-bindings");
const { Pool } = require("pg");

let connectionOptions;
try {
  connectionOptions = serviceBindings.getBinding("POSTGRESQL", "pg");
} catch (error) {
  console.log(error);
  const serviceHost = process.env.DB_HOST || "127.0.0.1";
  const user = process.env.DB_USERNAME || "postgres";
  const password = process.env.DB_PASSWORD || "mysecretpassword";
  const databaseName = process.env.DB_NAME || "postgres";
  const port = process.env.DB_PORT || "5432";
  const connectionString = `postgresql://${user}:${password}@${serviceHost}:${port}/${databaseName}`;
  connectionOptions = { connectionString };
}

const pool = new Pool(connectionOptions);

async function didInitHappen() {
  try {
    await pool.query("select * from products");
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
  return pool.query(text, parameters);
}

async function init() {
  const initHappened = await didInitHappen();
  if (!initHappened) {
    return pool.query(initQuery);
  }
}

module.exports = {
  query,
  init
};
