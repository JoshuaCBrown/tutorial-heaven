const express = require("express");
const router = express.Router();
const UserModel = require("../models/UserModel");

router.use((req, res, next) => {
  UserModel.findOne({ username: req.body.username }, (err, doc) => {
    if (err) throw err;
    if (doc) res.send("That username is taken");
    if (!doc) {
      next();
    }
  });
});

router.post("/", (req, res) => {
  UserModel.findOne({ email: req.body.email }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("That email is already being used");
    if (!doc) {
      const newUser = new UserModel({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
      await newUser.save();
      res.send("User Created");
    }
  });
});
