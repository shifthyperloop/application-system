// Application.model.js
import LeaderApplication from "./LeaderApplication.model";
const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now() },
    name: { type: String, required: true },
    age: Number,
    email: { type: String, required: true },
    phone: String,
    yearOfStudy: Number,
    fieldOfStudy: String,
    wantedGroups: [String],
    applyingForMember: {
        type: Boolean,
        default: true,
    },
    leaderApplication: LeaderApplication,
    experience: String,
    motivation: String,
    expectedHours: {
        type: [String],
        enum: ['0-10', '10-20', '20-30', '30-40'],
    },
    acceptedPrivacyAgreement: {
        type: Boolean,
        required: [true, "The privacy agreement must be answered"],
        validate: {
            validator: accepted => accepted,
            message: "The privacy agreement must be accepted to save application"
        }
    }
});

const Application = mongoose.model("Application", applicationSchema);
module.exports = Application;