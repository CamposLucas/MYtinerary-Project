const express = require("express");
const router = express.Router();
const cors = require('cors');
let activityModel = require('..//schemas/Activity');
let activity = activityModel;


router.get("/activities/:itId", cors(), (req, res) => {
  activity
  .find({"itId": req.params.itId})
  .then(data => {
    res.json(data)
  })
  .catch(err => {
    console.log(err)
  })
})

module.exports = router;