import bcrypt from "bcryptjs";
import crypto from "crypto";
import User from "../../models/adminModel/dataTables.js";
import { generateToken } from "../../middlewares/auth.js"; 
import { sendResetMail } from "../../middlewares/resetPassword.js";
import { generateOTP, sendOTPEmail } from "../../middlewares/resetPassword.js";
import dotenv from "dotenv";
dotenv.config();
// New User Sign-Up Admin

export const userSignUp = async (req, res) => {
  try {
    const { name, email, contact, password, role } = req.body;

    // Check for missing fields
    if (!name || !email || !contact || !password || !role) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Check if user already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists. Please log in." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const newUser = new User({ name, email, contact, password: hashedPassword, role });
    await newUser.save();

    return res.status(201).json({ message: "User registered successfully!", user: newUser });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ error: "Something went wrong during sign-up." });
  }
};

// User Sign-In Admin
export const userSignIn = async (request, response) => {
  try {
    const { email, password, role } = request.body;
    console.log(email, password, role);

    const user = await User.findOne({ email, role });

    if (!user) {
      return response.status(404).json({ message: "User not found. Please sign up first." });
    }

   //  Generate token using auth.js function
    const token = generateToken(user);
    if (user.role === "Admin") {
      return response.status(200).json({
        message: `Successfully logged in as ${role}!`,
        token,
        user,
      });
    }

    // Validate password
      if(user.role==="User"){

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return response.status(401).json({ error: "Invalid password. Try again." });
        }
        return response.status(200).json({
          message: `Successfully logged in as ${role}!`,
          token,
          user,
        });
      }




  } catch (error) {
    console.error("Login Error:", error);
    return response.status(500).json({ error: "Something went wrong during sign-in." });
  }
};


export const forgotPasswordUser = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required!" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    // Generate and store the reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    user.resetToken = hashedToken;
    user.resetTokenExpiry = Date.now() + 3600000; // 1 hour expiry
    await user.save();

    // Generate reset link (frontend URL)
    const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
    const resetLink = `${FRONTEND_URL}/reset-password/${resetToken}`; // Remove encodeURIComponent()

    console.log("Generated Reset Link:", resetLink);

    // Send email with the reset link
    await sendResetMail(user.email, resetLink);

    res.status(200).json({ message: "Password reset link sent successfully!" });

  } catch (err) {
    console.error("Forgot Password Error:", err);
    res.status(500).json({ error: "Something went wrong!" });
  }
};



export const resetPasswordUser = async (req, res) => {
  try {
    const { token } = req.params; 
    const { newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ message: "Token and new password are required!" });
    }

    console.log("Received Token (from URL):", token);

    // Hash the received token for lookup
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
   

    // Find user by hashed token and check expiry
    const user = await User.findOne({
      resetToken: hashedToken,
      resetTokenExpiry: { $gt: Date.now() }, 
    });

    if (!user) {
      console.log("No user found with this token or token expired.");
      return res.status(400).json({ message: "Invalid or expired token!" });
    }

    console.log("Token is valid. Proceeding with password reset...");

    // Validate password strength
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long and include a number.",
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    // Clear reset token fields
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.status(200).json({ success: true, message: "Password reset successful!" });

  } catch (err) {
    console.error("Reset Password Error:", err);
    res.status(500).json({ message: "Something went wrong! Please try again." });
  }
};


export const logoutUser = async (req, res) => {
  try {
    // Clear cookie storing JWT (if used)
    res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "None" });

    return res.status(200).json({ message: "Logged out successfully!" });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({ message: "Logout failed. Please try again." });
  }

}


export const sendOtpUser = async (req, res) => {
  try {
    const { email, contact, name, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ success: false, message: "Email already exists!" });

    const otp = generateOTP();
    const otpExpiry = Date.now() + 5 * 60 * 1000;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, contact, password: hashedPassword, otp, otpExpiry, isVerified: false });
    await newUser.save();

    await sendOTPEmail(email, otp);

    res.status(200).json({ success: true, message: "OTP sent successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error sending OTP", error });
  }
};




  export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found!" });

    // Generate new OTP
    const newOTP = generateOTP();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 min expiry

    // Update OTP in the database
    user.otp = newOTP;
    user.otpExpiry = otpExpiry;
    await user.save();

    // Send OTP via Email
    await sendOTPEmail(email, newOTP);

    res.status(200).json({ message: "OTP resent successfully. Please check your email." });
  } catch (error) {
    res.status(500).json({ message: "Error resending OTP", error });
  }
}





export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ success: false, message: "Email and OTP are required!" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }

    // Check if OTP is valid and not expired
    if (!user.otp || user.otp.trim() !== otp.trim() || new Date(user.otpExpiry) < Date.now()) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP!" });
    }

    // Generate auth token
    const token = generateToken(user);

    // Update user as verified and clear OTP fields
    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.status(200).json({
      success: true,
      message: "OTP verified! Logged in successfully.",
      token,
      user,
    });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ success: false, message: "Error verifying OTP", error });
  }
};

