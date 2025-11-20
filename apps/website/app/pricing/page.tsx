
import React from 'react';
import Link from 'next/link';

const PricingPage = () => {
  const pricingTiers = [
    {
      name: 'Starter (Free)',
      price: '$0',
      features: [
        'Brand DNA',
        '1 logo concept',
        '10 monthly post drafts',
        'Basic brand book',
      ],
      buttonText: 'Get Started Free',
      link: 'https://knisoci.vercel.app/signup', // Link to knisoci signup
    },
    {
      name: 'Pro',
      price: '$29-$49/mo',
      features: [
        'Unlimited posts',
        'Full exports',
        'Document factory',
        'Calendar',
        'Analytics lite',
      ],
      buttonText: 'Choose Pro',
      link: 'https://knisoci.vercel.app/signup', // Link to knisoci signup
    },
    {
      name: 'Business',
      price: '$99-$199/mo',
      features: [
        'Multi-brand',
        'Approvals',
        'Omnichannel sync',
        'Listening',
        'API access',
      ],
      buttonText: 'Choose Business',
      link: 'https://knisoci.vercel.app/signup', // Link to knisoci signup
    },
    {
      name: 'Agency',
      price: '$399+/mo',
      features: [
        'Multiple seats',
        'White-label portals',
        'Templates marketplace rev-share',
      ],
      buttonText: 'Contact Sales',
      link: 'https://knisoci.vercel.app/contact', // Link to knisoci contact or custom sales page
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-12">Simple, Transparent Pricing</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {pricingTiers.map((tier, index) => (
          <div key={index} className="flex flex-col bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{tier.name}</h2>
            <p className="text-4xl font-extrabold text-gray-900 mb-6">{tier.price}</p>
            <ul className="flex-grow mb-8">
              {tier.features.map((feature, i) => (
                <li key={i} className="flex items-center text-gray-600 mb-2">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <Link href={tier.link} passHref>
              <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors duration-300">
                {tier.buttonText}
              </button>
            </Link>
          </div>
        ))}
      </div>

      <div className="text-center mt-16">
        <p className="text-gray-600 text-lg">
          Ready to elevate your brand? <Link href="https://knisoci.vercel.app/signup" className="text-blue-600 hover:underline">Sign up for free</Link> or <Link href="https://knisoci.vercel.app/contact" className="text-blue-600 hover:underline">contact us</Link> for enterprise solutions.
        </p>
      </div>
    </div>
  );
};

export default PricingPage;
