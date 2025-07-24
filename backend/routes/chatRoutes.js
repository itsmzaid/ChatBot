import express from "express";
import {
  handleUserMessage,
  resetChatSession,
  getChatHistory,
} from "../controllers/chatController.js";

const router = express.Router();

router.post("/:chatId/message", handleUserMessage);
router.post("/:chatId/reset", resetChatSession);
router.get("/history/:chatId", getChatHistory);

export default router;
