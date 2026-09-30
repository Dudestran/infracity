import Role from "../models/Role.js";

export const getRoles = async (req, res) => {
  try {
    const roles = await Role.find();

    res.status(200).json({
      success: true,
      roles
    });

  } catch (error) {
    console.error("Get roles error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch roles"
    });
  }
}
export const updateRole = async (req, res) => {
  try {
    const { permissions } = req.body;

    console.log("Role ID received:", req.params.id);
    console.log("Permissions received:", permissions);

    const updatedRole = await Role.findByIdAndUpdate(
      req.params.id,
      {
        permissions: permissions
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedRole) {
      return res.status(404).json({
        message: "Role not found"
      });
    }

    return res.status(200).json({
      message: "Role updated successfully",
      role: updatedRole
    });

  } catch (error) {
    console.error("Update role error:", error);

    return res.status(500).json({
      message: "Server error"
    });
  }


};