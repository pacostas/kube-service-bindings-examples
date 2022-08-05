const { ObjectId } = require("mongodb");

const { Fruit } = require("../models/fruits.js");
const fruits = require("../lib/queries/fruits.js");

module.exports.getOne = (req, res) => {
  const id = req.url
    .toLowerCase()
    .split("/")
    .filter((_) => _ !== "/")
    .pop();

  fruits
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

module.exports.getAll = (req, res) => {
  fruits
    .findAll({})
    .then((result) => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result));
    })
    .catch((error) => {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: error }));
    });
};

module.exports.createOne = (req, res) => {
  let data = "";
  req.on("data", (chunk) => {
    data += chunk;
  });

  req.on("end", () => {
    const fruit = JSON.parse(data);

    const itemToDB = new Fruit(fruit);

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

module.exports.updateOne = (req, res) => {
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
    const body = JSON.parse(data);
    const { name, stock } = body;

    fruits
      .update({ name, stock, id })
      .then((result) => {
        if (result.rowCount === 0) {
          res.statusCode = 404;
          res.end(`Unknown item ${id}`);
        }
        res.statusCode = 204;
        res.end();
      })
      .catch((error) => {
        res.statusCode = 400;
        res.end(error);
      });
  });
};

module.exports.deleteOne = (req, res) => {
  const id = req.url
    .toLowerCase()
    .split("/")
    .filter((_) => _ !== "/")
    .pop();

  fruits
    .remove(id)
    .then((result) => {
      if (result.affectedRows === 0) {
        res.statusCode = 404;
        return res.end(`Unknown item ${id}`);
      }
      res.statusCode = 204;
      res.end();
    })
    .catch((error) => {
      console.log(error);
      res.statusCode = 400;
      return res.end(JSON.stringify(error));
    });
};
