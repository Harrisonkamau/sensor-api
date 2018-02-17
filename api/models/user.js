const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// user Schema
const UserSchema = new Schema({
  name: String
});

module.exports = mongoose.model('User', UserSchema);
