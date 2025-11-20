'use client';

import React, { useState } from 'react';
import { Button } from './Button';
import { Card } from './Card';
import { callApi } from '@sugarstudio/utils/apiClient'; // Import callApi
import { LoadingSpinner } from './LoadingSpinner'; // Import LoadingSpinner

interface ColorPaletteGeneratorProps {
  brandId: string;
}

interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  neutral: string;
  description: string;
}

const ColorSwatch = ({ color, name }: { color: string; name: string }) => (
  <div className="flex flex-col items-center">
    <div
      className="w-20 h-20 rounded-full border border-gray-200 shadow-inner"
      style={{ backgroundColor: color }}
    />
    <div className="mt-2 text-sm font-medium text-gray-800">{name}</div>
    <div className="text-xs text-gray-500 uppercase">{color}</div>
  </div>
);

export const ColorPaletteGenerator = ({ brandId }: ColorPaletteGeneratorProps) => {
  const [palette, setPalette] = useState<ColorPalette | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    setPalette(null);

    try {
      const result = await callApi<{ colorPalette: ColorPalette }>('/api/generate/color-palette', {
        method: 'POST',
        body: { brandId },
      });

      setPalette(result.colorPalette);
      console.log('API Response:', result);

    } catch (err: any) {
      console.error('Generation failed:', err);
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card>
      <div className="p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Identity Studio: Color Palette</h3>
        <p className="mt-2 text-sm text-gray-600">
          Generate a unique color palette based on your brand's personality traits.
        </p>
        <div className="mt-4">
          <Button onClick={handleGenerate} disabled={isGenerating}>
            {isGenerating ? 'Generating...' : 'Generate Color Palette'}
          </Button>
        </div>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        {palette && (
          <div className="mt-6">
            <h4 className="font-semibold text-gray-800">Generated Palette:</h4>
            <div className="mt-4 flex justify-around gap-4">
              <ColorSwatch color={palette.primary} name="Primary" />
              <ColorSwatch color={palette.secondary} name="Secondary" />
              <ColorSwatch color={palette.accent} name="Accent" />
              <ColorSwatch color={palette.neutral} name="Neutral" />
            </div>
            <p className="mt-4 text-sm text-center text-gray-700 italic">{palette.description}</p>
          </div>
        )}
      </div>
    </Card>
  );
};