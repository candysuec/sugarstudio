'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';


const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Thank you for your message! I will get back to you shortly.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert(`Failed to send message: ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An unexpected error occurred. Please try again later.');
    }
  };

  const faqs = [
    {
      question: "What is the StoryBrand Framework?",
      answer: "The StoryBrand Framework is a proven communication strategy that helps businesses clarify their message so customers listen. It positions your customer as the hero and your brand as the guide, leading to increased engagement and sales."
    },
    {
      question: "Who do you typically work with?",
      answer: "I primarily partner with ambitious founders, CEOs, creatives, and teams who are looking for brand clarity, automation systems, better UX, faster execution, and a stronger digital presence."
    },
    {
      question: "What kind of results can I expect?",
      answer: "Clients typically achieve a brand they're proud of, systems that scale, and a business that feels easier and more aligned. This often translates to increased leads, conversions, and operational efficiency."
    },
    {
      question: "How do we start working together?",
      answer: "The best way to begin is to schedule a free strategy call. We'll discuss your current challenges, your vision, and how my services can help you achieve your goals. You can book a call directly through the button on this page."
    },
  ];

  return (
    <div className="min-h-screen bg-brand-black text-silver">
      {/* Hero Section for Contact Page */}
      <section className="relative py-20 md:py-32 flex items-center justify-center text-center px-4 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-4xl z-10"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-silver">
            Let's Connect & Clarify Your Path
          </h1>
          <p className="text-xl md:text-2xl text-brand-gray mb-8">
            You don’t have to figure this out alone. Reach out, and let's build something meaningful.
          </p>
        </motion.div>
      </section>

      {/* Contact Form & Book a Call CTA */}
      <section className="py-20 bg-brand-slate px-4">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="bg-brand-black p-8 rounded-lg shadow-soft"
          >
            <h2 className="text-3xl font-bold text-silver mb-6">Send Me a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <div>Label placeholder</div>
<div>Input placeholder</div>
              </div>
              <div>
                <div>Label placeholder</div>
                <div>Input placeholder</div>
              </div>
              <div>
                <div>Label placeholder</div>
                <div>Textarea placeholder</div>
              </div>
<div>Button placeholder</div>
            </form>
          </motion.div>

          {/* Book a Call CTA */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center items-center bg-brand-black p-8 rounded-lg shadow-soft text-center"
          >
            <h2 className="text-3xl font-bold text-silver mb-6">Prefer to Talk?</h2>
            <p className="text-xl text-brand-gray mb-8">
              Let's dive deep into your vision and challenges during a free, no-obligation strategy call.
            </p>
<div>Button placeholder</div>
            <p className="text-brand-gray text-sm mt-4">
              (Link to your Calendly or booking system)
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-brand-black px-4">
        <div className="container mx-auto max-w-3xl">
          <div>SectionHeader placeholder</div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12"
          >
<div>Accordion placeholder</div>
          </motion.div>
        </div>
      </section>

      {/* Reassurance + Success Summary */}
      <section className="py-20 bg-blue-primary text-white text-center px-4">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Your Success Story Starts Here.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto"
          >
            Stop feeling overwhelmed and start building a business that truly reflects your vision and delivers consistent results.
          </motion.p>
<div>Button placeholder</div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;