// Application.model.js
const mongoose = require("mongoose");
const leaderApplicationSchema = new mongoose.Schema({
    experience: String,
    motivation: String,
});

const LeaderApplication = mongoose.model("LeaderApplication", leaderApplicationSchema);
module.exports = LeaderApplication;