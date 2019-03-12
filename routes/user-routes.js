const express = require("express");
const router = express.Router();
const Itinerary = require("../models/itinerary.model");
const User = require("../models/user.model");
const bodyParser = require("body-parser");
const verifyToken = require("./check-auth");

//-------------- add fav itineraries to user account if not exists--------------------

router.post("/favourites", (req, res) => {
  User.findOne({ email: req.body.email })

    .then(result => {
      let favourites = result.favItinerary;
      return favourites;
    })
    .then(favourites => {
      Itinerary.find({ _id: { $in: favourites } }).then(allfav => {
        res.status(200).json(allfav);
        return allfav;
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err,
      });
    });
});

//------------------add fav itineraries -----------------------
//use email to look for user, then push added fav into the array

router.post("/addFav", (req, res) => {
  User.findOneAndUpdate(
    { email: req.body.email },
    { $push: { favItinerary: req.body.favourite } },
    { upsert: true }
  )
    .then(result => {
      let favourites = result.favItinerary;
      favourites.push(req.body.favourite);
      res.status(200).json(favourites);
      // console.log("add fav result: ", favourites);
      return favourites;
    })
    .then(favourites => {
      Itinerary.find({ _id: { $in: favourites } }).then(allfav => {
        res.status(200).json(allfav);
        return allfav;
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err,
      });
    });
});

// ----------- del favourite itineraries -------------------------
router.post("/delFav", (req, res) => {
  User.findOneAndUpdate(
    { email: req.body.email },
    { $pull: { favItinerary: req.body.favourite } },
    { upsert: true }
  )
    .then(result => {
      let updatedFav = result.favItinerary;
      let delFav = req.body.favourite;
      updatedFav = updatedFav.filter(result => result != delFav);
      // res.status(200).json(updatedFav);
      return updatedFav;
    })
    .then(favourites => {
      Itinerary.find({ _id: { $in: favourites } }).then(allfav => {
        res.status(200).json(allfav);
        return allfav;
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/profile", (req, res) => {
  User.findOne({ email: req.body.email })
  .then(result => {
    res.json(result);
    console.log(result);
  });
});

module.exports = router;

// router.post("/profiles", checkAuth, (req, res) => {
//   let userInfo = req.decoded;
//   let emailOfUser = req.body.emailOfUser;
//   Account.find({ email: emailOfUser })
//     .then(account => res.send(account))
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         error: err,
//       });
//     });
//   // res.send(userInfo);
// });
