import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    taskPrompt: String,
    files: [
      {
        name: String,
        content: String,
      },
    ],
    messages: [
      {
        role: { type: String, enum: ["user", "bot"] },
        message: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Chat", chatSchema);
