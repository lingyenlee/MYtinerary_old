const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create itinerary schema
const ItinerarySchema = new Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  userimage: String,
  title: String,
  username: String,
  rating: Number,
  duration: Number,
  cost: String,
  hashtags: [String],
  city: String
});

module.exports = mongoose.model("Itinerary", ItinerarySchema);
