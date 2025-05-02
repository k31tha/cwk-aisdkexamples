import dotenv from "dotenv";
import {
  openAi,
  openaiAiModelName,
  Prompts,
  FootballClubs,
} from "../../common";
import { zodTextFormat } from "openai/helpers/zod";
dotenv.config();

export const generateStructuredOutputWithOpenAiSdk = async (
  prompts: Prompts
) => {
  if (prompts.systemPrompt) {
    prompts.messages?.unshift({
      role: "system",
      content: prompts.systemPrompt,
    });
  }
  const response = await openAi.responses.create({
    model: openaiAiModelName,
    input: prompts.messages as any,
    text: {
      format: zodTextFormat(FootballClubs, "json_object"),
    },
  });

  console.log("Response:");
  console.log(await response.output_text);
  console.log("Tokens used:");
  console.log(response.usage);
};
