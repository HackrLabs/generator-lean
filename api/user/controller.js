var User = require("./model");
var Q = require("q");
module.exports = {
  getAll: function() {
    return new Q.Promise(function(resolve, reject) {
      User.find(function(err, ids) {
        if (err) { return reject(err); }
        if (ids.length === 0) { return resolve([]); }
        var users = [];
        ids.forEach(function (id) {
          var user = new User();
          users.load(id, function (err, props) {
            if (err) { return reject(err); }
            users.push({id:id, props:props});
            if (users.length === ids.length) {
              resolve(users);
            }
          });
        });
      });
    });
  },
  newUser: function(req) {
    return new Q.Promise(function(resolve, reject) {
      var data = {
        name: req.param('name'),
        password: req.param('password'),
        email: req.param('email')
      };

      var user = Nohm.factory('User'); // can this just be new User()?
      user.store(data, function(err) {
        if (err) { reject(err); }
        resolve(user.allProperties());
      });
    });
  },
  // If each method creates a promise then returns it, why not create a promise in the framework,
  // and give the resolve/reject methods to the callback.

  /*getById: function(id) { return db.query("Select * from members where id == " + id); },
  setById: function(id, creationData) {
    db.query("Insert " + creationData + " into members where id == " + id); }
  */
};
