const express = require("express");
const router = express.Router();
const userModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const passport = require("passport");


router.post("/", (req, res, next) => {
  passport.authenticate("local", 
  {
    successRedirect: '/register',
    failureRedirect: '/',
    failureMessage: true,
  })
  // (err, user, info) => {
  //   if (err) throw err;
  //   if (!user) res.send("No user exists!");
  //   else {
  //     req.logIn(user, (err) => {
  //       if (err) throw err;
  //       res.send("Successfully Authenticated");
  //       console.log(req.user);
  //     });
  //   }
  // })(req, res, next);
});

module.exports = router;
