const mongoose = require('mongoose');
let schema = mongoose.Schema;

let itinerarySchema = new schema({
  title: String,
  cityID: String,
  profilePic: String,
  rating: Number,
  duration: String,
  price: String,
  hashtag: Array,
  comments: Array
}, 
{
  collection: 'itinerary'
});

module.exports = new mongoose.model('itinerary', itinerarySchema);