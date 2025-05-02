import dotenv from "dotenv";

import {
  anthropicAi,
  anthropicAiModelName,
  Message,
  MessageMinusSystem,
  parseTextMessages,
  toolsForAnthropic,
  getWeatherDataBasic,
} from "../../../common";

dotenv.config();

const main = async (
  messages: Message[] = [
    {
      role: "assistant",
      content: "You are a helpful assistant that can answer questions.",
    },
    {
      role: "user",
      content: "what is the capital of england?",
    },
  ],
  system?: string
) => {
  const response = await anthropicAi.messages.create({
    model: anthropicAiModelName,
    max_tokens: 1000,
    messages: messages as MessageMinusSystem[],
    ...(system && { system }),
    tools: toolsForAnthropic,
  });
  if (!response || !response.content) {
    throw new Error("Invalid response from Anthropic");
  }
  console.dir(response, { depth: 4 });

  const toolUseContent = response.content.find(
    (content) => content.type === "tool_use"
  );

  if (toolUseContent) {
    console.log("Tool use content:", toolUseContent);
    const toolName = toolUseContent.name;
    const toolInput = toolUseContent.input as {
      location: string;
      unit?: string;
    };
    const toolUseId = toolUseContent.id;
    const weatherResult = await getWeatherDataBasic(toolInput.location);
    //console.log("Weather result:", weatherResult);
    const finalResponse = await anthropicAi.messages.create({
      model: anthropicAiModelName,
      max_tokens: 1000,
      system: system,
      messages: [
        ...(messages as MessageMinusSystem[]),
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
              content: [{ type: "text", text: weatherResult }],
            },
          ],
        },
      ],
      tools: toolsForAnthropic,
    });

    console.log("Final response:");
    console.dir(finalResponse, { depth: 4 });
  }
  if (!toolUseContent) {
    console.log("Final response:");
    console.dir(response, { depth: 4 });
  }
};

// Get the system parameter from environment variable or command line arguments
const args = process.env.ORIGINAL_ARGS
  ? JSON.parse(process.env.ORIGINAL_ARGS)
  : process.argv.slice(2);

const systemIndex = args.findIndex((arg: string) => arg === "system");
const system = systemIndex !== -1 ? args[systemIndex + 1] : undefined;
const messageArgs = args.filter(
  (arg: string, index: number) =>
    arg !== "system" && (systemIndex === -1 || index !== systemIndex + 1)
);
const messages = parseTextMessages(messageArgs);
main(messages, system);
