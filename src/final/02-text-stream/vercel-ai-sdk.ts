import { streamText } from "ai";
import dotenv from "dotenv";
import { vercelAnthropicAiModel, Prompts } from "../../common";
dotenv.config();

export const streamTextWithVercelAiSdk = async (prompts: Prompts) => {
  const result = streamText({
    model: vercelAnthropicAiModel,
    messages: prompts.messages,
    ...(prompts.systemPrompt && { system: prompts.systemPrompt }),
  });

  console.log("STREAM answer");
  for await (const chunk of result.textStream) {
    process.stdout.write(chunk);
  }
  //const finalResult = await text;
  //process.stdout.write("\n--------------------------------");
  //process.stdout.write("\nfinal result\n");
  //process.stdout.write(finalResult);
  process.stdout.write("\n--------------------------------");

  process.stdout.write("\nTokens used\n");
  process.stdout.write(JSON.stringify(await result.usage));
};
