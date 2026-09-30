import mongoose from "mongoose";


const consignorSchema = new mongoose.Schema(
  {
    clientCode: {
      type: String,
      required: true,
      unique: true,
    },

    clientName: {
      type: String,
      required: true,
    },

    clientAddress1: {
      type: String,
      required: true,
    },

    clientAddress2: String,

    city: {
      type: String,
      required: true,
    },

    phoneNo: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true }
);

export const consignor= mongoose.model('consignor', consignorSchema);
