const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require("../models/User");
const verifyToken = require('../middleware/verifyToken');

const tokenSecret = process.env.JWT_SECRET;

router.post('/signup', async (req, res, next) => {
    try {
        const user = new User({
            email: req.body.email,
            name: req.body.name,
            password: req.body.password,
        });
        await user.save();
        setJwtToken(res, generateToken(user));
        res.status(200).json(user.getPublicFields());
    } catch (err) {
        next(err);
    }
})

router.post('/login', async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if (!user) {
            res.status(404).json({error: "User does not exist"});
        }
        if (await user.comparePassword(req.body.password)) {
            setJwtToken(res, generateToken(user));
            res.status(200).json(user.getPublicFields());
        } else {
            res.status(403).json({error: "Password does not match"});
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
})

router.post('/logout', async (req, res, next) => {
    res.cookie("authorization", "", {
        secure: process.env.NODE_ENV !== "development",
        httpOnly: true,
        expires: new Date(),
    });
    res.json({});
})

router.get('/loggedIn', verifyToken, async (req, res, next) => {
    res.status(200).json(User.findById(req.verifiedUserId).getPublicFields());
})

function generateToken(user) {
    return jwt.sign({data: user._id}, tokenSecret, {expiresIn: '24h'})
}

function setJwtToken(res, token) {
    res.cookie("authorization", token, {
        secure: process.env.NODE_ENV !== "development",
        httpOnly: true,
        expires: new Date(Date.now() + 24*60*60*1000),
    });
}

module.exports = router;