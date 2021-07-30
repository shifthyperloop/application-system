import express, {NextFunction} from "express";
import Admission from "../models/Admission";

const router = express.Router();

router.get('/:admissionId', async (req: express.Request, res: express.Response) => {
    const admission = await Admission.findById(req.params.admissionId);
    res.json({data: admission});
});

router.post('', async (req: express.Request, res: express.Response, next: NextFunction) => {
    try {
        const admission = new Admission({
            name: req.body.name,
        });
        await admission.save();
        res.json({data: admission});
    } catch (err) {
        next(err);
    }
});

router.delete('/:admissionId', async (req: express.Request, res: express.Response, next: NextFunction) => {
    try {
        await Admission.findByIdAndDelete(req.params.admissionId);

        res.status(200)
        res.json({data: 'ok'});
    } catch (err) {
        res.status(404);
        next("Admission not found");
    }
});

export default router;