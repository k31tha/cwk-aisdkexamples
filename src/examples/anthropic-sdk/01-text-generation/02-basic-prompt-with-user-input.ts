import dotenv from "dotenv";
import { anthropicAi, anthropicAiModelName } from "../../../common";
dotenv.config();

const main = async (prompt: string = "what is the capital of england?") => {
  const response = await anthropicAi.messages.create({
    model: anthropicAiModelName,
    max_tokens: 1000,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  console.log(response.content[0]);
};

// Get the prompt from environment variable or command line arguments
const args = process.env.ORIGINAL_ARGS
  ? JSON.parse(process.env.ORIGINAL_ARGS)
  : process.argv.slice(2);
main(args[0]);
