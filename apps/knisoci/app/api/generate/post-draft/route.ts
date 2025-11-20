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
    const { brandId, postIdea } = await request.json();

    if (!brandId || !postIdea) {
      return NextResponse.json({ error: 'brandId and postIdea are required' }, { status: 400 });
    }

    // 1. Fetch the brand's data
    const brand = await prisma.brand.findUnique({
      where: { id: brandId },
      select: {
        name: true,
        personalityTraits: true,
        messagingMatrix: true,
        contentPillars: true,
      },
    });

    if (!brand) {
      return NextResponse.json({ error: 'Brand not found' }, { status: 404 });
    }

    // 2. Construct a detailed prompt for Gemini to generate a post draft
    const prompt = `
      Generate a full social media post draft based on the following brand information and post idea.
      The draft should be engaging, align with the brand voice, and include relevant hashtags and a call to action.

      **Brand Name:** ${brand.name}
      **Brand Personality Traits:** ${brand.personalityTraits}
      **Core Messaging:** ${JSON.stringify((brand.messagingMatrix as any)?.keyMessages, null, 2)}
      **Content Pillars:** ${JSON.stringify(brand.contentPillars, null, 2)}

      **Post Idea Title:** "${postIdea.title}"
      **Post Idea Description:** "${postIdea.description}"

      **Output Format:**
      Generate the output as a single, raw JSON object with the following keys:
      - "draftContent": The full text of the social media post.
      - "hashtags": An array of relevant hashtags.
      - "callToAction": A clear call to action.
      - "toneAnalysis": A brief analysis of how the draft aligns with the brand's tone.

      Example:
      {
        "draftContent": "Are you making this common mistake? 🤔 Many brands overlook [specific issue] which can cost them big! Learn how to fix it and boost your engagement. #BrandTips #MarketingStrategy",
        "hashtags": ["#BrandTips", "#MarketingStrategy", "#SocialMedia"],
        "callToAction": "Click the link in bio to read our full guide!"
      }
    `;

    // 3. Call the Gemini API
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const postDraft = response.text();

    // 4. Save the generated post draft to the database
    // This assumes a 'postDrafts' field in the Brand schema, which might need to be an array of JSON
    await prisma.brand.update({
      where: { id: brandId },
      data: {
        // This would ideally append to an array or store in a related table
        // For simplicity, we'll just store the latest draft for now.
        // A more robust solution would involve a separate PostDraft model.
        postDrafts: postDraft, // Assuming 'postDrafts' is a JSON field
      },
    });

    // 5. Return the generated post draft
    return NextResponse.json({ postDraft });

  } catch (error: any) {
    console.error('Error generating post draft:', error);
    return NextResponse.json({ error: error.message || 'An internal server error occurred' }, { status: 500 });
  }
}
