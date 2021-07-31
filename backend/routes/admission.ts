import express, {NextFunction} from "express";
import Admission from "../models/Admission";
import Group from "../models/Group";

const router = express.Router();

router.get('/:admissionId', async (req: express.Request, res: express.Response) => {
    const admission = await Admission.findById(req.params.admissionId);
    res.json({data: admission});
});

interface NewAdmissionRequest {
    name: string;
    admittingLeaders: boolean;
    admittingMembers: boolean;
    userIds: string[];
    groupNames: string[];
    deleteDate: Date;
}

router.post('', async (req: express.Request, res: express.Response, next: NextFunction) => {
    try {
        const admissionRequest = req.body as NewAdmissionRequest;
        const admission = new Admission({
            name: admissionRequest.name,
            deleteDate: admissionRequest.deleteDate,
            admittingLeaders: admissionRequest.admittingLeaders,
            admittingMembers: admissionRequest.admittingMembers,
            userIds: admissionRequest.userIds,
        });
        await admission.save();

        await Promise.all(admissionRequest.groupNames.map(groupName => {
            const group = new Group({
                admissionId: admission._id,
                name: groupName,
            });
            return group.save();
        }));

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