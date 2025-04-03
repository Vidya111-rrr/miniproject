import express from "express";
import User from "../model/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const  router = express.Router();

 router.get("/api/users/me", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    const userId = decoded.userId;
    if(!token){
        res.status(401).json({message : "access denied no token provided"})
    }
    try{ 
        const user = await User.findById(userId).select("-password -__v");

        res.status(200).json(user);
    }

    catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
    } );

router.put("/api/users/update-name" ,async (req,res)=>{
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    const userId = decoded.userId;
    const {name} = req.body;
    if(!token){
        res.status(200).json({message : "access denied no token provided "})
    }
      try
      {
        User.findByIdAndUpdate(userId, { name }, { new: true })
        res.status(200).json({ message: "Name updated successfully" });
      }
      catch (error) {
        console.error("Error updating name:", error);
        res.status(500).json({ message: "Server error", error: error.message });
      }

});

// route to update password

router.put("/api/users/update-password", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
  
    // Check if token exists
    if (!token) {
      return res.status(401).json({ message: "Access denied, no token provided" });
    }
  
    try {
      // Decode the token and get userId
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.userId;
  
      // Extract current and new passwords from the request body
      const { currentPassword, newPassword } = req.body;
  
      // Validate if passwords are provided
      if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: "Current and new passwords are required" });
      }
  
      // Find the user in the database and await the result
      const user = await User.findById(userId);
      
      // Check if user exists
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Compare the current password with the stored password (hashed)
      const isMatch = await bcrypt.compare(currentPassword, user.password);
  
      // If passwords do not match, return error
      if (!isMatch) {
        return res.status(400).json({ message: "Current password is incorrect" });
      }
  
      // Validate the new password (check if it's long enough)
      if (newPassword.length < 8) {
        return res.status(400).json({ message: "New password must be at least 8 characters long" });
      }
  
      // Hash the new password before saving
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Update the user's password with the new hashed password
      user.password = hashedPassword;
      await user.save();
  
      // Respond with success message
      res.status(200).json({ message: "Password updated successfully" });
  
    } catch (error) {
      console.error("Error updating password:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });
  




 export default router;