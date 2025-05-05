import dotenv from "dotenv";
import {
  openAi,
  openaiAiModelName,
  Message,
  parseTextMessages,
  Prompts,
  anthropicAiModelName,
  convertMessageTextToMediaForOpenAi,
} from "../../common";
dotenv.config();

export const generateTextUsingMediaWithOpenAiSdk = async (prompts: Prompts) => {
  if (prompts.systemPrompt) {
    prompts.messages?.unshift({
      role: "system",
      content: prompts.systemPrompt,
    });
  }
  const messagesWithMedia = convertMessageTextToMediaForOpenAi(
    prompts.messages as Message[]
  );
  const response = await openAi.responses.create({
    model: openaiAiModelName,
    input: messagesWithMedia,
  });

  console.log("Response:");
  console.log(await response.output_text);
  console.log("Tokens used:");
  console.log(response.usage);
};
