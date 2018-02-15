let User = require('../models/user');

module.exports.createUser = function (user_obj) {
  return new Promise((resolve, reject) => {
    User.create(user_obj, (err, user) => {
      if (err) reject(err);
      resolve(user);
    })
  })
}

module.exports.getUserById = function(user_id) {
  return User.find({ _id: user });
}
