const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");

require("dotenv").config();

//-------------create user account, check for existing email, hashpassword and post to mlab----------------
// router.post("/register", (req, res, next) => {
//   console.log(req.body);
//   User.find({ email: req.body.email })
//     .exec()
//     .then(user => {
//       if (user.length >= 1) {
//         return res.status(409).json({
//           message: "Email exists",
//         });
//       } else {
//         bcrypt.hash(req.body.password, 10, (err, hash) => {
//           if (err) {
//             return res.status(500).json({
//               error: err,
//             });
//           } else {
//             User.create({
//               // userImage: req.file.path,
//               username: req.body.username,
//               firstname: req.body.firstname,
//               lastname: req.body.lastname,
//               email: req.body.email,
//               password: hash,
//               selectedCountry: req.body.selectedCountry,
//             })
//               .then(result => {
//                 res.status(201).json({
//                   message: "User created",
//                 });
//               })
//               .catch(err => {
//                 console.log(err);
//                 res.status(500).json({
//                   error: err,
//                 });
//               });
//             JWT.sign({}, "");
//           }
//         });
//       }
//     });
// });

//----------------get user -------------------------------
router.post("/register", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Email exists",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = User({
              username: req.body.username,
              password: hash,
              email: req.body.email,
              firstname: req.body.firstname,
              lastname: req.body.lastname,
            });
            User.create(user)
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "User created",
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    });
});

//---------------------  delete user by _id ----------------------
router.delete("/deleteUser/:userId", (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted",
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

//-----------login for exisiting users ---------------
router.post("/login", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          //mesage should not reveal reason for login failure
          message: "Auth failed",
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          console.log("err is", err);
          return res.status(401).json({
            message: "Auth failed",
          });
        }
        if (result) {
          //create the token if password matches
          const token = jwt.sign(
            {
              //payload
              email: user[0].email,
              username: user[0].username,
            },
            //secret key
            process.env.JWT_KEY,
            {
              //time allow for token to exist
              expiresIn: "1 hr",
            }
          );

          return res.status(200).json({
            email: user[0].email,
            username: user[0].username,
            name: user[0].firstname + " " + user[0].lastname,
            favItinerary: user[0].favItinerary,
            token: token,
            message: "Auth successful",
            _id: user[0]._id,
          });
        }
        return res.status(401).json({
          message: "Auth failed",
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// ----------- google login with auth -------------------------------
router.route("/google").post(
  passport.authenticate("google-plus-token", {
    session: false,
  }),
  (req, res) => {
    // console.log("request is", req);
    const user = req.user;
    const token = jwt.sign(
      {
        email: user.email,
        username: user.username,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ user: user, token: token });
  }
);

//------------- get user favourite itineraries ----------------
router
  .route("/facebook")
  .post(
    passport.authenticate("facebookToken", { session: false }),
    (req, res) => {
      const user = req.user;
      const token = jwt.sign(
        {
          email: user.email,
          username: user.username,
        },
        process.env.JWT_KEY,
        {
          expiresIn: "1h",
        }
      );
      // console.log("user email:", user.email);
      // console.log("username:", user.username);
      // console.log("lastname:", user.lastname);
      // console.log(token);
      res.status(200).json({ user: user, token: token });
    }
  );

module.exports = router;
