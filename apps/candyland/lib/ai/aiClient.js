// /home/tandy/dev/candyland/lib/ai/aiClient.js

import { GoogleGenerativeAI } from '@google/generative-ai';
import { OpenAI } from 'openai';

// 1. Initialize AI Clients
const geminiClient = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);
const openAIClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// 2. In-memory status tracking object
let aiStatus = {
  openai: {
    status: 'OK',
    lastUsed: null,
    lastError: null,
  },
  gemini: {
    status: 'OK',
    lastUsed: null,
    lastError: null,
  },
  timestamp: new Date().toISOString(),
  environment: process.env.NODE_ENV || 'development',
};

// 3. The core function with failover logic
export async function runSmartAI(prompt) {
  const timestamp = new Date().toISOString();
  aiStatus.timestamp = timestamp;

  // --- Try Gemini First ---
  try {
    // Changed model from 'gemini-1.5-pro' to 'gemini-1.5-flash'
    const model = geminiClient.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const response = result.response.text();

    // Update status on success
    aiStatus.gemini.status = 'OK';
    aiStatus.gemini.lastUsed = timestamp;
    aiStatus.gemini.lastError = null;

    return { source: 'Gemini', response };
  } catch (geminiError) {
    console.error('Gemini Error:', geminiError.message);
    aiStatus.gemini.status = 'Error';
    aiStatus.gemini.lastError = geminiError.message;

    // --- Fallback to OpenAI ---
    console.log('Falling back to OpenAI...');
    try {
      const completion = await openAIClient.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'gpt-4-turbo',
      });
      const response = completion.choices[0].message.content;

      // Update status on success
      aiStatus.openai.status = 'OK';
      aiStatus.openai.lastUsed = timestamp;
      aiStatus.openai.lastError = null;

      return { source: 'OpenAI', response };
    } catch (openAIError) {
      console.error('OpenAI Error:', openAIError.message);
      aiStatus.openai.status = 'Error';
      aiStatus.openai.lastError = openAIError.message;

      // Both have failed
      return { source: 'None', response: 'Both AI services are currently unavailable.' };
    }
  }
}

// 4. Function to expose the status
export function getAIStatus() {
  aiStatus.timestamp = new Date().toISOString();
  return aiStatus;
}
