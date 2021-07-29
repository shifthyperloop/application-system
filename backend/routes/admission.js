const express = require('express');
const Admission = require("../models/Admission");
const router = express.Router();

router.get('/:admissionId', async (req, res) => {
    const admission = await Admission.findById(req.params.admissionId);
    res.send(admission);
});

router.post('', async (req, res, next) => {
    try {
        const admission = new Admission({
            name: req.body.name,
        });
        await admission.save();
        res.send(admission);
    } catch (err) {
        res.status(404);
        next(err);
    }
});

router.delete('/:admissionId', async (req, res, next) => {
    try {
        await Admission.findByIdAndDelete(req.params.admissionId);

        res.status(204)
        res.send();
    } catch (err) {
        res.status(404);
        next("Admission not found");
    }
});

module.exports =  router;