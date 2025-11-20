import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="bg-brand-black text-silver py-12 mt-20"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-brand-slate pb-8 mb-8">
          {/* Brand Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">KniBrand</h3>
            <p className="text-brand-gray">
              Clarifying your message, designing high-impact assets, and building systems that scale.
            </p>
            <div className="flex space-x-4 mt-6">
              {/* Social Icons - Placeholders */}
              <a href="#" className="text-silver hover:text-blue-primary transition-colors">
                {/* Replace with actual SVG icons */}
                <i className="fab fa-linkedin text-2xl"></i>
              </a>
              <a href="#" className="text-silver hover:text-blue-primary transition-colors">
                <i className="fab fa-twitter text-2xl"></i>
              </a>
              <a href="#" className="text-silver hover:text-blue-primary transition-colors">
                <i className="fab fa-instagram text-2xl"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-brand-gray hover:text-silver transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-brand-gray hover:text-silver transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-brand-gray hover:text-silver transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-brand-gray hover:text-silver transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Secondary CTA */}
          <div>
            <h3 className="text-xl font-bold mb-4">Ready to Transform Your Brand?</h3>
            <p className="text-brand-gray mb-6">
              Let's build a clear, compelling, and scalable future for your business.
            </p>
            <Link href="/contact" passHref>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-primary text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-secondary transition-colors"
              >
                Schedule a Strategy Call
              </motion.button>
            </Link>
          </div>
        </div>

        <div className="text-center text-brand-gray text-sm">
          &copy; {new Date().getFullYear()} KniBrand. All rights reserved.
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;