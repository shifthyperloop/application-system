import express from "express";
import Admission from "../../models/Admission";
import {AuthorizedRequest} from "../../middleware/verifyToken";

const getAllAdmissions = async (req: AuthorizedRequest, res: express.Response) => {
  const admissions = await Admission.find({userIds: req.verifiedUserId});
  res.json({data: admissions});
}

export default getAllAdmissions;