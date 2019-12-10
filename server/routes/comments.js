const express = require("express");
const router = express.Router();
const cors = require('cors');
let itineraryModel = require('../schemas/Itinerary');
let itinerary = itineraryModel;


router.get("/itinerary/comments/:itId", cors(), (req, res) => {
  itinerary
    .findById(req.params.itId)
    .then(data => {
      res.status(200).json(data.comments)
    })
    .catch(err => {
      res.status(400).send(err)
    });
})

router.put("/itinerary/comments/postcomment/:itId", cors(), async (req, res) => {
    await itinerary.findByIdAndUpdate(req.params.itId, {$push: {'comments': {author: req.body.author, comment: req.body.comment}}}, {new:true})
      .then(response => {
        res.status(200).json(response.comments)
      })
      .catch(err => {
        res.status(400).send(err)
      })
    
  })

router.put("/itinerary/comments/deletecomment/:itId", cors(), async (req, res) => {
  await itinerary.findByIdAndUpdate(req.params.itId, {$pull: {'comments': {author: req.body.author, comment: req.body.comment}}}, {new:true})
    then(response => {
      res.status(200).json(response.comments)
    })
    .catch(err => {
      res.status(400).send(err);
    })
})

router.put("/itinerary/comments/updatecomment/:itId", cors(), async (req, res) => {
  const i = req.body.i;
  await itinerary.findByIdAndUpdate(req.params.itId, {['comments.'+i]: {author: req.body.author, comment: req.body.comment}}, {new:true})
    .then(response => {
      res.status(200).json(response.comments)
    })
    .catch(err => {
      res.status(400).send(err);
    })
})


module.exports = router;