import dotenv from "dotenv";
import { anthropicAi, anthropicAiModelName } from "../../../common";
dotenv.config();

const main = async (
  prompt: string = "what is the capital of england?",
  systemPrompt: string = "You are a helpful assistant that can answer questions."
) => {
  const response = await anthropicAi.messages.create({
    model: anthropicAiModelName,
    max_tokens: 1000,
    system: systemPrompt,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  console.log(response.content[0]);
};

// Get the prompt and system prompt from environment variable or command line arguments
const args = process.env.ORIGINAL_ARGS
  ? JSON.parse(process.env.ORIGINAL_ARGS)
  : process.argv.slice(2);
main(args[0], args[1]);
