const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// user Schema
const UserSchema = new Schema({
  user_id: {
    type: Number,
    default: Math.floor(Math.random()*90000) + 100000
  },
  name: String
});

module.exports = mongoose.model('User', UserSchema);
