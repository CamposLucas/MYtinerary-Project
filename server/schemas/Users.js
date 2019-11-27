const mongoose = require('mongoose');
let schema = mongoose.Schema;

let UserSchema = new schema({
  profilePic: String,
  userName: String,
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  country: String
}, 
{
  collection: 'users'
});

module.exports = new mongoose.model('users', UserSchema);