const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
  name: String,
  content: String,
  uploadedAt: { type: Date, default: Date.now },
});

const MessageSchema = new mongoose.Schema({
  role: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

const ChatSessionSchema = new mongoose.Schema({
  userId: String,
  taskPrompt: String,
  files: [FileSchema],
  chat: [MessageSchema],
  createdAt: { type: Date, default: Date.now },
});

const ChatSession = mongoose.model("ChatSession", ChatSessionSchema);
module.exports = { ChatSession };
