const jwt = require('jsonwebtoken')
const tokenSecret = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
    const token = req.cookies.authorization
    if (!token) res.status(401).json({error: "no token"})
    else {
        jwt.verify(token.split(" ")[1], tokenSecret, (err, value) => {
            if (err) res.status(500).json({error: 'failed to authenticate token'})
            req.verifiedUserId = value.data
            next()
        })
    }
}