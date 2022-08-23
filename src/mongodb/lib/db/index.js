const serviceBindings = require("kube-service-bindings");
const { MongoClient } = require("mongodb");

let connectionOptions;

let url;

try {
  ({ url, connectionOptions } = serviceBindings.getBinding(
    "MONGODB",
    "mongodb"
  ));
} catch (err) {
  url = "mongodb://root:password@127.0.0.1:27017";
  connectionOptions = { auth: { password: "password", username: "root" } };
}

const dbName = process.env.MONGO_DB_NAME || "admin";

const collectionName = "products";
let db;

const mongoClient = new MongoClient(url, connectionOptions);

async function didInitHappen() {
  try {
    const products = await db.collection(collectionName).find({}).toArray();
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

async function run() {
  await mongoClient.connect();
  db = mongoClient.db(dbName);
}

async function didDbConnHappen() {
  try {
    await db.runCommand({
      connectionStatus: 1,
      showPrivileges: true
    });
    return true;
  } catch (e) {
    return false;
  }
}

async function getDB() {
  const dbConnHappened = await didDbConnHappen();
  if (!dbConnHappened) {
    await run();
  }
  return db;
}

async function init() {
  const dbConnHappened = await didDbConnHappen();
  if (!dbConnHappened) {
    await run();
  }
  const initHappened = await didInitHappen();
  if (!initHappened) {
    const productsCollection = db.collection(collectionName);
    productsCollection.insertMany([
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
  init,
  getDB
};
