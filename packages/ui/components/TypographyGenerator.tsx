'use client';

import React, { useState } from 'react';
import { Button } from './Button';
import { Card } from './Card';
import { callApi } from '@sugarstudio/utils/apiClient';
import { LoadingSpinner } from './LoadingSpinner';

interface TypographyGeneratorProps {
  brandId: string;
}

interface FontDetail {
  name: string;
  usage: string;
  rationale: string;
}

interface TypographyPairings {
  headingFont: FontDetail;
  bodyFont: FontDetail;
  accentFont?: FontDetail;
  overallRationale: string;
}

export const TypographyGenerator = ({ brandId }: TypographyGeneratorProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [typographyPairings, setTypographyPairings] = useState<TypographyPairings | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    setTypographyPairings(null);

    try {
      const result = await callApi<{ typographyPairings: TypographyPairings }>('/api/generate/typography-pairings', {
        method: 'POST',
        body: { brandId },
      });

      setTypographyPairings(result.typographyPairings);
      console.log('API Response (Typography Pairings):', result);

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
        <h3 className="text-lg font-medium leading-6 text-gray-900">Identity Studio: Typography Generator</h3>
        <p className="mt-2 text-sm text-gray-600">
          Generate a set of typography pairings that align with your brand's identity.
        </p>
        <div className="mt-4">
          <Button onClick={handleGenerate} disabled={isGenerating}>
            {isGenerating ? <LoadingSpinner /> : 'Generate Typography Pairings'}
          </Button>
        </div>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        {typographyPairings && (
          <div className="mt-6">
            <h4 className="font-semibold text-gray-800">Generated Typography Pairings:</h4>
            <div className="mt-2 space-y-4 p-4 bg-gray-100 rounded-md">
              <div>
                <p className="font-semibold text-gray-900">Heading Font:</p>
                <p className="text-sm text-gray-700">Name: {typographyPairings.headingFont.name}</p>
                <p className="text-sm text-gray-700">Usage: {typographyPairings.headingFont.usage}</p>
                <p className="text-sm text-gray-700">Rationale: {typographyPairings.headingFont.rationale}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Body Font:</p>
                <p className="text-sm text-gray-700">Name: {typographyPairings.bodyFont.name}</p>
                <p className="text-sm text-gray-700">Usage: {typographyPairings.bodyFont.usage}</p>
                <p className="text-sm text-gray-700">Rationale: {typographyPairings.bodyFont.rationale}</p>
              </div>
              {typographyPairings.accentFont && (
                <div>
                  <p className="font-semibold text-gray-900">Accent Font:</p>
                  <p className="text-sm text-gray-700">Name: {typographyPairings.accentFont.name}</p>
                  <p className="text-sm text-gray-700">Usage: {typographyPairings.accentFont.usage}</p>
                  <p className="text-sm text-gray-700">Rationale: {typographyPairings.accentFont.rationale}</p>
                </div>
              )}
              <p className="font-semibold text-gray-900">Overall Rationale:</p>
              <p className="text-sm text-gray-700">{typographyPairings.overallRationale}</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};