import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();


if (!process.env.EMAIL_ADMIN || !process.env.EMAIL_ADMIN_PASSWORD) {
  console.error(" Missing Email Credentials! Check your .env file.");
  process.exit(1);
}

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ADMIN,
    pass: process.env.EMAIL_ADMIN_PASSWORD, // Use an app password, not your actual Gmail password
  },
});

// Function to send reset password email
export const sendResetMail = async (userEmail, resetLink) => {
  try {
    if (!userEmail || !resetLink) {
      throw new Error("User  email or reset link is missing!");
    }
    const mailOptions = {
      from: `"CarSwift " <${process.env.EMAIL_ADMIN}>`,
      to: userEmail,
      subject: "Reset Your Password",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #007bff; padding: 20px; text-align: center;">
            <h1 style="color: #fff; margin: 0;">Car Rental System</h1>
            <p style="color: #fff; font-size: 18px;">We’re here to help you!</p>
          </div>
          <div style="padding: 20px;">
            <h2 style="color: #333;">Password Reset Request</h2>
            <p style="font-size: 16px;">We received a request to reset your password. Click the button below to create a new password:</p>
            <a href="${resetLink}" 
               style="display: inline-block; padding: 12px 25px; margin: 20px 0; font-size: 16px; 
                      color: #fff; background-color: #28a745; text-decoration: none; border-radius: 5px; 
                      transition: background-color 0.3s;">
               Reset Password
            </a>
            <p style="color: #666; font-size: 14px;">This link will expire in 1 hour for security reasons.</p>
            <p style="color: #666; font-size: 14px;">If you did not request this, please ignore this email.</p>
          </div>
          <div style="background-color: #f8f9fa; padding: 10px; text-align: center;">
            <p style="color: #666; font-size: 12px;">&copy; ${new Date().getFullYear()} CarSwift. All rights reserved.</p>
          </div>
        </div>
      `,
    };
    
    await transporter.sendMail(mailOptions);
    console.log(`Reset email sent successfully to: ${userEmail}`);
    return true;
  } catch (error) {
    console.error("Email Sending Error:", error.message || error);
    throw new Error("Failed to send reset email. Please try again.");
  }
};

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
};



export const sendOTPEmail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ADMIN, // Your Gmail
        pass: process.env.EMAIL_ADMIN_PASSWORD, // Your Gmail App Password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_ADMIN,
      to: email,
      subject: "Your One-Time Password (OTP) Code",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #007bff; padding: 20px; text-align: center;">
            <h1 style="color: #fff; margin: 0;">Welcome to CarSwift!</h1>
            <p style="color: #fff; font-size: 18px;">Your One-Time Password (OTP) is here!</p>
          </div>
          <div style="padding: 20px; text-align: center;">
            <h2 style="color: #333;">Your OTP</h2>
            <h1 style="font-size: 36px; color: #28a745;">${otp}</h1>
            <p style="font-size: 16px;">This OTP is valid for 5 minutes.</p>
            <p style="color: #666; font-size: 14px;">For your security, please do not share this code with anyone.</p>
            <p style="color: #666; font-size: 14px;">If you did not request this code, please ignore this email.</p>
          </div>
          <div style="background-color: #f8f9fa; padding: 10px; text-align: center;">
            <p style="color: #666; font-size: 12px;">&copy; ${new Date().getFullYear()} Your Company Name. All rights reserved.</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("OTP sent successfully!");
  } catch (error) {
    console.error("Error sending OTP:", error);
  }
};




export const sendEmail = async (to, subject, text, html) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html,
    });
    console.log(`Email sent successfully to ${to}`);
  } catch (error) {
    console.error(`Error sending email: ${error}`);
  }
};