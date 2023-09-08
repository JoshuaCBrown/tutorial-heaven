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
const registerRoute = require("./routes/registerRoute");
const loginRoute = require("./routes/loginRoute");

const baseApiUrl = "https://www.googleapis.com/youtube/v3";
const apiKey = process.env.YOUTUBE_APIKEY;
const secretKey = process.env.SESSION_SECRET;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(
  session({
    secret: secretKey,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser(secretKey));
app.use(passport.initialize());
app.use(passport.session());
require("./passport-config")(passport);

//app.use(express.json());

app.use("/createpost", postRoute);
app.use("/show", showRoute);
app.use("/ytapi", youTubeRoute);
app.use("/register", registerRoute);
app.use("/login", loginRoute);

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
