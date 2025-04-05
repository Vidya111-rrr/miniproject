import express from 'express';
import User from '../model/User.js';

const router = express.Router();

// Admin route to get all users
// Endpoint: GET /api/admin/users
// Description: Fetches all users from the database (publicly accessible)
router.get('/admin/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin route to delete a user
// Endpoint: DELETE /api/admin/users/:id
// Description: Deletes a user by their ID (publicly accessible)
router.delete('/admin/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;