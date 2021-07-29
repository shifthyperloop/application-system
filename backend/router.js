const express = require('express');
const router = express.Router();

const admissions = require("./routes/admissions");
const admission = require("./routes/admission");
const auth = require("./routes/auth");
const verifyToken = require('./middleware/verifyToken');


router.use('/auth', auth);
router.use(verifyToken)

router.use('/admissions', admissions);
router.use('/admission', admission);

module.exports = router;