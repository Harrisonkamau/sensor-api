const express = require('express');
let router = express.Router();
let _dbQuery = require('./index')._dbQuery;
let Allocation = require('../models/allocation');
let User = require('../models/user');
let Sensor = require('../models/sensor');


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

  _dbQuery(User).then((result) => {
    result.forEach((user) => {
      idsArray.push(user.user_id);
    })

    _getSensor()
      .then((data) => {
        var len = participants.length;
        for (var i = 0; i < len; i++) {
          if (idsArray.includes(participants[i]) == true) {
            var allocation = new Allocation();
            allocation.workout_id = req.body.workout_id;
            allocation.user_id = user_id;
            allocation.sensor_id = data._id;

            Allocation.create(allocation, (err, allocation) => {
              if (err) throw err;
            })

            Sensor.findByIdAndUpdate(data._id, { "is_allocatable": false }, (err, sensor) => {
              if (err) throw err;
            })
          } else {
            // create user with that id
            user = new User();
            user_id = Number(participants[i]);
            user.user_id = user_id;

            User.create(user, (err, result) => {
              if (err) throw err;

              var allocation = new Allocation();
              allocation.workout_id = req.body.workout_id;
              allocation.user_id = user_id;
              allocation.sensor_id = data._id;

              Allocation.create(allocation, (err, allocation) => {
                if (err) throw err;
              })

              Sensor.findByIdAndUpdate(data._id, { "is_allocatable": false }, (err, sensor) => {
                if (err) throw err;
                console.log(sensor);
              })
            })
          }
        }

        res.json({
          message: 'Allocation successful'
        });
      })
      .catch((err) => {
        return err;
      })
  });
})

// POST: /api/allocations/:user_id/reallocate
router.post('/:user_id/reallocate/', (req, res) => {
  // TODO
})


// Private

function _getSensor() {
  return new Promise((resolve, reject) => {
    Sensor.findOne({ "is_allocatable": true }, { "is_functional": true }, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  })
}

module.exports = router;
