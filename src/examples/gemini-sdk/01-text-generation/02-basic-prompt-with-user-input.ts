import dotenv from "dotenv";
import { geminiai, geminiAiModelName } from "../../../common";
dotenv.config();

const main = async (prompt: string = "what is the capital of england?") => {
  const response = await geminiai.models.generateContent({
    model: geminiAiModelName,
    contents: prompt,
  });

  console.log("Answer");
  console.log(await response.text);
};

// Get the prompt from environment variable or command line arguments
const args = process.env.ORIGINAL_ARGS
  ? JSON.parse(process.env.ORIGINAL_ARGS)
  : process.argv.slice(2);
main(args[0]);
