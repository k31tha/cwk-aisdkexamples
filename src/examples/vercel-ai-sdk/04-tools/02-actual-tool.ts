import { generateText } from "ai";
import dotenv from "dotenv";
import {
  vercelAnthropicAiModel,
  Message,
  parseTextMessages,
  getWeatherTool,
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
  const result = await generateText({
    model: vercelAnthropicAiModel,
    messages,
    ...(system && { system }),
    tools: { getWeatherTool },
    maxSteps: 10,
  });

  console.log("Response:");
  console.dir(await result.response, { depth: null });
  console.log("Result:");
  console.dir(await result.text, { depth: 3 });
  console.log("Tokens used:", result.usage);
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
