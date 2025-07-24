import { runPythonParser } from "../utils/runPython.js";
import Chat from "../models/Chat.js";
import fs from "fs";

export const handleFileUpload = async (req, res) => {
  try {
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const fileData = [];

    for (const file of files) {
      const ext = file.originalname.split(".").pop().toLowerCase();
      const type =
        ext === "pdf"
          ? "pdf"
          : ext === "docx"
          ? "docx"
          : ext === "html"
          ? "html"
          : null;

      let content = "";
      if (type) {
        content = await runPythonParser(file.path, type);
      } else {
        content = fs.readFileSync(file.path, "utf-8");
      }

      fileData.push({ name: file.originalname, content });

      fs.unlinkSync(file.path);
    }

    const chat = await Chat.create({
      files: fileData,
      messages: [],
    });

    res.status(200).json({ chatId: chat._id });
  } catch (err) {
    console.error("Multer Upload Error:", err);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
};
