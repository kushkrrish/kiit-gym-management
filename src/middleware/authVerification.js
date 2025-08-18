const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/serverConfig");

function authVerification(authRole = []) {
    return (req, res, next) => {
        const header = req.headers['authorization']
        if (!header) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: "header is missing" });
        }
        const token = header.split(' ')[1];
        try {
            const decoded = jwt.verify(token, SECRET_KEY);
            req.email = decoded.email;
            req.role = decoded.role;
            if (authRole.length && !authRole.includes(req.role)) {
                return res
                    .status(StatusCodes.FORBIDDEN)
                    .json({ error: "Forbidden: Insufficient permissions" });
            }

            next();
        } catch (error) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: "invalid token or expired" });
        }
    }
}

module.exports = authVerification