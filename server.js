var config = require('./libs/config');
var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var server = express();

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(function (req, res, next) {
  console.log("Body", req.body); // populated!
  next();
});

function register(path, type, callback) {
  console.log("Register", type, path, callback.name);
  server[type](path, callback);
}

function loadModule(module) {
  console.log("[" + module + "]");
  var routes = './' + config.app.namespace + '/' + module + '/routes.js';

  var routes = require(routes);
  for (var path in routes) {
    var full = "/" + module + path;
    for(var type in routes[path]) {
      register(full, type, routes[path][type])
    }
  }
}

var modules = fs.readdirSync(config.app.namespace);
var id;
for(id = 0; id < modules.length ; id++)
{
  loadModule(modules[id]);
}
module.exports = server;
