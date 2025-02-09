import mongoose from "mongoose";

export const connectDB =  async() =>{
    const MONGODB_URI = process.env.MONGODB_URI


    try{


        const conn = await mongoose.connect(MONGODB_URI);

        console.log("MongoDB connected",conn.connection.host);

    } catch(error){

        throw new Error("Error connecting to database", error);

        

    }



}
