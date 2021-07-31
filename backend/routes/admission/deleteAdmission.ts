import express, {NextFunction} from "express";
import Admission from "../../models/Admission";
import {AuthorizedRequest} from "../../middleware/verifyToken";

const deleteAdmission = async (req: AuthorizedRequest, res: express.Response, next: NextFunction) => {
  try {
    const deleted = await Admission.findOneAndDelete({
      _id: req.params.admissionId,
      userIds: req.verifiedUserId,
    });

    if (!deleted) {
      res.status(403).json({error: 'No access'})
    }
    res.status(200).json({data: 'ok'});
  } catch (err) {
    res.status(404);
    next("Admission not found");
  }
}

export default deleteAdmission;