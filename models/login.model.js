const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LoginSchema = new Schema({
  profileName: { type: String },
  password: { type: String },
});

module.exports = mongoose.model("Login", LoginSchema);
