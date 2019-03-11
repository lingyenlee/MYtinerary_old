const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create account schema

const UserSchema = new Schema({
  email: {
    type: String,
  },
  password: { type: String },
  profileName: { type: String },
  firstname: { type: String },
  lastname: { type: String },
  selectedCountry: { type: String },
  favItinerary: Array,
  googleId: { type: String },
  profileImage: { type: String },
  selectedItineraries: Array,
});

module.exports = mongoose.model("User", UserSchema);
