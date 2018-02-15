const express = require('express');
let router = express.Router();
let _dbQuery = require('./index')._dbQuery;
let Allocation = require('../models/allocation');
let User = require('../models/user');
let Sensor = require('../models/sensor');
let _getSensor = require('../services/sensor');
let _createUser = require('../services/user');


// GET: /api/allocations
router.get('/', (req, res) => {
  _dbQuery(Allocation).then((result) => {
    res.json(result);
  })
})

// POST: /api/allocations
router.post('/', (req, res) => {
  var participants = req.body.participants;
  var idsArray = [];
  var queryObj = { "is_allocatable": true, "is_functional": true };

  _dbQuery(User).then((result) => {
    result.forEach((user) => {
      idsArray.push(user.user_id);
    })
  });

  participants.forEach((participant) => {
    if (idsArray.includes(participant)) {
      _getSensor.getSensor(queryObj).then((sensors) => {

      })
    } else {
      _getSensor.getSensor(queryObj).then((sensor) => {
        var user = new User();
        var user_id = Number(participant);
        user.user_id = user_id;
        _createUser.createUser(user)
          .then((created_user) => {
            var allocation = new Allocation();
            allocation.workout_id = req.body.workout_id;
            allocation.user_id = user_id;
            allocation.sensor_id = sensor._id;

            Allocation.create(allocation, (err, allocation) => {
              if (err) throw err;
            });
            Sensor.find({ _id: sensor._id }, (err, result) => {
              if (err) throw err;
              return result;
            });
          })
      })
    }
  })
})

// POST: /api/allocations/:user_id/reallocate
router.post('/:user_id/reallocate/', (req, res) => {
  // TODO
})

module.exports = router;
