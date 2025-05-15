import jwt from "jsonwebtoken";

const auth = (request, response, next) => {
    try {
        const token = request.headers.authorization?.split(" ")[1];

        if (!token) {
            return response.status(401).json({ message: "Access Denied: No Token Provided" });
        }

      
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
              
        request.user = decoded;
        console.log(decoded);
        
        next();
    } catch (error) {
        console.error("JWT Error:", error.message);
        
        if (error.name === "TokenExpiredError") {
            return response.status(401).json({ message: "Session expired, please log in again." });
        }

        response.status(400).json({ message: "Invalid Token" });
    }
};

export const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
};

export default auth;
