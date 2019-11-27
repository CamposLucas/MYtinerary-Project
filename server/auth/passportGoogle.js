const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const userModel = require('../schemas/Users');

passport.use(new googleStrategy({
        clientID:'966957783644-24ba9eibms8ibml96aj5vbqkljsfqptj.apps.googleusercontent.com',
        clientSecret:'oDAGRaBgn6Z--rgAmKQuml0h',
        callbackURL: 'http://localhost:5000/auth/google/redirect',
    },
    function(accessToken, refresToken, profile, cb){
        console.log(profile)
        cb(null, profile)
    }
))
