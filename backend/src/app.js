import express from "express";
import cors from "cors";
import userrouter from "./routes/auth.routes.js";
import protect from "./middlewares/auth.middleware.js";

const app = express();

// Global middlewares
app.use(cors());
app.use(express.json());

//  PUBLIC API routes

app.get("/" , (req , res) => {
    console.log(`requested from ${req.path}`)
    res.json({
        "msg" :"hello from server "
    })
})

// Api for login and sign up 
app.use("/api", userrouter);

app.use(protect) // middle ware for authorization 
// below all rotes are private 

app.get("/profile" , (req , res) => {
    console.log(`requested from ${req.path}`)
    res.json({
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
    })
})



export default app;

