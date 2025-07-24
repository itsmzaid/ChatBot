import Chat from "../models/Chat.js";
import { buildLangchainResponse } from "../langchain/chain.js";

export const handleUserMessage = async (req, res) => {
  const { message } = req.body;
  const { chatId } = req.params;

  const chat = await Chat.findById(chatId);
  if (!chat) return res.status(404).json({ error: "Chat not found" });

  chat.messages.push({ role: "user", message });

  const fileContent = chat.files.map((f) => f.content).join("\n\n");

  const botReply = await buildLangchainResponse(fileContent, message);

  chat.messages.push({ role: "bot", message: botReply });
  await chat.save();

  res.json({ reply: botReply });
};

export const resetChatSession = async (req, res) => {
  const { chatId } = req.params;
  const chat = await Chat.findById(chatId);
  if (!chat) return res.status(404).json({ error: "Chat not found" });

  chat.messages = [];
  await chat.save();

  res.json({ message: "Chat reset successfully." });
};

export const getChatHistory = async (req, res) => {
  try {
    const { chatId } = req.params;
    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }

    res.json({
      chatId: chat._id,
      messages: chat.messages,
      files: chat.files,
      createdAt: chat.createdAt,
    });
  } catch (err) {
    console.error("Error fetching chat history:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
