const { Fruit } = require("../../models/fruits.js");

async function find(id) {
  return Fruit.findById(id);
}

async function findAll() {
  return Fruit.find({});
}

async function create(name, stock) {
  const fruit = { name, stock };

  // const db = await getDB();
  return Fruit.insertOne(fruit);
}

async function update({ name, stock, id }) {
  return Fruit.findByIdAndUpdate(id, { name, stock });
}

async function remove(id) {
  return await Fruit.findOneAndDelete(id);
}

module.exports = {
  find,
  findAll,
  create,
  update,
  remove
};
