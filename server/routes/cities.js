const express = require("express");
const router = express.Router();
const cors = require('cors');
let citiesModel = require('../schemas/City');
let cities = citiesModel;

router.get("/cities", cors(), (req, res) => {
  cities
  .find()
  .then(datos => {
    res.status(200).json(datos)
  })
  .catch(err => {
    res.status(400).send(err)
  });
})

module.exports = router;