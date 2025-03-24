

import express from "express";
import bcrypt from "bcrypt";
import User from "../model/User.js";
import sendmail from "../utils/sendMail.js";

const router = express.Router();

// **Register User**
router.post("/", async (req, res) => {
  const {name,username, email, password, role, company } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ 
      name,
      role, 
      username: email, 
      email, 
      password: hashedPassword, 
      company 
    });

    await newUser.save();

    // Send success response
    res.status(201).json({ message: "User registered successfully" });

    // Send email notification
    const subject = "Account registered";
    const message = `Hello, your account has been successfully registered.`;
    await sendmail(email, subject, message);

  } catch (error) {
    console.error("❌ Registration Error:", error);
    res.status(500).json({ message: "Error registering user" });
  }
});

export default router;
