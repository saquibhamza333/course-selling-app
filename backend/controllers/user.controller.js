import bcrypt from "bcryptjs"
import {User} from "../models/user.model.js"
import { generateAccessToken,generateRefreshToken } from "../services/auth.service.js";



export const signup = async(req,res)=>{
  try{
    const {email,password,firstName,lastName} = req.body;

  const existingUser = await User.findOne({email});

  if(existingUser){
    return res.status(400).json({message: "Email already in use"});
  }

    const hashedPassword = await bcrypt.hash(password,9);

    const newUser = new User({
        email,
        password: hashedPassword,
        firstName,
        lastName
    })

    await newUser.save();

    res.json({message: "Signed up successfully"});
  }
  catch(error) {
     console.error("Signup Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }

    


}

export const signin = async (req, res) => {
    try {

        const { email, password } = req.body;

     
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid email" });
        }

        const isValidPassword =  bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({ message: "Invalid password" });
        }

        
        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,   
            secure: false,    
            sameSite: "strict", 
        });

        res.json({ accessToken });

    } catch (error) {
        console.error("Signin Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
