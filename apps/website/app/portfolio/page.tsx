'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/layout/section-header';
import Card from '@/components/cards/Card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const caseStudies = [
  {
    id: 1,
    title: 'E-commerce Brand Revitalization',
    problem: 'A struggling online retailer with unclear messaging and outdated branding.',
    solution: 'Developed a StoryBrand-aligned message, redesigned their website, and implemented automated marketing funnels.',
    result: '250% increase in online sales within 6 months and a 40% boost in customer retention.',
    image: '/images/portfolio/ecommerce-revitalization.jpg', // Placeholder image
  },
  {
    id: 2,
    title: 'SaaS Onboarding Optimization',
    problem: 'A B2B SaaS company experiencing high churn due to a complex and confusing onboarding process.',
    solution: 'Streamlined the user journey, created clear instructional content, and integrated in-app guidance.',
    result: 'Reduced churn by 15% and increased feature adoption by 30% in the first quarter.',
    image: '/images/portfolio/saas-onboarding.jpg', // Placeholder image
  },
  {
    id: 3,
    title: 'Consulting Firm Digital Presence',
    problem: 'A boutique consulting firm with deep expertise but a weak, inconsistent online presence.',
    solution: 'Built a premium, StoryBrand-driven website, developed a content strategy, and optimized for lead generation.',
    result: 'Generated 5x more qualified leads per month and established them as thought leaders in their niche.',
    image: '/images/portfolio/consulting-digital.jpg', // Placeholder image
  },
  {
    id: 4,
    title: 'Non-Profit Fundraising Campaign',
    problem: 'A non-profit struggling to connect with donors and articulate their impact effectively.',
    solution: 'Crafted an emotional StoryBrand narrative, designed a compelling campaign landing page, and optimized donation flows.',
    result: 'Exceeded fundraising goals by 120% and significantly increased donor engagement.',
    image: '/images/portfolio/nonprofit-fundraising.jpg', // Placeholder image
  },
];

const PortfolioPage = () => {
  return (
    <div className="min-h-screen bg-brand-black text-silver">
      {/* Featured Work Hero */}
      <section className="relative py-20 md:py-32 flex items-center justify-center text-center px-4 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-4xl z-10"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-silver">
            Proof of Impact: Real Results for Ambitious Brands
          </h1>
          <p className="text-xl md:text-2xl text-brand-gray mb-8">
            Explore how strategic clarity, compelling design, and robust systems have transformed businesses.
          </p>
        </motion.div>
      </section>

      {/* Case Study Grid */}
      <section className="py-20 bg-brand-slate px-4">
        <div className="container mx-auto">
          <SectionHeader
            title="Our Featured Case Studies"
            subtitle="Discover the challenges, solutions, and measurable successes achieved with our clients."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-12">
            {caseStudies.map((study, index) => (
              <Card
                key={study.id}
                motionProps={{
                  initial: { y: 50, opacity: 0 },
                  whileInView: { y: 0, opacity: 1 },
                  viewport: { once: true },
                  transition: { duration: 0.6, delay: index * 0.1 },
                }}
                className="flex flex-col"
              >
                {/* Placeholder for image */}
                {study.image && (
                  <div className="w-full h-48 bg-brand-black rounded-md mb-6 flex items-center justify-center text-brand-gray">
                    <img src={study.image} alt={study.title} className="object-cover w-full h-full rounded-md" />
                  </div>
                )}
                <h3 className="text-3xl font-bold text-silver mb-3">{study.title}</h3>
                <div className="space-y-4 text-brand-gray flex-grow">
                  <div>
                    <p className="font-semibold text-silver">The Problem:</p>
                    <p>{study.problem}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-silver">The Solution:</p>
                    <p>{study.solution}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-silver">The Result:</p>
                    <p>{study.result}</p>
                  </div>
                </div>
                <Link href={`/portfolio/${study.id}`} passHref>
                  <Button variant="outline" className="mt-8 w-full">
                    View Full Case Study
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner (“Let’s Create Your Breakthrough”) */}
      <section className="py-20 bg-blue-primary text-white text-center px-4">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Ready to Create Your Own Breakthrough?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto"
          >
            Your success story is waiting to be written. Let's collaborate and achieve remarkable results together.
          </motion.p>
          <Button href="/contact" size="lg" variant="outline" className="bg-white text-blue-primary hover:bg-gray-100">
            Let's Discuss Your Project
          </Button>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;