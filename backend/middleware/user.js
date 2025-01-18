const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || "5114";

function userMiddleware( req, res, next) {
    const token = req.headers.token;
    const decoded = jwt.verify(token, JWT_SECRET);

    if(decoded){
        req.userid = decoded.userId;
        next()
    } else{
        res.status(401).json({
            message : "you are not signed in"
        })
    }
}

module.exports = { userMiddleware }