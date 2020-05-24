const passport = require('passport')
const oauth = require('passport-google-oauth20')
const keys = require('../config/keys')

passport.use(
    new oauth(
        {
            clientID : keys.googleClientID,
            clientSecret : keys.googleClientSecret,
            callbackURL : '/auth/google/callback',
            // passReqToCallback : true
        },
        (accessToken,refreshToken,profile,done) => {
            console.log('Access Token :',accessToken)
            console.log('Refresh Token :',refreshToken)
            console.log('Profile :',profile)
        }
    ))