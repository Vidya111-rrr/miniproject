import express from "express";
import jwt from "jsonwebtoken";
import Bid from "../model/Bid.js";
import WasteCollection from "../model/WasteCollection.js";
import User from "../model/User.js"; // Import User model to fetch bidder details

const router = express.Router();

// POST /api/bids - Submit a new bid
router.post("/api/bids", async (req, res) => {
  try {
    const { bidAmount, wasteId, bidderEmail, sellerEmail } = req.body;

    // Validate input
    if (!bidAmount || bidAmount <= 0) {
      return res.status(400).json({ message: "Bid amount must be a positive number" });
    }
    if (!wasteId) {
      return res.status(400).json({ message: "Waste ID is required" });
    }
    if (!bidderEmail) {
      return res.status(400).json({ message: "Bidder email is required" });
    }

    if (!sellerEmail) {
      return res.status(400).json({ message: "Seller email is required" });
    }

    // Extract token from Authorization header
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    // Decode the token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded Token:", decoded); // Debug: Log the decoded token
    } catch (error) {
      console.error("Token verification error:", error);
      return res.status(401).json({ message: "Invalid token", error: error.message });
    }

    // Ensure the decoded token has a user ID and the email matches bidderEmail
    if (!decoded.userId || decoded.username !== bidderEmail) {
      return res.status(401).json({ message: "Invalid token: User email does not match bidder email." });
    }

    // Fetch the bidder's name from the User model using the bidderEmail
    const user = await User.findOne({ email: bidderEmail });
    if (!user) {
      return res.status(404).json({ message: "Bidder not found" });
    }

    const bidderName = user.name; // Assuming the 'name' field in User model stores the name

    // Find the waste collection entry
    const wasteCollection = await WasteCollection.findById(wasteId);
    if (!wasteCollection) {
      return res.status(404).json({ message: "Waste collection not found" });
    }

    // Verify that the sellerEmail matches the email in the waste collection
    if (wasteCollection.email !== sellerEmail) {
      return res.status(400).json({ message: "Seller email does not match the waste collection email." });
    }

    // Create a new bid
    const bid = new Bid({
      bidderName,
      bidAmount,
      bidderEmail,
      sellerEmail,
      wasteId,
    });

    // Save the bid
    await bid.save();

    res.status(201).json({ message: "Bid submitted successfully", bid });
  } catch (error) {
    console.error("Error submitting bid:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET /api/bids - Retrieve all bids with bidder names
router.get("/api/bids", async (req, res) => {
  try {
    // Fetch all bids and populate the wasteId field with waste details
    const bids = await Bid.find()
      .populate("wasteId", "name email address phone wasteCategory wasteAmount") // Populate waste collection details
      .populate("bidderEmail", "name") // Populate bidder's name using the email
      .exec();

    // Return the bids with populated waste and bidder details
    res.status(200).json(bids);
  } catch (error) {
    console.error("Error fetching all bids:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
