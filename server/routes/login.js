const express = require("express");
const router = express.Router();
const userModel = require("../schemas/Users");
const jwt = require('jsonwebtoken');
const key = require('../auth/secret.key');
require("../auth/passport");


router.post('/login', (req, res) => {
  console.log(req.body);
  var userName = req.body.username;
  userModel.findOne({userName: userName})
    .then(user => {
      if(!user){
        res.send("username not exist")
      }
      if(user.password === req.body.password) {
        const payload = {
          id: user._id,
          userName: user
        }

        const options = {expiresIn: '2592000'};
        jwt.sign(
          payload,
          key.secretOrKey,
          options,
          (err, token) => {
            if (err) {
              console.log(err)
              res.json({
                succes: false,
                token: 'There was an error'
              })
            } else {
              res.json({
                succes: true,
                token: token
              })
            }
          }
        )
      } else {
        res.send({message: 'incorrect password'})
      }
    })
    .catch(err => {
      return res.send("El error es: " + err)
    })
})

module.exports = router;