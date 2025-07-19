const asyncHanlder = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateToken = asyncHanlder(async (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        res.status(401);
        throw new Error('Token missing or User not authorized');
    }

    // Get the actual token from "Bearer token"
    token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECERT, (err, decoded) => {
        if (err) {
            res.status(401);
            throw new Error('User not authorized');
        }
        console.log('Decoded User:', decoded, decoded.user);
        // Add user details which are decoded from JWT token in req on server
        req.user = decoded.user;
        next();
    })
});

module.exports = validateToken;