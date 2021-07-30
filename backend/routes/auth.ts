import User, {IUser} from "../models/User";
import verifyToken, {AuthorizedRequest} from "../middleware/verifyToken";
import jwt from "jsonwebtoken";
import express, {NextFunction} from "express";

const tokenSecret = process.env.JWT_SECRET;
const router = express.Router();

router.post('/signup', async (req: express.Request, res: express.Response, next: NextFunction) => {
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
})

router.post('/login', async (req: express.Request, res: express.Response, next: NextFunction) => {
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
})

router.post('/logout', async (req: express.Request, res: express.Response) => {
    res.cookie("authorization", "", {
        secure: process.env.NODE_ENV !== "development",
        httpOnly: true,
        expires: new Date(),
    });
    res.json({data: 'ok'});
})

router.get('/loggedIn', verifyToken, async (req: AuthorizedRequest, res: express.Response) => {
    res.status(200).json({data: (await User.findById(req.verifiedUserId)).getPublicFields()
});
})

function generateToken(user: IUser) {
    return jwt.sign({data: user._id}, tokenSecret, {expiresIn: '24h'})
}

function setJwtToken(res: express.Response, token: string) {
    res.cookie("authorization", token, {
        secure: process.env.NODE_ENV !== "development",
        httpOnly: true,
        expires: new Date(Date.now() + 24*60*60*1000),
    });
}

export default router;