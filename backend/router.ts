import express from "express";
import auth from "./routes/auth";
import verifyToken from "./middleware/verifyToken";
import admissions from "./routes/admissions";
import admission from "./routes/admission";
import user from "./routes/user";

const router = express.Router();

router.use('/auth', auth);
router.use(verifyToken)

router.use('/admissions', admissions);
router.use('/admission', admission);
router.use('/user', user);

export default router;