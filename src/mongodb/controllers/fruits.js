const { ObjectId } = require("mongodb");

const collectionName = "fruits";

module.exports.getOne = (req, res, db) => {
  const id = req.url
    .toLowerCase()
    .split("/")
    .filter((_) => _ !== "/")
    .pop();

  db.collection(collectionName)
    .find({ _id: ObjectId(id) })
    .toArray()
    .then((result) => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result));
    })
    .catch((err) => console.error(`Something went wrong: ${err}`));
};

module.exports.getAll = (req, res, db) => {
  db.collection(collectionName)
    .find({})
    .toArray()
    .then((result) => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result));
    })
    .catch((err) => console.error(`Something went wrong: ${err}`));
};

module.exports.createOne = (req, res, db) => {
  let data = "";
  req.on("data", (chunk) => {
    data += chunk;
  });

  req.on("end", () => {
    const fruit = JSON.parse(data);

    db.collection(collectionName)
      .insertOne(fruit)
      .then((result) => {
        res.statusCode = 201;
        res.end(JSON.stringify({ data: result }));
      })
      .catch((error) => {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: error }));
      });
  });
};

module.exports.updateOne = (req, res, db) => {
  const id = req.url
    .toLowerCase()
    .split("/")
    .filter((_) => _ !== "/")
    .pop();

  let data = "";
  req.on("data", (chunk) => {
    data += chunk;
  });

  req.on("end", () => {
    const fruit = JSON.parse(data);

    const filter = {
      _id: ObjectId(id)
    };

    const updateDoc = {
      $set: fruit
    };

    db.collection(collectionName).updateOne(
      filter,
      updateDoc,
      function (error, result) {
        if (!error) {
          if (result.matchedCount === 1) {
            res.statusCode = 204;
            res.end();
          } else {
            res.statusCode = 404;
            res.end(`Unknown item ${id}`);
          }
          res.end();
        } else {
          res.statusCode = 400;
          res.end(error);
        }
      }
    );
  });
};

module.exports.deleteOne = (req, res, db) => {
  const id = req.url
    .toLowerCase()
    .split("/")
    .filter((_) => _ !== "/")
    .pop();

  if (!ObjectId.isValid(id)) {
    res.statusCode = 400;
    return res.end("wrong id format");
  }

  const doc = { _id: ObjectId(id) };
  db.collection(collectionName).deleteOne(doc, function (error, result) {
    if (!error) {
      if (result.deletedCount === 1) {
        res.statusCode = 204;
        res.end();
      } else {
        res.statusCode = 404;
        res.end(`Unknown item ${id}`);
      }
      res.end();
    } else {
      res.statusCode = 400;
      res.end(error);
    }
  });
};
