import { generateText } from "ai";
import dotenv from "dotenv";
import {
  vercelAnthropicAiModel,
  Message,
  parseTextMessages,
  Prompts,
} from "../../common";
dotenv.config();

export const generateTextWithVercelAiSdk = async (prompts: Prompts) => {
  const result = await generateText({
    model: vercelAnthropicAiModel,
    messages: prompts.messages,
    ...(prompts.systemPrompt && { system: prompts.systemPrompt }),
  });

  //console.log("Messages:", messages);
  console.log("Response:", await result.text);
  console.log("Tokens used:", result.usage);
};
