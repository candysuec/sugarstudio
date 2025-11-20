
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '@sugarstudio/ui';
import { Button } from '@sugarstudio/ui';
import Link from 'next/link';

// Placeholder for fetching blog post data based on slug
const getBlogPost = (slug: string) => {
  // In a real application, this would fetch data from a CMS or markdown files
  const posts = [
    {
      id: 1,
      title: 'The Power of StoryBrand: Clarifying Your Message',
      description: 'Learn how the StoryBrand framework can transform your business communication and connect with your audience.',
      date: 'November 1, 2025',
      slug: 'the-power-of-storybrand',
      category: 'Branding',
      image: '/images/blog/storybrand.jpg',
      content: `
        <p>The StoryBrand framework, developed by Donald Miller, is a powerful tool for businesses to clarify their message. It's based on the idea that all great stories follow a similar pattern, and by applying this pattern to your brand's communication, you can make your message resonate deeply with your audience.</p>
        <h2>Why StoryBrand Matters</h2>
        <p>In a noisy marketplace, clarity is your greatest competitive advantage. Customers are not looking for another product or service; they are looking for a guide to help them solve their problems. StoryBrand helps you position your customer as the hero of the story, and your brand as the trusted guide.</p>
        <h3>The 7-Part Framework</h3>
        <p>The framework consists of seven universal story elements:</p>
        <ol>
          <li>A Character: Your customer is the hero, not your brand.</li>
          <li>Has a Problem: What pain point or challenge are they facing?</li>
          <li>And Meets a Guide: That's your brand – empathetic and authoritative.</li>
          <li>Who Gives Them a Plan: A clear, actionable path to success.</li>
          <li>And Calls Them to Action: What specific step do you want them to take?</li>
          <li>That Helps Them Avoid Failure: What negative consequences will they avoid?</li>
          <li>And Ends in Success: What does their transformed life look like?</li>
        </ol>
        <p>By consistently applying these elements, you create a narrative that customers can easily understand and connect with, leading to increased engagement and sales.</p>
        <h4>Implementing StoryBrand</h4>
        <p>Implementing StoryBrand involves auditing your current messaging, identifying gaps, and rewriting your communication to align with the framework. This includes your website, emails, marketing materials, and even your sales conversations.</p>
        <p>The result is a brand message that is not only clear but also compelling, drawing customers in and inspiring them to take action. It's about making your customer's journey easier and more successful, with your brand as their indispensable partner.</p>
      `,
    },
    {
      id: 2,
      title: 'Automate Your Business: Systems for Scale',
      description: 'Discover essential automation strategies to streamline operations and free up your valuable time.',
      date: 'October 25, 2025',
      slug: 'automate-your-business',
      category: 'Systems',
      image: '/images/blog/automation.jpg',
      content: `
        <p>Automation is no longer a luxury; it's a necessity for businesses looking to scale efficiently. By automating repetitive tasks, you can free up valuable time, reduce errors, and improve overall productivity.</p>
        <h2>Benefits of Automation</h2>
        <ul>
          <li>Increased Efficiency: Tasks are completed faster and with fewer manual interventions.</li>
          <li>Reduced Costs: Less time spent on manual tasks means lower operational expenses.</li>
          <li>Improved Accuracy: Automating processes minimizes human error.</li>
          <li>Better Scalability: Systems can handle increased workloads without proportional increases in staff.</li>
          <li>Enhanced Employee Satisfaction: Employees can focus on more strategic and creative work.</li>
        </ul>
        <h3>Where to Start with Automation</h3>
        <p>Identify repetitive tasks that consume a significant amount of time. Common areas for automation include:</p>
        <ol>
          <li>Email Marketing: Automated sequences for onboarding, nurturing, and sales.</li>
          <li>Customer Support: Chatbots and automated FAQ responses.</li>
          <li>Data Entry: Integrating different software systems to share data seamlessly.</li>
          <li>Social Media Scheduling: Tools to plan and publish content automatically.</li>
          <li>Reporting: Automated generation of performance reports.</li>
        </ol>
        <h4>Tools and Technologies</h4>
        <p>There's a wide array of tools available for automation, from simple Zapier integrations to complex custom-built solutions. Choosing the right tools depends on your specific needs and existing tech stack.</p>
        <p>Embracing automation is a strategic move that empowers your business to grow without being constrained by manual limitations. It's about working smarter, not just harder.</p>
      `,
    },
    // Add more placeholder posts as needed
  ];
  return posts.find((post) => post.slug === slug);
};

interface BlogPostPageProps {
  params: { slug: string };
}

const BlogPostPage = ({ params }: BlogPostPageProps) => {
  const post = getBlogPost(params.slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-brand-black text-silver flex items-center justify-center">
        <h1 className="text-4xl font-bold">Post Not Found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-black text-silver">
      {/* Post Hero Section */}
      <section className="relative py-20 md:py-32 flex items-center justify-center text-center px-4 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-4xl z-10"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-silver">
            {post.title}
          </h1>
          <p className="text-xl text-brand-gray mb-4">
            {post.description}
          </p>
          <p className="text-brand-gray text-sm">
            By [Your Name] on {post.date} in {post.category}
          </p>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-brand-slate px-4">
        <div className="container mx-auto max-w-3xl">
          {post.image && (
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
              src={post.image}
              alt={post.title}
              className="w-full h-96 object-cover rounded-lg mb-12 shadow-soft"
            />
          )}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-invert max-w-none" // Tailwind Typography for rich text
            dangerouslySetInnerHTML={{ __html: post.content }}
          >
          </motion.div>

          {/* Table of Contents (Placeholder) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 p-6 bg-brand-black rounded-lg shadow-soft"
          >
            <h3 className="text-xl font-bold text-silver mb-4">Table of Contents</h3>
            <ul className="list-disc list-inside text-brand-gray">
              <li>(Placeholder for dynamic TOC generation)</li>
              <li>Section 1: Introduction</li>
              <li>Section 2: Key Concepts</li>
              <li>Section 3: Implementation</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Related Posts / Final CTA */}
      <section className="py-20 bg-brand-black px-4 text-center">
        <div className="container mx-auto">
          <SectionHeader
            title="Continue Your Learning Journey"
            subtitle="Explore more insights to clarify your message and scale your business."
          />
          <div className="mt-12">
            <Button href="/blog" size="lg" variant="primary">
              View All Articles
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPostPage;
