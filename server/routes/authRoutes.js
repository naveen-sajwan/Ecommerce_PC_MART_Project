import express from "express";
import User from "../models/User.js";
import {
    registerUser,
    loginUser,
    logoutUser,
    changePassword
} from "../controllers/authController.js"
import {protect} from "../middlewares/authMiddleware.js" 

const router = express.Router();

// auth routes defined here
router.post("/register",registerUser);
router.post("/login",loginUser);
router.post("/logout", logoutUser);
router.put("/change-password",protect,changePassword);

router.get("/me", protect, async(req, res) => {
  try {

    console.log("/me route reached");

    console.log("req.user:", req.user);

    // const user = await User.findById(req.user.id)
    //   .select("-password");

    console.log("User from DB:", req.user);

    return res.json(req.user);

  } catch (error) {

    console.log("ME ROUTE ERROR:", error);

    return res.status(500).json({
      msg: "Server Error"
    });

  }

});
export default router;