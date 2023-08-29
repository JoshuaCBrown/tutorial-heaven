require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const postRoute = require("./routes/createPostRoute");
const showRoute = require("./routes/showRoute");
const youTubeRoute = require("./routes/ytRoute");
const apiKey = process.env.YOUTUBE_APIKEY;
baseApiUrl = "https://www.googleapis.com/youtube/v3";

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

app.use("/createpost", postRoute);
app.use("/show", showRoute);
app.use("/ytapi", youTubeRoute);

app.listen(3001, function () {
  console.log("Express server is running on port 3001");
});

// console.log('hey');

// saveVideo()

// async function saveVideo() {
//     try {
//         const video = await Video.create({ link: "google.com", title: "dope boy" })
//         //function above is equal to the follow two commented lines
//         // const video = new Video({ link: "google.com", title: "dope boy" })
//         // await video.save()
//         // to update a field - the following line:
//         // video.link = "youtube.com"
//         console.log(video);
//     } catch (e) {
//         console.log(e.errors)
//     }
// }
