const { model, Schema } = require("mongoose");

const UserDepartmentSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    userID: {
        type: String,
        required: true
    }
});

module.exports = UserDepartment = model("UserDepartment", UserDepartmentSchema);