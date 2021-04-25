const express = require('express');
const Admission = require("./models/Admission");
const router = express.Router();

router.get('/admissions', async (req, res) => {
    const admissions = await Admission.find();
    res.send(admissions);
});

router.post('/admission', async (req, res) => {
    console.log(req.body);
    const admission = new Admission({
        name: req.body.name,
    });
    await admission.save();
    res.send(admission);
});

module.exports = router;