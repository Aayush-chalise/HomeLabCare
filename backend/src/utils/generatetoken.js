import jwt from "jsonwebtoken"
import { JWT_KEY } from "../config/env.js"


export const generatejsontoken = ( id , role)=> {
  return jwt.sign({
    "id": id ,
    "role": role 
  } , 
   JWT_KEY ,
  {expiresIn : "30M"}
 )

}

