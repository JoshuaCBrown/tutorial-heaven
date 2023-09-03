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
  const fullDescription = response.data.items[0].snippet.description; 
  const briefDescription = fullDescription.split(" ").splice(0, 50).join(" ");
  const vid = {
    title: response.data.items[0].snippet.title,
    description: briefDescription,
    coverImg: response.data.items[0].snippet.thumbnails.medium.url,
    imgHeight: response.data.items[0].snippet.thumbnails.medium.height,
    imgWidth: response.data.items[0].snippet.thumbnails.medium.width,
  };
  // const ytObj = response.data.items[0].snippet.title;
  res.json(vid);
  console.log("response", vid);
});

module.exports = router;
