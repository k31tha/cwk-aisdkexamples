import dotenv from "dotenv";
import { anthropic } from "@ai-sdk/anthropic";
import { openai } from "@ai-sdk/openai";
import Anthropic from "@anthropic-ai/sdk";
import { OpenAI } from "openai";
import { GoogleGenAI } from "@google/genai";
dotenv.config();
export const anthropicAiModelName = "claude-3-7-sonnet-latest";
export const openaiAiModelName = "gpt-4.1-mini";
export const geminiAiModelName = "gemini-1.5-flash";

export const vercelAnthropicAiModel = anthropic(anthropicAiModelName);

export const vercelOpenaiAiModel = openai(openaiAiModelName);
export const vercelOpenaiResponsesAiModel = openai.responses(openaiAiModelName);

export const anthropicAi = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const openAi = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const geminiai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
