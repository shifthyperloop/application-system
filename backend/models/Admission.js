const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: String,
    date: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Admission", schema);