const express = require("express");
const router = express.Router();
const cors = require('cors');
let citiesModel = require('../schemas/City');
let cities = citiesModel;

router.get("/cities", cors(), (req, res) => {
  cities
  .find()
  .then(datos => {
    res.json(datos)
  })
  .catch(err => {
    console.log(err)
  });
})

module.exports = router;