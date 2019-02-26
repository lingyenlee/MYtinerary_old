const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create city schema & model
const CitySchema = new Schema({
  city: String,
  country: String
});

module.exports = mongoose.model("City", CitySchema);
