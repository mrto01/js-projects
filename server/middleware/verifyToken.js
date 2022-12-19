const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async function (req, res, next) {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.KEY, (err, data) => {
            if (err) {
                return res.status(403).json("Token is not valid!");
            }
            req.data = data;
            next();
        });
    } else {
        return res.status(401).json("You are not authenticated!");
    }
};
