'use client';

import React, { useState } from 'react';
import { Button } from './Button';
import { Card } from './Card';
import { callApi } from '@sugarstudio/utils/apiClient'; // Import callApi
import { LoadingSpinner } from './LoadingSpinner'; // Import LoadingSpinner

interface ContentPillarsGeneratorProps {
  brandId: string;
  onComplete?: () => void; // Optional callback for when generation is done
}

export const ContentPillarsGenerator = ({ brandId, onComplete }: ContentPillarsGeneratorProps) => {
  const [pillars, setPillars] = useState<any[] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    setPillars(null);

    try {
      const result = await callApi<{ contentPillars: any[] }>('/api/generate/content-pillars', {
        method: 'POST',
        body: { brandId },
      });

      setPillars(result.contentPillars);
      console.log('API Response:', result);

      if (onComplete) {
        onComplete();
      }

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
        <h3 className="text-lg font-medium leading-6 text-gray-900">Content Pillars</h3>
        <p className="mt-2 text-sm text-gray-600">
          Generate 4-6 content pillars for your brand. These are the core themes you'll talk about consistently.
        </p>
        <div className="mt-4">
          <Button onClick={handleGenerate} disabled={isGenerating}>
            {isGenerating ? <LoadingSpinner /> : 'Generate Content Pillars'}
          </Button>
        </div>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        {pillars && (
          <div className="mt-6">
            <h4 className="font-semibold text-gray-800">Generated Pillars:</h4>
            <ul className="mt-2 space-y-4">
              {pillars.map((pillar, index) => (
                <li key={index} className="p-4 bg-gray-100 rounded-md">
                  <p className="font-semibold text-gray-900">{pillar.pillarName}</p>
                  <p className="text-sm text-gray-700">{pillar.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Card>
  );
};