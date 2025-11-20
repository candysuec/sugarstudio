'use client';

import React, { useState } from 'react';
import { Button } from './Button';
import { Card } from './Card';
import { callApi } from '@sugarstudio/utils/apiClient';
import { LoadingSpinner } from './LoadingSpinner';

interface BrandPositioningMapGeneratorProps {
  brandId: string;
  onComplete: () => void;
}

export const BrandPositioningMapGenerator = ({ brandId, onComplete }: BrandPositioningMapGeneratorProps) => {
  const [positioningInput, setPositioningInput] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedMap, setGeneratedMap] = useState<any | null>(null);

  const handleGenerate = async () => {
    if (!positioningInput.trim()) {
      setError('Please provide some initial thoughts on your brand positioning.');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGeneratedMap(null);

    try {
      const result = await callApi<{ brandPositioningMap: any }>('/api/generate/brand-positioning-map', {
        method: 'POST',
        body: { brandId, brandPositioningMap: positioningInput },
      });

      setGeneratedMap(result.brandPositioningMap);
      console.log('API Response (Brand Positioning Map):', result);

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
        <h3 className="text-lg font-medium leading-6 text-gray-900">Strategy Lab: Brand Positioning Map</h3>
        <p className="mt-2 text-sm text-gray-600">
          Describe your initial thoughts on your brand's desired position in the market. Gemini will help you refine it.
        </p>
        <div className="mt-4">
          <label htmlFor="positioningInput" className="block text-sm font-medium text-gray-700">
            Initial Brand Positioning Description:
          </label>
          <textarea
            id="positioningInput"
            name="positioningInput"
            rows={6}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="e.g., 'We want to be seen as the premium, innovative solution for creative professionals, distinct from cheaper, less intuitive tools.'"
            value={positioningInput}
            onChange={(e) => {
              setPositioningInput(e.target.value);
              if (error) setError(null);
            }}
          />
        </div>
        <div className="mt-4">
          <Button onClick={handleGenerate} disabled={isGenerating}>
            {isGenerating ? <LoadingSpinner /> : 'Generate Brand Positioning Map'}
          </Button>
        </div>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        {generatedMap && (
          <div className="mt-6">
            <h4 className="font-semibold text-gray-800">Generated Brand Positioning Map:</h4>
            <div className="mt-2 space-y-4 p-4 bg-gray-100 rounded-md">
              <p className="text-sm text-gray-800"><strong>Positioning Statement:</strong> {generatedMap.positioningStatement}</p>
              <p className="text-sm text-gray-800"><strong>Key Attributes:</strong> {generatedMap.keyAttributes?.join(', ')}</p>
              <p className="text-sm text-gray-800"><strong>Competitive Landscape:</strong> {generatedMap.competitiveLandscape}</p>
              <p className="text-sm text-gray-800"><strong>Unique Position:</strong> {generatedMap.uniquePosition}</p>
              <p className="text-sm text-gray-800"><strong>Visual Map Description:</strong> {generatedMap.visualMapDescription}</p>
            </div>
            <div className="mt-4">
              <Button onClick={onComplete}>Continue</Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};