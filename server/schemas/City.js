const mongoose = require('mongoose');

let schema = mongoose.Schema;

let citiesSchema = new schema({
  name: String,
  country: String
},
{
  collection: 'cities'
}
  );

module.exports = new mongoose.model('cities', citiesSchema);