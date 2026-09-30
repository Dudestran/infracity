import express from "express";
import {
    isAuthenticated,
    hasPermission
} from "../middleware/authMiddleware.js";
import { createConsignment, deleteConsignment, getAllConsignments, getConsignmentById,importConsignments,trackConsignment, updateConsignment } from "../controllers/consignmentController.js";

const router = express.Router();

router.post(
    "/",
    isAuthenticated,
    hasPermission("consignment", "add"),
    createConsignment
);

router.get(
    "/",
    isAuthenticated,
    hasPermission("consignment", "view"),
    getAllConsignments
);

router.get(
    "/track/:awb",
    isAuthenticated,
    hasPermission("consignment", "view"),
    trackConsignment
);

router.get(
    "/:id",
    isAuthenticated,
    hasPermission("consignment", "view"),
    getConsignmentById
);

router.put(
    "/:id",
    isAuthenticated,
    hasPermission("consignment", "edit"),
    updateConsignment
);

router.delete(
    "/:id",
    isAuthenticated,
    hasPermission("consignment", "delete"),
    deleteConsignment
);

router.post(
    "/import",
    isAuthenticated,
    hasPermission("consignment", "import"),
    importConsignments
);

export default router;