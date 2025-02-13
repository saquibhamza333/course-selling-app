import jwt from "jsonwebtoken"

export const generateAccessToken = (userId) =>{

    return jwt.sign({userId},process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    });

  



}