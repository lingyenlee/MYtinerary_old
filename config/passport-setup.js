const passport = require("passport");
const GooglePlusTokenStrategy = require("passport-google-plus-token");
require("dotenv").config();
const User = require("../models/user.model");

//------------Net ninja method using passport-----------------------

//--------saving the user id in the session as req.session.passport.user = {id: 'xyz'}----------
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// ---------retreiving the user id and attached as req.user---------------
// passport.deserializeUser((id, done) => {
//   User.findById(id).then(user => {
//     done(null, user);
//   });
// });

//----------------------use google strategy-----------------------------

passport.use(
  "google-plus-token",
  new GooglePlusTokenStrategy(
    {
      //----options for google strategy----
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      // passReqToCallback: true
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("profile", profile);
      console.log("this is the accessToken", accessToken);
      User.findOne({ email: profile.emails[0].value }).then(existingUser => {
        if (existingUser) {
          console.log("current user is", existingUser);
          let user = existingUser;
          done(null, user);
        } else {
          new User({
            username: profile.displayName,
            googleId: profile.id,
            lastname: profile.name.familyName,
            firstname: profile.name.givenName,
            email: profile.emails[0].value,
            profileImage: profile.photos[0].value,
          })
            .save()
            .then(newUser => {
              console.log("new user created", newUser);
              let user = newUser;
              done(null, user);
            });
        }
      });
    }
  )
);
