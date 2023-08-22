const mongoose = require("mongoose");

const createPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
  },
  textInfo: {
    type: String,
  },
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
  typeOfPost: {
    type: String,
  },
});

module.exports = mongoose.model("post", createPostSchema);
