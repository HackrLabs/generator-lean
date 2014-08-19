var server = require("./server");
var test = require("supertest");
setTimeout(function() {
test(server)
  .post("/user/")
  .send({name:"nam1", password:"password", email:"emai1@gmail.com"})
  .expect(200)
  .end(function(err, end) {
    if(err) throw err;
    console.log(end.body);
  });
}, 1000);
