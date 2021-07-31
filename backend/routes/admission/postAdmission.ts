import express, {NextFunction} from "express";
import Admission from "../../models/Admission";
import Group from "../../models/Group";

interface PostAdmissionRequest {
  _id?: string;
  name: string;
  admittingLeaders: boolean;
  admittingMembers: boolean;
  userIds: string[];
  groupNames?: string[];
  deleteDate: Date;
}

const postAdmission = async (req: express.Request, res: express.Response, next: NextFunction) => {
  try {
    const admissionRequest = req.body as PostAdmissionRequest;

    if (admissionRequest._id) {
      next(new Error("unimplemented"));
    }

    const admission = new Admission({
      name: admissionRequest.name,
      deleteDate: admissionRequest.deleteDate,
      admittingLeaders: admissionRequest.admittingLeaders,
      admittingMembers: admissionRequest.admittingMembers,
      userIds: admissionRequest.userIds,
    });
    await admission.save();

    if (admissionRequest.groupNames) {
      await Promise.all(admissionRequest.groupNames.map(groupName => {
        const group = new Group({
          admissionId: admission._id,
          name: groupName,
        });
        return group.save();
      }));
    }

    res.json({data: admission});
  } catch (err) {
    next(err);
  }
}

export default postAdmission;