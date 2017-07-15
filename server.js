const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");
const https = require("https");
const http = require("http");
const proxy = require("http-proxy-middleware");
const favicon = require("serve-favicon");
let plexPy = "http://localhost:8181";
let sickRage = "http://localhost:8081";
let deluge = "http://localhost:8112";

var options = {
  key: fs.readFileSync('./certs/server.key'),
  cert: fs.readFileSync('./certs/server.crt')
};

let index = require("./routes/index");

let port = 3000;

let app = express();

//View Engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

//set static folder
app.use(favicon(path.join(__dirname, "views", "favicon.ico")));
app.use(express.static(path.join(__dirname, "views")));

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use("/", index);

http.createServer(app).listen(port, function() {
  console.log("server started on port " + port);
});
