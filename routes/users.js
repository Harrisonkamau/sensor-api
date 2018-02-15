const express = require('express');
let router = express.Router();
let User = require('../models/user');
let _dbQuery = require('./index')._dbQuery;


// GET: /api/users
// TODO
// POST: /api/user
router.post('/', (req, res) => {
  // user instance
  let user = new User();
  user.name = req.body.name;
  var usersArray = [];

  // check if user exists
  _dbQuery(User).then((result) => {
    result.forEach((data) => {
      usersArray.push(data.name);
    });

    if (usersArray.includes(user.name) === true) {
      res.json({
        message: `User with name: ${user.name} already exists!`
      })
      return;
    }
    User.create(user, (err, result) => {
      if (err) throw err;
      res.json({
        user: user
      });
    })
  })
})


module.exports = router;
