
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import Card from '@/components/Card';
import Button from '@/components/Button';

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-brand-black text-silver">
      {/* Service Hero Section */}
      <section className="relative py-20 md:py-32 flex items-center justify-center text-center px-4 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-4xl z-10"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-silver">
            Your Blueprint for Business Transformation
          </h1>
          <p className="text-xl md:text-2xl text-brand-gray mb-8">
            Clear strategies, compelling design, and robust systems to scale your impact.
          </p>
          <Button href="/contact" size="lg" variant="primary">
            Start Your Project
          </Button>
        </motion.div>
      </section>

      {/* Core Offerings */}
      <section className="py-20 bg-brand-slate px-4">
        <div className="container mx-auto">
          <SectionHeader
            title="My Core Offerings"
            subtitle="Tailored solutions designed to bring clarity, efficiency, and growth to your business."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {[
              {
                icon: '✨',
                title: 'Brand Clarity & Strategy',
                description: 'Define your unique message, ideal customer, and compelling narrative using the StoryBrand framework.',
              },
              {
                icon: '💻',
                title: 'Website Design & Development',
                description: 'Craft high-converting websites and digital experiences that captivate your audience and drive action.',
              },
              {
                icon: '📝',
                title: 'Content & Systems Integration',
                description: 'Develop content strategies and integrate systems for seamless content creation and distribution.',
              },
              {
                icon: '⚙️',
                title: 'Automation & Workflow Optimization',
                description: 'Streamline your operations with intelligent automations and optimized workflows for maximum efficiency.',
              },
            ].map((offering, index) => (
              <Card
                key={index}
                motionProps={{
                  initial: { y: 50, opacity: 0 },
                  whileInView: { y: 0, opacity: 1 },
                  viewport: { once: true },
                  transition: { duration: 0.6, delay: index * 0.1 },
                }}
              >
                <div className="text-5xl mb-4">{offering.icon}</div>
                <h3 className="text-xl font-bold text-silver mb-3">{offering.title}</h3>
                <p className="text-brand-gray">{offering.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Packages (StoryBrand Plan) */}
      <section className="py-20 bg-brand-black px-4">
        <div className="container mx-auto">
          <SectionHeader
            title="My Signature Transformation Packages"
            subtitle="Choose the path that best fits your ambition and get ready for a business that feels easy and aligned."
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
            {/* Package 1 */}
            <Card motionProps={{ initial: { y: 50, opacity: 0 }, whileInView: { y: 0, opacity: 1 }, viewport: { once: true }, transition: { duration: 0.6 } }}>
              <h3 className="text-3xl font-bold text-silver mb-4">The Clarity Catalyst</h3>
              <p className="text-brand-gray mb-6">
                Perfect for founders who need to define their core message and strategic direction.
              </p>
              <ul className="text-brand-gray space-y-3 mb-8">
                <li className="flex items-center"><svg className="w-5 h-5 text-blue-primary mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>StoryBrand Messaging Guide</li>
                <li className="flex items-center"><svg className="w-5 h-5 text-blue-primary mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>Target Audience Deep Dive</li>
                <li className="flex items-center"><svg className="w-5 h-5 text-blue-primary mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>Core Offerings Refinement</li>
              </ul>
              <Button href="/contact" variant="outline" className="w-full">
                Get Clear
              </Button>
            </Card>

            {/* Package 2 */}
            <Card motionProps={{ initial: { y: 50, opacity: 0 }, whileInView: { y: 0, opacity: 1 }, viewport: { once: true }, transition: { duration: 0.6, delay: 0.1 } }}>
              <h3 className="text-3xl font-bold text-silver mb-4">The Digital Dynamo</h3>
              <p className="text-brand-gray mb-6">
                For businesses ready to translate their clear message into a powerful online presence.
              </p>
              <ul className="text-brand-gray space-y-3 mb-8">
                <li className="flex items-center"><svg className="w-5 h-5 text-blue-primary mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>Custom Website Design & Build</li>
                <li className="flex items-center"><svg className="w-5 h-5 text-blue-primary mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>SEO & Content Strategy Integration</li>
                <li className="flex items-center"><svg className="w-5 h-5 text-blue-primary mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>Conversion-Focused UX/UI</li>
              </ul>
              <Button href="/contact" variant="primary" className="w-full">
                Go Digital
              </Button>
            </Card>

            {/* Package 3 */}
            <Card motionProps={{ initial: { y: 50, opacity: 0 }, whileInView: { y: 0, opacity: 1 }, viewport: { once: true }, transition: { duration: 0.6, delay: 0.2 } }}>
              <h3 className="text-3xl font-bold text-silver mb-4">The Scalable System</h3>
              <p className="text-brand-gray mb-6">
                For established businesses seeking to optimize operations and unlock exponential growth.
              </p>
              <ul className="text-brand-gray space-y-3 mb-8">
                <li className="flex items-center"><svg className="w-5 h-5 text-blue-primary mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>Custom Automation Solutions</li>
                <li className="flex items-center"><svg className="w-5 h-5 text-blue-primary mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>Workflow Optimization & Integration</li>
                <li className="flex items-center"><svg className="w-5 h-5 text-blue-primary mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>Performance Monitoring & Reporting</li>
              </ul>
              <Button href="/contact" variant="outline" className="w-full">
                Scale Up
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Who it's for / Who it's not for */}
      <section className="py-20 bg-brand-slate px-4">
        <div className="container mx-auto">
          <SectionHeader
            title="Is This For You?"
            subtitle="I partner with ambitious leaders ready for real transformation."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <Card motionProps={{ initial: { x: -50, opacity: 0 }, whileInView: { x: 0, opacity: 1 }, viewport: { once: true }, transition: { duration: 0.6 } }}>
              <h3 className="text-2xl font-bold text-silver mb-4">This is for you if...</h3>
              <ul className="text-brand-gray space-y-3">
                <li className="flex items-start"><svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>You're an ambitious founder, CEO, or creative leader.</li>
                <li className="flex items-start"><svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>You're ready to invest in strategic clarity and scalable systems.</li>
                <li className="flex items-start"><svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>You value long-term impact over quick fixes.</li>
              </ul>
            </Card>
            <Card motionProps={{ initial: { x: 50, opacity: 0 }, whileInView: { x: 0, opacity: 1 }, viewport: { once: true }, transition: { duration: 0.6, delay: 0.2 } }}>
              <h3 className="text-2xl font-bold text-silver mb-4">This is NOT for you if...</h3>
              <ul className="text-brand-gray space-y-3">
                <li className="flex items-start"><svg className="w-5 h-5 text-red-500 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path></svg>You're looking for a cheap, generic solution.</li>
                <li className="flex items-start"><svg className="w-5 h-5 text-red-500 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path></svg>You're unwilling to implement strategic changes.</li>
                <li className="flex items-start"><svg className="w-5 h-5 text-red-500 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path></svg>You prefer staying stuck in complexity and overwhelm.</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Outcomes (Success) */}
      <section className="py-20 bg-brand-black px-4">
        <div className="container mx-auto">
          <SectionHeader
            title="The Transformation You'll Experience"
            subtitle="Imagine a business that feels easy, aligned, and powerfully positioned for growth."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                icon: '✅',
                title: 'Crystal-Clear Brand Message',
                description: 'Your audience will instantly understand what you offer and why it matters.',
              },
              {
                icon: '📈',
                title: 'Scalable Systems & Operations',
                description: 'Automated workflows free up your time, allowing you to focus on what you do best.',
              },
              {
                icon: '🚀',
                title: 'Confident Digital Presence',
                description: 'A compelling website and consistent brand assets that attract and convert your ideal clients.',
              },
            ].map((outcome, index) => (
              <Card
                key={index}
                motionProps={{
                  initial: { y: 50, opacity: 0 },
                  whileInView: { y: 0, opacity: 1 },
                  viewport: { once: true },
                  transition: { duration: 0.6, delay: index * 0.1 },
                }}
              >
                <div className="text-5xl mb-4">{outcome.icon}</div>
                <h3 className="text-2xl font-bold text-silver mb-3">{outcome.title}</h3>
                <p className="text-brand-gray">{outcome.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process (3-step plan) */}
      <section className="py-20 bg-brand-slate px-4">
        <div className="container mx-auto">
          <SectionHeader
            title="My Proven 3-Step Process"
            subtitle="A clear roadmap to achieve your brand and business goals."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                step: 'Step 1',
                title: 'Discover & Clarify',
                description: 'We dive deep into your vision, audience, and offerings to forge a crystal-clear brand message.',
              },
              {
                step: 'Step 2',
                title: 'Design & Build',
                description: 'Your message comes to life through strategic design, compelling content, and robust digital solutions.',
              },
              {
                step: 'Step 3',
                title: 'Automate & Scale',
                description: 'We implement systems and automations that empower your business to grow efficiently and effortlessly.',
              },
            ].map((processStep, index) => (
              <Card
                key={index}
                motionProps={{
                  initial: { y: 50, opacity: 0 },
                  whileInView: { y: 0, opacity: 1 },
                  viewport: { once: true },
                  transition: { duration: 0.6, delay: index * 0.1 },
                }}
              >
                <p className="text-blue-primary text-lg font-semibold mb-2">{processStep.step}</p>
                <h3 className="text-2xl font-bold text-silver mb-3">{processStep.title}</h3>
                <p className="text-brand-gray">{processStep.description}</p>
              </Card>
            ))}
          </div>
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
            Ready to Build a Business That Works For You?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto"
          >
            Let's craft a strategy that brings clarity, design that converts, and systems that scale.
          </motion.p>
          <Button href="/contact" size="lg" variant="secondary" className="bg-white text-blue-primary hover:bg-gray-100">
            Schedule Your Strategy Call
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
