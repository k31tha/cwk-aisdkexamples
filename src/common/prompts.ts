import dotenv from "dotenv";
dotenv.config();

export interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

export const parseTextMessages = (args?: string[]): Message[] => {
  const messageArgs =
    args ||
    (process.env.ORIGINAL_ARGS
      ? JSON.parse(process.env.ORIGINAL_ARGS)
      : process.argv.slice(2));

  if (messageArgs.length === 0)
    return [
      {
        role: "assistant",
        content: "You are a helpful assistant that can answer questions.",
      },
      {
        role: "user",
        content: "what is the capital of england?",
      },
    ];

  // Expecting pairs of role and content
  const messages: Message[] = [];
  for (let i = 0; i < messageArgs.length; i += 2) {
    const role = messageArgs[i] as "user" | "assistant";
    const content = messageArgs[i + 1];
    if (role && content) {
      messages.push({ role, content });
    }
  }
  return messages.length > 0
    ? messages
    : [
        {
          role: "assistant",
          content: "You are a helpful assistant that can answer questions.",
        },
        {
          role: "user",
          content: "what is the capital of england?",
        },
      ];
};

export interface Prompts {
  systemPrompt?: string;
  messages?: Message[];
}
