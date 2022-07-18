const http = require("http");
const fs = require("fs");
const path = require("path");

const db = require("./lib/db/index.js");
const fruits = require("./lib/queries/fruits.js");

const PORT = process.env.PORT || 3003;

const server = http.createServer((req, res) => {
  if (req.url === "/" && req.method === "GET") {
    fs.readFile(
      path.join(__dirname, "public/index.html"),
      function (err, data) {
        if (err) {
          res.writeHead(500);
          res.end(JSON.stringify(err));
          return;
        }
        res.writeHead(200);
        res.end(data);
      }
    );
  } else if (req.url.match(/\/api\/fruits\/\w+/) && req.method === "GET") {
    const id = req.url
      .toLowerCase()
      .split("/")
      .filter((_) => _ !== "/")
      .pop();

    fruits
      .find(id)
      .then((result) => {
        if (result.rowCount === 0) {
          res.writeHead(404);
          return res.end(`Item ${id} not found`);
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(result.rows[0]);
      })
      .catch((err) => {
        console.log(err);
        res.writeHead(400).end();
      });
  } else if (req.url.match(/\/api\/fruits\/?/) && req.method === "GET") {
    fruits
      .findAll()
      .then((results) => {
        res.end(JSON.stringify(results.rows));
      })
      .catch((error) => {
        console.log(error);
        res.writeHead(400).end();
      });
  } else if (req.url.match(/\/api\/fruits\/?/) && req.method === "POST") {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", () => {
      const { name, stock } = JSON.parse(data);

      fruits
        .create(name, stock)
        .then((result) => {
          res.statusCode = 201;
          res.end(JSON.stringify({ data: result.rows[0] }));
        })
        .catch((error) => {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: error }));
        });
    });
  } else if (req.url.match(/\/api\/fruits\/\w+/) && req.method === "PUT") {
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
  } else if (req.url.match(/\/api\/fruits\/\w+/) && req.method === "DELETE") {
    const id = req.url
      .toLowerCase()
      .split("/")
      .filter((_) => _ !== "/")
      .pop();

    fruits
      .remove(id)
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
  } else if (req.url === "/ready" && req.method === "GET") {
    res.writeHead(200).end();
  } else if (req.url === "/live" && req.method === "GET") {
    res.writeHead(200).end();
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Not found" }));
  }
});

db.init()
  .then(() => {
    console.log("***->Database initializedd<-***");
  })
  .catch((error) => {
    console.log(error);
  });

server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
