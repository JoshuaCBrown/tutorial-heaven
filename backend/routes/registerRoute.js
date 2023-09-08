const express = require("express");
const router = express.Router();
const userModel = require("../models/UserModel");
const bcrypt = require("bcrypt");

router.use(async (req, res, next) => {
  try {
    const userExists = await userModel.findOne({ username: req.body.username });
    if (userExists) {
      res.send("That username is taken");
    } else {
      next();
    } 
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal error");
  }
});

router.post("/", async (req, res) => {
  try {
    const emailExists = await userModel.findOne({ email: req.body.email });
    if (emailExists) {
      res.send("That email is already being used");
    } else {
      const hashedPass = await bcrypt.hash(req.body.password, 10);
      const newUser = new userModel({
        username: req.body.username,
        email: req.body.email,
        password: hashedPass,
      });
      await newUser.save();
      res.send("User Created");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
})

module.exports = router;
