import app from "./app.js"
import { PORT } from "./config/env.js"
import { connectDB } from "./config/db.js"


connectDB() ;

app.listen(PORT , ()=> {
    console.log(`Server is running on ${PORT}`)
})
