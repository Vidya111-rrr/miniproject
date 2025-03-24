import express from "express";
import WasteCollection from "../model/WasteCollection.js";

const router = express.Router();

// ✅ Create a new waste collection request
router.post("/api/waste-collection", async (req, res) => {
  try {
    const { name, email, address, phone, wasteCategories, wasteAmounts } = req.body;

    // ✅ Ensure wasteCategories and wasteAmounts are arrays and have the same length
    if (!Array.isArray(wasteCategories) || !Array.isArray(wasteAmounts)) {
      return res.status(400).json({ message: "Waste categories and amounts must be arrays." });
    }
    if (wasteCategories.length !== wasteAmounts.length) {
      return res.status(400).json({ message: "Each waste category must have a corresponding waste amount." });
    }

    // ✅ Create and save the waste collection entry
    const newRequest = new WasteCollection({
      name,
      email,
      address,
      phone,
      wasteCategories,
      wasteAmounts,
    });

    await newRequest.save();

    res.status(201).json({ message: "Waste collection request created successfully", data: newRequest });
  } catch (error) {
    console.error("Error in waste collection:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get all waste collection requests
router.get("/api/waste-collection", async (req, res) => {
  try {
    const wasteCollections = await WasteCollection.find();
    res.status(200).json(wasteCollections);
  } catch (error) {
    console.error("Error fetching waste collection data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
