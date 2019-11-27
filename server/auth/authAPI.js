const express = require('express');
const router = express.Router();
const passport = require('passport');
require('./passportGoogle');

router.get('/auth/google',
    passport.authenticate('google', {scope: ['email','profile'] })
)

router.get('/auth/google/redirect',

    passport.authenticate('google', {failureRedirect: 'http://localhost:5000/', session: false}),
        function(req, res){
            res.redirect('http://localhost:5000/cities');
        }
)

module.exports = router;