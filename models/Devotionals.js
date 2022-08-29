const { model, Schema } = require("mongoose");

const DevShema = new Schema({
    title: {
        type: String,
        required: true
    },
    mainBibleText: {
        type: String,
        required: true
    },
    mainBibleTextContent: {
        type: String,
        required: true
    },
    artwork: {
        type: String,
        required: false
    },
    body: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: false,
        default: Date.now()
    }
})

module.exports = Devotionals = model("Devotionals", DevShema);