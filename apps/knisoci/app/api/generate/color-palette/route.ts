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
    const { brandId } = await request.json();

    if (!brandId) {
      return NextResponse.json({ error: 'brandId is required' }, { status: 400 });
    }

    // 1. Fetch the brand's data
    const brand = await prisma.brand.findUnique({
      where: { id: brandId },
      select: {
        personalityTraits: true,
      },
    });

    if (!brand) {
      return NextResponse.json({ error: 'Brand not found' }, { status: 404 });
    }

    // 2. Construct a detailed prompt for Gemini
    const prompt = `
      Based on the following brand personality traits, generate a color palette.

      **Brand Personality Traits:** ${brand.personalityTraits}

      Generate a color palette in JSON format with the following keys:
      - "primary": A versatile primary color (hex code).
      - "secondary": A secondary color that complements the primary (hex code).
      - "accent": An accent color for calls-to-action and highlights (hex code).
      - "neutral": A neutral color for backgrounds and text (e.g., a dark grey or off-white) (hex code).
      - "description": A brief explanation of why this palette fits the brand's personality.

      **Output Format:**
      Generate the output as a single, raw JSON object with no extra text, formatting, or markdown.
      Example:
      {
        "primary": "#1A237E",
        "secondary": "#5C6BC0",
        "accent": "#FFCA28",
        "neutral": "#F5F5F5",
        "description": "This palette combines a deep, trustworthy blue with a vibrant, optimistic yellow accent, reflecting a brand that is both professional and approachable."
      }
    `;

    // 3. Call the Gemini API
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // 4. Parse the JSON response
    let colorPalette;
    try {
      const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
      colorPalette = JSON.parse(cleanedText);
    } catch (e) {
      console.error('Failed to parse Gemini response:', text);
      throw new Error('Invalid JSON response from AI model.');
    }

    // 5. Save the generated palette to the database
    await prisma.brand.update({
      where: { id: brandId },
      data: {
        colorPalette: colorPalette,
      },
    });

    // 6. Return the generated palette
    return NextResponse.json({ colorPalette });

  } catch (error: any) {
    console.error('Error generating color palette:', error);
    return NextResponse.json({ error: error.message || 'An internal server error occurred' }, { status: 500 });
  }
}
