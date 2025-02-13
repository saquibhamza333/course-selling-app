import bcrypt from "bcryptjs"
import {z} from "zod"
import {User} from "../models/user.model.js"
import { generateAccessToken } from "../utils/generateAcessToken.js";
import { generateRefreshToken } from "../utils/generateRefreshToken.js";


export const signup = async(req,res)=>{
  const requiredBody = z.object({
    firstName : z.string().min(2,"First Name must be at least 2 characters long").trim(), 
    lastName : z.string().min(2,"Last Name must be at least 2 characters long").trim(), 
    email : z.string().email("Invalid email format").trim(), 
    password : z.string().min(6,"Password must be at least 6 characters long").trim(),

  });
  const parsedBody = requiredBody.safeParse(req.body);
  if(!parsedBody.success) {
    return res.status(400).json({message: "Invalid input", errors:parsedBody.error.format()})
  }

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
