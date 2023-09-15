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
const resourceModel = require("./models/ResourceModel");
const postRoute = require("./routes/createPostRoute");
const showRoute = require("./routes/showRoute");
const youTubeRoute = require("./routes/ytRoute");
const registerRoute = require("./routes/registerRoute");
const loginRoute = require("./routes/loginRoute");
const userRoute = require("./routes/getUserRoute");

const baseApiUrl = "https://www.googleapis.com/youtube/v3";
const apiKey = process.env.YOUTUBE_APIKEY;
const secretKey = process.env.SESSION_SECRET;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
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
  }
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
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No user exists!");
    else {
      req.login(user, (err) => {
        if (err) throw err;
        const name = req.user.username;
        res.send(name);
        console.log(req.user);
        next();
      });
    }
  })(req, res, next);
});

app.get("/user", (req, res) => {
  if (req.isAuthenticated()) {
    const info = {
      username: req.user.username,
      userId: req.user._id,
    };
    res.send(info);
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
  });
});

app.patch("/postVote/:postId/:userId/:voteStr", async (req, res) => {
  try {
    const { postId, userId, voteStr } = req.params;
    const userVote = parseFloat(voteStr);
    const voteInfo = req.body;
    console.log(voteInfo);

    //updates the user document based on userId to include which post was voted on
    const updatedUser = await userModel.findOne({ _id: userId }).then((doc) => {
      if (doc) {
        const voteArray = doc.voted;
        console.log(voteArray);
        const existingVoteObj = voteArray.find((item) => item.tutId === postId);
        if (existingVoteObj) {
          console.log(existingVoteObj);
        } else {
          console.log("no existing vote object found");
        }
        // if (existingVoteObj.vote === userVote) {
        //   return res.json('Error: users only have 1 score point per post');
        // } else {
        //   const newVoteVal = existingVoteObj.vote + userVote;
        //   existingVoteObj.vote = newVoteVal;
        //   doc.save();
        // }
      }
    });
    const updatedTwoser = await userModel.findOneAndUpdate(
      { _id: userId },
      { $push: { voted: voteInfo } },
      { new: true }
    );

    // if (!updatedUser) {
    //   return res
    //     .status(404)
    //     .json({ error: "You must be logged in to do that" });
    // }

    // const updatedPost = await resourceModel
    //   .findOne({ _id: postId })
    //   .then((doc) => {
    //     if (doc) {
    //       const prevPostScore = doc.postScore;
    //       console.log(prevPostScore);
    //       const newPostScore = prevPostScore + userVote;
    //       console.log(newPostScore);
    //       doc.postScore = newPostScore;
    //       console.log(doc.postScore);
    //       doc.save();
    //     }
    //   });

    // return res.json(updatedUser);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

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
