// authMiddleware.js
const jwt = require('jsonwebtoken');

const SECRETKEY = process.env.SECRETKEY
if (!SECRETKEY) {
    throw new Error("SECRETKEY environment variable is not defined.");
}

exports.authAdmin = (req, res, next) => {
    const authHeader = req.headers['auth-token'];
    if (!authHeader) {
        return res.status(401).send('Authorization header is missing');
    }
    
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).send('Token is missing');
    }

    jwt.verify(token, SECRETKEY, (err, user) => {
        if (err) {
            return res.status(403).send('Invalid token');
        }
        if (user.role !== 'admin') {
            return res.status(403).send('Unauthorized, you are not admin you are ' + user.role)
        }
        req.user = user;
        next();
    });
};

exports.authAny = (req, res, next) => {
    const authHeader = req.headers['auth-token'];
    if (!authHeader) {
        return res.status(401).send('Authorization header is missing');
    }
    
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).send('Token is missing or forgot Bearer');
    }

    jwt.verify(token, SECRETKEY, (err, user) => {
        if (err) {
            return res.status(403).send('Invalid token');
        }
        req.user = user;
        next();
    });
};
