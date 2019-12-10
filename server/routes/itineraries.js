const express = require("express");
const router = express.Router();
const cors = require('cors');
let itineraryModel = require('../schemas/Itinerary');
let itinerary = itineraryModel;


router.get("/itinerary/:cityId", cors(), (req, res) => {
  itinerary
  .find({"cityID": req.params.cityId})
  .then(data => {
    res.status(200).json(data)
  })
  .catch(err => {
    res.status(400).send(err);
  });
})


module.exports = router;