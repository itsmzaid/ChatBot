import express from "express";
import { handleFileUpload } from "../controllers/fileController.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/upload", upload.array("files"), handleFileUpload);

export default router;
