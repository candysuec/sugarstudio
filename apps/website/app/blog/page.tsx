
'use client';

import React from 'react';
import { motion } from 'framer-motion';
// import { Button } from '@/components/ui/button';

const blogPosts = [
  {
    id: 1,
    title: 'The Power of StoryBrand: Clarifying Your Message',
    description: 'Learn how the StoryBrand framework can transform your business communication and connect with your audience.',
    date: 'November 1, 2025',
    slug: 'the-power-of-storybrand',
    category: 'Branding',
    image: '/images/blog/storybrand.jpg', // Placeholder image
  },
  {
    id: 2,
    title: 'Automate Your Business: Systems for Scale',
    description: 'Discover essential automation strategies to streamline operations and free up your valuable time.',
    date: 'October 25, 2025',
    slug: 'automate-your-business',
    category: 'Systems',
    image: '/images/blog/automation.jpg', // Placeholder image
  },
  {
    id: 3,
    title: 'Designing for Impact: UX/UI Best Practices',
    description: 'Explore how thoughtful user experience and interface design can drive engagement and conversions.',
    date: 'October 18, 2025',
    slug: 'designing-for-impact',
    category: 'Design',
    image: '/images/blog/ux-ui.jpg', // Placeholder image
  },
  {
    id: 4,
    title: 'Your Brand is Not About You: The Customer as Hero',
    description: 'Shift your perspective and put your customer at the center of your brand narrative for powerful results.',
    date: 'October 10, 2025',
    slug: 'customer-as-hero',
    category: 'Branding',
    image: '/images/blog/customer-hero.jpg', // Placeholder image
  },
];

const BlogIndexPage = () => {
  return (
    <div className="min-h-screen bg-brand-black text-silver">
      {/* Blog Hero Section */}
      <section className="relative py-20 md:py-32 flex items-center justify-center text-center px-4 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-4xl z-10"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-silver">
            Insights & Strategies for Your Business Growth
          </h1>
          <p className="text-xl md:text-2xl text-brand-gray mb-8">
            Stay informed with expert articles on branding, systems, design, and scaling your impact.
          </p>
        </motion.div>
      </section>

      {/* Blog Post Grid */}
      <section className="py-20 bg-brand-slate px-4">
        <div className="container mx-auto">
<div>SectionHeader placeholder</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {blogPosts.map((post) => (
<div>BlogCard placeholder</div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts (Placeholder) */}
      <section className="py-20 bg-brand-black px-4">
        <div className="container mx-auto text-center">
<div>SectionHeader placeholder</div>
          <p className="text-brand-gray text-lg mt-8">
            (Placeholder for a featured posts section. Coming soon!)
          </p>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-blue-primary text-white text-center px-4">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Ready to Apply These Strategies?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto"
          >
            Let's turn insights into action and build a brand that truly connects.
          </motion.p>
<div>Button placeholder</div>
        </div>
      </section>
    </div>
  );
};

export default BlogIndexPage;
