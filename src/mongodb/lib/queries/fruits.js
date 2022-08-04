const { ObjectId } = require("mongodb");

const { getDB } = require("../db/index.js");
const collectionName = "products";

async function find(id) {
  const db = await getDB();

  return db
    .collection(collectionName)
    .find({ _id: ObjectId(id) })
    .toArray();
}

async function findAll() {
  const db = await getDB();
  return db.collection(collectionName).find({}).toArray();
}

async function create(name, stock) {
  const fruit = { name, stock };
  
  const db = await getDB();
  return db.collection(collectionName).insertOne(fruit);
}

async function update({ name, stock, id }) {
  const fruit = { name, stock };

  const filter = {
    _id: ObjectId(id)
  };

  const updateDoc = {
    $set: fruit
  };

  const db = await getDB();

  return db.collection(collectionName).updateOne(filter, updateDoc);
}

async function remove(id) {
  if (!ObjectId.isValid(id)) {
    Promise.reject(new Error("wrong id format"));
  }

  const doc = { _id: ObjectId(id) };

  const db = await getDB();

  return db.collection(collectionName).deleteOne(doc);
}

module.exports = {
  find,
  findAll,
  create,
  update,
  remove
};
