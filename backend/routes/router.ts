import express from "express";
import verifyToken from "../middleware/verifyToken";
import authRouter from "./auth/router";
import admissionRouter from "./admission/router";
import userRouter from "./user/router";

const router = express.Router();

router.use('/auth', authRouter);

// verify logged in for all request below this
router.use(verifyToken)
router.use('/admission', admissionRouter);
router.use('/user', userRouter);

export default router;