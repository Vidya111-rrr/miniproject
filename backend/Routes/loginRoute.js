import express from "express";
import User from  "../model/User.js"
import bcrypt from 'bcryptjs'; 
import jwt from "jsonwebtoken"; // Import jwt for token generation

const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user in the database
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token with user role
    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET, // Use environment variable for JWT secret
      { expiresIn: '1h' } // Token expiration time
    );

    // Send the token and role in the response
    res.status(200).json({ message: 'Login successful', token, role: user.role });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;