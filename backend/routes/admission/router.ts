import express from "express";
import getAdmission from "./getAdmission";
import postAdmission from "./postAdmission";
import deleteAdmission from "./deleteAdmission";
import getAllAdmissions from "./getAllAdmissions";

const router = express.Router();

router.get('/all', getAllAdmissions);
router.get('/:admissionId', getAdmission);
router.post('', postAdmission);
router.delete('/:admissionId', deleteAdmission);

export default router;