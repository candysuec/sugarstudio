'use client';

import React, { useState } from 'react';
import { Button } from './Button';
import { Card } from './Card';
import { callApi } from '@sugarstudio/utils/apiClient';
import { LoadingSpinner } from './LoadingSpinner';

interface MessagingGuideGeneratorProps {
  brandId: string;
}

export const MessagingGuideGenerator = ({ brandId }: MessagingGuideGeneratorProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messagingGuide, setMessagingGuide] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    setMessagingGuide(null);

    try {
      const result = await callApi<{ messagingGuide: string }>('/api/generate/messaging-guide', {
        method: 'POST',
        body: { brandId },
      });

      setMessagingGuide(result.messagingGuide);
      console.log('API Response (Messaging Guide):', result);

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
        <h3 className="text-lg font-medium leading-6 text-gray-900">Document Factory: Messaging Guide</h3>
        <p className="mt-2 text-sm text-gray-600">
          Generate a comprehensive messaging guide based on your brand's DNA.
        </p>
        <div className="mt-4">
          <Button onClick={handleGenerate} disabled={isGenerating}>
            {isGenerating ? <LoadingSpinner /> : 'Generate Messaging Guide'}
          </Button>
        </div>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        {messagingGuide && (
          <div className="mt-6">
            <h4 className="font-semibold text-gray-800">Generated Messaging Guide:</h4>
            <div className="mt-2 p-4 bg-gray-100 rounded-md prose max-w-none">
              {/* Render Markdown content */}
              <pre className="whitespace-pre-wrap">{messagingGuide}</pre>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};