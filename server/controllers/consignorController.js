import { consignor } from "../models/consignor.model.js";


export const createConsignor = async (req, res) => {
  try {

    const newConsignor =
      await consignor.create(req.body);

    res.status(201).json({
      success: true,
      message: "Consignor created successfully",
      consignor: newConsignor,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateConsignor = async (
  req,
  res
) => {
  try {

    const consignor =
      await Consignor.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true
        }
      );

    res.status(200).json({
      success: true,
      consignor
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};
export const getAllConsignors = async (req, res) => {
  try {
    const consignors = await consignor.find().sort({ createdAt: -1 });

    res.status(200).json(consignors);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getConsignorById = async (req, res) => {
  try {
    const consignor = await consignor.findById(req.params.id);

    if (!consignor) {
      return res.status(404).json({
        success: false,
        message: "Consignor not found",
      });
    }

    res.status(200).json(consignor);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteConsignor = async (req, res) => {
  try {
    const consignor = await consignor.findByIdAndDelete(req.params.id);

    if (!consignor) {
      return res.status(404).json({
        success: false,
        message: "Consignor not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Consignor deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

