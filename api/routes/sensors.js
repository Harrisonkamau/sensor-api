const express = require('express');
let router = express.Router();
let Sensor = require('../models/sensor');
let _dbQuery = require('./index')._dbQuery;

// GET: /api/sensors
router.get('/', (req, res) => {
  _dbQuery(Sensor).then((result) => {
    res.json(result);
  });
})

// POST: /api/sensor
router.post('/', (req, res) => {
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
      res.json({
        message: `Sensor with serial number: ${sensor.serial_number} exists`
      });
      return;
    }

    // create sensor
    Sensor.create(sensor, (err, result) => {
      if(err) throw err;
      res.json({
        sensor: sensor
      });
    })
  });
})

module.exports = router;
