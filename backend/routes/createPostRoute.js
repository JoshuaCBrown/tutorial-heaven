const express = require("express");
const router = express.Router();
const ResourceModel = require("../models/ResourceModel");

router.route("/").post( async (req, res) => {
  const link = req.body.link;
  const title = req.body.title;
  const description = req.body.description;
  const tags = req.body.tags;
  const cat1 = req.body.category;
  const cat2 = req.body.childCategory;
  const cat3 = req.body.grandChildCategory;
  const cat4 = req.body.greatGrandChildCategory;
  const typeOfPost = req.body.typeOfPost;
  const collectionName = req.body.category.replace(/\s/g, "");
  try {
    const createNewPost = new ResourceModel({
      link,
      title,
      description,
      tags,
      cat1,
      cat2,
      cat3,
      cat4,
      typeOfPost,
    });
    await createNewPost.save();
    res.status(200).send("Post successfully added to database");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

module.exports = router;