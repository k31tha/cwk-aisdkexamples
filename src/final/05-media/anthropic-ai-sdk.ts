import dotenv from "dotenv";
import {
  anthropicAi,
  anthropicAiModelName,
  convertMessageTextToMediaForAnthropic,
  MessageMinusSystem,
  Prompts,
} from "../../common";
dotenv.config();

export const generateTextUsingMediaWithAnthropicAiSdk = async (
  prompts: Prompts
) => {
  const messagesWithMedia = convertMessageTextToMediaForAnthropic(
    prompts.messages as MessageMinusSystem[]
  );
  const response = await anthropicAi.messages.create({
    model: anthropicAiModelName,
    max_tokens: 1000,
    messages: messagesWithMedia as any,
    ...(prompts.systemPrompt && { system: prompts.systemPrompt }),
  });

  console.log("Response:");
  console.dir(response.content[0], { depth: 3 });
  console.log("Tokens used:");
  console.log(response.usage);
};
