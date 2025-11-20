import {
  NextResponse
} from 'next/server';
import {
  PrismaClient
} from '@prisma/client';
import {
  GoogleGenerativeAI
} from '@google/generative-ai';

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
      },
    });

    if (!brand) {
      return NextResponse.json({ error: 'Brand not found' }, { status: 404 });
    }

    // 2. Construct a detailed prompt for Gemini to generate typography pairings
    const prompt = `
      Based on the following brand information, suggest a set of typography pairings (e.g., heading font, body font, accent font).
      Consider the brand's personality, target audience, and overall aesthetic.
      Provide font names, suggested usage, and a brief rationale for each pairing.

      **Brand Name:** ${brand.name}
      **Brand Mission:** ${brand.mission}
      **Brand Values:** ${JSON.stringify(brand.values)}
      **Target Audience:** ${brand.audience}
      **Brand Personality Traits:** ${JSON.stringify(brand.personalityTraits)}
      **Unique Selling Proposition (USP):** ${brand.usp}

      **Output Format:**
      Generate the output as a single, raw JSON object with the following keys:
      - "headingFont": { "name": "Font Name", "usage": "For headlines and titles", "rationale": "..." }
      - "bodyFont": { "name": "Font Name", "usage": "For body text and paragraphs", "rationale": "..." }
      - "accentFont": { "name": "Font Name", "usage": "For call-to-actions and highlights", "rationale": "..." }
      - "overallRationale": "Overall explanation for the chosen pairings."
    `;

    // 3. Call the Gemini API
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const generatedPairings = response.text();

    // Attempt to parse the text as JSON. Gemini sometimes returns markdown code blocks.
    let parsedPairings;
    try {
      parsedPairings = JSON.parse(generatedPairings.replace(/```json\n|```/g, ''));
    } catch (parseError) {
      console.warn('Gemini response was not direct JSON, attempting to extract from markdown block.');
      const jsonMatch = generatedPairings.match(/```json\n([\s\S]*?)\n```/);
      if (jsonMatch && jsonMatch[1]) {
        parsedPairings = JSON.parse(jsonMatch[1]);
      } else {
        throw new Error('Gemini response could not be parsed as JSON.');
      }
    }

    // 4. Save the generated typography pairings to the database
    await prisma.brand.update({
      where: { id: brandId },
      data: {
        typographyPairings: parsedPairings, // Assuming 'typographyPairings' is a JSON field in Brand schema
      },
    });

    // 5. Return the generated typography pairings
    return NextResponse.json({ typographyPairings: parsedPairings });

  } catch (error: any) {
    console.error('Error generating typography pairings:', error);
    return NextResponse.json({ error: error.message || 'An internal server error occurred' }, { status: 500 });
  }
}
