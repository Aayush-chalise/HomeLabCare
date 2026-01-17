import  express from "express"
import cors from "cors"

const app = express() 


app.use(cors())
app.get("/" , async (req , res) => {
    res.json({"msg":"hello from server "})
})

export default app 