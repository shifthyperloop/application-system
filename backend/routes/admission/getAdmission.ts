import express from "express";
import Admission from "../../models/Admission";

const getAdmission = async (req: express.Request, res: express.Response) => {
  const admission = await Admission.findById(req.params.admissionId);
  res.json({data: admission});
}

export default getAdmission;