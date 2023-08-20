const mongoose = require("mongoose")

const videoSchema = new mongoose.Schema({
    link: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    createdOn: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
    },
    description: String,
    tags: [String],
    cat1: String,
    cat2: String,
    cat3: String,
    cat4: String,
});

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;