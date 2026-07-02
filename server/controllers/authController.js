import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

//Generate Token
const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};

const hashPassword = async (plaintextPassword) => {
    const saltRounds = 10; // Standard cost factor
    try {
        // Automatically generates a salt and hashes the password
        const hash = await bcrypt.hash(plaintextPassword, saltRounds);
        return hash;
    } catch (error) {
        console.error("Hashing failed", error);
    }
};

// Compare password helper (FIXED syntax)
const comparePassword = async (plainPassword, hashedFromDB) => {
    try {
        const isMatch = await bcrypt.compare(plainPassword, hashedFromDB);
        return isMatch; // Return the result
    } catch (error) {
        console.error("Comparison failed", error);
        return false; // Return false on error
    }
};



//Register
export const registerUser = async(req,res)=>{
    try {
        const { name,email,password } = req.body;

        // hashed password
        const hashedPassword = await hashPassword(password);

        const user = await User.create({name,email,password:hashedPassword});
        return res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            message: "User Created"
        });
    } catch (error){
       return res.status(200).json({ message: "User Already Exist" }); 
    }
}


// Login 
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await comparePassword(password, user.password))) {
      
      const token = generateToken(user._id);

      res.cookie("token", token,{
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

      // ✅ Only send user info
      res.json({
        message: "Signed-In Successfully",
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        }
      });

    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const logoutUser = async (req,res) =>{
    try{
        res.clearCookie("token",{
            httpOnly: true,
            secure: false,
            sameSite: "lax",    
        });

        return res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });

    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}

// Change User Password
export const changePassword = async(req,res)=>{
    try {
        const { currentPassword, newPassword } = req.body;

        const user = await User.findById(req.user.id)
        
        const isMatch = await bcrypt.compare(
            currentPassword,
            user.password
        );

        if(!isMatch){
            return res.status(400).json({
                message: "Current Password is incorrect",
            });
        }

        if(currentPassword === newPassword){
            return res.status(400).json({
                message: "New password cannot be same as current password"
            });
        }

        user.password = await bcrypt.hash(newPassword,10);
        await user.save();

        res.status(200).json({
            message: "Password updated successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}