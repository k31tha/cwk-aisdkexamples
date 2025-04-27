import dotenv from "dotenv";
import { anthropicAiModelName } from "../../../common";
import Anthropic from "@anthropic-ai/sdk";
dotenv.config();

const main = async () => {
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });
  const response = await anthropic.messages.create({
    model: anthropicAiModelName,
    max_tokens: 1000,
    messages: [
      {
        role: "user",
        content: "what is the capital of england?",
      },
    ],
  });

  console.log(response.content[0]);
};

main();
