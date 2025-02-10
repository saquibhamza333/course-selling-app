import bcrypt from "bcryptjs"

export const signup = (req,res)=>{
    const {email,password} = req.body;
    const hashedPassword =bcrypt.hash(password,5);
    

}