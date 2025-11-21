"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockAIProvider = void 0;
// src/services/mockAIProvider.ts
const utils_1 = require("@sugarstudio/utils");
exports.mockAIProvider = {
    generateSOP: async (prompt) => {
        utils_1.logger.info(`[MOCK AI] Simulating SOP generation for prompt: "${prompt.substring(0, 50)}..."`);
        // Simulate a delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        // Return a deterministic mock SOP structure
        return {
            title: `Mock SOP for "${prompt.substring(0, 20)}..."`,
            steps: [
                { step: 1, description: "Mock Step 1: Analyze input text." },
                { step: 2, description: "Mock Step 2: Generate mock SOP content." },
                { step: 3, description: "Mock Step 3: Format as JSON." },
            ],
            category: "Mock Category",
            generated_by: "MockAIProvider",
            timestamp: new Date().toISOString(),
            original_prompt: prompt,
        };
    },
    // Add other mock AI functions as needed
};
