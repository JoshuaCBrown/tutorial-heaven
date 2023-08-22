const express = require("express");
const router = express.Router();
const PostModel = require("../models/PostModel");

// route.route("/").get((req, res) => {
//     const parId = req.body.parId;
//     const chiId = req.body.chiId;
//     const gchId = req.body.gchId;
//     const ggchId = req.body.ggchId;
//     if (!parId) {
//         PostModel.find()
//             .then(foundPosts => res.json(foundNotes))
//     } else {
//         PostModel.find()
//     }
// });

router.route("/").get((req, res) => {
  PostModel.find()
    .then(foundPosts => res.json(foundPosts))
});

module.exports = router;