import dotenv from "dotenv";
import {
  openAi,
  openaiAiModelName,
  Message,
  parseTextMessages,
  Prompts,
  anthropicAiModelName,
} from "../../common";
dotenv.config();

export const streamTextWithOpenAiSdk = async (prompts: Prompts) => {
  if (prompts.systemPrompt) {
    prompts.messages?.unshift({
      role: "system",
      content: prompts.systemPrompt,
    });
  }
  const response = await openAi.responses.create({
    model: openaiAiModelName,
    input: prompts.messages as Message[],
    stream: true,
  });
  console.log("Streamed Response:");
  for await (const event of response) {
    if (event.type === "response.output_text.delta") {
      process.stdout.write(event.delta);
    }
    if (event.type === "response.completed") {
      process.stdout.write("\n--------------------------------");
      process.stdout.write("\nfinal result\n");
      // TODO:
      // need to cast to unknown to avoid type error
      // need to determine types
      const completeResponse = (event.response as unknown as { output: any })
        .output[0];
      process.stdout.write(completeResponse.content[0].text);
      process.stdout.write("\nTokens used:\n");
      process.stdout.write(JSON.stringify(event.response.usage));
    }
  }
};
