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
    const { brandId, logoDescription } = await request.json();

    if (!brandId || !logoDescription) {
      return NextResponse.json({ error: 'brandId and logoDescription are required' }, { status: 400 });
    }

    // 1. Fetch the brand's data
    const brand = await prisma.brand.findUnique({
      where: { id: brandId },
      select: {
        name: true,
        personalityTraits: true,
        colorPalette: true,
      },
    });

    if (!brand) {
      return NextResponse.json({ error: 'Brand not found' }, { status: 404 });
    }

    // 2. Construct a detailed prompt for Gemini to generate a logo idea/description
    const prompt = `
      Generate a detailed text description for a logo concept based on the following brand information and user's request.
      This description should be suitable for an AI image generation model or a human designer to create the logo.

      Brand Name: ${brand.name}
      Brand Personality Traits: ${brand.personalityTraits}
      Brand Color Palette: ${JSON.stringify(brand.colorPalette, null, 2)}

      User's Logo Description Request: "${logoDescription}"

      Include details about:
      - The overall style (e.g., minimalist, modern, classic, playful).
      - Key elements or symbols to include.
      - Color usage (referencing the provided palette).
      - Typography suggestions.
      - Any specific mood or feeling to convey.

      Ensure the output is a clear, concise text description, suitable for direct use.
    `;

    // 3. Call the Gemini API
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }); // Using flash for speed, assuming text output
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const logoIdeaDescription = response.text();

    // 4. Save the generated logo idea description to the database
    await prisma.brand.update({
      where: { id: brandId },
      data: {
        logoIdea: logoIdeaDescription, // Assuming a 'logoIdea' field in Prisma schema
      },
    });

    // 5. Return the generated logo idea description
    return NextResponse.json({ logoIdeaDescription });

  } catch (error: any) {
    console.error('Error generating logo idea:', error);
    return NextResponse.json({ error: error.message || 'An internal server error occurred' }, { status: 500 });
  }
}
