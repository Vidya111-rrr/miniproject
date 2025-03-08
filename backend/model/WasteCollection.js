import mongoose from 'mongoose';

// Define the schema for waste collection data
const wasteCollectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address'], // Simple email validation
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  wasteCategory: {
    type: String,
    required: true,
    enum: ['Plastic', 'Paper', 'Glass', 'Metal', 'Organic', 'Other'], // Waste category options
  },
  wasteAmount: {
    type: Number,
    required: true,
    min: [0, 'Waste amount cannot be negative'], // Waste amount must be a positive number
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Create and export the model for WasteCollection
const WasteCollection = mongoose.model('WasteCollection', wasteCollectionSchema);
export default WasteCollection;
