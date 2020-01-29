'use strict';

const fs = require("fs");
const path = require("path");
const express = require("express");

let rawdata = fs.readFileSync('serverconfig.json');
let config = JSON.parse(rawdata);

let DIST_DIR = path.join(__dirname, config.distDir);
let app = express();

//Serving the files on the dist folder
app.use(express.static(DIST_DIR));

//Send index.html when the user access the web
app.get("/", (_req, res) => {
  res.sendFile(path.join(DIST_DIR, config.entryFile));
});

app.get('/react/umd/react.production.min.js', (_req, res) => {
  res.sendFile(__dirname + '/node_modules/react/umd/react.production.min.js');
});

app.get('/react-dom/umd/react-dom.production.min.js', (_req, res) => {
  res.sendFile(__dirname + '/node_modules/react-dom/umd/react-dom.production.min.js');
});

let server = app.listen(config.port, () => {
    console.log('Listening on port %s', server.address().port);
});