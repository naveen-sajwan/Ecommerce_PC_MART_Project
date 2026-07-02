import jwt from "jsonwebtoken";
import User from "../models/User.js";

// export const protect = async(req,res,next)=>{
//     try {
//         console.log("Cookies received:", req.cookies);
//         const token = req.cookies?.token;

//         if(!token){
//             console.log("No token provided");
//             return res.status(401).json({ msg: "Not authenticated" });
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         req.user = await User.findById(decoded.id).select("-password");
//         next();

//     } catch (error) {
//         console.log("Token verification failed:", error);
//         return res.status(401).json({ msg: "Not Authorized token failed" });
//     }
// }

export const protect = async(req,res,next)=>{
    try {

        console.log("Middleware hit");

        console.log("Cookies received:", req.cookies);

        const token = req.cookies?.token;

        console.log("Token:", token);

        if(!token){
            console.log("No token provided");
            return res.status(401).json({
              msg: "Not authenticated"
            });
        }

        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET
        );

        console.log("Decoded:", decoded);

        req.user = await User.findById(decoded.id)
          .select("-password");

        console.log("User found:", req.user);

        next();

    } catch (error) {

        console.log(
          "Token verification failed:",
          error
        );

        return res.status(401).json({
          msg: "Not Authorized token failed"
        });
    }
}