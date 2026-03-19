import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      family: 4, // Use IPv4
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`❌ MongoDB Connection Error: ${error}`);
    process.exit(1); // Stop the server if DB
  }
};

export default connectDB;
