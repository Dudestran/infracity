import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";
import connectdb from "./utils/db.js";

dotenv.config();

await connectdb();

const existing = await User.findOne({ username: "superadmin" });

if (!existing) {
    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    await User.create({
        username: "superadmin",
        password: hashedPassword,
        role: "superadmin"
    });

    console.log("Super Admin created");
} else {
    console.log("Super Admin already exists");
}

process.exit();