console.log("db")

var Nohm = require('nohm').Nohm;
var redis = require('redis');
var client = redis.createClient();
Nohm.setClient(client);
//client.select(3);
//Nohm.setPrefix('rest-test');
module.exports = Nohm
