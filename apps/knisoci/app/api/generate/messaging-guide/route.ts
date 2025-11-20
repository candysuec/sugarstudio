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
        name: true,
        mission: true,
        values: true,
        audience: true,
        personalityTraits: true,
        usp: true,
        messagingMatrix: true,
        contentPillars: true,
      },
    });

    if (!brand) {
      return NextResponse.json({ error: 'Brand not found' }, { status: 404 });
    }

    // 2. Construct a detailed prompt for Gemini to generate a messaging guide
    const prompt = `
      Based on the following brand information, generate a comprehensive messaging guide.
      The guide should include:
      - Core Message
      - Value Propositions
      - Key Messaging Points (from Messaging Matrix)
      - Brand Voice and Tone Guidelines
      - Example Phrases (Say/Don't Say)
      - Content Pillars and their associated messages.

      **Brand Name:** ${brand.name}
      **Brand Mission:** ${brand.mission}
      **Brand Values:** ${JSON.stringify(brand.values)}
      **Target Audience:** ${brand.audience}
      **Brand Personality Traits:** ${JSON.stringify(brand.personalityTraits)}
      **Unique Selling Proposition (USP):** ${brand.usp}
      **Messaging Matrix (Key Messages):** ${JSON.stringify(brand.messagingMatrix)}
      **Content Pillars:** ${JSON.stringify(brand.contentPillars)}

      **Output Format:**
      Generate the output as a Markdown string, suitable for direct display or export.
    `;

    // 3. Call the Gemini API
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const generatedGuide = response.text();

    // 4. Save the generated messaging guide to the database
    await prisma.brand.update({
      where: { id: brandId },
      data: {
        messagingGuide: generatedGuide, // Assuming 'messagingGuide' is a String field in Brand schema
      },
    });

    // 5. Return the generated messaging guide
    return NextResponse.json({ messagingGuide: generatedGuide });

  } catch (error: any) {
    console.error('Error generating messaging guide:', error);
    return NextResponse.json({ error: error.message || 'An internal server error occurred' }, { status: 500 });
  }
}
