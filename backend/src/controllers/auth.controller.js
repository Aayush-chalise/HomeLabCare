import User from "../models/User.js"
import generateToken from "../utils/generateToken.js"


export const registerUser = async (req , res) => {
    const { name , email , password , role } = req.body 
    
    const UserExists = await User.findOne({email})
    if(UserExists) {
        return res.status(400).json({
            message : "User already exists"
        })
    }
    const  user = await User.create({ name , email , password , role})
    res.status(201).json({
        id : user.id ,
        role : user.role ,
        token : generateToken( user.id , user.role)
    })
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      id: user._id,
      role: user.role,
      token: generateToken(user._id, user.role)
    })
  }
   else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};