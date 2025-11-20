import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { generateBrandDnaPrompt } from '../../../../src/prompts/brandDiscoveryPrompts'; // Import the prompt template

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
    const { brandName, mission, values, audience, personalityTraits, usp, customerProfiles, brandPositioningMap } = await request.json();

    if (!brandName || !mission || !values || !audience || !personalityTraits || !usp || !customerProfiles || !brandPositioningMap) {
      return NextResponse.json({ error: 'All brand DNA fields are required.' }, { status: 400 });
    }

    // 1. Use the prompt template to generate the prompt string
    const prompt = generateBrandDnaPrompt({
      brandName,
      mission,
      values,
      audience,
      personalityTraits,
      usp,
      customerProfiles,
      brandPositioningMap,
    });

    // 2. Call the Gemini API
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const generatedDna = response.text();

    // Attempt to parse the text as JSON. Gemini sometimes returns markdown code blocks.
    let parsedDna;
    try {
      parsedDna = JSON.parse(generatedDna.replace(/```json\n|```/g, ''));
    } catch (parseError) {
      console.warn('Gemini response was not direct JSON, attempting to extract from markdown block.');
      const jsonMatch = generatedDna.match(/```json\n([\s\S]*?)\n```/);
      if (jsonMatch && jsonMatch[1]) {
        parsedDna = JSON.parse(jsonMatch[1]);
      } else {
        throw new Error('Gemini response could not be parsed as JSON.');
      }
    }

    // 3. Create a new Brand record in Prisma
    const newBrand = await prisma.brand.create({
      data: {
        name: parsedDna.name,
        mission: parsedDna.mission,
        vision: parsedDna.vision,
        values: parsedDna.values,
        targetAudience: parsedDna.targetAudience,
        usp: parsedDna.usp,
        personalityTraits: parsedDna.personalityTraits,
        customerProfiles: parsedDna.customerProfilesSummary,
        brandPositioningMap: parsedDna.brandPositioningSummary,
        userId: 'clsy0123456789abcdefg', // Placeholder userId
      },
    });

    // 4. Return the created brand
    return NextResponse.json({ brand: newBrand });

  } catch (error: any) {
    console.error('Error generating brand DNA:', error);
    return NextResponse.json({ error: error.message || 'An internal server error occurred' }, { status: 500 });
  }
}
