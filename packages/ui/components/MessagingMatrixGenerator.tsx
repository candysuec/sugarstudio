'use client';

import React, { useState } from 'react';
import { Button } from './Button';
import { Card } from './Card';
import { callApi } from '@sugarstudio/utils/apiClient'; // Import callApi
import { LoadingSpinner } from './LoadingSpinner'; // Import LoadingSpinner

// A placeholder for the brand ID, in a real app this would be passed as a prop
interface MessagingMatrixGeneratorProps {
  brandId: string;
  onComplete?: () => void;
}

export const MessagingMatrixGenerator = ({ brandId, onComplete }: MessagingMatrixGeneratorProps) => {
  const [matrix, setMatrix] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    setMatrix(null);

    try {
      const result = await callApi<{ messagingMatrix: any }>('/api/generate/messaging-matrix', {
        method: 'POST',
        body: { brandId },
      });

      setMatrix(result.messagingMatrix);
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
        <h3 className="text-lg font-medium leading-6 text-gray-900">Messaging Matrix</h3>
        <p className="mt-2 text-sm text-gray-600">
          Generate your brand's core messaging matrix, including taglines, value propositions, and key messages based on your Brand DNA.
        </p>
        <div className="mt-4">
          <Button onClick={handleGenerate} disabled={isGenerating}>
            {isGenerating ? <LoadingSpinner /> : 'Generate Messaging Matrix'}
          </Button>
        </div>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        {matrix && (
          <div className="mt-6">
            <h4 className="font-semibold text-gray-800">Generated Matrix:</h4>
            <pre className="mt-2 p-4 bg-gray-100 rounded-md text-sm overflow-x-auto">
              {JSON.stringify(matrix, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </Card>
  );
};