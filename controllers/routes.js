const express = require('express');
let router = express.Router();
let User = require('../models/user');
let Sensor = require('../models/sensor');
let Allocation = require('../models/allocation');

// GET: /api/
router.get('/', (req, res) => {
  res.json({
    message: 'Hello world'
  });
});

// GET: /api/sensors
router.get('/sensors', (req, res) => {
  _dbQuery(Sensor).then((result) => {
    res.json(result);
  });
})

// GET: /api/users
// TODO

// GET: /api/allocations
router.get('/allocations', (req, res) => {
  _dbQuery(Allocation).then((result) => {
    res.json(result);
  })
})

// POST: /api/user
router.post('/user', (req, res) => {
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
      console.log('User exists!');
      res.json({
        message: `User with name: ${user.name} already exists!`
      })
    }
    User.create(user, (err, result) => {
      if (err) throw err;
      console.log('User saved in the db!');
      res.json({
        user: user
      });
    })
  })


})

// POST: /api/sensor
router.post('/sensor', (req, res) => {
  // sensor instance
  let sensor = new Sensor();
  sensor.serial_number = req.body.serial_number;
  var sensorsArray = [];

  // check if sensor exists
  _dbQuery(Sensor).then((result) => {
    result.forEach((item) => {
      sensorsArray.push(item.serial_number);
    });

    if(sensorsArray.includes(sensor.serial_number) === true){
      console.log('sensor already exists');
      res.json({
        message: `Sensor with serial number: ${sensor.serial_number} exists`
      });
    }

    // create sensor
    Sensor.create(sensor, (err, result) => {
      if(err) throw err;
      console.log('Sensor created successfully');
      res.json({
        sensor: sensor
      });
    })
  })

})

// POST: /api/allocations
router.post('/allocations', (req, res) => {
  // allocation instance
  var allocation = new Allocation();
  allocation.workout_id = req.body.workout_id;
  var participants = req.body.participants;
  var idsArray = [];

  _dbQuery(User).then((result) => {
    result.forEach((user) => {
      idsArray.push(String(user._id));
    })

    participants.forEach((user_id) => {
      if(idsArray.includes(user_id) == true){
        Sensor.findOne({"is_allocatable": true}, { "is_functional": true}, (err, data) => {
          if(err) throw err;
          allocation.user_id = user_id;
          allocation.sensor_id = data._id;
          Allocation.create(allocation, (err, result) => {
            console.log(result);
          })
          Sensor.findByIdAndUpdate(data._id, {"is_allocatable": false}, (err, data) => {
            res.json({
              message: data
            })
          })
        })
      }
      else {
        console.log('sorry');
      }
  
    })


  })
})

// Private methods

function _dbQuery(model) {
  return new Promise((resolve, reject) => {
    model.find({}, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    })
  });
}

module.exports = router;
