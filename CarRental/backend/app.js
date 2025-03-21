import dotenv from "dotenv";
dotenv.config();
import cors from 'cors'
import express from "express";
import session from "express-session";
import adminRouter from "./router/adminLognIn.js"; // Admin Router
import hostRouter from "./router/hostRouter.js"//Host Router
import userRouter from "./router/userLognIn.js" // User Router
import { body } from 'express-validator';
import { userSignIn, userSignUp } from './controllers/adminController/adminControllers.js';
const app = express();

// app.use(cors());
app.use(cors({ credentials: true,}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Session Middleware
app.use(
  session({
    secret: process.env.SESSION_KEY || "default_secret",
    resave: false,
    saveUninitialized: true,
    
  })
);


app.post("/signup",
    body("name","name is requied").notEmpty(),
    body("email", "Invalid Email id").isEmail(),
    body("email", "Email id is required").notEmpty(),
    body("contect","contect is requied").notEmpty(),
    body("password", "Password is required").notEmpty(),
    body("password", "Invalid Password").isLength({ min: 6, max: 10 }), 
     userSignUp);
// Admin login    
app.post("/login",
        body("email","Invalid Email").isEmail(),
        body("password","Password is required").notEmpty(),
         userSignIn
    );
// Routers
app.use("/admin", adminRouter);
app.use("/host",hostRouter);
app.use("/user", userRouter);

// Error Handling Middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: "Something went wrong!" });
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
