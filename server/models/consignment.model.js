import mongoose from "mongoose";


const consignmentSchema = new mongoose.Schema(
  {
    airwayBillNo: {
      type: String,
      required: true,
      unique: true,
    },

    consignor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "consignor",
      
    },

    pickupDate: Date,

    expectedDeliveryDate: Date,

    receiverName: String,

    status: {
      type: String,
      default: "Pending",
    },

    networkName: String,

    networkId: String,

    networkLink: String,

    from: String,

    destination: String,

    pcs: Number,

    weight: Number,

    consigneeName: String,

    consigneeAddress: String,

    mode: String,

    pod: String,
  },
  { timestamps: true }
);

export const Consignment= mongoose.model('Consignment', consignmentSchema);
