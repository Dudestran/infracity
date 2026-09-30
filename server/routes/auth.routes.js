import express from "express";
import { checkAuth, login, logout, register } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", login);

router.post("/logout", logout);

router.post("/register", register);

router.get("/check", checkAuth);

export default router;