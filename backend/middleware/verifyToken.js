import jwt from "jsonwebtoken";
import User from "../model/User.js"; // Import your User model

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded._id) {
      return res.status(401).json({ message: "Invalid token: Missing user ID." });
    }

    // Fetch the user from the database to ensure they still exist
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }

    // Attach user details to req.user
    req.user = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };

    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({ message: "Invalid token", error: error.message });
  }
};

export default verifyToken;