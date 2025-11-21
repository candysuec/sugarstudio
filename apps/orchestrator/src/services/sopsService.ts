import path from 'path';
import fs from 'fs/promises';
import { logger } from '@sugarstudio/utils';
import { generateUniqueId } from "foundation";

export const generateSOP = async (sopName: string, content: string): Promise<string> => {
  const filename = `${sopName}-${generateUniqueId()}.md`;
  const sopPath = path.join(process.cwd(), 'apps', 'orchestrator', 'sop', filename);

  try {
    await fs.writeFile(sopPath, content, 'utf8');
    logger.info(`SOP '${sopName}' generated and saved to ${sopPath}`);
    return sopPath;
  } catch (error: any) {
    logger.error(`Error generating SOP '${sopName}': ${error.message}`, error.stack);
    throw error;
  }
};

// Placeholder for AI-powered SOP generation logic
export const generateSOPWithAI = async (prompt: string): Promise<string> => {
  logger.info(`Generating SOP with AI for prompt: ${prompt}`);
  // In a real scenario, this would call an AI model (e.g., Gemini API)
  const aiGeneratedContent = `## AI Generated SOP for: ${prompt}\n\nThis is a placeholder for AI-generated content.`;
  const sopPath = await generateSOP(`AI-SOP-${generateUniqueId()}`, aiGeneratedContent);
  return sopPath;
};
