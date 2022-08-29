const { Schema, model } = require("mongoose");

const UserMessageSchema = new Schema({
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
        required: true
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
        required: true
    },
    series_name: {
        type: String,
        required: false
    },
    seriesID: {
        type: String,
        required: false
    },
    videoPrice: {
        type: Number,
        required: true
    },
    audioPrice: {
        type: Number,
        required: true
    },
    published: {
        type: Boolean,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    message_id: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: false,
        default: Date.now()
    }
});


module.exports = UserMessage = model("UserMessage", UserMessageSchema);

