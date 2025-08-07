import dotenv from "dotenv";
import { geminiai, geminiAiModelName } from "../../../common";
dotenv.config();

const main = async (
  prompt: string = "what is the capital of england?",
  systemPrompt: string = "You are a helpful assistant that can answer questions."
) => {
  const response = await await geminiai.models.generateContent({
    model: geminiAiModelName,
    contents: prompt,
    config: {
      systemInstruction: systemPrompt,
    },
  });

  console.log("Answer");
  //console.dir(await response, { depth: null });
  console.log(await response.text);
};

// Get the prompt and system prompt from environment variable or command line arguments
const args = process.env.ORIGINAL_ARGS
  ? JSON.parse(process.env.ORIGINAL_ARGS)
  : process.argv.slice(2);
main(args[0], args[1]);
