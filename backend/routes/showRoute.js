const express = require("express");
const router = express.Router();
const ResourceModel = require("../models/ResourceModel");

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

// router.route("/").get((req,res) => {
//   res.send(resource)
// })

// router.route("/").get(async (req, res) => {
//   const result = await ResourceModel.find()
//   res.send({"customers"})
// });

router.route("/query").get(async (req, res) => {
  const queryKey = await req.query.key;
  const queryValue = req.query.value;
  const queryObj = {};
  queryObj[queryKey] = queryValue;
  console.log(queryObj);

  try {
    const data = await ResourceModel.find(queryObj);
    res.json(data);
  } catch (error) {
    console.error('Error Fetching Data', error);
    res.status(500).json({ error: 'An error happened.' });
  }
});

router.route("/").get((req, res) => {
  ResourceModel.find()
    .then(foundPosts => res.json(foundPosts))
});

module.exports = router;