import { streamText } from "ai";
import dotenv from "dotenv";
import {
  vercelAnthropicAiModel,
  vercelOpenaiResponsesAiModel,
  Message,
  parseTextMessages,
} from "../../../common";

dotenv.config();

//pnpm tsx ./src/examples/vercel-ai-sdk/01-text-generation/04-prompt-add-role.ts assistant "you are a travel advisor, also provide basic travel advice" user "what is the capital of france" assistant "show weather in imperial" user "add average weather for june"

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
  const { textStream, text, usage } = streamText({
    model: vercelAnthropicAiModel,
    messages,
    ...(system && { system }),
  });

  console.log("STREAM answer");
  for await (const chunk of textStream) {
    process.stdout.write(chunk);
  }
  //const finalResult = await text;
  //process.stdout.write("\n--------------------------------");
  //process.stdout.write("\nfinal result\n");
  //process.stdout.write(finalResult);
  process.stdout.write("\n--------------------------------");

  process.stdout.write("\nusage\n");
  process.stdout.write(JSON.stringify(await usage));
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
