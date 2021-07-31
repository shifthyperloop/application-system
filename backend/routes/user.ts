import express from "express";
import User from "../models/User";

const router = express.Router();

router.get('/all', async (req: express.Request, res: express.Response) => {
  const users = await User.find();
  res.json({data: users});
});

export default router;