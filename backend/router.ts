import express from "express";
import auth from "./routes/auth";
import verifyToken from "./middleware/verifyToken";
import admissions from "./routes/admissions";
import admission from "./routes/admission";

const router = express.Router();

router.use('/auth', auth);
router.use(verifyToken)

router.use('/admissions', admissions);
router.use('/admission', admission);

export default router;