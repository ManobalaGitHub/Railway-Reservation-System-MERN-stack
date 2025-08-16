const mongoose = require("mongoose");

const trainSchema = new mongoose.Schema({
  trainName: String,
  source: String,
  destination: String,
  startTime: String,
  departureTime: String,
});

module.exports = mongoose.model("Train", trainSchema);
