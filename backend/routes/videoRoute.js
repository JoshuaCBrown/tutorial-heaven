const express = require("express");
const router = express.Router();
const Video = require("../models/Video");

router.route("/create").post((req, res) => {
    const title = req.body.title;
    const text = req.body.text;
    const description = req.body.description;
    const tags = req.body.tags;
    const category = req.body.category;
    const childCategory = req.body.childCategory;
    const grandChildCategory = req.body.childCategory;
    const greatGrandChildCategory = req.body.greatGrandChildCategory;
    const resourceType = 'text post';
    const newSelfPost = new SelfPost({
        title,
        text,
        description,
        tags,
        category,
        childCategory,
        grandChildCategory,
        greatGrandChildCategory,
        resourceType
    })

    newSelfPost.save();
})

module.exports = router;