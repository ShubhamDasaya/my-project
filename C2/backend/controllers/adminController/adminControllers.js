import bcrypt from "bcryptjs";
import User from "../../models/adminModel/dataTables.js";
import { generateToken } from "../../middlewares/auth.js"; 
// New User Sign-Up Admin
export const userSignUp = async (request, response) => {
  try {
    const { name, email, contact, password, role } = request.body;
    console.log(name, email, contact, password, role);

    if (!name || !email || !contact || !password || !role) {
      return response.status(400).json({ error: "All fields are required." });
    }

    let existingUser = await User.findOne({ email });

    if (existingUser) {
      return response.status(400).json({ error: "User already exists. Please log in." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser = new User({ name, email, contact, password: hashedPassword, role });
    await newUser.save();

    return response.status(201).json({ message: "User registered successfully!", user: newUser });
  } catch (error) {
    console.error("Signup Error:", error);
    return response.status(500).json({ error: "Something went wrong during sign-up." });
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

    // Check if the account is suspended
    if (user.status === "Suspended") {
      return response.status(403).json({ error: "Your account is suspended. Please contact support." });
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
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return response.status(401).json({ error: "Invalid password. Try again." });
    }
    return response.status(200).json({
      message: `Successfully logged in as ${role}!`,
      token,
      user,
    });



  } catch (error) {
    console.error("Login Error:", error);
    return response.status(500).json({ error: "Something went wrong during sign-in." });
  }
};
