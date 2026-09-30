import Role from "../models/Role.js";



export const isAuthenticated = (req, res, next) => {

    if (!req.session || !req.session.user) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    next();
};


export const hasPermission = (module, action) => {

    return async (req, res, next) => {

        try {

            // Get the role of the logged-in user
            const userRole = req.session.user.role;

            // Find that role in MongoDB
            const role = await Role.findOne({
                name: userRole
            });

            if (!role) {
                return res.status(403).json({
                    message: "Role not found"
                });
            }

            // Check whether the role has the requested permission
            const allowed =
                role.permissions?.[module]?.[action];

            if (!allowed) {
                return res.status(403).json({
                    message: "You do not have permission to perform this action"
                });
            }

            next();

        } catch (error) {

            console.error("Permission error:", error);

            res.status(500).json({
                message: "Server error"
            });
        }
    };
};