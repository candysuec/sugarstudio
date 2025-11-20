'use client';

import React, { useState } from 'react';
import { Button } from './Button';
import { Card } from './Card';
import { callApi } from '@sugarstudio/utils/apiClient';
import { LoadingSpinner } from './LoadingSpinner';

interface LogoGeneratorProps {
  brandId: string;
}

export const LogoGenerator = ({ brandId }: LogoGeneratorProps) => {
  const [logoDescriptionInput, setLogoDescriptionInput] = useState('');
  const [logoIdea, setLogoIdea] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!logoDescriptionInput.trim()) {
      setError('Please enter a description for your logo.');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setLogoIdea(null);

    try {
      const result = await callApi<{ logoIdeaDescription: string }>('/api/generate/image-logo', {
        method: 'POST',
        body: { brandId, logoDescription: logoDescriptionInput },
      });

      setLogoIdea(result.logoIdeaDescription);
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
        <h3 className="text-lg font-medium leading-6 text-gray-900">Identity Studio: Logo Idea Generator</h3>
        <p className="mt-2 text-sm text-gray-600">
          Describe your ideal logo, and we'll generate a detailed concept for you.
        </p>
        
        <div className="mt-4">
          <textarea
            rows={4}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="e.g., A minimalist logo with a fox symbol, using the primary brand color, conveying cleverness and agility."
            value={logoDescriptionInput}
            onChange={(e) => setLogoDescriptionInput(e.target.value)}
            disabled={isGenerating}
          />
        </div>

        <div className="mt-4">
          <Button onClick={handleGenerate} disabled={isGenerating}>
            {isGenerating ? <LoadingSpinner /> : 'Generate Logo Idea'}
          </Button>
        </div>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        {logoIdea && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-800">Generated Logo Idea:</h4>
            <p className="mt-2 text-sm text-gray-700 whitespace-pre-wrap">{logoIdea}</p>
          </div>
        )}
      </div>
    </Card>
  );
};