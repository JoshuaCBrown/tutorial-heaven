
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const passport = require("passport");
const passportLocal = require("passport-local");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");

const postRoute = require("./routes/createPostRoute");
const showRoute = require("./routes/showRoute");
const youTubeRoute = require("./routes/ytRoute");
const apiKey = process.env.YOUTUBE_APIKEY;
const baseApiUrl = "https://www.googleapis.com/youtube/v3";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

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
