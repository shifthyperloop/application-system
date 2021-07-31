import express from "express";
import Admission from "../../models/Admission";

const getAllAdmissions = async (req: express.Request, res: express.Response) => {
  const admissions = await Admission.find();
  res.json({data: admissions});
}

export default getAllAdmissions;