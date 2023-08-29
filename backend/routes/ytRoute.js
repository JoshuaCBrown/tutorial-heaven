require("dotenv").config({ path: "../.env" });
const express = require("express");
const router = express.Router();
const apiKey = process.env.YOUTUBE_APIKEY;
const axios = require("axios");
baseApiUrl = "https://www.googleapis.com/youtube/v3";

router.route("/").get(async (req, res) => {
  const videoId = "Ks-_Mh1QhMc";
  const url = `${baseApiUrl}/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${apiKey}`;
  const response = await axios.get(url);
  console.log("response", response);
});

module.exports = router;
