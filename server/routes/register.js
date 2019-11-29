const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
//load models
const userModel = require("../schemas/Users");
let user = userModel;
//load validation
const validateRegisterInput = require("../validation/registerValidation");

router.post("/register", (req,res) => {

  //check validation
  const { errors, isValid } = validateRegisterInput(req.body);
  
  if(!isValid) {
    
    return res.status(400).json(errors)

  } else {
    user.findOne({email: req.body.email})
    .then(user => {
      if (user) {
        return res.status(400).json({'email':"email already exist!"});
      } else {
        const newUser = new userModel({
          profilePic: req.body.picture,
          userName: req.body.username,
          email: req.body.email,
          password: req.body.password,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          country: req.body.country
        })
  
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) {
              throw err
            } else {
              newUser.password = hash;
              newUser.save()
              .then(u => {
                res.status(200).send("You are registred now!")
              })
              .catch(e => {
                res.status(500).send("serverError")
              })
            }
          })
        }) 
      }
    })
  }

})

  module.exports = router;