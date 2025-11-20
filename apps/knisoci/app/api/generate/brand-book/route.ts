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

    // 1. Fetch all available data for the brand
    const brand = await prisma.brand.findUnique({
      where: { id: brandId },
      select: {
        name: true,
        targetAudience: true,
        personalityTraits: true,
        usp: true,
        messagingMatrix: true,
        contentPillars: true,
      },
    });

    if (!brand) {
      return NextResponse.json({ error: 'Brand not found' }, { status: 404 });
    }

    // 2. Construct a detailed prompt for the Gemini API to generate a Markdown Brand Book
    const prompt = `
      Generate a "Lightweight Brand Book" in Markdown format based on the following brand data.

      Brand Name: ${brand.name}
      Unique Selling Proposition (USP): ${brand.usp}
      Target Audience: ${brand.targetAudience}
      Personality Traits: ${brand.personalityTraits}
      Messaging Matrix: ${JSON.stringify(brand.messagingMatrix, null, 2)}
      Content Pillars: ${JSON.stringify(brand.contentPillars, null, 2)}

      Structure the Brand Book with the following sections using Markdown syntax (headers, lists, bold text, etc.):

      # Brand Book: ${brand.name}

      ## 1. Brand Core
      - **Name:** ${brand.name}
      - **Unique Selling Proposition:** ${brand.usp}
      - **Personality Traits:** ${brand.personalityTraits}

      ## 2. Target Audience
      - ${brand.targetAudience}

      ## 3. Messaging Matrix
      ### Taglines
      ${(brand.messagingMatrix as any)?.taglines?.map((t: string) => `- ${t}`).join('\n')}
      ### Value Propositions
      - **Primary:** ${(brand.messagingMatrix as any)?.valuePropositions?.primary}
      - **Secondary:** ${(brand.messagingMatrix as any)?.valuePropositions?.secondary}
      - **Tertiary:** ${(brand.messagingMatrix as any)?.valuePropositions?.tertiary}
      ### Key Messages
      ${(brand.messagingMatrix as any)?.keyMessages?.map((m: any) => `#### ${m.theme}\n- ${m.message}`).join('\n\n')}
      ### Elevator Pitch
      > ${(brand.messagingMatrix as any)?.elevatorPitch}

      ## 4. Content Strategy
      ### Content Pillars
      ${(brand.contentPillars as any)?.map((p: any) => `#### ${p.pillarName}\n- ${p.description}`).join('\n\n')}

      Format the output as a single, clean Markdown string. Do not include any extra text or explanations outside of the Brand Book content itself.
    `;

    // 3. Call the Gemini API
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const brandBookContent = response.text();

    // 4. Save the generated brand book to the database
    await prisma.brand.update({
      where: { id: brandId },
      data: {
        brandBook: brandBookContent,
      },
    });

    // 5. Return the generated brand book content
    return NextResponse.json({ brandBookContent });

  } catch (error: any) {
    console.error('Error generating brand book:', error);
    return NextResponse.json({ error: error.message || 'An internal server error occurred' }, { status: 500 });
  }
}
