import { generateText } from "ai";
import dotenv from "dotenv";
import {
  vercelAnthropicAiModel,
  Prompts,
  convertMessageTextToMediaForVercel,
  MessageVercel,
} from "../../common";
dotenv.config();

export const generateTextUsingMediaWithVercelAiSdk = async (
  prompts: Prompts
) => {
  const messagesWithMedia = convertMessageTextToMediaForVercel(
    prompts.messages!
  );
  const result = await generateText({
    model: vercelAnthropicAiModel,
    messages: messagesWithMedia as MessageVercel[],
    ...(prompts.systemPrompt && { system: prompts.systemPrompt }),
  });

  console.log("answer-> ", result.text);
  console.log("Tokens used:", result.usage);
};
