const express = require("express");
const router = express.Router();
const TextPost = require("../models/TextModel");

router.route("/createTextPost").post( async (req, res) => {
    const title = req.body.title;
    const textInfo = req.body.textInfo;
    const description = req.body.description;
    const tags = req.body.tags;
    const cat1 = req.body.category;
    const cat2 = req.body.childCategory;
    const cat3 = req.body.grandChildCategory;
    const cat4 = req.body.greatGrandChildCategory;
    const resourceType = 'text';
    const collectionName = (req.body.category).replace(/\s/g, '');
    try {
        const TextModel = TextPost(collectionName);
        const textPostRoute = new TextModel({
            title,
            textInfo,
            description,
            tags,
            cat1,
            cat2,
            cat3,
            cat4,
            resourceType,
        })
        await textPostRoute.save();
        res.status(200).send('Post successfully added to database');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
})

module.exports = router;