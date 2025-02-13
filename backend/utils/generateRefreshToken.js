import jwt from "jsonwebtoken"


export const generateRefreshToken = (userId)=>{

    return jwt.sign({userId},process.env.REFRESH_TOKEN_SECRET,{
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    })

}