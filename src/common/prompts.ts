import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

export interface MessageMinusSystem {
  role: "user" | "assistant";
  content: string;
}
export interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

export type MessageVercelTextContent = {
  type: "text";
  text: string;
};

export type MessageAnthropicTextContent = {
  type: "text";
  content: string;
};

export type MessageVercelImageContent = {
  type: "image";
  image: Buffer;
};

export type MessageAnthropicImageContent = {
  type: "image";
  source: {
    type: "base64";
    data: Buffer;
    media_type: "image/png" | "image/jpeg" | "image/jpg";
  };
};

export type MessageVercelFileContent = {
  type: "file";
  data: Buffer;
  mimeType: string;
};

export type MessageAnthropicFileContent = {
  type: "document";
  source: {
    type: "base64";
    data: Buffer;
    media_type: "application/pdf";
  };
};

export type MessageVercelContent =
  | MessageVercelTextContent
  | MessageVercelImageContent
  | MessageVercelFileContent;

export type MessageAnthropicContent =
  | MessageAnthropicTextContent
  | MessageAnthropicImageContent
  | MessageAnthropicFileContent;

export type MessageVercelUser = {
  role: "user";
  content: string | MessageVercelContent[];
};
export type MessageAnthropicUser = {
  role: "user";
  content: string | MessageAnthropicContent[];
};

export type MessageVercelAssistant = {
  role: "assistant";
  content: string;
};

export type MessageVercelSystem = {
  role: "system";
  content: string;
};

export type MessageAnthropicAssistant = {
  role: "assistant";
  content: string;
};

export type MessageAnthropicSystem = {
  role: "system";
  content: string;
};

export type MessageAnthropic = MessageAnthropicUser | MessageAnthropicAssistant;
//| MessageAnthropicSystem;

export type MessageVercel =
  | MessageVercelUser
  | MessageVercelAssistant
  | MessageVercelSystem;

export type MessageIncToolCall =
  | Message
  | {
      //role: "user" | "assistant" | "system";
      //content: string;
      type?: "function_call_output";
      call_id?: string;
      output?: string;
    };

export const convertMessageTextToMediaForVercel = (
  messages: Message[]
): MessageVercel[] => {
  return messages.map((message) => {
    if (message.role === "user" && message.content.includes("^media:")) {
      const mediaPath = message.content.split("^media:")[1].split("^")[0];
      const textContent = message.content
        .replace(`^media:${mediaPath}^`, "")
        .trim();
      console.log("mediaPath", mediaPath);
      if (
        mediaPath.endsWith(".png") ||
        mediaPath.endsWith(".jpg") ||
        mediaPath.endsWith(".jpeg")
      ) {
        return {
          role: "user",
          content: [
            { type: "text", text: textContent },
            { type: "image", image: fs.readFileSync(mediaPath) },
          ],
        };
      } else if (mediaPath.endsWith(".pdf")) {
        return {
          role: "user",
          content: [
            { type: "text", text: textContent },
            {
              type: "file",
              data: fs.readFileSync(mediaPath),
              mimeType: "application/pdf",
            },
          ],
        };
      }
    }
    return message;
  });
};

export const convertMessageTextToMediaForAnthropic = (
  messages: MessageMinusSystem[]
): any => { //MessageAnthropic[] TODO: fix any
  return messages.map((message) => {
    if (message.role === "user" && message.content.includes("^media:")) {
      const mediaPath = message.content.split("^media:")[1].split("^")[0];
      const textContent = message.content
        .replace(`^media:${mediaPath}^`, "")
        .trim();
      //console.log("mediaPath", mediaPath);
      if (
        mediaPath.endsWith(".png") ||
        mediaPath.endsWith(".jpg") ||
        mediaPath.endsWith(".jpeg")
      ) {
        return {
          role: "user",
          content: [
            { type: "text", text: textContent },
            {
              type: "image",
              source: {
                type: "base64",
                data: fs.readFileSync(mediaPath).toString("base64"),
                media_type: "image/png",
              },
            },
          ],
        };
      } else if (mediaPath.endsWith(".pdf")) {
        return {
          role: "user",
          content: [
            { type: "text", text: textContent },
            {
              type: "document",
              source: {
                type: "base64",
                data: fs.readFileSync(mediaPath).toString("base64"),
                media_type: "application/pdf",
              },
            },
          ],
        };
      }
    } else if (message.role === "assistant") {
      return {
        role: "assistant",
        content: message.content!,
      } as MessageAnthropicAssistant;
    } else if (message.role === "user") {
      return {
        role: "user",
        content: message.content!,
      } as MessageAnthropicUser;
    }
    throw new Error("Unknown message role: " + message.role);
  });
};
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
