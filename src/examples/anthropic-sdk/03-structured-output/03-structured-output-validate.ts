import dotenv from "dotenv";
import { z } from "zod";

import {
  anthropicAi,
  anthropicAiModelName,
  Message,
  MessageMinusSystem,
  parseTextMessages,
  StructuredResponse,
  FootballClubs,
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
  });

  const content = response.content[0];
  if (content.type === "text") {
    const result = FootballClubs.safeParse(JSON.parse(content.text));
    if (!result.success) {
      console.error("Invalid response:", result.error);
    } else {
      console.log("Valid response:", result.data);
    }
  } else {
    console.error("Invalid content:", content);
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
