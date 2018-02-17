const express = require('express');
const async = require('async');
const mongoose = require('mongoose');
let router = express.Router();
let _dbQuery = require('./index')._dbQuery;
let Allocation = require('../models/allocation');
let User = require('../models/user');
let Sensor = require('../models/sensor');
let _getSensor = require('../services/sensor');
let findOrCreateParticipant = require('../services/allocation').findOrCreateParticipant;


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

  async.eachSeries(participants, (item, cb) => {
    // check if participant exists
    findOrCreateParticipant(item).then((result) => {
      _getSensor.getSensor(queryObj).then((sensor) => {
        var allocation = new Allocation();
        allocation.user_id = item;
        allocation.sensor_id = sensor._id;
        Allocation.create(allocation, (err, createdAllocation) => {
          if (err) throw err;
          console.log(`Allocation created: ${createdAllocation}`);

          // Update sensor
          Sensor.find({ _id: sensor._id }, (err, updatedSensor) => {
            if (err) throw err;
            updatedSensor.is_allocatable = false;
            updatedSensor.save();
            return;
          })
        })
      })
    })
  })
})



module.exports = router;
