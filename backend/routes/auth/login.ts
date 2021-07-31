import express, {NextFunction} from "express";
import User from "../../models/User";
import {generateToken, setJwtToken} from "./utils/jwtUtils";

const login = async (req: express.Request, res: express.Response, next: NextFunction) => {
  try {
    const user = await User.findOne({email: req.body.email});
    if (!user) {
      res.status(404).json({error: "User does not exist"});
    }
    if (await user.comparePassword(req.body.password)) {
      setJwtToken(res, generateToken(user));
      res.status(200).json({data: user.getPublicFields()});
    } else {
      res.status(403).json({error: "Password does not match"});
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export default login;