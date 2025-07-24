import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";
import { Document } from "langchain/document";
import { createVectorStore, getRelevantDocs } from "./embedding.js";
import dotenv from "dotenv";
dotenv.config();
const model = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-pro",
  apiKey: process.env.GEMINI_API_KEY,
});

const promptTemplate = new PromptTemplate({
  template: `
You are a helpful assistant. The user has given you a task: "{task}".
Here is the most relevant extracted information from their files:
---
{relevantContent}
---
Now, answer the following question:
{question}
`,
  inputVariables: ["task", "relevantContent", "question"],
});

export const buildLangchainResponse = async (task, fileContent, question) => {
  const docs = [new Document({ pageContent: fileContent })];
  const vectorStore = await createVectorStore(docs);
  const relevantDocs = await getRelevantDocs(vectorStore, question);

  const relevantContent = relevantDocs
    .map((d) => d.pageContent)
    .join("\n---\n");

  const prompt = await promptTemplate.format({
    task,
    relevantContent,
    question,
  });

  const res = await model.invoke(prompt);
  return res.content;
};
