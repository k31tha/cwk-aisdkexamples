import dotenv from "dotenv";

import {
  anthropicAi,
  anthropicAiModelName,
  Message,
  MessageMinusSystem,
  parseTextMessages,
  Prompts,
} from "../../common";

dotenv.config();

export const streamTextWithAnthropicAiSdk = async (prompts: Prompts) => {
  const stream = await anthropicAi.messages
    .stream({
      model: anthropicAiModelName,
      max_tokens: 1000,
      messages: prompts.messages as MessageMinusSystem[],
      ...(prompts.systemPrompt && { system: prompts.systemPrompt }),
    })
    .on("text", (text) => {
      process.stdout.write(text);
    });
  const result = await stream.finalMessage();
  process.stdout.write("\n--------------------------------");
  process.stdout.write("\nfinal result\n");
  process.stdout.write(JSON.stringify(result.usage));
};
