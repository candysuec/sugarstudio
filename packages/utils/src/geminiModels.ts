// sugarstudio/apps/knisoci/src/utils/geminiModels.ts

export const GEMINI_MODELS = {
  FLASH: 'gemini-1.5-flash',
  PRO: 'gemini-1.5-pro',
  // Add other models as needed
};

export type GeminiModel = keyof typeof GEMINI_MODELS;

export const getDefaultGeminiModel = (): GeminiModel => {
  // You can implement logic here to choose a default model based on environment, user tier, etc.
  // For now, we'll default to FLASH
  return 'FLASH';
};

export const getGeminiModelName = (model: GeminiModel): string => {
  return GEMINI_MODELS[model];
};
