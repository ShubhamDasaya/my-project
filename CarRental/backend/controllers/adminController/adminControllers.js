import bcrypt from 'bcryptjs'
import User from "../../models/adminModel/dataTables.js";
import jwt from "jsonwebtoken"

// New User Sign-Up Admin
export const userSignUp = async (request, response) => {
  try {
    const { name, email, contact, password, confirmPassword,role } = request.body;

    if (password !== confirmPassword) {
      return response.status(400).json({ error: "Passwords do not match." });
    }

    let existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return response.status(400).json({ error: "User already exists. Please log in." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser = await User.create({ name, email, contact, password: hashedPassword ,role});

    return response.status(201).json({ message: "User registered successfully!", user: newUser });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: "Something went wrong during sign-up." });
  }
};



// User Sign-In Admin
export const userSignIn = async (request, response) => {
  try {
      const { email, password, role } = request.body;

      const user = await User.findOne({ where: { email ,role } });
      if (!user) {
          return response.status(404).json({ message: "User not found. Please sign up first." });
      }

      // Check if the account is suspended
      if (user.status === "Suspended") {
          return response.status(403).json({ error: "Your account is suspended. Please contact support." });
      }

      const token = jwt.sign(
        {id:user.id,email:user.email,role:user.role},
        process.env.JWT_SECRET,
        {expiresIn: "1h" }
      )

      if(user.role == "Admin"){
        return response.status(200).json({message:`Successfully logged in as ${role}!`,token})
      }


      // Validate password
      if(user.role == "User"||user.role == "Host"){

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return response.status(401).json({ error: "Invalid password. Try again." });
          }
          return response.status(200).json({ message: `Successfully logged in as ${role}!`,token });
        }
       
  } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Something went wrong during sign-in." });
  }
};

// User Homepage Route
export const userHomepage = (request, response) => {
  return response.status(200).json({ message: "Welcome to the User Panel!" });
};
