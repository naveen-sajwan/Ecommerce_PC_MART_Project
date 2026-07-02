import dotenv from "dotenv";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendContactEmail = async ({ name, email, message }) => {
  try {
    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: [process.env.ADMIN_EMAIL],
      // replyTo: email, // This allows you to reply directly to the person
      subject: `New Contact Form Message from ${name}`,
      text: `New message from ${name} \n\n email: (${email})\n\n message: ${message}`
    });

    if (error) {
      console.error('Resend API Error:', error);
      throw new Error(error.message);
    }

    console.log(`Email sent successfully! ID: ${data.id}`);
    return { success: true, messageId: data.id };
    
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};