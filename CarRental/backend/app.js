import dotenv from "dotenv";
dotenv.config();

import express from "express";
import session from "express-session";
import adminRouter from "./router/adminLognIn.js"; // Admin Router
import hostRouter from "./router/hostRouter.js"//Host Router
import userRouter from "./router/userLognIn.js" // User Router

const app = express();

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
