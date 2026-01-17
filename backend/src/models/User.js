import mongoose from "mongoose"
import  bcrypt from "bcryptjs"

const UserScheme = new mongoose.Schema(
    {
        name : {
            type : String ,
            required : true ,
            trim : true
        } ,
        email : {
            type : String ,
            required : true ,
            unique : true ,
            lowercase:true
        } ,
        password : {
            type : String ,
            required : true 
        } ,
        role  : {
            type : String ,
            enum : ["user" , 'doctor' , 'clinicWorker' , "admin"] ,
            required : true 

        }
    } , {
        timestamps : true
    }
)


UserScheme.pre("save" , async function () {
    if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password , 10)
    }
})

UserScheme.methods.matchPassword = async function (entered_password) {
    return await bcrypt.compare(entered_password , this.password)
}



export default mongoose.model("User" , UserScheme)