const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
require("dotenv").config();

//require for file upload
const multer = require("multer");

//---------configuration for multer ----------------------
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  //reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
});

//----------------get user -------------------------------
router.post("/register", upload.single("profileImage"), (req, res, next) => {
  console.log("profile image req body is ", req.body);
  console.log("profile image req file path is ", req.file.path);

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
              profileImage: req.file.path,
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

//-----------normal login for exisiting users ---------------
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

// ----------- google login -------------------------------
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

//------------- facebook login  ----------------
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
