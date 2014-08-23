var Nohm = require("../../libs/db");
var User = require("./model");
module.exports = {
  getAll: function(req, res) {
    User.find(function(err, ids) {
      if (err || ids.length === 0) {
        res.json({});
        return;
      }

      var users = [];
      ids.forEach(function (id) {
        var user = new User();
        users.load(id, function (err, props) {
          if (err) {
            res.json({});
            return;
          }
          users.push({id:id, props:props});
          if (users.length === ids.length) {
            resolve(users);
          }
        });
      });
    });
  },
  newUser: function(req, res) {
    var data = {
      name: req.param('name'),
      password: req.param('password'),
      email: req.param('email')
    };

    var user = Nohm.factory('User'); // can this just be new User()?
    user.store(data, function(err) {
      if (err) {
        res.json({err:err});
      } else {
        res.json(user.allProperties());
      }
    });
  },
  setById: function(req, res) {
    console.log("SetById:");
    console.log(req.body);
    console.log(req.params);

    res.json({});
  }
  // If each method creates a promise then returns it, why not create a promise in the framework,
  // and give the resolve/reject methods to the callback.

  /*getById: function(id) { return db.query("Select * from members where id == " + id); },
  setById: function(id, creationData) {
    db.query("Insert " + creationData + " into members where id == " + id); }
  */
};
