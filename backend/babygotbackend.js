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

const userModel = require("./models/UserModel");
const postRoute = require("./routes/createPostRoute");
const showRoute = require("./routes/showRoute");
const youTubeRoute = require("./routes/ytRoute");
const registerRoute = require("./routes/registerRoute");
const loginRoute = require("./routes/loginRoute");
const userRoute = require("./routes/getUserRoute")

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
app.use(cookieParser(secretKey));
app.use(
  session({
    secret: secretKey,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
const passportInit = require("./passport-config");
const { deleteOne } = require("./models/ResourceModel");
passportInit(
  passport,
  async (email) => {
    try {
      const authUser = await userModel.findOne({ email: email });
      console.log(authUser);
      return authUser || null;
      } catch (err) {
      console.error(err);
    }
  },
  async (id) => {
    try {
      const authUser = await userModel.findById({ _id: id });
      console.log(authUser);
      return authUser || null;
    } catch (err) {
      console.error(err);
    }
  },
  // (id) => {
  //   userModel.findOne({ _id: id }, (err, user) => {
  //     if (err) {
  //       console.error(err);
  //     }
  //     if (!user) {
  //       return null, false;
  //     } else {
  //       return null, user;
  //     }
  //   });
  // }
);

//app.use(express.json());

app.use("/createpost", postRoute);
app.use("/show", showRoute);
app.use("/ytapi", youTubeRoute);
app.use("/register", registerRoute);
// app.use("/login", loginRoute);
app.post(
  "/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No user exists!")
    else {
      req.login(user, err => {
        if (err) throw err;
        const name = req.user.username;
        res.send(name);
        console.log(req.user);
        next();
      })
    }
  })(req, res, next);
});

app.get("/user", (req, res) => {
  if (req.isAuthenticated()) {
    const name = req.user;
    res.send(req.user.username);
  } else {
    res.send("no user authenticated");
  }
});

app.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
    }
    res.send("You are now logged out");
  })
})

// app.use("/user", userRoute);

app.listen(3001, function () {
  console.log("Express server is running on port 3001");
});

// app.get("/user", (req, res, next) => {
//   if (req.isAuthenticated()) {
//     res.redirect('/')
//   }
// })

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
