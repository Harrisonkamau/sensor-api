let User = require('../models/user');


module.exports.findOrCreateParticipant = function (participantId) {
  return new Promise((resolve, reject) => {
    participantId = String(participantId);
    User.findById(participantId, function (err, user) {
      if (err) {
        reject(err);
      } else {
        if (user) {
          resolve(user);
        }
        User.count({ _id: participantId }, function (err, count) {
          if (count > 0) {
            return console.error("That id already exists!");
          }
          User.create({ _id: participantId }, function (err, createdUser) {
            if (err) throw err;
            console.log("User has been created!");
            resolve(createdUser);
          })
        })
      }
    })
  });
}
