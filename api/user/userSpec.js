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

  describe('#get', function() {
    var tester = test(server);
    var user1, user2;

    it('[setup user1]', function(done) {
      tester.post('/user/')
        .send({
          name:'user1',
          password:'password1',
          email:'email1@gmail.com'})
        .end(function(err, res) {
          expect(err).toBeNull();
          user1 = res.body;
          done();
      });
    });

    it('[setup user2]', function(done) {
      tester.post('/user/')
        .send({
          name:'user2',
          password:'password1',
          email:'email2@gmail.com'})
        .end(function(err, res) {
          expect(err).toBeNull();
          user2 = res.body;
          done();
      });
    });

    it('should return all users', function() {
      tester.get('/user/').end(function(err, res) {
        expect(res.body).toContain(user1);
        expect(res.body).toContain(user2);
      });
    });
  });
});
