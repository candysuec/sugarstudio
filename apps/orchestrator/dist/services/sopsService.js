"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSOPWithAI = exports.generateSOP = void 0;
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const utils_1 = require("@sugarstudio/utils");
const foundation_1 = require("foundation");
const generateSOP = async (sopName, content) => {
    const filename = `${sopName}-${(0, foundation_1.generateUniqueId)()}.md`;
    const sopPath = path_1.default.join(process.cwd(), 'apps', 'orchestrator', 'sop', filename);
    try {
        await promises_1.default.writeFile(sopPath, content, 'utf8');
        utils_1.logger.info(`SOP '${sopName}' generated and saved to ${sopPath}`);
        return sopPath;
    }
    catch (error) {
        utils_1.logger.error(`Error generating SOP '${sopName}': ${error.message}`, error.stack);
        throw error;
    }
};
exports.generateSOP = generateSOP;
// Placeholder for AI-powered SOP generation logic
const generateSOPWithAI = async (prompt) => {
    utils_1.logger.info(`Generating SOP with AI for prompt: ${prompt}`);
    // In a real scenario, this would call an AI model (e.g., Gemini API)
    const aiGeneratedContent = `## AI Generated SOP for: ${prompt}\n\nThis is a placeholder for AI-generated content.`;
    const sopPath = await (0, exports.generateSOP)(`AI-SOP-${(0, foundation_1.generateUniqueId)()}`, aiGeneratedContent);
    return sopPath;
};
exports.generateSOPWithAI = generateSOPWithAI;
