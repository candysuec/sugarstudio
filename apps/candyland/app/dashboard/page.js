"use client";
import { useState } from "react";
import { 
  DiscoveryWizard, 
  MessagingMatrixGenerator, 
  ContentPillarsGenerator, 
  BrandBookExporter,
  PostIdeasGenerator,
  ColorPaletteGenerator,
  ConsistencyChecker, // Re-import ConsistencyChecker
  Tabs, // Import the new Tabs component
  LogoGenerator, // Import the new LogoGenerator
  CustomerProfilesGenerator, // Import new CustomerProfilesGenerator
  BrandPositioningMapGenerator, // Import new BrandPositioningMapGenerator
  MessagingGuideGenerator, // Import new MessagingGuideGenerator
  TypographyGenerator // Import new TypographyGenerator
} from "@sugarstudio/ui";

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
        return <DiscoveryWizard onComplete={handleWizardComplete} />;
      case 'customerProfiles':
        return <CustomerProfilesGenerator brandId={brandId!} onComplete={handleCustomerProfilesComplete} />;
      case 'brandPositioningMap':
        return <BrandPositioningMapGenerator brandId={brandId!} onComplete={handleBrandPositioningMapComplete} />;
      case 'matrix':
        return <MessagingMatrixGenerator brandId={brandId!} onComplete={handleMatrixComplete} />;
      case 'pillars':
        return <ContentPillarsGenerator brandId={brandId!} onComplete={handlePillarsComplete} />;
      case 'exporter':
        return <BrandBookExporter brandId={brandId!} brandName={brandName} onComplete={handleExportComplete} />;
      case 'dashboard':
        const dashboardTabs = [
          {
            label: 'Logo Idea',
            content: <LogoGenerator brandId={brandId!} />,
          },
          {
            label: 'Color Palette',
            content: <ColorPaletteGenerator brandId={brandId!} />,
          },
          {
            label: 'Post Ideas',
            content: <PostIdeasGenerator brandId={brandId!} />,
          },
          {
            label: 'Consistency Checker',
            content: <ConsistencyChecker brandId={brandId!} />,
          },
          {
            label: 'Messaging Guide',
            content: <MessagingGuideGenerator brandId={brandId!} />,
          },
          {
            label: 'Typography',
            content: <TypographyGenerator brandId={brandId!} />,
          },
        ];
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-center">Brand Dashboard</h2>
            <Tabs tabs={dashboardTabs} />
          </div>
        );
      default:
        return <p className="p-4 text-red-500">An unexpected error occurred. Please try again.</p>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max_w_2xl">
        {renderStep()}
      </div>
    </div>
  );
}
