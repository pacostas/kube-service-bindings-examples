const db = require("../db/index.js");

function find(id) {
  return db.query("SELECT * FROM products WHERE id = ?", [id]);
}

function findAll() {
  return db.query("SELECT * FROM products");
}

function create(name, stock) {
  return db.query(
    "INSERT INTO products (name, stock) VALUES (?, ?) ",
    [name, stock]
  );
}

function update(options = {}) {
  return db.query("UPDATE products SET name = ?, stock = ? WHERE id = ?", [
    options.name,
    options.stock,
    options.id
  ]);
}

function remove(id) {
  return db.query("DELETE FROM products WHERE id = ?", [id]);
}

module.exports = {
  find,
  findAll,
  create,
  update,
  remove
};
