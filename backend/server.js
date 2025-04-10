import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db.js';
import authRoutes from './Routes/auth.js';
import loginRoute from './Routes/loginRoute.js';
import registerRoute from './Routes/registerRoute.js';
import bidRoutes from './Routes/bidRoutes.js';
import wastecollectionRoute from './Routes/wastecollectionRoute.js';
import userRoutes from './Routes/userRoutes.js';
import adminRoute from './Routes/adminRoute.js';

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use(authRoutes);
app.use(loginRoute);
app.use('/api/register', registerRoute);
app.use(wastecollectionRoute);
app.use(userRoutes);
app.use('/api/admin', adminRoute); // Mounts adminRoute at /api/admin
app.use('/', bidRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});