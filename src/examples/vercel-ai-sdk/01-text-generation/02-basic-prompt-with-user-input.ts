import { generateText } from "ai";
import dotenv from "dotenv";
import { vercelAnthropicAiModel } from "../../../common";
dotenv.config();

const main = async (prompt: string = "what is the capital of england?") => {
  const { text } = await generateText({
    model: vercelAnthropicAiModel,
    prompt,
  });

  console.log(text);
};

// Get the prompt from environment variable or command line arguments
const args = process.env.ORIGINAL_ARGS
  ? JSON.parse(process.env.ORIGINAL_ARGS)
  : process.argv.slice(2);
main(args[0]);
