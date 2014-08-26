var server = require("../../server");
var test = require("supertest");

describe("/user/", function () {
  describe("#post", function () {
    var response = null, error = null;
    var seed = {
      name: "creationName",
      password: "superPassword",
      email: "someUser@gmail.com"
    };
    it('[setup user1]', function (done) {
      test(server)
        .post("/user/")
        .send(seed)
        .expect(200)
        .end(function (err, res) {
          response = res.body;
          error = err;
          done();
        });
    });
    it('should not return an error', function () {expect(error).toBeNull(); });
    it('should return an object', function () {expect(typeof(response)).toBe("object"); });
    it('should have the same name', function () {expect(response.name).toBe(seed.name); });
    it('should not send back a password', function () {expect(response.password).toBeUndefined(); });
    it('should have the same email', function () {expect(response.email).toBe(seed.email); });
  });
});
