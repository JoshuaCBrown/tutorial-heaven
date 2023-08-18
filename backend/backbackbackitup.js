require('dotenv').config();
const mongoose = require('mongoose');
const Video = require("./Video")

console.log('hey');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

saveVideo()

async function saveVideo() {
    try {
        const video = await Video.create({ link: "google.com", title: "dope boy" })
        //function above is equal to the follow two commented lines
        // const video = new Video({ link: "google.com", title: "dope boy" })
        // await video.save()
        // to update a field - the following line:
        // video.link = "youtube.com"
        console.log(video);
    } catch (e) {
        console.log(e.errors)
    }
}





