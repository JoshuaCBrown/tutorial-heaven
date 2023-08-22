const mongoose = require("mongoose")

const articlePostSchema = new mongoose.Schema({
    link: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: String,
    tags: [String],
    cat1: String,
    cat2: String,
    cat3: String,
    cat4: String,
    createdOn: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
    },
    typeOfPost: {
        type: String,
        default: "article",
        immutable: true,
    },
});


module.exports = (collectionName) => {
    return mongoose.model(collectionName, articlePostSchema)
};