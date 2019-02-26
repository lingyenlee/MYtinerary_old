const express = require("express");
const router = express.Router();
const Itinerary = require("../models/itinerary.model");
const User = require("../models/user.model");
const bodyParser = require("body-parser");

//-------------- add fav itineraries to user account if not exists--------------------

// router.get("/:user/addFav", (req, res) => {
//   const email = req.params.user;
//   User.find({ email }).then(result => res.json(result));
// });

router.put("/addFav", (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then(result => {
      if (result[0].favItinerary.includes(req.body.favourite)) {
        res.send("itinerary exists");
      } else
        User.updateOne(
          {
            email: req.body.email,
          },
          { $push: { favItinerary: req.body.favourite } }
        ).then(result => {
          res.status(200).json({
            result,
          });
        });
    });
});

//------------- get user favourite itineraries ----------------

router.post("/favourites", (req, res) => {
  // res.setHeader("Content-Type”, “image/png");

  // console.log("backend get fav route: ", req.body.fav);
  Itinerary.find({ _id: { $in: req.body.fav } }).then(result => {
    // console.log(result);
    // console.log(myHeaders.has("Content-Type")); // true

    res.json(result);
  });
});
// ----------- del favourite itineraries -------------------------
router.put("/delFav", (req, res) => {
  console.log("backend del fav route: ", req.body.favourite);
  User.find({ email: req.body.email }).exec();
  User.updateOne(
    {
      email: req.body.email,
    },
    { $pull: { favItinerary: req.body.favourite } }
  ).then(result => {
    res.status(200).json({
      result,
    });
  });
});

module.exports = router;
