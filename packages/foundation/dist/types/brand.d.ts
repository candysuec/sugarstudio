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
}
export interface BrandAsset {
    id: string;
    brandId: string;
    type: 'logo' | 'color_palette' | 'typography' | 'image_style' | 'messaging_guide';
    url?: string;
    data: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}
