'use client';
import { useState } from 'react';
// import {
//   DiscoveryWizard,
//   MessagingMatrixGenerator,
//   ContentPillarsGenerator,
//   BrandBookExporter,
//   PostIdeasGenerator,
//   ColorPaletteGenerator,
//   ConsistencyChecker,
//   Tabs,
//   LogoGenerator,
//   CustomerProfilesGenerator,
//   BrandPositioningMapGenerator,
//   MessagingGuideGenerator,
//   TypographyGenerator
// } from "@sugarstudio/ui";
export default function OnboardingWorkflow() {
  const [step, setStep] = useState('wizard'); // 'wizard', 'customerProfiles', 'brandPositioningMap', 'matrix', 'pillars', 'exporter', 'dashboard'
  const [brandId, setBrandId] = useState<string | null>(null);
  const [brandName, setBrandName] = useState<string>('');

  const handleWizardComplete = (newBrandId: string, newBrandName: string) => {
    console.log(`Wizard complete. Received brandId: ${newBrandId}, brandName: ${newBrandName}`);
    setBrandId(newBrandId);
    setBrandName(newBrandName);
    setStep('matrix'); // This will be changed to customerProfiles later
  };

  const handleMatrixComplete = () => {
    console.log('Messaging Matrix complete.');
    setStep('pillars');
  };

  const handlePillarsComplete = () => {
    console.log('Content Pillars complete.');
    setStep('customerProfiles');
  };

  const handleCustomerProfilesComplete = () => {
    console.log('Customer Profiles complete.');
    setStep('brandPositioningMap');
  };

  const handleBrandPositioningMapComplete = () => {
    console.log('Brand Positioning Map complete.');
    setStep('matrix'); // Transition to matrix after positioning map
  };

  const handleExportComplete = () => {
    console.log('Onboarding complete. Showing main dashboard.');
    setStep('dashboard');
  };

  const renderStep = () => {
    switch (step) {
      case 'wizard':
        return <div>DiscoveryWizard Placeholder</div>;
      case 'customerProfiles':
        return <div>CustomerProfilesGenerator Placeholder</div>;
      case 'brandPositioningMap':
        return <div>BrandPositioningMapGenerator Placeholder</div>;
      case 'matrix':
        return <div>MessagingMatrixGenerator Placeholder</div>;
      case 'pillars':
        return <div>ContentPillarsGenerator Placeholder</div>;
      case 'exporter':
        return <div>BrandBookExporter Placeholder</div>;
      case 'dashboard': {
        const dashboardTabs = [
          {
            label: 'Logo Idea',
            content: <div>LogoGenerator Placeholder</div>,
          },
          {
            label: 'Color Palette',
            content: <div>ColorPaletteGenerator Placeholder</div>,
          },
          {
            label: 'Post Ideas',
            content: <div>PostIdeasGenerator Placeholder</div>,
          },
          {
            label: 'Consistency Checker',
            content: <div>ConsistencyChecker Placeholder</div>,
          },
          {
            label: 'Messaging Guide',
            content: <div>MessagingGuideGenerator Placeholder</div>,
          },
          {
            label: 'Typography',
            content: <div>TypographyGenerator Placeholder</div>,
          },
        ];
        return (
          <div className="space-y-8">
            <h2 className="text-center text-2xl font-bold">Brand Dashboard</h2>
            <div>Tabs Placeholder</div>
          </div>
        );
      }
      default:
        return <p className="p-4 text-red-500">An unexpected error occurred. Please try again.</p>;
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="max_w_2xl w-full">{renderStep()}</div>
    </div>
  );
}
