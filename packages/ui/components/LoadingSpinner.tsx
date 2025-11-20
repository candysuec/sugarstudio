// sugarstudio/packages/ui/components/LoadingSpinner.tsx
import React from 'react';

export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
      <span className="ml-2 text-sm text-gray-600">Loading...</span>
    </div>
  );
};
