const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// sensor Schema
const SensorSchema = new Schema({
  serial_number: { type: String, index: true, unique: true },
  is_allocatable: {
    type: Boolean,
    default: true
  },
  sensor_is_user_property: {
    type: Boolean,
    default: false
  },
  is_functional: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Sensor', SensorSchema);
