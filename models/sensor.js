const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// sensor Schema
const SensorSchema = new Schema({
  sensor_id: mongoose.Schema.Types.ObjectId,
  serial_number: String,
  is_allocatable: {
    type: Boolean,
    default: true
  },
  sensor_is_user_property: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Sensor', SensorSchema);
