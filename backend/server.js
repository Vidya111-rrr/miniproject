import express from 'express';
import wastecollectionRoute from './Routes/wastecollectionRoute.js';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from "./db.js";
import loginRoute from "./Routes/loginRoute.js";
import registerRoute from "./Routes/registerRoute.js";
import bidRoutes from "./Routes/bidRoutes.js"
import userRoutes from "./Routes/userRoutes.js";
import adminRoute from "./Routes/adminRoute.js";

dotenv.config();  //used for storing sensitive datas 


const app = express();
const PORT = process.env.PORT || 4000;


app.use(cors());
  
app.use(express.json());

connectDB();
app.use(loginRoute);
app.use("/api/register",registerRoute);
app.use(wastecollectionRoute);
app.use(userRoutes);
app.use("/", bidRoutes);
app.use("/api",adminRoute);

  
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

});
  
  