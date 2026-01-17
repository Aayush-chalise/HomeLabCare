import  express from "express"
import cors from "cors"
import UserRouter from "./routes/auth.routes.js"
const app = express() 

app.use(express.json())
app.use(cors())
app.get("/" , async (req , res) => {
    res.json({"msg":"hello from server "})
})


// sign andd login router 
app.use("/user" ,UserRouter)

export default app 