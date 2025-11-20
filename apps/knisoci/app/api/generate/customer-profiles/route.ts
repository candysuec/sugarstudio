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
    const { brandId, customerProfiles } = await request.json();

    if (!brandId || !customerProfiles) {
      return NextResponse.json({ error: 'brandId and customerProfiles are required' }, { status: 400 });
    }

    // 1. Fetch the brand's data
    const brand = await prisma.brand.findUnique({
      where: {
        id: brandId
      },
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

    // 2. Construct a detailed prompt for Gemini to generate customer profiles
    const prompt = `
      Based on the following brand information and initial customer profiles, generate a more detailed and actionable set of customer profiles.
      Each profile should include demographics, psychographics, pain points, goals, and how the brand can address them.

      **Brand Name:** ${brand.name}
      **Brand Mission:** ${brand.mission}
      **Brand Values:** ${JSON.stringify(brand.values)}
      **Target Audience (initial):** ${brand.audience}
      **Brand Personality Traits:** ${JSON.stringify(brand.personalityTraits)}
      **Unique Selling Proposition (USP):** ${brand.usp}

      **Initial Customer Profiles provided by user:**
      ${customerProfiles}

      **Output Format:**
      Generate the output as a single, raw JSON object with the following keys:
      - "customerProfiles": An array of detailed customer profile objects. Each object should have keys like "name", "demographics", "psychographics", "painPoints", "goals", "brandSolution".
    `;

    // 3. Call the Gemini API
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const generatedProfiles = response.text();

    // Attempt to parse the text as JSON. Gemini sometimes returns markdown code blocks.
    let parsedProfiles;
    try {
      parsedProfiles = JSON.parse(generatedProfiles.replace(/```json\n|```/g, ''));
    } catch (parseError) {
      console.warn('Gemini response was not direct JSON, attempting to extract from markdown block.');
      const jsonMatch = generatedProfiles.match(/```json\n([\s\S]*?)\n```/);
      if (jsonMatch && jsonMatch[1]) {
        parsedProfiles = JSON.parse(jsonMatch[1]);
      } else {
        throw new Error('Gemini response could not be parsed as JSON.');
      }
    }

    // 4. Save the generated customer profiles to the database
    await prisma.brand.update({
      where: {
        id: brandId
      },
      data: {
        customerProfiles: parsedProfiles.customerProfiles, // Assuming 'customerProfiles' is a JSON field in Brand schema
      },
    });

    // 5. Return the generated customer profiles
    return NextResponse.json({ customerProfiles: parsedProfiles.customerProfiles });

  } catch (error: any) {
    console.error('Error generating customer profiles:', error);
    return NextResponse.json({ error: error.message || 'An internal server error occurred' }, { status: 500 });
  }
}
