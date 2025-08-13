const { StatusCodes } = require("http-status-codes");
const jwt=require("jsonwebtoken");
const { SECRET_KEY } = require("../config/serverConfig");

function authVerification(req,res,next){
    const header=req.headers['authorization']
    if(!header){
        return res.status(StatusCodes.BAD_REQUEST).json({error:"header is missing"});
    }
    const token = header.split(' ')[1];
    try {
        const decoded=jwt.verify(token,SECRET_KEY);
        req.email=decoded.email;
        next();
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({error:"invalid token or expired"});
    }
}

module.exports=authVerification