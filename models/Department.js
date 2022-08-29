const { model, Schema } = require("mongoose");

const DepartmentSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

module.exports = Department = model("Department", DepartmentSchema);