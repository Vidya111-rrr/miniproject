import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../model/User.js'; // Ensure correct path
import sendMail from '../utils/sendMail.js'; // Ensure this utility exists
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Forgot Password Route
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  console.log('🔐 Forgot password request received:', { email });

  try {
    const user = await User.findOne({ username: email });
    if (!user) {
      console.log('⚠️ User not found for email:', email);
      return res.status(404).json({ message: 'User not found' });
    }

    const resetToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1h' }
    );

    const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
    console.log('📧 Sending reset link:', resetLink);

    await sendMail(
      email,
      'Password Reset Request',
      `Click this link to reset your password: ${resetLink}\nThis link will expire in 1 hour.`
    );

    console.log('✅ Reset email sent successfully to:', email);
    return res.status(200).json({ message: 'Reset link sent to email' });
  } catch (error) {
    console.error('❌ Forgot password error:', error.message);
    return res.status(500).json({ message: 'Failed to send reset email', error: error.message });
  }
});

// Reset Password Route
router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;
  console.log('🔄 Reset password request received:', { token });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    console.log('✅ Token decoded:', decoded);

    const user = await User.findById(decoded.userId);
    if (!user) {
      console.log('⚠️ User not found for ID:', decoded.userId);
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    console.log('🔓 Password reset successfully for user:', user.username);
    return res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('❌ Reset password error:', error.message);
    return res.status(400).json({ message: 'Invalid or expired token', error: error.message });
  }
});

export default router;