const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create comment schema
const CommentSchema = new Schema({
  profileName: String,
  comment: String,
  city: String,
  title: String,
  itinerary_id: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model("Comment", CommentSchema);
