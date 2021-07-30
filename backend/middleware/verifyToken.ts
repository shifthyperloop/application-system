import express, {NextFunction} from "express";
import jwt from "jsonwebtoken";

const tokenSecret = process.env.JWT_SECRET;

export interface AuthorizedRequest extends express.Request {
    verifiedUserId: string;
}

const verifyToken = (req: express.Request, res: express.Response, next: NextFunction) => {
    const token = req.cookies.authorization
    if (!token) res.status(401).json({error: "no token"});
    else {
        jwt.verify(token, tokenSecret, (err: any, value) => {
            if (err) res.status(500).json({error: 'failed to authenticate token'});
            (req as AuthorizedRequest).verifiedUserId = value.data;
            next();
        })
    }
}

export default verifyToken;