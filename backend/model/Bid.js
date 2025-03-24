import mongoose from "mongoose";

// Define the schema for bids
const bidSchema = new mongoose.Schema(
  {
    bidAmount: {
      type: Number,
      required: true,
      min: [0, "Bid amount cannot be negative"],
    },
    bidderEmail: {
      type: String,
      required: true,
    },
    sellerEmail: {
      type: String,
      required: true,
    },
    wasteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WasteCollection", // Reference to the WasteCollection model
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create and export the model for Bid
const Bid = mongoose.model("Bid", bidSchema);
export default Bid;