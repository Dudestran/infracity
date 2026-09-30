import { Consignment } from "../models/consignment.model.js";


export const createConsignment = async (req, res) => {
  try {
    const consignment = await Consignment.create(req.body);

    res.status(201).json({
      success: true,
      message: "Consignment created successfully",
      consignment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getAllConsignments = async (req, res) => {

  try {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 50;

    const skip = (page - 1) * limit;

    const consignments = await Consignment.find()
      .populate("consignor")
      .skip(skip)
      .limit(limit);

    const totalRecords =
      await Consignment.countDocuments();

    res.status(200).json({
      consignments,
      currentPage: page,
      totalPages: Math.ceil(
        totalRecords / limit
      ),
      totalRecords
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


export const getConsignmentById = async (req, res) => {
  try {
    const consignment = await Consignment.findById(req.params.id).populate(
      "consignor"
    );

    if (!consignment) {
      return res.status(404).json({
        success: false,
        message: "Consignment not found",
      });
    }

    res.status(200).json(consignment);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const updateConsignment =
async (req, res) => {

  try {

    const updated =
      await Consignment.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true
        }
      );

    res.status(200).json(updated);

  } catch(error) {

    res.status(500).json({
      message: error.message
    });

  }

};


export const deleteConsignment = async (req, res) => {
  try {
    const consignment = await Consignment.findByIdAndDelete(req.params.id);

    if (!consignment) {
      return res.status(404).json({
        success: false,
        message: "Consignment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Consignment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Consignment deleted",
    });
  }
};
export const importConsignments =
  async (req, res) => {
    
    try {
      const rows = req.body;
   
      const consignments =
        rows.map((row) => ({
          airwayBillNo:
            row["Airway Bill"],
          pickupDate:
            row["Pickup Date"],
          origin:
            row["Origin"],
          destination:
            row["Destination"],
          status:
            row["Status"],
        }));
      
      try {

        await Consignment.insertMany(consignments);



      } catch (error) {

   
        console.log(error);

      }
      res.status(200).json({
        success: true,
        message:
          "Imported Successfully",
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }
  };

export const trackConsignment = async (req, res) => {
  try {
    const consignment = await Consignment.findOne({
      airwayBillNo: req.params.awb,
    }).populate("consignor");

    if (!consignment) {
      return res.status(404).json({
        success: false,
        message: "Consignment not found",
      });
    }

    res.status(200).json(consignment);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

