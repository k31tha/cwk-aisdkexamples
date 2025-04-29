import dotenv from "dotenv";
import {
  anthropicAi,
  anthropicAiModelName,
  MessageMinusSystem,
  Prompts,
} from "../../common";
dotenv.config();

export const generateTextWithAnthropicAiSdk = async (prompts: Prompts) => {
  const response = await anthropicAi.messages.create({
    model: anthropicAiModelName,
    max_tokens: 1000,
    messages: prompts.messages as MessageMinusSystem[],
    ...(prompts.systemPrompt && { system: prompts.systemPrompt }),
  });

  console.log("Response:");
  console.dir(response.content[0], { depth: 3 });
  console.log("Tokens used:");
  console.log(response.usage);
};
