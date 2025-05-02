import dotenv from "dotenv";

import {
  openAi,
  openaiAiModelName,
  Message,
  parseTextMessages,
  toolsForOpenAI,
  getWeatherData,
  MessageIncToolCall,
} from "../../../common";

dotenv.config();

const main = async (
  messages: MessageIncToolCall[] = [
    {
      role: "assistant",
      content: "You are a helpful assistant that can answer questions.",
    },
    {
      role: "user",
      content: "what is the capital of england?",
    },
  ],
  system?: string
) => {
  if (system) {
    messages.unshift({
      role: "system",
      content: system,
    });
  }
  const response = await openAi.responses.create({
    model: openaiAiModelName,
    input: messages as Message[],
    tools: toolsForOpenAI,
  });
  const toolCall: any = response.output[0];
  if (toolCall.type === "function_call") {
    console.log("toolCall");
    console.dir(toolCall, { depth: 4 });
    const toolName = toolCall.id;
    const toolArgs = JSON.parse(toolCall.arguments);

    const weatherResult = await getWeatherData(toolArgs.location);

    messages.push(toolCall);

    messages.push({
      type: "function_call_output",
      call_id: toolCall.call_id,
      //tool_call_id: toolCall.id,
      output: JSON.stringify(weatherResult),
    });

    const finalResponse = await openAi.responses.create({
      model: openaiAiModelName,
      input: messages as any,
      //max_tokens: 1000,
      temperature: 0.7,
      tools: toolsForOpenAI,
    });
    //console.log("finalResponse");
    //console.dir(finalResponse, { depth: 4 });
    const textContent = finalResponse.output_text;
    console.log("Final response:");
    console.log(textContent || "");
    console.log("usage");
    console.dir(finalResponse.usage, { depth: 4 });
  } else {
    console.log("no toolCall");
    //console.dir(response, { depth: 4 });
    const generatedText = response.output_text;
    console.log("Final response:");
    console.log(generatedText || "");
    console.log("usage");
    console.dir(response.usage, { depth: 4 });
  }
};

// Get the system parameter from environment variable or command line arguments
const args = process.env.ORIGINAL_ARGS
  ? JSON.parse(process.env.ORIGINAL_ARGS)
  : process.argv.slice(2);
const systemIndex = args.findIndex((arg: string) => arg === "system");
const system = systemIndex !== -1 ? args[systemIndex + 1] : undefined;
const messageArgs = args.filter(
  (arg: string, index: number) =>
    arg !== "system" && (systemIndex === -1 || index !== systemIndex + 1)
);

const messages = parseTextMessages(messageArgs);

main(messages, system);
