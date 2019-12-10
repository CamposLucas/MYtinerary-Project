const express = require("express");
const router = express.Router();
const userModel = require("../schemas/Users");
const jwt = require('jsonwebtoken');
const key = require('../auth/secret.key');
const bcrypt = require('bcryptjs');
const validateLoginInput = require("../validation/loginValidation");
require("../auth/passport");


router.post('/login', (req, res) => {

  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
  
    return res.status(400).json(errors);
  
  } else {
    var userName = req.body.username;
    var password = req.body.password;
    userModel.findOne({userName: userName})
      .then(user => {
        if(!user){
          res.status(400).json({"username":"username not exist"})
        }

        bcrypt.compare(password, user.password)
          .then(isMatch => {
            if(isMatch) {
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
              res.status(400).json({"password": 'incorrect password'})
            }
          })
      })
      .catch(err => {
        return res.send("El error es: " + err)
      })
  }

})

module.exports = router;