const express = require("express");
const router = express.Router();
const cors = require('cors');
let userModel = require('../schemas/Users');
let user = userModel;


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

router.put('/likes/postlike/:UserId/:itineraryId',function(req,res){
//     user.findByIdAndUpdate(req.params.UserId,{$push: {liked: "usdasfasfnsdgsdgid"}},function(err){
//         if(err){
//            return res.send(err);
//         }
//       console.log({message:"movie updated"});
//    });
    user.findById(req.params.UserId)
        .then(data => {
            var i = data.liked.indexOf(req.params.itineraryId)
            if(i === -1) {
                console.log("No existe")
                user.update({$push: {liked: req.params.itineraryId}})
            } else {
                console.log("Ya existe")
            }
        })
});


module.exports = router;