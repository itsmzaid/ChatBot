import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

import dotenv from "dotenv";
dotenv.config();

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
});

const embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: process.env.GEMINI_API_KEY,
});

export const createVectorStore = async (docs = []) => {
  const splitDocs = await splitter.splitDocuments(docs);
  const vectorStore = await MemoryVectorStore.fromDocuments(
    splitDocs,
    embeddings
  );
  return vectorStore;
};

export const getRelevantDocs = async (vectorStore, query) => {
  return await vectorStore.similaritySearch(query, 4);
};
