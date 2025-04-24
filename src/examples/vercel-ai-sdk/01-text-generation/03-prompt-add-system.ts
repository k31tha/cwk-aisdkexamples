import { generateText } from "ai";
import dotenv from "dotenv";
import { vercelAnthropicAiModel } from "../../../common";
dotenv.config();

const main = async (
  prompt: string = "what is the capital of england?",
  systemPrompt: string = "You are a helpful assistant that can answer questions."
) => {
  //const { text } = await generateText({
  const result = await generateText({
    model: vercelAnthropicAiModel,
    system: systemPrompt,
    prompt,
  });
  //console.dir(result, { depth: 3 });
  console.log(await result.text);
};

// Get the prompt and system prompt from environment variable or command line arguments
const args = process.env.ORIGINAL_ARGS
  ? JSON.parse(process.env.ORIGINAL_ARGS)
  : process.argv.slice(2);
main(args[0], args[1]);
