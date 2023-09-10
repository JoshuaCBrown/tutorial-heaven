const mongoose = require("mongoose");

const createResourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  link: String,
  videoId: String,
  textInfo: String,
  description: String,
  tags: [String],
  cat1: String,
  cat2: String,
  cat3: String,
  cat4: String,
  createdOn: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  typeOfPost: String,
  postScore: Number,
  vidThumbnail: String,
  vidWidth: Number,
  vidHeight: Number,
});

module.exports = mongoose.model("resource", createResourceSchema);
