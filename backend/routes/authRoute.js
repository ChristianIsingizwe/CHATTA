import express from "express";
import { registerUser, signInUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/signIn", signInUser);

export default router;
