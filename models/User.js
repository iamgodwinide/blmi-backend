const { Schema, model } = require("mongoose")

const UserSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: false
    },
    bio: {
        type: String,
        required: false,
        default: "I am a LOVEBLAZER."
    },
    departments: {
        type: Object,
        required: false,
        default: {}
    },
    plh: {
        type: String,
        required: false,
        default: ""
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    profile_pic: {
        type: String,
        required: false
    },
    dob: {
        type: String,
        required: false
    },
    serial_no: {
        type: String,
        required: false
    },
    coins: {
        type: Number,
        required: false,
        default: 0
    },
    approved: {
        type: Boolean,
        required: false,
        default: false
    },
    password: {
        type: String,
        required: true
    },
    created: {
        type: String,
        required: false,
        default: Date.now()
    }
});

module.exports = User = model("User", UserSchema);