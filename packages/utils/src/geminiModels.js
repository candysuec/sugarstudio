'use strict';
// sugarstudio/apps/knisoci/src/utils/geminiModels.ts
Object.defineProperty(exports, '__esModule', { value: true });
exports.getGeminiModelName = exports.getDefaultGeminiModel = exports.GEMINI_MODELS = void 0;
exports.GEMINI_MODELS = {
  FLASH: 'gemini-1.5-flash',
  PRO: 'gemini-1.5-pro',
  // Add other models as needed
};
const getDefaultGeminiModel = () => {
  // You can implement logic here to choose a default model based on environment, user tier, etc.
  // For now, we'll default to FLASH
  return 'FLASH';
};
exports.getDefaultGeminiModel = getDefaultGeminiModel;
const getGeminiModelName = (model) => {
  return exports.GEMINI_MODELS[model];
};
exports.getGeminiModelName = getGeminiModelName;
