export declare const GEMINI_MODELS: {
    FLASH: string;
    PRO: string;
};
export type GeminiModel = keyof typeof GEMINI_MODELS;
export declare const getDefaultGeminiModel: () => GeminiModel;
export declare const getGeminiModelName: (model: GeminiModel) => string;
//# sourceMappingURL=geminiModels.d.ts.map