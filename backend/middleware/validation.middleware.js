import {z} from "zod"


const signupSchema = z.object({
    firstName : z.string().min(2,"First Name must be at least 2 characters long").trim(), 
    lastName : z.string().min(2,"Last Name must be at least 2 characters long").trim(), 
    email : z.string().email("Invalid email format").trim(), 
    password : z.string().min(6,"Password must be at least 6 characters long").trim(),

  });

  const signinSchema = z.object({
      email : z.string().email("Invalid email format").trim(), 
    password : z.string().min(6,"Password must be at least 6 characters long").trim(),
  })


  export const validateSignup=(req, res, next)=>{
      const result = signupSchema.safeParse(req.body);
    if(!result.success) {
    return res.status(400).json({message: "Invalid input", errors:result.error.format()})
  }
  next();

  }

  export const validateSignin = (req, res,next) => {
    const result = signinSchema.safeParse(req.body);
    if(!result.success){
        return res.status(400).json({message:"Invalid input", errors:result.error.format()});
    } 

    next();

  }