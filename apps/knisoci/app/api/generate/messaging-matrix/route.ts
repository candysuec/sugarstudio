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

    // 1. Fetch the brand's core data from the database
    const brand = await prisma.brand.findUnique({
      where: { id: brandId },
      select: {
        name: true,
        targetAudience: true,
        personalityTraits: true,
        usp: true,
      },
    });

    if (!brand) {
      return NextResponse.json({ error: 'Brand not found' }, { status: 404 });
    }

    // 2. Construct a detailed prompt for the Gemini API
    const prompt = `
      Based on the following brand identity, create a comprehensive messaging matrix.

      Brand Name: ${brand.name}
      Unique Selling Proposition (USP): ${brand.usp}
      Target Audience: ${brand.targetAudience}
      Personality Traits: ${brand.personalityTraits}

      Generate a messaging matrix in JSON format with the following keys:
      - "taglines": An array of 5-7 catchy taglines.
      - "valuePropositions": An object with "primary", "secondary", and "tertiary" value propositions.
      - "keyMessages": An array of 3-4 key messages, where each message is an object with a "theme" and a "message" string.
      - "elevatorPitch": A concise 30-second elevator pitch for the brand.

      Ensure the output is only the raw JSON object, with no extra text, formatting, or markdown.
    `;

    // 3. Call the Gemini API
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // 4. Parse the JSON response from Gemini
    let messagingMatrix;
    try {
      // Clean the response to remove potential markdown formatting
      const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
      messagingMatrix = JSON.parse(cleanedText);
    } catch (e) {
      console.error('Failed to parse Gemini response:', text);
      throw new Error('Invalid JSON response from AI model.');
    }

    // 5. Save the generated matrix to the database
    const updatedBrand = await prisma.brand.update({
      where: { id: brandId },
      data: {
        messagingMatrix: messagingMatrix,
      },
    });

    // 6. Return the generated matrix
    return NextResponse.json({ messagingMatrix });

  } catch (error: any) {
    console.error('Error generating messaging matrix:', error);
    return NextResponse.json({ error: error.message || 'An internal server error occurred' }, { status: 500 });
  }
}
