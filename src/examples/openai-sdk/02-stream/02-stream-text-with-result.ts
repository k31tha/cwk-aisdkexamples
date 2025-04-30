import dotenv from "dotenv";

import {
  openAi,
  openaiAiModelName,
  Message,
  MessageMinusSystem,
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
  const stream = await openAi.responses.create({
    model: openaiAiModelName,
    input: messages as Message[],
    stream: true,
  });

  for await (const event of stream) {
    if (event.type === "response.completed") {
      process.stdout.write("\n--------------------------------");
      process.stdout.write("\nfinal result\n");
      // TODO:
      // need to cast to unknown to avoid type error
      // need to determine types
      const completeResponse = (event.response as unknown as { output: any })
        .output[0];
      process.stdout.write(completeResponse.content[0].text);
      process.stdout.write("\nusage\n");
      process.stdout.write(JSON.stringify(event.response.usage));
    }
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
