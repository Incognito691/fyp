import dns from "dns";
dns.setDefaultResultOrder("ipv4first");

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import verificationRoutes from "./routes/verificationRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express
const app = express();

// Middlewares (Modern Stack)
app.use(express.json());

// ✅ CORS - Allow all origins for development
app.use(
  cors({
    origin: true, // Allow all origins in development
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

// Configure helmet to allow CORS
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" },
}));

app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/verify", verificationRoutes);
app.use("/api/reports", reportRoutes);

// Health check endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to MeroSuraksha, Backend is running securely 🚀",
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({
    status: "false",
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Start the server
const PORT = process.env.PORT || 5001;

// ✅ Listen on ALL network interfaces (0.0.0.0) so phone can connect
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📱 Accessible at: http://192.168.1.114:${PORT}`);
});
