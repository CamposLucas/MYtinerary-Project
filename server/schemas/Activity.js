const mongoose = require('mongoose');
let schema = mongoose.Schema;

let ActivitySchema = new schema({
  itId: String,
  title: String,
  img: String
}, 
{
  collection: 'activities'
});

module.exports = new mongoose.model('activities', ActivitySchema);