const mongoose = require("mongoose");
// const validator = require("validator");

const heatMapImgSchema = new mongoose.Schema({
  news_id: {
    type: String,
    unique: true,
    required: true
  },
  image: Buffer
});

module.exports = mongoose.model("heatMapImg", heatMapImgSchema);
