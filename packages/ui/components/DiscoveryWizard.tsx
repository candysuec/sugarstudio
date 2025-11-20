'use client';

import React, { useState } from 'react';
import { Button } from './Button';
import { Card } from './Card';
import { callApi } from '@sugarstudio/utils/apiClient'; // Import callApi
import { LoadingSpinner } from './LoadingSpinner'; // Import LoadingSpinner

// Define the structure for the form data
interface BrandDnaForm {
  brandName: string;
  mission: string;
  values: string;
  audience: string;
  personalityTraits: string;
  usp: string;
  customerProfiles: string; // New field
  brandPositioningMap: string; // New field
}

// Define the structure for each step, making content a render prop
interface WizardStep {
  title: string;
  field: keyof BrandDnaForm;
  content: (formData: BrandDnaForm, handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void) => React.ReactNode;
}

// The steps array now includes a 'field' to map step to formData key for validation
const steps: WizardStep[] = [
  {
    title: 'Step 1: Your Brand Name',
    field: 'brandName',
    content: (formData, handleChange) => (
      <div>
        <label htmlFor="brandName" className="block text-sm font-medium text-gray-700">
          What is the name of your brand?
        </label>
        <input
          type="text"
          id="brandName"
          name="brandName"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="e.g., KniBrand"
          value={formData.brandName}
          onChange={handleChange}
        />
      </div>
    ),
  },
  {
    title: 'Step 2: Your Mission',
    field: 'mission',
    content: (formData, handleChange) => (
      <div>
        <label htmlFor="mission" className="block text-sm font-medium text-gray-700">
          What is your brand's core mission?
        </label>
        <textarea
          id="mission"
          name="mission"
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="e.g., To empower creators by providing intuitive and powerful branding tools."
          value={formData.mission}
          onChange={handleChange}
        />
      </div>
    ),
  },
  {
    title: 'Step 3: Your Values',
    field: 'values',
    content: (formData, handleChange) => (
      <div>
        <label htmlFor="values" className="block text-sm font-medium text-gray-700">
          What are the core values that drive your brand?
        </label>
        <textarea
          id="values"
          name="values"
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="e.g., Simplicity, Creativity, Empowerment"
          value={formData.values}
          onChange={handleChange}
        />
      </div>
    ),
  },
  {
    title: 'Step 3: Your Audience',
    field: 'audience',
    content: (formData, handleChange) => (
      <div>
        <label htmlFor="audience" className="block text-sm font-medium text-gray-700">
          Who is your primary target audience?
        </label>
        <textarea
          id="audience"
          name="audience"
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="e.g., Solopreneurs, small business owners, and marketing agencies."
          value={formData.audience}
          onChange={handleChange}
        />
      </div>
    ),
  },
  {
    title: 'Step 5: Personality Traits',
    field: 'personalityTraits',
    content: (formData, handleChange) => (
      <div>
        <label htmlFor="personalityTraits" className="block text-sm font-medium text-gray-700">
          Describe your brand's personality (e.g., friendly, authoritative, playful, innovative).
        </label>
        <textarea
          id="personalityTraits"
          name="personalityTraits"
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="e.g., Innovative, trustworthy, and customer-centric."
          value={formData.personalityTraits}
          onChange={handleChange}
        />
      </div>
    ),
  },
  {
    title: 'Step 6: Unique Selling Proposition (USP)',
    field: 'usp',
    content: (formData, handleChange) => (
      <div>
        <label htmlFor="usp" className="block text-sm font-medium text-gray-700">
          What makes your brand unique? What is your USP?
        </label>
        <textarea
          id="usp"
          name="usp"
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="e.g., We provide the most intuitive AI tools for brand building, saving you 80% of your time."
          value={formData.usp}
          onChange={handleChange}
        />
      </div>
    ),
  },
  {
    title: 'Step 7: Customer Profiles',
    field: 'customerProfiles',
    content: (formData, handleChange) => (
      <div>
        <label htmlFor="customerProfiles" className="block text-sm font-medium text-gray-700">
          Describe your ideal customer profiles (e.g., demographics, psychographics, pain points, goals).
        </label>
        <textarea
          id="customerProfiles"
          name="customerProfiles"
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="e.g., 'Sarah, 30s, freelance designer, struggles with client communication, wants efficient tools.'"
          value={formData.customerProfiles}
          onChange={handleChange}
        />
      </div>
    ),
  },
  {
    title: 'Step 8: Brand Positioning Map',
    field: 'brandPositioningMap',
    content: (formData, handleChange) => (
      <div>
        <label htmlFor="brandPositioningMap" className="block text-sm font-medium text-gray-700">
          Describe your brand's desired position in the market relative to competitors.
        </label>
        <textarea
          id="brandPositioningMap"
          name="brandPositioningMap"
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="e.g., 'Premium, innovative, user-friendly, contrasting with cheaper, complex alternatives.'"
          value={formData.brandPositioningMap}
          onChange={handleChange}
        />
      </div>
    ),
  },
];

export const DiscoveryWizard = ({ onComplete }: { onComplete: (brandId: string, brandName: string) => void }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<BrandDnaForm>({
    brandName: '',
    mission: '',
    values: '',
    audience: '',
    personalityTraits: '',
    usp: '',
    customerProfiles: '', // Initialize new field
    brandPositioningMap: '', // Initialize new field
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Clear error when user starts typing
    if (error) setError(null);
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    // Validation logic
    const currentField = steps[currentStep].field;
    if (formData[currentField].trim() === '') {
      setError('Please fill out this field to continue.');
      return;
    }
    
    setError(null);
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setError(null);
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    // Final validation before submitting
    const lastField = steps[steps.length - 1].field;
    if (formData[lastField].trim() === '') {
      setError('Please fill out this field to finish.');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    console.log('Submitting form data:', formData);

    try {
      const result = await callApi<{ brand: { id: string } }>('/api/generate/brand-discovery', {
        method: 'POST',
        body: formData,
      });

      console.log('API Response:', result);

      // Assuming the API returns the created brand with an ID
      const brandId = result?.brand?.id;

      if (onComplete && brandId) {
        onComplete(brandId, formData.brandName);
      } else {
        // Handle case where brandId is not returned
        throw new Error('Could not retrieve Brand ID from API response.');
      }
    } catch (err: any) {
      console.error('Submission failed:', err);
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <Card>
      <div className="p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">{currentStepData.title}</h3>
        <div className="mt-4">{currentStepData.content(formData, handleChange)}</div>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>
      <div className="flex justify-between bg-gray-50 p-4">
        <Button onClick={handleBack} disabled={currentStep === 0 || isSubmitting}>
          Back
        </Button>
        {currentStep < steps.length - 1 ? (
          <Button onClick={handleNext} disabled={isSubmitting}>Next</Button>
        ) : (
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? <LoadingSpinner /> : 'Finish & Generate DNA'}
          </Button>
        )}
      </div>
    </Card>
  );
};