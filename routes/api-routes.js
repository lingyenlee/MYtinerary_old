require("dotenv").config();
const express = require("express");
const router = express.Router();
const City = require("../models/city.model");
const Itinerary = require("../models/itinerary.model");
const Activity = require("../models/activity.model");
const Comment = require("../models/comment.model");
const User = require("../models/user.model");
const bodyParser = require("body-parser");
const verifyToken = require("./check-auth");

//require for file upload
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});
const upload = multer({ storage: storage });

//---------cities page---------------

// get cities from mlab
router.get("/cities", (req, res, next) => {
  City.find().then(cities => res.status(200).json(cities));
});

//get each city by city name
router.get("/cities/:city", (req, res) => {
  City.find({ city: req.params.city }).then(result =>
    res.status(200).json(result)
  );
});

//post city onto mlab
router.post("/addCity", function(req, res) {
  const city = new City(req.body);
  console.log(req.body);
  city
    .save(req.body)
    .then(item => {
      res.send("item added successfully");
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

// GET ALL ITINERARIES
// router.get("/itineraries", (req, res) => {
//   Itinerary.find().then(result => res.send(result));
// });

// -----------------get itineraries by city------------------
router.get("/itineraries/:city", (req, res) => {
  const city = req.params.city;
  //const city = "Barcelona"
  Itinerary.find({ city }).then(result => res.send(result));
});

//----------------post itinerary ------------------------
router.post("/itineraries", upload.single("userimage"), (req, res) => {
  const itinerary = new Itinerary({
    userimage: req.file.path,
    title: req.body.title,
    username: req.body.username,
    rating: req.body.rating,
    duration: req.body.duration,
    cost: req.body.cost,
    hashtags: req.body.hashtags,
    city: req.body.city,
  });
  itinerary.save().then(result => {
    console.log(result);
    res.send("post added successfully");
  });
});

//-------------activities page ----------------------

//get activities of specific itinerary by id
router.get("/activities/:id", (req, res) => {
  const itinerary_id = req.params.id;
  Activity.find({ itinerary_id }).then(result => res.json(result));
});

//post activities
router.post("/addActivity", upload.single("activityImage"), (req, res) => {
  // console.log(req.file.path)
  const activity = new Activity({
    activityImage: req.file.path,
    activityCaption: req.body.activityCaption,
    title: req.body.title,
    city: req.body.city,
    itinerary_id: req.body.itinerary_id,
  });
  activity.save().then(result => {
    console.log(result);
    res.send("post added successfully");
  });
});

//-----------comment page --------------------
// post comment with verify token as middleware (imported from check-auth.js)
router.post("/postComment", verifyToken, (req, res) => {
  const comment = new Comment({
    title: req.body.title,
    city: req.body.city,
    itinerary_id: req.body.itinerary_id,
    comment: req.body.comment,
    profileName: req.body.profileName,
  });
  comment.save().then(result => {
    // console.log(result);
    res.status(200).json(result);
  });
});

//get comment specific to itinerary id
router.get("/postComment/:id", (req, res) => {
  const itinerary_id = req.params.id;
  Comment.find({ itinerary_id: itinerary_id }).then(result => res.json(result));
});

module.exports = router;

//store an img in binary
// var imgPath = "./client/src/images/GaudiLover.png";
// var itinerary = new Itinerary();
// itinerary.userImage.data = fs.readFileSync(imgPath);
// itinerary.userImage.contentType = "image/png";
// itinerary.save(function(err, itinerary) {
//   if (err) throw err;
//   console.log("save img to mongo");

// router.get("/entry", function(req, res, next) {
//   Itinerary.findById(itinerary, function(err, doc) {
//     if (err) return next(err);
//     res.contentType(doc.userImage.contentType);
//     res.send(doc.userImage.data);
//   });
// });
// })
//create a middleware called myLogger
// var myLogger = function(req, res, next) {
//   req.myLogger = "Logged";
//   next();
// };

//use myLogger
// router.use(myLogger);

//create a middleware called requestTime
// var requestTime = function(req, res, next) {
//   req.requestTime = Date();
//   next();
// };

//use requestTime
// router.use(requestTime);

//use middleware
// router.use(function(req, res, next) {
//   // log each request to the console
//   console.log(req.method, req.url);
//   // continue doing what we were doing and go to the route
//   next();
// });

//test next call with middleware
// router.get("/hello", (req, res) => {
//   var responseText = "Hello World!<br>";
//   responseText +=
//     "<small>Requested at : " +
//     req.requestTime +
//     "</small>" +
//     " " +
//     req.myLogger;
//   res.send(responseText);
// });

// City.create(req.body, function(err, city) {
//   if (err) {
//     console.log(err);
//     res.send("error adding city");
//   } else {
//    res.send(city);
//     console.log("City added successfully");
//   }
// });

//   city.save(function(err) {
//     if (err) {
//       return next(err);
//     }

//   });
// });

// router.post("/contact", (req, res) => {
//   res.send("This is the contact page with a POST request");
// });
//populate cities with itneraries
// router.get("/cities", (req, res, next) => {
//       City.find()
//         .populate("itineraries")
//         .exec(function(error, entries) {
//           res.send(cities);
//         })
// });
