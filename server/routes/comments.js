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

router.put("/itinerary/comments/postcomment/:itId", cors(), async (req, res) => {
  itinerary.findByIdAndUpdate(req.params.itId, {$push: {'comments': {author: req.body.author, comment: req.body.comment}}}, function(err){
        if(err){
            return res.send(err);
        }
    })
    const data = await itinerary.findById(req.params.itId)
    const respuesta = data.comments 
     res.json(respuesta);
  })

router.put("/itinerary/comments/deletecomment/:itId", cors(), (req, res) => {
  itinerary.findByIdAndUpdate(req.params.itId, {$pull: {'comments': {author: req.body.author, comment: req.body.comment}}}, function(err){
    if(err){
        return res.send(err);
    }
  })
  // const data = await itinerary.findById(req.params.itId)
  // const respuesta = data.comments 
  res.json("comentario eliminado");
})

router.put("/itinerary/comments/updatecomment/:itId", cors(), (req, res) => {
  const i = req.body.i;
  itinerary.findByIdAndUpdate(req.params.itId, {['comments.'+i]: {author: req.body.author, comment: req.body.comment}}, function(err){
    if(err){
        return res.send(err);
    }
  })
})


module.exports = router;