const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// user Schema
const UserSchema = new Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  name: String
});

module.exports = mongoose.model('User', UserSchema);
