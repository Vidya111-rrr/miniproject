import express from "express";
import WasteCollection from "../model/WasteCollection.js";
import Bid from "../model/Bid.js"; // Import Bid model
import sendmail from "../utils/sendMail.js"; // Import sendmail function
import jwt from "jsonwebtoken"; // Import jsonwebtoken to decode the token

const router = express.Router();

// ✅ Create a new waste collection request (single waste category)
router.post("/api/waste-collection", async (req, res) => {
  try {
    const { name, email, address, location,phone, wasteCategory, wasteAmount } = req.body;

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
      location,
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

// ✅ Accept a bid (without middleware)
router.post("/api/waste-collection/accept-bid/:bidId", async (req, res) => {
  try {
    const { bidId } = req.params;

    // Extract the token from the Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: "No token provided. Please log in." });
    }

    // Decode the token to get user information
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your JWT secret from .env
    } catch (err) {
      return res.status(401).json({ message: "Invalid token. Please log in again." });
    }

    // Find the bid
    const bid = await Bid.findById(bidId).populate('wasteId');
    if (!bid) {
      return res.status(404).json({ message: "Bid not found." });
    }

    const waste = bid.wasteId;
    if (!waste) {
      return res.status(404).json({ message: "Associated waste not found." });
    }

    // Ensure the user is the generator who owns the waste
    if (waste.email !== decoded.username) {
      return res.status(403).json({ message: "You are not authorized to accept this bid." });
    }

    // Find all bids associated with the waste
    const relatedBids = await Bid.find({ wasteId: waste._id });

    // Separate the winning bid and other bids
    const winningBid = bid;
    const otherBids = relatedBids.filter((b) => b._id.toString() !== bidId);

    // Delete the waste entry
    await WasteCollection.findByIdAndDelete(waste._id);

    // Delete all related bids
    await Bid.deleteMany({ wasteId: waste._id });

    // Send email to the winning bidder using sendmail
    const winnerSubject = "Congratulations! Your Bid Has Been Accepted";
    const winnerMessage = `
Congratulations!

Dear ${winningBid.bidderEmail},

We are pleased to inform you that your bid for the following waste has been accepted:

- Waste Category: ${waste.wasteCategory}
- Waste Amount: ${waste.wasteAmount} kg
- Generator Name: ${waste.name}
- Address: ${waste.address}
- Phone: ${waste.phone}
- Your Bid Amount: $${winningBid.bidAmount}

The waste has been successfully sold to you. Please proceed with the collection process.

Thank you for using EcoSync!

Best regards,
The EcoSync Team
    `;

    await sendmail(winningBid.bidderEmail, winnerSubject, winnerMessage);
    console.log(`Email sent to winner: ${winningBid.bidderEmail}`);

    // Send emails to other bidders using sendmail
    for (const otherBid of otherBids) {
      const loserSubject = "Update: Waste Has Been Sold to Another Bidder";
      const loserMessage = `
Update on Your Bid

Dear ${otherBid.bidderEmail},

We regret to inform you that the waste you placed a bid on has been sold to another bidder. Here are the details of the waste and your bid:

- Waste Category: ${waste.wasteCategory}
- Waste Amount: ${waste.wasteAmount} kg
- Generator Name: ${waste.name}
- Your Bid Amount: $${otherBid.bidAmount}

We appreciate your participation and encourage you to explore other waste collection opportunities on EcoSync.

Thank you for using EcoSync!

Best regards,
The EcoSync Team
      `;

      await sendmail(otherBid.bidderEmail, loserSubject, loserMessage);
      console.log(`Email sent to loser: ${otherBid.bidderEmail}`);
    }

    res.status(200).json({ message: "Bid accepted, waste and related bids deleted, emails sent." });
  } catch (error) {
    console.error("Error accepting bid:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;