import express from "express";
import Admission from "../../models/Admission";
import {AuthorizedRequest} from "../../middleware/verifyToken";

const getAdmission = async (req: AuthorizedRequest, res: express.Response) => {
  const admission = await Admission.findById(req.params.admissionId);
  if (admission.userIds.includes(req.verifiedUserId)) {
    res.json({data: admission});
  } else {
    res.status(403).json({error:"No access"})
  }
}

export default getAdmission;