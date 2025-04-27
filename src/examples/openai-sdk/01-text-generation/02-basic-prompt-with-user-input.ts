import dotenv from "dotenv";
import { openAi, openaiAiModelName } from "../../../common";
dotenv.config();

const main = async (prompt: string = "what is the capital of england?") => {
  const response = await openAi.responses.create({
    model: openaiAiModelName,
    input: prompt,
  });

  console.log("Answer");
  console.log(await response.output_text);
};

// Get the prompt from environment variable or command line arguments
const args = process.env.ORIGINAL_ARGS
  ? JSON.parse(process.env.ORIGINAL_ARGS)
  : process.argv.slice(2);
main(args[0]);
