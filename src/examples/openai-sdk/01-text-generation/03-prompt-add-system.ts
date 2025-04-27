import dotenv from "dotenv";
import { openAi, openaiAiModelName } from "../../../common";
dotenv.config();

const main = async (
  prompt: string = "what is the capital of england?",
  systemPrompt: string = "You are a helpful assistant that can answer questions."
) => {
  const response = await openAi.responses.create({
    model: openaiAiModelName,
    input: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  console.log("Answer");
  console.log(await response.output_text);
};

// Get the prompt and system prompt from environment variable or command line arguments
const args = process.env.ORIGINAL_ARGS
  ? JSON.parse(process.env.ORIGINAL_ARGS)
  : process.argv.slice(2);
main(args[0], args[1]);
