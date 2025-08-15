// import http from "http";
const http = require("http");
const fs = require("fs");
const PORT = 3000;
const IPADDRESS = "localhost";

function renderHTML(url, res) {
  fs.readFile(url, "utf-8", (err, data) => {
    if (err) {
      res.writeHead(500, { "content-type": "text/plain" });
      res.write("Internal Server Error");
      res.end();
      return;
    }
    res.writeHead(200, { "content-type": "text/html" });
    res.write(data);
    res.end();
  });
}

// Create server
http
  .createServer((req, res) => {
    const url = req.url;
    if (url === "/") {
      renderHTML("./index.html", res);
    } else if (url === "/contact") {
      renderHTML("./contact.html", res);
    } else if (url === "/about") {
      renderHTML("./about.html", res);
    } else {
      fs.readFile("./404.html", "utf-8", (err, data) => {
        if (err) {
          res.writeHead(500, { "content-type": "text/plain" });
          res.write("Internal Server Error");
          res.end();
          return;
        }
        res.writeHead(404, { "content-type": "text/html" });
        res.write(data);
        res.end();
      });
    }
    // console.log(url);
    console.log("Server diakses");
  })
  .listen(PORT, () => {
    console.log(`Server is listening on http://${IPADDRESS}:${PORT}`);
  });
