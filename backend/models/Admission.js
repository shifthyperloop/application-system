const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: "Admission with this name already exists",
    },
    date: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Admission", schema);