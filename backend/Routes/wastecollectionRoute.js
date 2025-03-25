import express from "express";
import WasteCollection from "../model/WasteCollection.js";

const router = express.Router();

// ✅ Create a new waste collection request (single waste category)
router.post("/api/waste-collection", async (req, res) => {
  try {
    const { name, email, address, phone, wasteCategory, wasteAmount } = req.body;

    // ✅ Validate input
    if (!name || !email || !address || !phone || !wasteCategory || !wasteAmount) {
      return res.status(400).json({ message: "All fields are required: name, email, address, phone, wasteCategory, wasteAmount." });
    }

    if (wasteAmount <= 0) {
      return res.status(400).json({ message: "Waste amount must be a positive number." });
    }

    // ✅ Create and save the waste collection entry
    const newRequest = new WasteCollection({
      name,
      email,
      address,
      phone,
      wasteCategory,
      wasteAmount,
    });

    await newRequest.save();

    res.status(201).json({ message: "Waste collection request created successfully", data: newRequest });
  } catch (error) {
    console.error("Error in waste collection:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Get all waste collection requests
router.get("/api/waste-collection", async (req, res) => {
  try {
    const wasteCollections = await WasteCollection.find();
    res.status(200).json(wasteCollections);
  } catch (error) {
    console.error("Error fetching waste collection data:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;