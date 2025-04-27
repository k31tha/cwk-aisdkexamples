import { generateText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import dotenv from "dotenv";
import { anthropicAiModelName } from "../../../common";
dotenv.config();

const main = async () => {
  const vercelAnthropicAiModel = anthropic(anthropicAiModelName);
  const { text } = await generateText({
    model: vercelAnthropicAiModel,
    prompt: "what is the capital of england?",
  });

  console.log(text);
};

main();
