import express from "express";
import Admission from "../models/Admission";

const router = express.Router();

router.get('', async (req: express.Request, res: express.Response) => {
    const admissions = await Admission.find();
    res.send(admissions);
});

export default router;