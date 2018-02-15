const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Allocation Schema
const AllocationSchema = new Schema({
  user_id: { type: Schema.Types.Number, ref: 'User' },
  sensor_id: { type: Schema.Types.ObjectId, ref: 'Sensor' },
  workout_id: Number
})

// set timestamps
AllocationSchema.set('timestamps', true);

module.exports = mongoose.model('Allocation', AllocationSchema);
