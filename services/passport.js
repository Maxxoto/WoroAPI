const passport = require("passport");
const oauth = require("passport-google-oauth20");
const keys = require("../config/keys");
const mongoose = require("mongoose");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new oauth(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleID: profile.id });
      if (existingUser) {
        //    Already have users in the database
        console.log(existingUser);
        console.log("REQ USER : ", req.user);

        done(null, existingUser);
      } else {
        const user = await new User({
          googleID: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
        }).save();
        done(null, user);
      }
    }
  )
);
