import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const hashedPassword = await bcrypt.hash("Vendor@123", 10);

await User.create({
    username: "vendor1",
    password: hashedPassword,
    role: "vendor"
});

console.log("Vendor created successfully");

process.exit();