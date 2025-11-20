'use client';

import React, { useState } from 'react';
import { Button } from './Button';
import { Card } from './Card';
import { callApi } from '@sugarstudio/utils/apiClient'; // Import callApi
import { LoadingSpinner } from './LoadingSpinner'; // Import LoadingSpinner

interface ConsistencyCheckerProps {
  brandId: string;
}

interface AnalysisResult {
  consistencyScore: number;
  analysis: string;
}

export const ConsistencyChecker = ({ brandId }: ConsistencyCheckerProps) => {
  const [textToCheck, setTextToCheck] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = async () => {
    if (!textToCheck.trim()) {
      setError('Please enter some text to check.');
      return;
    }
    setIsChecking(true);
    setError(null);
    setResult(null);

    try {
      const analysisResult = await callApi<AnalysisResult>('/api/generate/consistency-checker', {
        method: 'POST',
        body: { brandId, textToCheck },
      });

      setResult(analysisResult);
      console.log('API Response:', analysisResult);

    } catch (err: any) {
      console.error('Check failed:', err);
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <Card>
      <div className="p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Brand Consistency Checker</h3>
        <p className="mt-2 text-sm text-gray-600">
          Enter a piece of content (like a social media post or email copy) to check its alignment with your brand voice.
        </p>
        
        <div className="mt-4">
          <textarea
            rows={6}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Paste your content here..."
            value={textToCheck}
            onChange={(e) => setTextToCheck(e.target.value)}
          />
        </div>

        <div className="mt-4">
          <Button onClick={handleCheck} disabled={isChecking}>
            {isChecking ? <LoadingSpinner /> : 'Check Consistency'}
          </Button>
        </div>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        {result && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-800">Analysis Result:</h4>
            <div className="flex items-center gap-4 mt-2">
              <div className="text-3xl font-bold text-indigo-600">{result.consistencyScore}%</div>
              <p className="text-sm text-gray-700">{result.analysis}</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};