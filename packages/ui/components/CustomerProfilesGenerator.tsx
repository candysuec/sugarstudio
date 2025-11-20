'use client';

import React, { useState } from 'react';
import { Button } from './Button';
import { Card } from './Card';
import { callApi } from '@sugarstudio/utils/apiClient';
import { LoadingSpinner } from './LoadingSpinner';

interface CustomerProfilesGeneratorProps {
  brandId: string;
  onComplete: () => void;
}

export const CustomerProfilesGenerator = ({ brandId, onComplete }: CustomerProfilesGeneratorProps) => {
  const [customerProfilesInput, setCustomerProfilesInput] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedProfiles, setGeneratedProfiles] = useState<any[] | null>(null);

  const handleGenerate = async () => {
    if (!customerProfilesInput.trim()) {
      setError('Please provide some initial customer profile descriptions.');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGeneratedProfiles(null);

    try {
      const result = await callApi<{ customerProfiles: any[] }>('/api/generate/customer-profiles', {
        method: 'POST',
        body: { brandId, customerProfiles: customerProfilesInput },
      });

      setGeneratedProfiles(result.customerProfiles);
      console.log('API Response (Customer Profiles):', result);

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
        <h3 className="text-lg font-medium leading-6 text-gray-900">Strategy Lab: Customer Profiles</h3>
        <p className="mt-2 text-sm text-gray-600">
          Describe your initial thoughts on your target customer profiles. Gemini will help you refine them.
        </p>
        <div className="mt-4">
          <label htmlFor="customerProfilesInput" className="block text-sm font-medium text-gray-700">
            Initial Customer Profile Descriptions:
          </label>
          <textarea
            id="customerProfilesInput"
            name="customerProfilesInput"
            rows={6}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="e.g., 'Freelance designers struggling with client communication', 'Small business owners needing marketing help'."
            value={customerProfilesInput}
            onChange={(e) => {
              setCustomerProfilesInput(e.target.value);
              if (error) setError(null);
            }}
          />
        </div>
        <div className="mt-4">
          <Button onClick={handleGenerate} disabled={isGenerating}>
            {isGenerating ? <LoadingSpinner /> : 'Generate Customer Profiles'}
          </Button>
        </div>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        {generatedProfiles && (
          <div className="mt-6">
            <h4 className="font-semibold text-gray-800">Generated Customer Profiles:</h4>
            <div className="mt-2 space-y-4">
              {generatedProfiles.map((profile, index) => (
                <div key={index} className="p-4 bg-gray-100 rounded-md">
                  <p className="font-semibold text-gray-900">{profile.name}</p>
                  <p className="text-sm text-gray-700"><strong>Demographics:</strong> {profile.demographics}</p>
                  <p className="text-sm text-gray-700"><strong>Psychographics:</strong> {profile.psychographics}</p>
                  <p className="text-sm text-gray-700"><strong>Pain Points:</strong> {profile.painPoints}</p>
                  <p className="text-sm text-gray-700"><strong>Goals:</strong> {profile.goals}</p>
                  <p className="text-sm text-gray-700"><strong>Brand Solution:</strong> {profile.brandSolution}</p>
                </div>
              ))}
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