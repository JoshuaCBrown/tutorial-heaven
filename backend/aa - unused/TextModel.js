const mongoose = require("mongoose")

const textPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    textInfo: {
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
        default: "text",
        immutable: true,
    },
});


module.exports = (collectionName) => {
    return mongoose.model(collectionName, textPostSchema)
};