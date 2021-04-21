const mongoose = require("mongoose");

const admissionSchema = new mongoose.Schema({
    name: String
});

const Admission = mongoose.model("Admission", admissionSchema);
module.exports = Admission;