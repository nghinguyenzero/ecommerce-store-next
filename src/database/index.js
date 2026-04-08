import mongoose from "mongoose";

const connectToDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  const connectionUrl = process.env.MONGODB_URI;
  if (!connectionUrl) {
    throw new Error("MONGODB_URI is not defined in environment variables");
  }

  try {
    await mongoose.connect(connectionUrl);
    console.log("Ecommerce database connected successfully!");
  } catch (err) {
    console.log(`Getting Error from DB connection ${err.message}`);
  }
};

export default connectToDB;