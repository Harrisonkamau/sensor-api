const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Allocation Schema
const AllocationSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  sensor_id: { type: Schema.Types.ObjectId, ref: 'Sensor' },
  workout_id: Number
})

// set timestamps
AllocationSchema.set('timestamps', true);

module.exports = mongoose.model('Allocation', AllocationSchema);
