const express = require('express');
let router = express.Router();
let User = require('../models/user');
let getUser = require('../services/user').getUserById;
let _dbQuery = require('./index')._dbQuery;


// GET: /api/users
router.get('/', (req, res) => {
  _dbQuery(User).then((users) => {
    res.json(users);
  })
})

// GET: /api/users/:id
router.get('/:id', (req, res) => {
  var user_id = req.params.id.toString();
  var result = getUser(user_id);
  res.json(result);
})

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
