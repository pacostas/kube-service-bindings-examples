module.exports.ready = (req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end();
};

module.exports.live = (req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end();
};

module.exports.notFound404 = (req, res) => {
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Not found" }));
};
