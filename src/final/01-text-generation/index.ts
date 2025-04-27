import { generateTextWithVercelAiSdk } from "./vercel-ai-sdk";
import { generateTextWithAnthropicAiSdk } from "./anthropic-ai-sdk";
import { Prompts, parseTextMessages } from "../../common";

export const runVercelAISdkExample = async (prompts: Prompts) => {
  console.log("\nRunning Vercel AI example:");
  try {
    await generateTextWithVercelAiSdk(prompts);
    console.log("Vercel AI example completed successfully");
  } catch (error) {
    console.error("Vercel AI example failed:", error);
    throw error;
  }
};
export const runAnthropicAISdkExample = async (prompts: Prompts) => {
  console.log("\nRunning Anthropic AI example:");
  try {
    await generateTextWithAnthropicAiSdk(prompts);
    console.log("Vercel AI example completed successfully");
  } catch (error) {
    console.error("Vercel AI example failed:", error);
    throw error;
  }
};

async function main(prompts: Prompts, sampleType?: string) {
  console.log("Running examples with prompts:", prompts);
  console.log("Sample type:", sampleType);
  if (sampleType === "vercel-ai-sdk") {
    await runVercelAISdkExample(prompts);
  } else if (sampleType === "openai-sdk") {
    //await runOpenAISdkExample(prompts);
    console.log("OpenAI example not implemented yet");
  } else if (sampleType === "anthropic-sdk") {
    await runAnthropicAISdkExample(prompts);
    console.log("Anthropic example not implemented yet");
  } else {
    console.error(`Unknown SDK type: ${sampleType}`);
    process.exit(1);
  }
}

const args = process.env.ORIGINAL_ARGS
  ? JSON.parse(process.env.ORIGINAL_ARGS)
  : process.argv.slice(2);
const systemIndex = args.findIndex((arg: string) => arg === "system");
const system = systemIndex !== -1 ? args[systemIndex + 1] : undefined;
const messageArgs = args.filter(
  (arg: string, index: number) =>
    arg !== "system" && (systemIndex === -1 || index !== systemIndex + 1)
);
//const messages = parseTextMessages(messageArgs);
const prompts: Prompts = {
  messages: parseTextMessages(messageArgs),
  systemPrompt: system,
};
console.log("Prompts:->");
console.dir(prompts, { depth: 3 });
console.log("<-Prompts");

// Get the SDK file from command line arguments
const sdkFile = process.argv[2];

if (!sdkFile) {
  console.error("Please provide an SDK file");
  process.exit(1);
}

main(prompts, sdkFile).catch(console.error);
