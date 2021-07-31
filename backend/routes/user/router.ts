import express from "express";
import getAllUsers from "./getAllUsers";

const router = express.Router();

router.get('/all', getAllUsers);

export default router;