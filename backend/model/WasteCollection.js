import mongoose from "mongoose";

// Define the schema for waste collection data
const wasteCollectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"], // Email validation
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    wasteCategories: {
      type: [String], // ✅ Change from String to an array of Strings
      required: true,
      enum: ["Plastic", "Paper", "Glass", "Metal", "Organic", "Other"], // Allowed categories
    },
    wasteAmounts: {
      type: [Number], // ✅ Allow multiple amounts corresponding to each category
      required: true,
      validate: {
        validator: function (values) {
          return values.every((val) => val >= 0); // Ensure all values are non-negative
        },
        message: "Waste amount cannot be negative",
      },
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create and export the model for WasteCollection
const WasteCollection = mongoose.model("WasteCollection", wasteCollectionSchema);
export default WasteCollection;
