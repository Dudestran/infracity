import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const createSuperAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const hashedPassword = await bcrypt.hash("YourNewPassword123", 10);

    const existingUser = await User.findOne({
      username: "superadmin2"
    });

    if (existingUser) {
      console.log("Superadmin already exists");
      process.exit();
    }

    await User.create({
      username: "superadmin2",
      password: hashedPassword,
      role: "superadmin"
    });

    console.log("New superadmin created successfully!");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createSuperAdmin();