import dotenv from "dotenv";
import {
  openAi,
  openaiAiModelName,
  Message,
  parseTextMessages,
  Prompts,
  toolsForOpenAI,
  getWeatherData,
  MessageIncToolCall,
} from "../../common";
dotenv.config();

export const generateOutputUsingToolsWithOpenAiSdk = async (
  prompts: Prompts
) => {
  let messages: MessageIncToolCall[] = prompts.messages || [];
  if (prompts.systemPrompt) {
    messages?.unshift({
      role: "system",
      content: prompts.systemPrompt,
    });
  }
  const response = await openAi.responses.create({
    model: openaiAiModelName,
    input: messages as Message[],
    tools: toolsForOpenAI,
  });
  const toolCall: any = response.output[0];
  if (toolCall.type === "function_call") {
    const toolName = toolCall.id;
    const toolArgs = JSON.parse(toolCall.arguments);

    const weatherResult = await getWeatherData(toolArgs.location);

    messages?.push(toolCall);

    messages?.push({
      type: "function_call_output",
      call_id: toolCall.call_id,
      //tool_call_id: toolCall.id,
      output: JSON.stringify(weatherResult),
    });

    const finalResponse = await openAi.responses.create({
      model: openaiAiModelName,
      input: prompts.messages as any,
      //max_tokens: 1000,
      temperature: 0.7,
      tools: toolsForOpenAI,
    });
    //console.log("finalResponse");
    //console.dir(finalResponse, { depth: 4 });
    const textContent = finalResponse.output_text;
    console.log("Final response:");
    console.log(textContent || "");
    //console.log("usage");
    //console.dir(finalResponse.usage, { depth: 4 });
  } else {
    //console.log("no toolCall");
    //console.dir(response, { depth: 4 });
    const generatedText = response.output_text;
    console.log("Final response:");
    console.log(generatedText || "");
    //console.log("usage");
    //console.dir(response.usage, { depth: 4 });
  }
};
