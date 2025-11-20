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
        targetAudience: true,
        contentPillars: true,
      },
    });

    if (!brand) {
      return NextResponse.json({ error: 'Brand not found' }, { status: 404 });
    }

    // 2. Construct a detailed prompt for Gemini
    const prompt = `
      Based on the following brand information, generate a list of 10 engaging social media post ideas.

      **Target Audience:** ${brand.targetAudience}
      **Content Pillars:** ${JSON.stringify(brand.contentPillars, null, 2)}

      For each post idea, provide a "title" and a "description" (a brief for what the post should contain, e.g., a hook, key points, and a call to action).

      **Output Format:**
      Generate the output in JSON format as an array of objects.
      Example:
      [
        { "title": "The #1 Mistake Brands Make", "description": "Hook: You might be doing this without realizing it. Key Points: Explain the mistake and how to fix it. CTA: Ask users to share their experiences." },
        { "title": "Behind the Scenes of Our Process", "description": "Hook: Ever wonder how we do it? Key Points: Show a quick, interesting part of your workflow. CTA: Ask a question about your process." }
      ]

      Ensure the output is only the raw JSON object, with no extra text, formatting, or markdown.
    `;

    // 3. Call the Gemini API
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // 4. Parse the JSON response
    let postIdeas;
    try {
      const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
      postIdeas = JSON.parse(cleanedText);
    } catch (e) {
      console.error('Failed to parse Gemini response:', text);
      throw new Error('Invalid JSON response from AI model.');
    }

    // 5. Save the generated ideas to the database
    await prisma.brand.update({
      where: { id: brandId },
      data: {
        postIdeas: postIdeas,
      },
    });

    // 6. Return the generated ideas
    return NextResponse.json({ postIdeas });

  } catch (error: any) {
    console.error('Error generating post ideas:', error);
    return NextResponse.json({ error: error.message || 'An internal server error occurred' }, { status: 500 });
  }
}
