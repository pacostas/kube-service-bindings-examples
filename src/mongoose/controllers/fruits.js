const { ObjectId } = require("mongodb");

const collectionName = "fruits";

module.exports.getOne = (req, res, model) => {
  const id = req.url
    .toLowerCase()
    .split("/")
    .filter((_) => _ !== "/")
    .pop();

  model
    .find({ _id: ObjectId(id) })
    .then((result) => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result));
    })
    .catch((error) => {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: error }));
    });
};

module.exports.getAll = (req, res, model) => {
  model
    .find({})
    .then((result) => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result));
    })
    .catch((error) => {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: error }));
    });
};

module.exports.createOne = (req, res, model) => {
  let data = "";
  req.on("data", (chunk) => {
    data += chunk;
  });

  req.on("end", () => {
    const fruit = JSON.parse(data);

    const itemToDB = new model(fruit);

    itemToDB
      .save()
      .then((result) => {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result));
      })
      .catch((error) => {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: error }));
      });
  });
};

module.exports.updateOne = (req, res, model) => {
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

    model
      .find({ _id: ObjectId(id) })
      .then((result) => {
        const updatedFruit = Object.assign(fruit, result);
        const itemToDB = new model(updatedFruit);

        itemToDB
          .save()
          .then((result) => {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(result));
          })
          .catch((error) => {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: error }));
          });
      })
      .catch((error) => {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: error }));
      });
  });
};

module.exports.deleteOne = (req, res, model) => {
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
  model.deleteOne(doc, function (error, result) {
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
