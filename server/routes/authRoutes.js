import express from "express";
import { registerUser, authUser, getUserProfile, logoutUser } from "../controllers/authcontroller.js"
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", authUser);
router.get("/profile", protect, getUserProfile);
router.post("/logout", protect, logoutUser);
export default router;