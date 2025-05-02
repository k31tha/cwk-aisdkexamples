import { generateText } from "ai";
import dotenv from "dotenv";
import { vercelAnthropicAiModel, Prompts, getWeatherTool } from "../../common";
dotenv.config();

export const generateOutputUsingToolsWithVercelAiSdk = async (
  prompts: Prompts
) => {
  const result = await generateText({
    model: vercelAnthropicAiModel,
    messages: prompts.messages,
    ...(prompts.systemPrompt && { system: prompts.systemPrompt }),
    tools: { getWeatherTool },
    maxSteps: 10,
  });

  console.log("answer-> ", result.text);
  console.log("Tokens used:", result.usage);
};
