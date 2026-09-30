import express from "express";
import { createConsignor, deleteConsignor, getAllConsignors, getConsignorById, updateConsignor } from "../controllers/consignorcontroller.js";

const router = express.Router();

router.post("/", createConsignor);

router.get("/", getAllConsignors);

router.get("/:id", getConsignorById);


router.put("/:id", updateConsignor);

router.delete("/:id", deleteConsignor);

router.put("/update-consignor/:id", async (req, res) => {
  console.log("UPDATE HIT");
    console.log(req.params.id);
    console.log(req.body);
  try {
    const updated = await Consignor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
export default router;