const express = require('express');
const Admission = require("./models/Admission");
const router = express.Router();

router.get('/admissions', async (req, res) => {
    const admissions = await Admission.find();
    res.send(admissions);
});

router.get('/admission/:admissionId', async (req, res) => {
    const admission = await Admission.findById(req.params.admissionId);
    res.send(admission);
});

router.post('/admission', async (req, res) => {
    console.log(req.body);
    const admission = new Admission({
        name: req.body.name,
    });
    await admission.save();
    res.send(admission);
});

router.delete('/admission/:admissionId', async (req, res, next) => {
    try {
        await Admission.findByIdAndDelete(req.params.admissionId);

        res.status(204)
        res.send();
    } catch (err) {
        res.status(404);
        next("Admission not found");
    }
});

module.exports = router;