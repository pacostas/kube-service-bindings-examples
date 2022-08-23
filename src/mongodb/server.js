const http = require("http");

const {
  getOne,
  getAll,
  createOne,
  updateOne,
  deleteOne
} = require("./controllers/fruits.js");

const { ready, live, notFound404 } = require("./handlers/index.js");

const { serveIndex } = require("./public/index.js");

const PORT = process.env.PORT || 8080;

const db = require("./lib/db/index.js");

const server = http.createServer((req, res) => {
  console.log(` Method: ${req.method}\tPath: ${req.url}`);
  if (req.url === "/" && req.method === "GET") {
    serveIndex(req, res);
  } else if (req.url.match(/\/api\/fruits\/\w+/) && req.method === "GET") {
    getOne(req, res);
  } else if (req.url.match(/\/api\/fruits\/?/) && req.method === "GET") {
    getAll(req, res);
  } else if (req.url.match(/\/api\/fruits\/?/) && req.method === "POST") {
    createOne(req, res);
  } else if (req.url.match(/\/api\/fruits\/\w+/) && req.method === "PUT") {
    updateOne(req, res);
  } else if (req.url.match(/\/api\/fruits\/\w+/) && req.method === "DELETE") {
    deleteOne(req, res);
  } else if (req.url === "/ready" && req.method === "GET") {
    ready(req, res);
  } else if (req.url === "/live" && req.method === "GET") {
    live(req, res);
  } else {
    notFound404(req, res);
  }
});

db.init()
  .then(() => {
    console.log("Connected successfully to database");
  })
  .catch((error) => {
    console.log(error);
  });

server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
