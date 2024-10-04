const http = require("http");
const fs = require("fs")

const server = http.createServer((req, res) => {
  console.log(req.url, req.res);

  if (req.method == "GET" && req.url == "/home") {
    res.end("<h1>Home Page</h1>");
  }
  else if (req.method == "GET" && req.url == "/about") {
    res.end("<h1>About Page</h1>");
  }
  else if (req.method == "GET" && req.url == "/getproductdata") {
    fs.readFile("./db.json", "utf-8", (err, data) => {
      if (err) {
        console.log(err);
      }
      else {
        const jsondata = JSON.parse(data);
        res.end(JSON.stringify(jsondata.products));
      }
    })
  }

  else if (req.method == "GET" && req.url == "/user") {
    fs.readFile("./db.json", "utf-8", (err, data) => {
      if (err) {
        console.log(err);
      }
      else {
        const jsondata = JSON.parse(data);
        res.end(JSON.stringify(jsondata.user));
      }
    })
  }

  else {
    res.end("<h1>404 Not Found</h1>");
  }
});

server.listen(8080, () => {
  console.log("Server Is running");
});
