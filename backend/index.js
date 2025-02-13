import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/connectDB.js";
import { signin, signup } from "./controllers/user.controller.js"; // Ensure correct file extension

dotenv.config(); 
const app = express();
app.use(express.json());



app.post('/signup', signup);
app.post('/signin', signin);
// Function to start the server
const startServer = async () => {

    try {
        await connectDB(); // Ensure DB connection before starting server
        console.log("✅ Database connected successfully");

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("❌ Database connection failed:", error);
        process.exit(1); // Exit process if DB connection fails
    }
};
startServer();
