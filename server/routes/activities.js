const express = require("express");
const router = express.Router();
const cors = require('cors');
let activityModel = require('..//schemas/Activity');
let activity = activityModel;


router.get("/activities/:itId", cors(), (req, res) => {
  activity
  .find({"itId": req.params.itId})
  .then(data => {
    res.status(200).json(data)
  })
  .catch(err => {
    res.status(400).send(err)
  })
})

module.exports = router;