
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cloudinaryconnect from "./config/Cloudinary.js";
import UserRoute from "./routes/User.js";
import ItemRoute from "./routes/Item.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
}));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

// Cloudinary connection
cloudinaryconnect();

// Routes
app.use("/api/v1/auth", UserRoute);
app.use("/api/v1/item", ItemRoute);

// Health check
app.get("/", (req, res) => {
    res.json({ status: "Server is running" });
});

// Database connection
import dbConnect from './config/db.js';
dbConnect().then(() => {
    app.listen(port, "0.0.0.0", () => {
        console.log(`Server running on http://0.0.0.0:${port}`);
    });
}).catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
});
