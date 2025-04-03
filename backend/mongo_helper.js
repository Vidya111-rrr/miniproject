import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./db.js";
import WasteCollection from "./model/WasteCollection.js"; // Assuming the model is in models folder

dotenv.config();

// Function to delete the collection
async function deleteCollection() {
  await connectDB(); // Ensure you are connected to the DB

  try {
    const db = mongoose.connection;

    // Drop the entire collection associated with the WasteCollection model
    const result = await db.dropCollection(WasteCollection.collection.name);
    if (result) {
      console.log("Collection deleted successfully!");
    } else {
      console.log("Collection not found or couldn't be deleted.");
    }
  } catch (error) {
    console.error("Error deleting collection:", error);
  } finally {
    await mongoose.connection.close();
  }
}

deleteCollection();
