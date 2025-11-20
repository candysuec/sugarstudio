'use client';

import React, { useState } from 'react';
import { Button } from './Button';
import { Card } from './Card';
import { callApi } from '@sugarstudio/utils/apiClient'; // Import callApi
import { LoadingSpinner } from './LoadingSpinner'; // Import LoadingSpinner

interface PostIdeasGeneratorProps {
  brandId: string;
}

interface PostIdea {
  title: string;
  description: string;
}

interface PostDraft {
  draftContent: string;
  hashtags: string[];
  callToAction: string;
  toneAnalysis: string;
}

export const PostIdeasGenerator = ({ brandId }: PostIdeasGeneratorProps) => {
  const [ideas, setIdeas] = useState<PostIdea[] | null>(null);
  const [isGeneratingIdeas, setIsGeneratingIdeas] = useState(false);
  const [ideasError, setIdeasError] = useState<string | null>(null);

  const [selectedIdeaForDrafting, setSelectedIdeaForDrafting] = useState<PostIdea | null>(null);
  const [draftResult, setDraftResult] = useState<PostDraft | null>(null);
  const [isDrafting, setIsDrafting] = useState(false);
  const [draftError, setDraftError] = useState<string | null>(null);

  const handleGenerateIdeas = async () => {
    setIsGeneratingIdeas(true);
    setIdeasError(null);
    setIdeas(null);
    setDraftResult(null); // Clear draft if generating new ideas

    try {
      const result = await callApi<{ postIdeas: PostIdea[] }>('/api/generate/post-ideas', {
        method: 'POST',
        body: { brandId },
      });

      setIdeas(result.postIdeas);
      console.log('API Response (Ideas):', result);

    } catch (err: any) {
      console.error('Idea generation failed:', err);
      setIdeasError(err.message || 'An unexpected error occurred during idea generation.');
    } finally {
      setIsGeneratingIdeas(false);
    }
  };

  const handleCreateDraft = async (idea: PostIdea) => {
    setSelectedIdeaForDrafting(idea);
    setIsDrafting(true);
    setDraftError(null);
    setDraftResult(null);

    try {
      const result = await callApi<{ postDraft: PostDraft }>('/api/generate/post-draft', {
        method: 'POST',
        body: { brandId, postIdea: idea },
      });

      setDraftResult(result.postDraft);
      console.log('API Response (Draft):', result);

    } catch (err: any) {
      console.error('Draft generation failed:', err);
      setDraftError(err.message || 'An unexpected error occurred during draft generation.');
    } finally {
      setIsDrafting(false);
    }
  };

  const handleBackToIdeas = () => {
    setSelectedIdeaForDrafting(null);
    setDraftResult(null);
    setDraftError(null);
  };

  return (
    <>
      {selectedIdeaForDrafting && !draftResult && (
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Generating Draft...</h3>
            <p className="mt-2 text-sm text-gray-600">
              Please wait while we craft a detailed post based on "{selectedIdeaForDrafting.title}".
            </p>
            <div className="mt-4 flex justify-center">
              <LoadingSpinner />
            </div>
            {draftError && <p className="mt-4 text-sm text-red-600">{draftError}</p>}
          </div>
        </Card>
      )}

      {draftResult && (
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Generated Draft: "{selectedIdeaForDrafting?.title}"</h3>
            <div className="mt-4 p-4 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-800 whitespace-pre-wrap">{draftResult.draftContent}</p>
              <p className="mt-2 text-xs text-gray-600"><strong>Hashtags:</strong> {draftResult.hashtags.join(', ')}</p>
              <p className="mt-1 text-xs text-gray-600"><strong>Call to Action:</strong> {draftResult.callToAction}</p>
              <p className="mt-1 text-xs text-gray-600"><strong>Tone Analysis:</strong> {draftResult.toneAnalysis}</p>
            </div>
            <div className="mt-4">
              <Button onClick={handleBackToIdeas}>Back to Ideas</Button>
            </div>
          </div>
        </Card>
      )}

      {!selectedIdeaForDrafting && (
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Content Engine: Post Ideas</h3>
            <p className="mt-2 text-sm text-gray-600">
              Generate a list of social media post ideas based on your brand's content pillars and target audience.
            </p>
            <div className="mt-4">
              <Button onClick={handleGenerateIdeas} disabled={isGeneratingIdeas}>
                {isGeneratingIdeas ? <LoadingSpinner /> : 'Generate Post Ideas'}
              </Button>
            </div>

            {ideasError && <p className="mt-4 text-sm text-red-600">{ideasError}</p>}

            {ideas && (
              <div className="mt-6">
                <h4 className="font-semibold text-gray-800">Generated Ideas:</h4>
                <ul className="mt-2 space-y-4">
                  {ideas.map((idea, index) => (
                    <li key={index} className="p-4 bg-gray-100 rounded-md flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-gray-900">{idea.title}</p>
                        <p className="text-sm text-gray-700">{idea.description}</p>
                      </div>
                      <Button onClick={() => handleCreateDraft(idea)} disabled={isDrafting}>
                        {isDrafting && selectedIdeaForDrafting?.title === idea.title ? <LoadingSpinner /> : 'Create Draft'}
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Card>
      )}
    </>
  );
};