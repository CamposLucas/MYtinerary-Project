const mongoose = require('mongoose');
let schema = mongoose.Schema;

let itinerarySchema = new schema({
  title: String,
  cityID: String,
  profilePic: String,
  rating: String,
  duration: String,
  price: String,
  hashtag: Array
}, 
{
  collection: 'itinerary'
});

module.exports = new mongoose.model('itinerary', itinerarySchema);