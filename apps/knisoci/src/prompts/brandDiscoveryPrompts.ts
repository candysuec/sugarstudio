// sugarstudio/apps/knisoci/src/prompts/brandDiscoveryPrompts.ts

interface BrandDnaFormData {
  brandName: string;
  mission: string;
  values: string;
  audience: string;
  personalityTraits: string;
  usp: string;
  customerProfiles: string;
  brandPositioningMap: string;
}

export const generateBrandDnaPrompt = (formData: BrandDnaFormData): string => {
  return `
    You are an expert brand strategist. Based on the following information, generate a comprehensive brand DNA.
    The brand DNA should encompass the brand's core identity, strategic positioning, and key characteristics.

    **Brand Name:** ${formData.brandName}
    **Mission:** ${formData.mission}
    **Values:** ${formData.values}
    **Target Audience:** ${formData.audience}
    **Personality Traits:** ${formData.personalityTraits}
    **Unique Selling Proposition (USP):** ${formData.usp}
    **Customer Profiles (User Input):** ${formData.customerProfiles}
    **Brand Positioning Map (User Input):** ${formData.brandPositioningMap}

    **Output Format:**
    Generate the output as a single, raw JSON object with the following keys:
    - "brandId": A unique identifier for the brand (you can generate a placeholder or leave empty for the system to fill).
    - "name": The brand name.
    - "mission": The refined brand mission.
    - "vision": A concise brand vision statement.
    - "values": An array of core brand values.
    - "targetAudience": A refined description of the target audience.
    - "usp": A refined unique selling proposition.
    - "personalityTraits": An array of brand personality traits.
    - "coreMessage": A summary of the brand's core message.
    - "taglineSuggestions": An array of tagline suggestions.
    - "archetype": The brand's primary archetype (e.g., Creator, Sage, Hero).
    - "customerProfilesSummary": A summary of the detailed customer profiles.
    - "brandPositioningSummary": A summary of the brand's positioning.
    - "keywords": An array of SEO-friendly keywords.
  `;
};
