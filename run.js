var config = require("./libs/config");
var server = require("./server").listen(config.app.port, function () {
  var addr = server.address();
  console.log("Server started on: http://" + addr.address + ":" + addr.port);
});

