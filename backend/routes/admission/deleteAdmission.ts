import express, {NextFunction} from "express";
import Admission from "../../models/Admission";

const deleteAdmission = async (req: express.Request, res: express.Response, next: NextFunction) => {
  try {
    await Admission.findByIdAndDelete(req.params.admissionId);

    res.status(200)
    res.json({data: 'ok'});
  } catch (err) {
    res.status(404);
    next("Admission not found");
  }
}

export default deleteAdmission;