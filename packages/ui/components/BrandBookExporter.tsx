'use client';

import React, { useState } from 'react';
import { Button } from './Button';
import { Card } from './Card';
import { callApi } from '@sugarstudio/utils/apiClient'; // Import callApi
import { LoadingSpinner } from './LoadingSpinner'; // Import LoadingSpinner

interface BrandBookExporterProps {
  brandId: string;
  brandName: string;
  onComplete?: () => void;
}

// Helper function to trigger file download
const downloadMarkdown = (content: string, fileName: string) => {
  const blob = new Blob([content], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const BrandBookExporter = ({ brandId, brandName, onComplete }: BrandBookExporterProps) => {
  const [brandBookContent, setBrandBookContent] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    setBrandBookContent(null);

    try {
      const result = await callApi<{ brandBookContent: string }>('/api/generate/brand-book', {
        method: 'POST',
        body: { brandId },
      });

      setBrandBookContent(result.brandBookContent);
      console.log('API Response:', result);

    } catch (err: any) {
      console.error('Generation failed:', err);
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (brandBookContent) {
      downloadMarkdown(brandBookContent, `${brandName}-BrandBook.md`);
      if (onComplete) {
        onComplete();
      }
    }
  };

  return (
    <Card>
      <div className="p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Download Your Brand Book</h3>
        <p className="mt-2 text-sm text-gray-600">
          Compile all your generated brand assets into a single, shareable Markdown file.
        </p>
        <div className="mt-4">
          {!brandBookContent ? (
            <Button onClick={handleGenerate} disabled={isGenerating}>
              {isGenerating ? <LoadingSpinner /> : 'Generate Brand Book'}
            </Button>
          ) : (
            <Button onClick={handleDownload}>
              Download & Finish
            </Button>
          )}
        </div>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        {brandBookContent && (
          <div className="mt-6">
            <h4 className="font-semibold text-gray-800">Preview:</h4>
            <div className="mt-2 p-4 bg-gray-100 rounded-md max-h-60 overflow-y-auto border">
              <pre className="text-sm whitespace-pre-wrap">{brandBookContent}</pre>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};