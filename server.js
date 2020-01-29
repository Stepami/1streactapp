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
app.get("*", function (_req, res) {
  res.sendFile(path.join(DIST_DIR, config.entryFile));
});

let server = app.listen(config.port, function() {
    console.log('Listening on port %s', server.address().port);
});
//TODO: https://stackoverflow.com/questions/27464168/how-to-include-scripts-located-inside-the-node-modules-folder