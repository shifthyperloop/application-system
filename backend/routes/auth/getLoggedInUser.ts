import {AuthorizedRequest} from "../../middleware/verifyToken";
import express from "express";
import User from "../../models/User";

const getLogginInUser = async (req: AuthorizedRequest, res: express.Response) => {
  res.status(200).json({data: (await User.findById(req.verifiedUserId)).getPublicFields()
  });
}

export default getLogginInUser;