import verifyToken from "../../middleware/verifyToken";
import express from "express";
import signup from "./signup";
import login from "./login";
import logout from "./logout";
import getLogginInUser from "./getLoggedInUser";

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/loggedIn', verifyToken, getLogginInUser)

export default router;