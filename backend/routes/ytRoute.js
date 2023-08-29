require("dotenv").config({ path: "../.env" });
const express = require("express");
const router = express.Router();
const apiKey = process.env.YOUTUBE_APIKEY;
const axois = require("axios");
baseApiUrl = "https://www.googleapis.com/youtube/v3";

router.route("/").get(async (req, res) => {
  const searchQuery = req.query.search_query;
  const url = `${baseApiUrl}/search?key=${apiKey}&type=video&part=snippet&q=${searchQuery}`;
  const response = await axios.get(url);
  console.log("response", response);
});

module.exports = router;
