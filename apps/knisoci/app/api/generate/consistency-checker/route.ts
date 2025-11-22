export const runtime = "nodejs";

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { GoogleGenerativeAI } from '@google/generative-ai';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: Request) {
  try {
    const { brandId, textToCheck } = await request.json();

    if (!brandId || !textToCheck) {
      return NextResponse.json({ error: 'brandId and textToCheck are required' }, { status: 400 });
    }

    // 1. Fetch the brand's core data
    const brand = await prisma.brand.findUnique({
      where: { id: brandId },
      select: {
        personalityTraits: true,
        messagingMatrix: true,
      },
    });

    if (!brand) {
      return NextResponse.json({ error: 'Brand not found' }, { status: 404 });
    }

    // 2. Construct a detailed prompt for the Gemini API
    const prompt = `
      Analyze the following text for consistency against the provided brand voice guidelines.

      **Brand Voice Guidelines:**
      - Personality Traits: ${brand.personalityTraits}
      - Core Messaging: ${JSON.stringify((brand.messagingMatrix as any)?.keyMessages, null, 2)}
      - Tone: ${(brand.messagingMatrix as any)?.toneSliders || 'Not specified'}

      **Text to Analyze:**
      "${textToCheck}"

      **Your Task:**
      Provide a "consistencyScore" from 0 to 100, where 100 is perfectly consistent.
      Also provide a brief "analysis" (2-3 sentences) explaining your score, highlighting what aligns well and what could be improved.

      **Output Format:**
      Generate the output as a single, raw JSON object with no extra text, formatting, or markdown.
      Example:
      {
        "consistencyScore": 85,
        "analysis": "The text aligns well with the 'Confident' and 'Witty' personality traits. However, it could better incorporate the key message about 'empowerment' to improve its score."
      }
    `;

    // 3. Call the Gemini API
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // 4. Parse the JSON response
    let analysisResult;
    try {
      const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
      analysisResult = JSON.parse(cleanedText);
    } catch (e) {
      console.error('Failed to parse Gemini response:', text);
      throw new Error('Invalid JSON response from AI model.');
    }

    // 5. Return the analysis result
    return NextResponse.json(analysisResult);

  } catch (error: any) {
    console.error('Error in consistency checker:', error);
    return NextResponse.json({ error: error.message || 'An internal server error occurred' }, { status: 500 });
  }
}
