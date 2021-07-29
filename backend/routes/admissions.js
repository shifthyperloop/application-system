const express = require('express');
const Admission = require("../models/Admission");
const router = express.Router();

router.get('', async (req, res) => {
    const admissions = await Admission.find();
    res.send(admissions);
});

module.exports = router;