import express from "express"
import { signupuser , loginuser } from "../controllers/auth.controllers.js"

const auuthrouter = express.Router()

auuthrouter.post("/signup" , signupuser)
auuthrouter.post("/login" ,loginuser)

export default auuthrouter