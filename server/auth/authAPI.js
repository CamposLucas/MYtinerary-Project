const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');

const passport = require('passport');
const jwt = require('jsonwebtoken')
const key = require('../auth/secret.key');

const userModel = require('../schemas/Users');
const user = userModel;

require('./passportGoogle');

router.get('/auth/google',
    passport.authenticate('google', {scope: ['email','profile'] })
)

router.get('/auth/google/redirect',

    passport.authenticate('google', {failureRedirect: 'http://localhost:5000/', session: false}),
        function(req, res){
            user.findOne({email: req.user._json.email})
                .then(user => {
                    if(user) {
                        //Se busca usuario en BD y si existe se loguea 
                        bcrypt.compare(req.user.id, user.password)
                            .then(isMatch => {
                                if(isMatch) {
                                    const payload= {
                                        id: user._id,
                                        userName: user
                                    }
                                    const options = {expiresIn: '2592000'};
                                    console.log(payload)
                                    jwt.sign(
                                        payload,
                                        key.secretOrKey,
                                        options,
                                        (err, token) => {
                                            if(err) {
                                                console.log("Primer error " + err)
                                            } else {
                                                console.log(token)
                                                res.redirect('http://localhost:3000/googleSign/'+token);
                                            }
                                        }
                                    )
                                }
                            })
                            .catch(err => {
                                console.log("segundo error " + err)
                            })


                    } else {
                        const newUser = new userModel({
                            profilePic: req.user._json.picture,
                            userName: req.user._json.email,
                            email: req.user._json.email,
                            password: req.user.id,
                            firstName: req.user._json.given_name,
                            lastName: req.user._json.family_name,
                            country: ""
                        })

                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(newUser.password, salt, (err, hash) => {
                                if(err) {
                                throw err
                                } else {
                                newUser.password = hash;
                                newUser.save()
                                .then(u => {
                                    const payload= {
                                        id: newUser._id,
                                        userName: newUser
                                    }
                                    const options = {expiresIn: '2592000'};
                                    console.log(payload)
                                    jwt.sign(
                                        payload,
                                        key.secretOrKey,
                                        options,
                                        (err, token) => {
                                            if(err) {
                                                console.log("Primer error " + err)
                                            } else {
                                                console.log(token)
                                                res.redirect('http://localhost:3000/googleSign/'+token);
                                            }
                                        }
                                    )
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
)

module.exports = router;