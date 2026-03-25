const jwt = require("jsonwebtoken");

const User = require("../models/User");

const protect = async (req, res, next) => {
    try {
        let token;

        // Cookie check
        if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }

        // Authorization header check (Bearer token)
        if (!token && req.headers.authorization) {
            if (req.headers.authorization.startsWith("Bearer")) {
                token = req.headers.authorization.split(" ")[1];
            }
        }

        // No token
        if (!token) {
            return res.status(401).json({
                message: "Not authorized, no token"
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        req.user = user;

        next();

    } catch (error) {
        res.status(401).json({
            message: "Token failed",
            error: error.message
        });
    }
};


module.exports = protect;