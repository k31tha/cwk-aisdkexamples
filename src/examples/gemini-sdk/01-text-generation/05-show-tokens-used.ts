import dotenv from "dotenv";

import {
  openAi,
  openaiAiModelName,
  Message,
  parseTextMessages,
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
  if (system) {
    messages.unshift({
      role: "system",
      content: system,
    });
  }
  const response = await openAi.responses.create({
    model: openaiAiModelName,
    input: messages,
  });
  console.log("Answer");
  console.log(await response.output_text);
  console.log("Tokens used");
  console.log(response.usage);
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
