require("dotenv").config({ path: "../.env" });
const express = require("express");
const router = express.Router();
const apiKey = process.env.YOUTUBE_APIKEY;
const axios = require("axios");
baseApiUrl = "https://www.googleapis.com/youtube/v3";

router.route("/query").get(async (req, res) => {
  console.log(req.query.youtubeId);
  const videoId = req.query.youtubeId;
  const url = `${baseApiUrl}/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${apiKey}`;
  const response = await axios.get(url);
  const vid = {
    title: response.data.items[0].snippet.title,
    description: response.data.items[0].snippet.description,
    coverImg: response.data.items[0].snippet.thumbnails.medium.url,
  };
  // const ytObj = response.data.items[0].snippet.title;
  res.json(vid);
  console.log("response", vid);
});

module.exports = router;
