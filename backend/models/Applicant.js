const mongoose = require("mongoose");
import Application from "./Application";


const applicantSchema = new mongoose.Schema({
    admission: mongoose.ObjectId,
    application: Application,
})

const Applicant = mongoose.model("Applicant", applicantSchema);
module.exports = Applicant;