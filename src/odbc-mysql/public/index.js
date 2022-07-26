const fs = require("fs");
const path = require("path");

module.exports.serveIndex = (req, res) => {
  fs.readFile(path.join(__dirname, "index.html"), function (err, data) {
    if (err) {
      res.writeHead(500);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
};
