const { Schema, model } = require("mongoose");

const SeriesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    artwork: {
        type: String,
        required: false
    },
    published: {
        type: Boolean,
        required: true
    },
    created: {
        type: String,
        required: false,
        default: Date.now()
    }
});

module.exports = Series = model("Series", SeriesSchema);

