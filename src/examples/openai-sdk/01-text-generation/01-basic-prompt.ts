import dotenv from "dotenv";
import { openaiAiModelName } from "../../../common";
import OpenAI from "openai";
dotenv.config();

const main = async () => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const response = await openai.responses.create({
    model: openaiAiModelName,
    input: "what is the capital of england?",
  });

  // console.log("Response object");
  // console.dir(response);
  console.log("Answer");
  console.log(await response.output_text);
};

main();
