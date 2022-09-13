const { Schema, model } = require("mongoose");

const MessageSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    artwork: {
        type: String,
        required: false
    },
    artist: {
        type: String,
        required: false,
        default: "Timi Erewejoh"
    },
    about: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    video_url: {
        type: String,
        required: false
    },
    series_title: {
        type: String,
        required: false
    },
    seriesID: {
        type: String,
        required: false
    },
    videoPrice: {
        type: Number,
        required: false,
        default: 2
    },
    audioPrice: {
        type: Number,
        required: false,
        default: 1
    },
    published: {
        type: Boolean,
        required: true
    },
    date: {
        type: String,
        required: false,
        default: new Date().toDateString()
    }
});


module.exports = Message = model("Message", MessageSchema);

