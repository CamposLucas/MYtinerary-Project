const express = require("express");
const router = express.Router();
const cors = require('cors');
let userModel = require('../schemas/Users');
let user = userModel;
let itineraryModel = require('../schemas/Itinerary');
let itinerary = itineraryModel;


router.get("/likes/:userId", cors(), (req, res) => {
  user
  .findById(req.params.userId)
  .then(data => {
    res.json(data.liked)
  })
  .catch(err => {
    console.log(err)
  });
})

router.put('/likes/postlike/:UserId/:itineraryId',cors(), function(req,res){
    user.findById(req.params.UserId)
        .then(data => {
            var i = data.liked.indexOf(req.params.itineraryId)
            if(i === -1) {
              user.findByIdAndUpdate(req.params.UserId,{$push: {liked: req.params.itineraryId}},function(err){
                  if(err){
                      return res.send(err);
                  }
                res.send({message:"list updated"});
              });
            } else {
              user.findByIdAndUpdate(req.params.UserId, {$pull: {liked: {$in: req.params.itineraryId}}}, function(err){
                if(err){
                  return res.send(err);
                }
                res.send({message:"item eliminado"})
              });
            }
        })      
        .catch(e => {
          res.send(e);
        })
});


module.exports = router;