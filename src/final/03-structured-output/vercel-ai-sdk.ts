import { generateObject } from "ai";
import dotenv from "dotenv";
import {
  vercelAnthropicAiModel,
  Message,
  parseTextMessages,
  Prompts,
  FootballClubs,
  StructuredResponse,
} from "../../common";
dotenv.config();

export const generateStructuredOutputWithVercelAiSdk = async (
  prompts: Prompts
) => {
  const resultObject = await generateObject({
    model: vercelAnthropicAiModel,
    messages: prompts.messages,
    ...(prompts.systemPrompt && { system: prompts.systemPrompt }),
    schema: FootballClubs,
  });

  console.log("answer-> ", resultObject.object as StructuredResponse);
  console.log("Tokens used:", resultObject.usage);
};
