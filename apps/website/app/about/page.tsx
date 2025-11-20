'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '@sugarstudio/ui';
import { Card } from '@sugarstudio/ui';
import { Button } from '@sugarstudio/ui';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-brand-black text-silver">
      {/* Hero Section for About Page */}
      <section className="relative py-20 md:py-32 flex items-center justify-center text-center px-4 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-4xl z-10"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-silver">
            Meet Your Guide to Clarity & Growth
          </h1>
          <p className="text-xl md:text-2xl text-brand-gray mb-8">
            I help ambitious founders and teams transform their vision into a clear, scalable, and impactful reality.
          </p>
        </motion.div>
      </section>

      {/* Who You Are (Guide introduction) */}
      <section className="py-20 bg-brand-slate px-4">
        <div className="container mx-auto">
          <SectionHeader
            title="I'm [Your Name], and I'm Here to Help You Win."
            subtitle="My journey has been dedicated to understanding what makes businesses thrive: clear communication, strategic design, and robust systems."
          />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center text-lg text-brand-gray mt-8"
          >
            <p className="mb-4">
              For years, I've worked with entrepreneurs, CEOs, and creative teams who, despite their brilliance,
              felt bogged down by complexity. They had incredible ideas but struggled to articulate them,
              design compelling experiences, or build the operational backbone needed for true scale.
            </p>
            <p>
              That's where I come in. I translate your passion into a powerful brand narrative,
              design experiences that resonate, and engineer systems that make your business run like a well-oiled machine.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why You Do This (Empathy) */}
      <section className="py-20 bg-brand-black px-4">
        <div className="container mx-auto">
          <SectionHeader
            title="Why I Do What I Do: Your Success is My Mission."
            subtitle="I believe every visionary deserves a clear path to impact. My work is fueled by seeing you achieve your full potential."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <Card motionProps={{ initial: { x: -50, opacity: 0 }, whileInView: { x: 0, opacity: 1 }, viewport: { once: true }, transition: { duration: 0.6 } }}>
              <h3 className="text-2xl font-bold text-silver mb-4">The Frustration is Real.</h3>
              <p className="text-brand-gray">
                I've witnessed firsthand the frustration of brilliant minds trapped by unclear messaging,
                inefficient processes, and a lack of strategic direction. It's disheartening to see
                potential go unfulfilled because the foundational elements aren't in place.
              </p>
            </Card>
            <Card motionProps={{ initial: { x: 50, opacity: 0 }, whileInView: { x: 0, opacity: 1 }, viewport: { once: true }, transition: { duration: 0.6, delay: 0.2 } }}>
              <h3 className="text-2xl font-bold text-silver mb-4">The Joy of Clarity.</h3>
              <p className="text-brand-gray">
                My greatest satisfaction comes from guiding clients through that fog, helping them
                discover their unique voice, and building the robust systems that allow them to
                operate with ease and confidence. Your clarity is my calling.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* What Qualifies You (Authority) */}
      <section className="py-20 bg-brand-slate px-4">
        <div className="container mx-auto">
          <SectionHeader
            title="My Expertise: Your Strategic Advantage."
            subtitle="Combining StoryBrand principles with deep technical and design acumen to deliver measurable results."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <Card motionProps={{ initial: { y: 50, opacity: 0 }, whileInView: { y: 0, opacity: 1 }, viewport: { once: true }, transition: { duration: 0.6, delay: 0.1 } }}>
              <h3 className="text-2xl font-bold text-silver mb-3">StoryBrand Certified</h3>
              <p className="text-brand-gray">
                Mastery in crafting compelling narratives that position your customer as the hero and your brand as the trusted guide.
              </p>
            </Card>
            <Card motionProps={{ initial: { y: 50, opacity: 0 }, whileInView: { y: 0, opacity: 1 }, viewport: { once: true }, transition: { duration: 0.6, delay: 0.2 } }}>
              <h3 className="text-2xl font-bold text-silver mb-3">Systems & Automation Expert</h3>
              <p className="text-brand-gray">
                Proven ability to design and implement efficient workflows, leveraging technology to scale operations.
              </p>
            </Card>
            <Card motionProps={{ initial: { y: 50, opacity: 0 }, whileInView: { y: 0, opacity: 1 }, viewport: { once: true }, transition: { duration: 0.6, delay: 0.3 } }}>
              <h3 className="text-2xl font-bold text-silver mb-3">UX/UI & Digital Product Developer</h3>
              <p className="text-brand-gray">
                Extensive experience in creating intuitive user experiences and building high-performance digital products.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Transformation Story / Timeline / Founder Journey (Placeholder) */}
      <section className="py-20 bg-brand-black px-4">
        <div className="container mx-auto text-center">
          <SectionHeader
            title="My Journey: From Vision to Impact"
            subtitle="Every great story has a beginning. Here's mine, and how it shaped my commitment to your success."
          />
          <p className="text-brand-gray text-lg mt-8">
            (Placeholder for a visual timeline or detailed founder story. Coming soon!)
          </p>
        </div>
      </section>

      {/* Values & Philosophies */}
      <section className="py-20 bg-brand-slate px-4">
        <div className="container mx-auto">
          <SectionHeader
            title="My Guiding Principles"
            subtitle="The core beliefs that drive my work and ensure your experience is exceptional."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {[
              {
                title: 'Clarity Above All',
                description: 'Complexity is the enemy of execution. I prioritize clear communication and straightforward solutions.',
              },
              {
                title: 'Strategic Empathy',
                description: 'Understanding your challenges deeply to craft solutions that truly resonate and deliver value.',
              },
              {
                title: 'Sustainable Growth',
                description: 'Building not just for today, but for a future where your business thrives effortlessly.',
              },
              {
                title: 'Integrity & Trust',
                description: 'Honest, transparent partnerships are the foundation of every successful collaboration.',
              },
              {
                title: 'Innovation & Adaptability',
                description: 'Staying ahead of the curve to bring you the most effective strategies and technologies.',
              },
              {
                title: 'Impact-Driven',
                description: 'My ultimate goal is to help you make a significant, positive impact through your brand.',
              },
            ].map((value, index) => (
              <Card
                key={index}
                motionProps={{
                  initial: { y: 50, opacity: 0 },
                  whileInView: { y: 0, opacity: 1 },
                  viewport: { once: true },
                  transition: { duration: 0.6, delay: index * 0.05 },
                }}
              >
                <h3 className="text-xl font-bold text-silver mb-3">{value.title}</h3>
                <p className="text-brand-gray">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery (Placeholder) */}
      <section className="py-20 bg-brand-black px-4">
        <div className="container mx-auto text-center">
          <SectionHeader
            title="A Glimpse Behind the Scenes"
            subtitle="Connecting with clients, speaking, and the journey of building impactful brands."
          />
          <p className="text-brand-gray text-lg mt-8">
            (Placeholder for a photo gallery. Coming soon!)
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-blue-primary text-white text-center px-4">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Ready to Build Something Meaningful?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto"
          >
            Your vision is powerful. Let's clarify your message, design your impact, and build systems for lasting success.
          </motion.p>
          <Button href="/contact" size="lg" variant="secondary" className="bg-white text-blue-primary hover:bg-gray-100">
            Let's Connect
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;