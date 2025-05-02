import { tool } from "ai";
import { z } from "zod";
import Anthropic from "@anthropic-ai/sdk";
import { Responses } from "openai/resources/index";

export const getBasicWeatherTool = tool({
  description:
    "Get the current weather in the specified city and region when the weather is asked for",
  parameters: z.object({
    city: z.string().describe("The city to get the weather for"),
    region: z.string().describe("The region to get the weather for"),
  }),
  execute: async ({ city, region }) => {
    return (
      "The weather in " + city + ", " + region + " is 15 degrees and sunny"
    );
  },
});

export const getWeatherData = async (location: string) => {
  // In a real implementation, this would call a weather API
  // This is just mock data for the example
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?q=${location}&aqi=no&key=${process.env.WEATHER_API_KEY}`
  );
  const data = await response.json();
  return data;
};

export const getWeatherDataBasic = async (location: string) => {
  // In a real implementation, this would call a weather API
  // This is just mock data for the example
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?q=${location}&aqi=no&key=${process.env.WEATHER_API_KEY}`
  );
  return "The weather in " + location + " is 15 degrees and sunny";
};

export const getWeatherTool = tool({
  description:
    "Get the current weather in the specified city and region when the weather is asked for",
  parameters: z.object({
    city: z.string().describe("The city to get the weather for"),
    region: z.string().describe("The region to get the weather for"),
  }),
  execute: async ({ city, region }) => {
    const data = await getWeatherData(city + ", " + region);
    return data;
  },
});
export const toolsForAnthropic: Anthropic.Tool[] = [
  {
    name: "getBasicCurrentWeather",
    description: "Get the current weather in a given location",
    input_schema: {
      type: "object",
      properties: {
        location: {
          type: "string",
          description: "The city and state, e.g., San Francisco, CA",
        },
        unit: {
          type: "string",
          enum: ["celsius", "fahrenheit"],
          description: "The unit of temperature to use",
        },
      },
      required: ["location"],
    },
  },
];

export const toolsForOpenAI: Responses.Tool[] = [
  {
    type: "function",
    name: "get_weather",
    description:
      "Get current temperature for provided location in specified unit.",
    parameters: {
      type: "object",
      properties: {
        location: {
          type: "string",
          description: "The city and state, e.g., San Francisco, CA",
        },
        unit: {
          type: "string",
          enum: ["celsius", "fahrenheit"],
          description: "The unit of temperature to use",
        },
      },
      required: ["location", "unit"],
      additionalProperties: false,
    },
    strict: true,
  },
];
