const { Schema, model } = require("mongoose")

const AdminSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created: {
        type: String,
        required: false,
        default: new Date().toDateString()
    }
});

module.exports = Admin = model("Admin", AdminSchema);