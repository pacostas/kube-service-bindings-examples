const serviceBindings = require("kube-service-bindings");
const mongoose = require("mongoose");
const { Fruit } = require("../../models/fruits.js");

let db;

let url;
let connectionOptions;
try {
  ({ url, connectionOptions } = serviceBindings.getBinding(
    "MONGODB",
    "mongoose"
  ));
} catch (err) {
  const dbName = process.env.MONGO_DB_NAME || "admin";
  url = `mongodb://127.0.0.1:27017/${dbName}`;
  connectionOptions = { auth: { password: "password", username: "root" } };
}

async function run() {
  await mongoose.connect(url, connectionOptions);
}

async function didInitHappen() {
  try {
    const products = await Fruit.find({});
    if (products.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function didDbConnHappen() {
  try {
    return !!mongoose.connection.readyState;
  } catch (e) {
    return false;
  }
}

async function init() {
  const dbConnHappened = await didDbConnHappen();
  if (!dbConnHappened) {
    await run();
  }
  const initHappened = await didInitHappen();
  if (!initHappened) {
    Fruit.insertMany([
      {
        name: "Apple",
        stock: 10
      },
      {
        name: "Orange",
        stock: 10
      },
      {
        name: "Pear",
        stock: 10
      }
    ]);
  }
}

module.exports = {
  init
};
