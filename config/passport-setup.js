const passport = require("passport");
const GooglePlusTokenStrategy = require("passport-google-plus-token");
const FacebookTokenStrategy = require("passport-facebook-token");
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
      clientID: process.env.googleCLIENT_ID,
      clientSecret: process.env.googleCLIENT_SECRET,
    },
    async (accessToken, refreshToken, profile, done) => {
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

passport.use(
  "facebookToken",
  new FacebookTokenStrategy(
    {
      //----options for facebook strategy---
      clientID: process.env.facebookCLIENT_ID,
      clientSecret: process.env.facebookCLIENT_SECRET,
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ email: profile.emails[0].value }).then(existingUser => {
        if (existingUser) {
          console.log("current user is", existingUser);
          let user = existingUser;
          done(null, user);
        } else {
          new User({
            username: profile.displayName,
            facebookId: profile.id,
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
