import { generateObject } from "ai";
import dotenv from "dotenv";
import {
  vercelAnthropicAiModel,
  Message,
  parseTextMessages,
  FootballClubs,
  StructuredResponse,
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
  const resultObject = await generateObject({
    model: vercelAnthropicAiModel,
    messages,
    ...(system && { system }),
    schema: FootballClubs,
  });
  console.log("answer-> ", resultObject.object as StructuredResponse);
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
