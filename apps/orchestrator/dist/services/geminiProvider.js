"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.geminiProvider = void 0;
const generative_ai_1 = require("@google/generative-ai"); // Import HarmCategory and HarmBlockThreshold
const utils_1 = require("@sugarstudio/utils");
const utils_2 = require("@sugarstudio/utils");
const utils_3 = require("@sugarstudio/utils");
const utils_4 = require("@sugarstudio/utils");
const genAI = new generative_ai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
// Define default safety settings
const defaultSafetySettings = [
    {
        category: generative_ai_1.HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: generative_ai_1.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: generative_ai_1.HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: generative_ai_1.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: generative_ai_1.HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: generative_ai_1.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: generative_ai_1.HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: generative_ai_1.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
];
exports.geminiProvider = {
    generateSOP: async (rawText, modelName) => {
        if (!process.env.GEMINI_API_KEY) {
            utils_1.logger.error('GEMINI_API_KEY is not set. Cannot use Gemini API.');
            throw new Error('GEMINI_API_KEY is not set.');
        }
        const selectedModelName = modelName ? (0, utils_2.getGeminiModelName)(modelName) : (0, utils_2.getGeminiModelName)((0, utils_2.getDefaultGeminiModel)());
        const cacheKey = `sop-${selectedModelName}-${rawText}`;
        const cachedResponse = utils_3.geminiCache.get(cacheKey);
        if (cachedResponse) {
            utils_1.logger.info(`Returning cached SOP response for key: ${cacheKey}`);
            return cachedResponse;
        }
        const startTime = process.hrtime.bigint(); // Start timer
        try {
            const model = genAI.getGenerativeModel({ model: selectedModelName, safetySettings: defaultSafetySettings }); // Add safety settings
            const prompt = `
        You are an expert in process documentation. Based on the following raw text, generate a detailed Standard Operating Procedure (SOP).
        The SOP should be clear, concise, and actionable. Include sections like:
        - Title
        - Purpose
        - Scope
        - Responsibilities
        - Procedure Steps (numbered)
        - Related Documents (if any)
        - Revision History

        Raw Text:
        ${rawText}

        Please return the SOP in a structured JSON format, with keys for each section.
      `;
            const result = await model.generateContent(prompt);
            // Check for safety feedback
            if (result.response.promptFeedback && result.response.promptFeedback.blockReason) {
                const blockReason = result.response.promptFeedback.blockReason;
                utils_1.logger.warn(`Gemini API call blocked due to safety settings: ${blockReason}`);
                throw new Error(`Content blocked by safety filters: ${blockReason}`);
            }
            const response = await result.response;
            const text = response.text();
            // Record API usage
            console.log(JSON.stringify(result.response, null, 2));
            const usage = result.response.usageMetadata;
            if (usage) {
                utils_4.costTracker.recordGeminiUsage(selectedModelName, usage.promptTokenCount ?? 0, usage.candidatesTokenCount ?? 0, 'generateSOP');
            }
            // Record analytics
            const endTime = process.hrtime.bigint(); // End timer
            const durationMs = Number(endTime - startTime) / 1_000_000;
            utils_4.costTracker.recordGeminiAnalytics({
                model: selectedModelName,
                jobType: 'generateSOP',
                promptLength: rawText.length,
                responseLength: text.length,
                durationMs: durationMs,
                safetyFeedback: result.response.promptFeedback,
            });
            // Attempt to parse the text as JSON. Gemini sometimes returns markdown code blocks.
            let parsedResponse;
            try {
                parsedResponse = JSON.parse(text.replace(/```json\n|```/g, ''));
            }
            catch (parseError) {
                utils_1.logger.warn('Gemini response was not direct JSON, attempting to extract from markdown block.');
                // Fallback if it's not a direct JSON, try to find a JSON block
                const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
                if (jsonMatch && jsonMatch[1]) {
                    parsedResponse = JSON.parse(jsonMatch[1]);
                }
                else {
                    throw new Error('Gemini response could not be parsed as JSON.');
                }
            }
            utils_3.geminiCache.set(cacheKey, parsedResponse); // Cache the successful response
            return parsedResponse;
        }
        catch (error) {
            utils_1.logger.error(`Error calling Gemini API: ${error.message}`);
            throw error;
        }
    },
    generateImageDescription: async (promptText, base64Image, modelName) => {
        if (!process.env.GEMINI_API_KEY) {
            utils_1.logger.error('GEMINI_API_KEY is not set. Cannot use Gemini API for image generation.');
            throw new Error('GEMINI_API_KEY is not set.');
        }
        const selectedModelName = modelName ? (0, utils_2.getGeminiModelName)(modelName) : 'gemini-pro-vision'; // Default to vision model
        const cacheKey = `img-${selectedModelName}-${promptText}-${base64Image.substring(0, 50)}`; // Truncate image for key
        const cachedResponse = utils_3.geminiCache.get(cacheKey);
        if (cachedResponse) {
            utils_1.logger.info(`Returning cached image description response for key: ${cacheKey}`);
            return cachedResponse;
        }
        const startTime = process.hrtime.bigint(); // Start timer
        try {
            // Use a vision-capable model
            const model = genAI.getGenerativeModel({ model: selectedModelName, safetySettings: defaultSafetySettings }); // Add safety settings
            const image = {
                inlineData: {
                    data: base64Image,
                    mimeType: 'image/jpeg', // Assuming JPEG, adjust if other types are needed
                },
            };
            const result = await model.generateContent([promptText, image]);
            // Check for safety feedback
            if (result.response.promptFeedback && result.response.promptFeedback.blockReason) {
                const blockReason = result.response.promptFeedback.blockReason;
                utils_1.logger.warn(`Gemini API call blocked due to safety settings: ${blockReason}`);
                throw new Error(`Content blocked by safety filters: ${blockReason}`);
            }
            const response = await result.response;
            const text = response.text();
            // Record API usage
            const usage = result.response.usageMetadata;
            if (usage) {
                utils_4.costTracker.recordGeminiUsage(selectedModelName, usage.promptTokenCount ?? 0, usage.candidatesTokenCount ?? 0, 'generateImageDescription');
            }
            // Record analytics
            const endTime = process.hrtime.bigint(); // End timer
            const durationMs = Number(endTime - startTime) / 1_000_000;
            utils_4.costTracker.recordGeminiAnalytics({
                model: selectedModelName,
                jobType: 'generateImageDescription',
                promptLength: promptText.length,
                responseLength: text.length,
                durationMs: durationMs,
                safetyFeedback: result.response.promptFeedback,
            });
            utils_3.geminiCache.set(cacheKey, text); // Cache the successful response
            return text; // Return raw text description for now
        }
        catch (error) {
            utils_1.logger.error(`Error calling Gemini API for image description: ${error.message}`);
            throw error;
        }
    },
    // Add other Gemini-related functions here as needed
};
