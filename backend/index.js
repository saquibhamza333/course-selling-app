import express from 'express';

import mongoose from "mongoose";


const app = express();
const PORT = process.env.PORT||5000



app.use("/api/v1/user",);
app.use("/api/v1/admin",);
app.use("/api/v1/course",);


import mongoose from "mongoose";


const connectDB =  async() =>{
    
    const MONGODB_URI = process.env.MONGODB_URI


    try{


        const conn = await mongoose.connect(MONGODB_URI);

        console.log("MongoDB connected",conn.connection.host);

    } catch(error){

        throw new Error("Error connecting to database", error);

        

    }



}

app.listen(PORT , ()=>{
    connectDB();

    console.log("server is running on port " + PORT);

});
