import dotenv from "dotenv";
import express from "express";
import { sendContactEmail } from "../config/emailService.js";

const router = express.Router();

router.post("/sendMail",async(req,res)=>{
  try {
    const { name, email, message } = req.body;

    // Send the email
    await sendContactEmail({ name, email, message });

    // Return success response
    res.status(200).json({
      success: true,
      msg: "Email Sent Successfully"
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send your message.'
    });
  }
})

export default router;
