const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/serverConfig");

function authVerification(authRole = []) {
    return (req, res, next) => {
        const header = req.headers['x-access-token']
        console.log(header);
        if (!header) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: "header is missing" });
        }
        const token = header
        console.log(token);
        try {
            console.log("Received headers:", token);
            const decoded = jwt.verify(token, SECRET_KEY);
            console.log("decoded:",decoded);
            req.email = decoded.email;
            req.role = decoded.role;
            if (authRole.length && !authRole.includes(req.role)) {
                return res
                    .status(StatusCodes.FORBIDDEN)
                    .json({ error: "Forbidden: Insufficient permissions" });
            }

            next();
        } catch (error) {
            console.log(error);
            return res.status(StatusCodes.BAD_REQUEST).json({ error: "invalid token or expired" });
        }
    }
}

module.exports = authVerification