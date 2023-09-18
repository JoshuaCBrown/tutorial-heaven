const express = require("express");
const router = express.Router();
const resourceModel = require("../models/ResourceModel");
const userModel = require("../models/UserModel");

const checkUser = async (req, res, next) => {
  try {
    const { postId, userId, voteStr } = req.params;
    const userVote = parseFloat(voteStr);
    const voteInfo = req.body;
    console.log(voteInfo);
    let updatedVote;

    //updates the user document based on userId to include which post was voted o
    const updatedUser = await userModel
      .findOne({ _id: userId })
      .then((doc) => {
        if (doc) {
          const voteArray = doc.voted;
          console.log("post ID:", postId);
          const votedIndex = voteArray.findIndex(
            (item) => item.tutId === postId
          );
          console.log(votedIndex);
          if (votedIndex !== -1) {
            console.log("object exists");
            if (voteArray[votedIndex].vote !== userVote) {
              console.log("vote logic:");
              updatedVote = voteArray[votedIndex].vote + userVote;
              console.log(updatedVote);
              doc.voted[votedIndex].vote = updatedVote;
              doc.save();
              next();
            } else {
              console.log("you only have 1 point of voting power per post");
            }
          } else {
            console.log("no existing vote object found");
            doc.voted.push(voteInfo);
            doc.save();
            next();
          }
        } else {
          console.log("no user found");
          res.send("no user found");
        }
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
        res.send("no user found");
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const updateVote = async (req, res) => {
  try {
    const { postId, userId, voteStr } = req.params;
    const userVote = parseFloat(voteStr);
    const updatedVote = await resourceModel
      .findById({ _id: postId })
      .then((doc) => {
        if (doc) {
          const prevValue = doc.postScore;
          const newValue = doc.postScore + userVote;
          doc.postScore = newValue;
          return doc.save();
        } else res.send("post not found");
      })
      .catch((err) => {
        console.error(err);
        res.send(err);
      })
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error 2" });
  }
};

router.patch("/:postId/:userId/:voteStr", checkUser, updateVote);

module.exports = router;
