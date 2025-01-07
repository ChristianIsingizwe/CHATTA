import express from "express";
import { sendMessage } from "../controllers/messageController";
import authorize from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/:id", authorize, getMessages)
router.post("/send/:id", authorize, sendMessage);

export default router;
