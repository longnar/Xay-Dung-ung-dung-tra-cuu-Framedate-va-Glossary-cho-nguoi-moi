const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Verify JWT from Authorization Header (Format: Bearer <token>)
 */
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No authentication token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super_secret_key_for_idol_showdown_wiki');
        req.user = decoded;
        next();
    } catch (error) {
        console.error('JWT Verification Error:', error.message);
        return res.status(403).json({ message: 'Invalid or expired authentication token.' });
    }
};

/**
 * Verify that the authenticated user is an Admin
 */
const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user && req.user.role === 'admin') {
            next();
        } else {
            return res.status(403).json({ message: 'Access denied. Requires Admin role.' });
        }
    });
};

module.exports = {
    verifyToken,
    verifyAdmin
};
