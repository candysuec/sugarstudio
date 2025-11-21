
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import SectionHeader from '@/components/layout/section-header';
import Card from '@/components/cards/Card';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-brand-black text-silver">
      {/* 1. Hero Section (Character + Problem + CTA) */}
      <section className="relative h-screen flex items-center justify-center text-center px-4 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-4xl z-10"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 text-silver">
            Ambitious Founders, <br className="hidden md:block" />
            Your Vision Deserves Clarity.
          </h1>
          <p className="text-xl md:text-2xl text-brand-gray mb-8">
            Feeling unclear, disorganized, or inefficient? I help you cut through the noise,
            structure your vision, and build systems that scale.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
<div>Button placeholder</div>
<div>Button placeholder</div>
          </div>
        </motion.div>
        {/* Background elements for visual interest */}
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="absolute inset-0 bg-gradient-to-br from-brand-slate to-brand-black opacity-10"
          ></motion.div>
          <motion.div
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 0.05 }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
            className="absolute top-1/4 left-0 w-64 h-64 bg-blue-primary rounded-full mix-blend-screen filter blur-3xl opacity-5"
          ></motion.div>
          <motion.div
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 0.05 }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.4 }}
            className="absolute bottom-1/4 right-0 w-64 h-64 bg-silver rounded-full mix-blend-screen filter blur-3xl opacity-5"
          ></motion.div>
        </div>
      </section>

      {/* 2. Value Proposition (Empathy + Authority) */}
      <section className="py-20 bg-brand-slate px-4">
        <div className="container mx-auto">
          <SectionHeader
            title="You're Not Alone in This Journey"
            subtitle="I understand the challenges of building a thriving business. My expertise brings clarity and strategic execution to your vision."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <Card motionProps={{ initial: { x: -50, opacity: 0 }, whileInView: { x: 0, opacity: 1 }, viewport: { once: true }, transition: { duration: 0.6 } }}>
              <h3 className="text-2xl font-bold text-silver mb-4">Empathy: I Get It.</h3>
              <p className="text-brand-gray">
                Your business is your passion, but sometimes it feels like a tangled mess of ideas,
                unclear communication, and missed opportunities. You're brilliant at what you do,
                but translating that into a clear, scalable brand and efficient operations can be
                overwhelming. I've been there, and I'm here to simplify the complex.
              </p>
            </Card>
            <Card motionProps={{ initial: { x: 50, opacity: 0 }, whileInView: { x: 0, opacity: 1 }, viewport: { once: true }, transition: { duration: 0.6, delay: 0.2 } }}>
              <h3 className="text-2xl font-bold text-silver mb-4">Authority: Proven Direction.</h3>
              <p className="text-brand-gray">
                With years of experience in strategic branding, system design, and digital execution,
                I've guided numerous founders and teams to achieve breakthrough clarity and tangible results.
                My approach is rooted in the StoryBrand framework, ensuring your message resonates and converts.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* 3. Your Plan (Guide Plan – 3 Steps) */}
      <section className="py-20 bg-brand-black px-4">
        <div className="container mx-auto">
          <SectionHeader
            title="Your Path to Clarity & Growth"
            subtitle="A simple, proven framework to transform your vision into a thriving, efficient business."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                icon: '💡',
                title: 'Clarify Your Brand',
                description: 'Uncover your unique message, define your ideal customer, and craft a compelling narrative that cuts through the noise.',
              },
              {
                icon: '🎨',
                title: 'Design High-Impact Experiences',
                description: 'Translate your clarified message into stunning visuals, intuitive user experiences, and digital products that captivate and convert.',
              },
              {
                icon: '⚙️',
                title: 'Build Systems & Scale',
                description: 'Implement robust systems, automate workflows, and optimize your operations to achieve sustainable growth and effortless execution.',
              },
            ].map((item, index) => (
              <Card
                key={index}
                motionProps={{
                  initial: { y: 50, opacity: 0 },
                  whileInView: { y: 0, opacity: 1 },
                  viewport: { once: true },
                  transition: { duration: 0.6, delay: index * 0.1 },
                }}
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold text-silver mb-3">{item.title}</h3>
                <p className="text-brand-gray">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Services Overview */}
      <section className="py-20 bg-brand-slate px-4">
        <div className="container mx-auto">
          <SectionHeader
            title="How I Can Help You Succeed"
            subtitle="Tailored solutions to bring clarity, design, and efficiency to every aspect of your business."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {[
              {
                title: 'Strategic Consulting',
                description: 'Expert guidance to define your vision, refine your strategy, and navigate complex business challenges.',
              },
              {
                title: 'Brand Transformation',
                description: 'From core messaging to visual identity, I build brands that resonate and stand out in crowded markets.',
              },
              {
                title: 'Systems & Automations',
                description: 'Implement efficient workflows and cutting-edge automations to streamline operations and boost productivity.',
              },
              {
                title: 'UX/UI & Digital Products',
                description: 'Craft intuitive user experiences and beautiful digital products that engage your audience and drive results.',
              },
            ].map((service, index) => (
              <Card
                key={index}
                motionProps={{
                  initial: { y: 50, opacity: 0 },
                  whileInView: { y: 0, opacity: 1 },
                  viewport: { once: true },
                  transition: { duration: 0.6, delay: index * 0.1 },
                }}
              >
                <h3 className="text-xl font-bold text-silver mb-3">{service.title}</h3>
                <p className="text-brand-gray">{service.description}</p>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
<div>Button placeholder</div>
          </div>
        </div>
      </section>

      {/* 5. Work/Portfolio Grid (Social Proof) - Placeholder */}
      <section className="py-20 bg-brand-black px-4">
        <div className="container mx-auto text-center">
          <SectionHeader
            title="See the Impact: Our Work"
            subtitle="Real results for ambitious clients. Discover how clarity and strategy transform businesses."
          />
          <p className="text-brand-gray text-lg mt-8">
            (Placeholder for a dynamic portfolio grid. Coming soon!)
          </p>
          <div className="mt-12">
<div>Button placeholder</div>
          </div>
        </div>
      </section>

      {/* 6. Testimonials (Authority) - Placeholder */}
      <section className="py-20 bg-brand-slate px-4">
        <div className="container mx-auto text-center">
          <SectionHeader
            title="What Clients Say"
            subtitle="Don't just take my word for it. Hear from the founders and teams I've helped."
          />
          <p className="text-brand-gray text-lg mt-8">
            (Placeholder for a dynamic testimonials carousel/grid. Coming soon!)
          </p>
          <div className="mt-12">
<div>Button placeholder</div>
          </div>
        </div>
      </section>

      {/* 7. Blog Preview (To build trust at scale) - Placeholder */}
      <section className="py-20 bg-brand-black px-4">
        <div className="container mx-auto text-center">
          <SectionHeader
            title="Insights & Strategies"
            subtitle="Stay ahead with expert articles on branding, systems, and business growth."
          />
          <p className="text-brand-gray text-lg mt-8">
            (Placeholder for a blog post preview grid. Coming soon!)
          </p>
          <div className="mt-12">
<div>Button placeholder</div>
          </div>
        </div>
      </section>

      {/* 8. Final CTA (Direct: “Let’s Build Your Next Chapter”) */}
      <section className="py-20 bg-blue-primary text-white text-center px-4">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Let’s Build Your Next Chapter.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto"
          >
            Stop feeling stuck and start building the clear, scalable, and impactful business you envision.
            Your transformation begins now.
          </motion.p>
<div>Button placeholder</div>
        </div>
      </section>
    </div>
  );
}
