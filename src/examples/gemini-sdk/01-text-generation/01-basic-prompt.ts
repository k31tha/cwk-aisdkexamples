import dotenv from "dotenv";
import { geminiAiModelName } from "../../../common";
import { GoogleGenAI } from "@google/genai";
dotenv.config();

const main = async () => {
  const geminiai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const response = await geminiai.models.generateContent({
    model: geminiAiModelName,
    contents: "what is the capital of england?",
  });

  // console.log("Response object");
  // console.dir(response);
  console.log("Answer");
  console.log(await response.text);
};

main();
