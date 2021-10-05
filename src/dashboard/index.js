require("dotenv").config();
const express = require("express");
var path = require("path");
var serveStatic = require("serve-static");

const app = express();
app.use(serveStatic(path.join(__dirname, "dist")));
app.use(express.json());
app.use(express.urlencoded({extended: true})); 

app.use(express.static("src/dashboard/public"));
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

const router = require('./router');
app.use('/', router);

module.exports = app;
