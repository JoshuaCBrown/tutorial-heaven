const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  listContent: {
    type: [String],
    default: [],
  },
});

const votedSchema = new mongoose.Schema({
  tutId: String,
  vote: Number,
});

const user = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  playlists: {
    type: [playlistSchema],
    default: [],
  },
  voted: {
    type: [votedSchema],
    default: [],
  }
});

module.exports = mongoose.model("User", user);
