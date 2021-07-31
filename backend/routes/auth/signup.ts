import express, {NextFunction} from "express";
import User from "../../models/User";
import {generateToken, setJwtToken} from "./utils/jwtUtils";

const signup = async (req: express.Request, res: express.Response, next: NextFunction) => {
  try {
    const user = new User({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
    });
    await user.save();
    setJwtToken(res, generateToken(user));
    res.status(200).json({data: user.getPublicFields()});
  } catch (err) {
    next(err);
  }
}

export default signup;