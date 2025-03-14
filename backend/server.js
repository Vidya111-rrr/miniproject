import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt'; // For hashing passwords
import jwt from 'jsonwebtoken'; // For generating tokens
import User from './model/User.js'; // Create a User model for the database
import WasteCollection from './model/WasteCollection.js'; // Import the WasteCollection model
import Recycler from './model/RecyclingServices.js';

dotenv.config();  //used for storing sensitive datas 

// remove this console loges after verifying data  in .env is printed in console 
console.log("MONGO_URI:", process.env.MONGO_URI);
console.log("JWT_SECRET:", process.env.JWT_SECRET);
console.log("PORT:", process.env.PORT);
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);
console.log("EMAIL_HOST:", process.env.EMAIL_HOST);
console.log("EMAIL_PORT:", process.env.EMAIL_PORT);

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET;


// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // React front-end URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'], // Add 'Authorization' here
}));

app.use(express.json()); // To parse JSON bodies

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Default Route
app.get('/', (req, res) => {
  res.send('MERN Stack Backend Running');
});

// Login Route

app.post('/api/login', async (req, res) => {
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

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: '1h' } // Token expiration time
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Register Route
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed Password:', hashedPassword);

    // Create new user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Error registering user' });
  }
});

// POST Route to submit waste collection data
app.post('/api/waste-collection', async (req, res) => {
  const { name, email, address, phone, wasteCategory, wasteAmount } = req.body;

  try {
    const newWasteData = new WasteCollection({
      name,
      email,
      address,
      phone,
      wasteCategory,
      wasteAmount,
    });

    await newWasteData.save();

    res.status(201).json({ message: 'Waste collection data submitted successfully' });
  } catch (err) {
    console.error('Error saving waste collection data:', err);

    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message }); // Send specific validation error messages
    }

    res.status(500).json({ message: 'Error submitting waste collection data' });
  }
});


// GET Route to retrieve waste collection data
app.get('/api/waste-collection', async (req, res) => {
  try {
    const wasteData = await WasteCollection.find();
    res.status(200).json(wasteData);
  } catch (err) {
    console.error('Error fetching waste collection data:', err);
    res.status(500).json({ message: 'Error fetching waste collection data' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
