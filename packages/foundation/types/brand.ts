export interface Brand {
  id: string;
  name: string;
  mission: string;
  values: string[];
  targetAudience: string;
  personalityArchetype: string;
  toneOfVoice: string;
  createdAt: Date;
  updatedAt: Date;
  // Add more brand-specific fields as needed
}

export interface BrandAsset {
  id: string;
  brandId: string;
  type: 'logo' | 'color_palette' | 'typography' | 'image_style' | 'messaging_guide';
  url?: string; // For assets like logos or image styles
  data: Record<string, any>; // JSON data for colors, typography, messaging
  createdAt: Date;
  updatedAt: Date;
}
