const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create activity schema
const ActivitySchema = new Schema({
  activityImage: String,
  activityCaption: String,
  title: String,
  city: String,
  itinerary_id: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model("Activity", ActivitySchema);
