import dotenv from "dotenv";
import {
  anthropicAi,
  anthropicAiModelName,
  MessageMinusSystem,
  Prompts,
} from "../../common";

dotenv.config();

export const generateStructuredOutputWithAnthropicAiSdk = async (
  prompts: Prompts
) => {
  const resultObject = await anthropicAi.messages.create({
    model: anthropicAiModelName,
    max_tokens: 1000,
    messages: prompts.messages as MessageMinusSystem[],
    ...(prompts.systemPrompt && { system: prompts.systemPrompt }),
  });
  console.log("answer");
  console.dir(resultObject.content[0], { depth: 3 });
  console.log("Tokens used");
  console.log(resultObject.usage);
};
