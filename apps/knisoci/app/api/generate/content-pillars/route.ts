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

    // 1. Fetch the brand's core data
    const brand = await prisma.brand.findUnique({
      where: { id: brandId },
      select: {
        name: true,
        targetAudience: true,
        usp: true,
        messagingMatrix: true, // Use the messaging matrix for more context
      },
    });

    if (!brand) {
      return NextResponse.json({ error: 'Brand not found' }, { status: 404 });
    }

    // 2. Construct a detailed prompt for Gemini
    const prompt = `
      Based on the following brand identity, generate 4-6 distinct content pillars.

      Brand Name: ${brand.name}
      Unique Selling Proposition (USP): ${brand.usp}
      Target Audience: ${brand.targetAudience}
      Messaging Matrix: ${JSON.stringify(brand.messagingMatrix, null, 2)}

      For each content pillar, provide a "pillarName" and a "description" explaining what kind of content it includes and why it's relevant to the target audience.

      Generate the output in JSON format as an array of objects, like this:
      [
        { "pillarName": "Pillar One Name", "description": "Description of pillar one." },
        { "pillarName": "Pillar Two Name", "description": "Description of pillar two." }
      ]

      Ensure the output is only the raw JSON object, with no extra text, formatting, or markdown.
    `;

    // 3. Call the Gemini API
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // 4. Parse the JSON response
    let contentPillars;
    try {
      const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
      contentPillars = JSON.parse(cleanedText);
    } catch (e) {
      console.error('Failed to parse Gemini response:', text);
      throw new Error('Invalid JSON response from AI model.');
    }

    // 5. Save the generated pillars to the database
    const updatedBrand = await prisma.brand.update({
      where: { id: brandId },
      data: {
        contentPillars: contentPillars,
      },
    });

    // 6. Return the generated pillars
    return NextResponse.json({ contentPillars });

  } catch (error: any) {
    console.error('Error generating content pillars:', error);
    return NextResponse.json({ error: error.message || 'An internal server error occurred' }, { status: 500 });
  }
}
