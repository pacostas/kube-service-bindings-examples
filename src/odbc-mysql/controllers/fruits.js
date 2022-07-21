const fruits = require("../lib/queries/fruits.js");

module.exports.getOne = (req, res) => {
  const id = req.url
    .toLowerCase()
    .split("/")
    .filter((_) => _ !== "/")
    .pop();

  fruits
    .find(id)
    .then((result) => {
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(result);
    })
    .catch((err) => {
      console.log(err);
      res.writeHead(400).end();
    });
};

module.exports.getAll = (req, res) => {
  fruits
    .findAll()
    .then((result) => {
      res.end(
        JSON.stringify(result, (key, value) =>
          typeof value === "bigint" ? value.toString() : value
        )
      );
    })
    .catch((error) => {
      console.log(error);
      res.writeHead(400).end();
    });
};

module.exports.createOne = (req, res) => {
  let data = "";
  req.on("data", (chunk) => {
    data += chunk;
  });

  req.on("end", () => {
    const { name, stock } = JSON.parse(data);

    fruits
      .create(name, stock)
      .then((result) => {
        res.statusCode = 204;
        res.end();
      })
      .catch((error) => {
        console.log(error);
        res.statusCode = 400;
        res.end(JSON.stringify({ error }));
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
      res.statusCode = 204;
      res.end();
    })
    .catch((error) => {
      console.log(error);
      res.statusCode = 400;
      res.end(error);
    });
};
