import express from "express";
import {
    getRoles,
    updateRole
} from "../controllers/roleController.js";

import {
    hasPermission,
    isAuthenticated
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.put(
    "/:id",
    isAuthenticated,
    updateRole
);
router.get(
  "/",
  isAuthenticated,
  hasPermission("roles", "view"),
  getRoles
);


export default router;