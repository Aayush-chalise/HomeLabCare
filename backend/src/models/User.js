import mongoose from "mongoose";
import bcrypt from "bcryptjs"


const modeluser = new mongoose.Schema ({
name : {
            type : String ,
            required : true ,
            trim : true
        } ,
        email : {
            type : String ,
            required : true ,
            unique : true 
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
    
})

// hashing of password befor saving in mongo_db , 

modeluser.pre("save" , async function () {
    if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password , 10)
    }
})

// pass matching bro  
modeluser.methods.passwordmatch = async function (pass) {
    return await bcrypt.compare(pass , this.password)
}


// exporting brother our scherme

export default mongoose.model("user" , modeluser)