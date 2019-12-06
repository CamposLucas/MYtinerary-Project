const express = require("express");
const router = express.Router();
const cors = require('cors');
let itineraryModel = require('../schemas/Itinerary');
let itinerary = itineraryModel;


router.get("/itinerary/comments/:itId", cors(), (req, res) => {
  itinerary
    .findById(req.params.itId)
    .then(data => {
      res.json(data.comments)
    })
    .catch(err => {
      console.log(err)
    });
})

router.put("/itinerary/comments/postcomment/:itId", cors(), (req, res) => {
  itinerary
    .findByIdAndUpdate(req.params.itId, {$push: {'comments': {author: req.body.author, comment: req.body.comment}}}, function(err){
        if(err){
            return res.send(err);
        }
        console.log({message:"comment submited"});
    })
  })


module.exports = router;