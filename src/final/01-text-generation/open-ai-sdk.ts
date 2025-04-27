import dotenv from "dotenv";
import {
  openAi,
  openaiAiModelName,
  Message,
  parseTextMessages,
  Prompts,
  anthropicAiModelName,
} from "../../common";
dotenv.config();

export const generateTextWithOpenAiSdk = async (prompts: Prompts) => {
  if (prompts.systemPrompt) {
    prompts.messages?.unshift({
      role: "system",
      content: prompts.systemPrompt,
    });
  }
  const response = await openAi.responses.create({
    model: openaiAiModelName,
    input: prompts.messages as any,
  });

  console.log("Response:");
  console.log(await response.output_text);
  console.log("Tokens used:");
  console.log(response.usage);
};
