import express from 'express';
import dotenv from 'dotenv';
// import Razorpay from 'razorpay';
import cors from 'cors';
// import { validateWebhookSignature } from 'razorpay/dist/utils/razorpay-utils.js';
dotenv.config();
import dbConnect from './config/db.js';
const port = process.env.PORT || 5000
app.use(cors({
    origin: "*",
    credentials: true
}))
import UserRoute from "./routes/User.js"
import ItemRoute from "./routes/Item.js"
import cookieParser from "cookie-parser";
const app = express();
import fileUpload from "express-fileupload"
import cloudinaryconnect from "./config/Cloudinary.js"
app.use(cookieParser());

dbConnect();


app.use(express.json());

// const allowedOrigins = [
//   "http://localhost:5173"
// ];

app.use(cors());




// allow server to accept and manage files uploaded by client through HTML form or API request.
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp/'
  }));
  
  // connection with cloudinary:
  cloudinaryconnect();



app.get("/", (req, res) => {
    res.send("express app is running")
});


app.use("/api/v1/auth",UserRoute)
app.use("/api/v1/item",ItemRoute)

app.listen(port, () => {
    console.log(`server is listening in the port ${port}`);
})