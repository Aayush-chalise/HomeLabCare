import user from "../models/User.js";
import { generatejsontoken } from "../utils/generatetoken.js";

export const signupuser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const existinguser = await user.findOne({ email });
    if (existinguser) {
      return res.status(400).json({ message: "user already exists" });
    }

    const newuser = await user.create({
      name,
      email,
      password,
      role
    });

    res.status(201).json({
      id: newuser._id,
      role: newuser.role,
      token: generatejsontoken(newuser._id, newuser.role)
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong while signing up" });
  }
};

export const loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const User = await user.findOne({ email });
    // unauthorized request ho yo !! 
    if (!User) {
      return res.status(400).json({ message: "User doesnot exit " });
    }

    // unauthorized request ho yo !! 
    const matchpass = await User.passwordmatch(password);
    if (!matchpass) {
      return res.status(401).json({ message: "incorrect  email or password" });
    }

    res.json({
      id: User._id,
      role: User.role,
      token: generatejsontoken(user._id, user.role)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
