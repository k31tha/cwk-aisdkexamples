import dotenv from "dotenv";

import {
  anthropicAi,
  anthropicAiModelName,
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
  const stream = await anthropicAi.messages
    .stream({
      model: anthropicAiModelName,
      max_tokens: 1000,
      messages: messages as MessageMinusSystem[],
      ...(system && { system }),
    })
    .on("text", (text) => {
      //process.stdout.write(text);
    })
    .on("contentBlock", (content) => console.log("on->contentBlock", content))
    .on("message", (message) => console.log("on->message", message))
    .on("finalMessage", (message) => console.log("on->finalMessage", message))
    .on("end", () => console.log("on->end"));
  for await (const chunk of stream) {
    process.stdout.write("chunk->" + chunk.type + "\n");
    //if (chunk.type === "content_block_delta") {
    //  process.stdout.write(
    //    chunk.delta.type === "text_delta" ? chunk.delta.text : ""
    //  );
    //  process.stdout.write("\n");
    //}
  }
  const result = await stream.finalMessage();
  process.stdout.write("\n--------------------------------");
  process.stdout.write("\nfinal result\n");
  process.stdout.write(JSON.stringify(result.usage));
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
