import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", userRoutes);

const port = process.env.APP_PORT || 5000;

const connectToDatabase = async () => {
  try {
    mongoose.connect(process.env.DB_URI);
    console.log("Successfully connected to the database.");
  } catch (error) {
    console.log("Failed to connect to the database.", error);
    process.exit(1);
  }
};

const startServer = async () => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  await connectToDatabase();
};

startServer();
