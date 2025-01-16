import express from "express"
const router = express.Router();


import { auth } from "../middlewares/auth"
import {deleteAccount} from "../controllers/Profile"




router.delete("/deleteProfile",auth,deleteAccount)
