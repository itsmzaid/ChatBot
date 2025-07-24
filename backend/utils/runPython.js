import { spawn } from "child_process";
import path from "path";

export const runPythonParser = (filePath, type) => {
  return new Promise((resolve, reject) => {
    const scriptMap = {
      pdf: "parse_pdf.py",
      docx: "parse_docx.py",
      html: "parse_html.py",
    };

    const script = scriptMap[type];

    const process = spawn("python", [path.join("python", script), filePath]);

    let result = "";
    process.stdout.on("data", (data) => {
      result += data.toString();
    });

    process.stderr.on("data", (err) => {
      console.error("Python Error:", err.toString());
    });

    process.on("close", () => {
      resolve(result.trim());
    });
  });
};
