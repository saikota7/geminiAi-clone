/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

// Use environment variables for sensitive information like API keys
const apiKey = "AIzaSyCTTSL4cSOp5idfN_9IoRtourGnOPzuPHM"; 

const genAI = new GoogleGenerativeAI(apiKey);

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
];

async function run(prompt) {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    safetySettings, // Add safety settings here
  });

  const chatSession = model.startChat({
    generationConfig,
    history: [], // Chat history (if any)
  });

  const result = await chatSession.sendMessage(prompt);
  console.log(result.response.text());
  
  // Return the correct result instead of undefined 'response'
  return result.response.text(); 
}

export default run;

