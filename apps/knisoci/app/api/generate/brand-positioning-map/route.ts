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
    const { brandId, brandPositioningMap } = await request.json();

    if (!brandId || !brandPositioningMap) {
      return NextResponse.json({ error: 'brandId and brandPositioningMap are required' }, { status: 400 });
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
        customerProfiles: true,
      },
    });

    if (!brand) {
      return NextResponse.json({ error: 'Brand not found' }, { status: 404 });
    }

    // 2. Construct a detailed prompt for Gemini to generate a brand positioning map
    const prompt = `
      Based on the following brand information, customer profiles, and initial brand positioning map, generate a detailed and strategic brand positioning map.
      The map should identify key attributes, competitive landscape, and the brand's unique position.

      **Brand Name:** ${brand.name}
      **Brand Mission:** ${brand.mission}
      **Brand Values:** ${JSON.stringify(brand.values)}
      **Target Audience:** ${brand.audience}
      **Brand Personality Traits:** ${JSON.stringify(brand.personalityTraits)}
      **Unique Selling Proposition (USP):** ${brand.usp}
      **Customer Profiles:** ${JSON.stringify(brand.customerProfiles)}

      **Initial Brand Positioning Map provided by user:**
      ${brandPositioningMap}

      **Output Format:**
      Generate the output as a single, raw JSON object with the following keys:
      - "positioningStatement": A concise positioning statement.
      - "keyAttributes": An array of key attributes that define the brand's position.
      - "competitiveLandscape": An analysis of competitors and their positions.
      - "uniquePosition": A description of the brand's unique position in the market.
      - "visualMapDescription": A textual description of how this could be visualized on a 2x2 or similar map.
    `;

    // 3. Call the Gemini API
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const generatedMap = response.text();

    // Attempt to parse the text as JSON. Gemini sometimes returns markdown code blocks.
    let parsedMap;
    try {
      parsedMap = JSON.parse(generatedMap.replace(/```json\n|```/g, ''));
    } catch (parseError) {
      console.warn('Gemini response was not direct JSON, attempting to extract from markdown block.');
      const jsonMatch = generatedMap.match(/```json\n([\s\S]*?)\n```/);
      if (jsonMatch && jsonMatch[1]) {
        parsedMap = JSON.parse(jsonMatch[1]);
      } else {
        throw new Error('Gemini response could not be parsed as JSON.');
      }
    }

    // 4. Save the generated brand positioning map to the database
    await prisma.brand.update({
      where: { id: brandId },
      data: {
        brandPositioningMap: parsedMap, // Assuming 'brandPositioningMap' is a JSON field in Brand schema
      },
    });

    // 5. Return the generated brand positioning map
    return NextResponse.json({ brandPositioningMap: parsedMap });

  } catch (error: any) {
    console.error('Error generating brand positioning map:', error);
    return NextResponse.json({ error: error.message || 'An internal server error occurred' }, { status: 500 });
  }
}
