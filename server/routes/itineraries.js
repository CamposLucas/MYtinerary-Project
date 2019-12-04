const express = require("express");
const router = express.Router();
const cors = require('cors');
let itineraryModel = require('../schemas/Itinerary');
let itinerary = itineraryModel;


router.get("/itinerary/:cityId", cors(), (req, res) => {
  itinerary
  .find({"cityID": req.params.cityId})
  .then(data => {
    res.json(data)
  })
  .catch(err => {
    console.log(err)
  });
})


module.exports = router;