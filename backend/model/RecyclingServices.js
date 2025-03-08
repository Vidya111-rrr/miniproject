import mongoose from "mongoose";

const RecyclerSchema = new mongoose.Schema(
  {
  recyclerName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  recyclingCategory: { type: String, required: true },
  processingCapacity: { type: String, required: true },
  }
);

export default mongoose.model("RecyclingServices", RecyclerSchema);
