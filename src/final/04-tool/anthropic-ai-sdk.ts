import dotenv from "dotenv";
import {
  anthropicAi,
  anthropicAiModelName,
  getWeatherData,
  MessageMinusSystem,
  Prompts,
  toolsForAnthropic,
} from "../../common";

dotenv.config();

export const generateOutputUsingToolsWithAnthropicAiSdk = async (
  prompts: Prompts
) => {
  const response = await anthropicAi.messages.create({
    model: anthropicAiModelName,
    max_tokens: 1000,
    messages: prompts.messages as MessageMinusSystem[],
    ...(prompts.systemPrompt && { system: prompts.systemPrompt }),
    tools: toolsForAnthropic,
  });
  if (!response || !response.content) {
    throw new Error("Invalid response from Anthropic");
  }

  const toolUseContent = response.content.find(
    (content) => content.type === "tool_use"
  );

  if (toolUseContent) {
    const toolName = toolUseContent.name;
    const toolInput = toolUseContent.input as {
      location: string;
      unit?: string;
    };
    const toolUseId = toolUseContent.id;
    const weatherResult = await getWeatherData(toolInput.location);
    //console.log("Weather result:", weatherResult);
    const finalResponse = await anthropicAi.messages.create({
      model: anthropicAiModelName,
      max_tokens: 1000,
      system: prompts.systemPrompt,
      messages: [
        ...(prompts.messages as MessageMinusSystem[]),
        {
          role: response.role,
          content: response.content,
        },
        {
          role: "user",
          content: [
            {
              type: "tool_result",
              tool_use_id: toolUseId,
              content: [{ type: "text", text: JSON.stringify(weatherResult) }],
            },
          ],
        },
      ],
      tools: toolsForAnthropic,
    });
    console.dir(finalResponse.content[0], { depth: 4 });
    console.log("Tokens used:");
    console.log(finalResponse.usage);
  } else {
    console.dir(response.content[0], { depth: 4 });
    console.log("Tokens used:");
    console.log(response.usage);
  }
};
