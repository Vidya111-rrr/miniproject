import express from 'express';
import wastecollectionRoute from './Routes/wastecollectionRoute.js';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from "./db.js";
import loginRoute from "./Routes/loginRoute.js";
import registerRoute from "./Routes/registerRoute.js";
import bidRoutes from "./Routes/bidRoutes.js"


dotenv.config();  //used for storing sensitive datas 


const app = express();
const PORT = process.env.PORT || 4000;


app.use(cors());
  
app.use(express.json());
 // To parse JSON bodies
connectDB();
app.use(loginRoute);
app.use("/api/register",registerRoute);
app.use(wastecollectionRoute);
app.use("/", bidRoutes);

  
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

});
  
  