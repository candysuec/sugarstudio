
'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50 bg-brand-black bg-opacity-80 backdrop-blur-sm p-4 shadow-soft"
    >
      <nav className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-silver text-2xl font-bold">
          KniBrand
        </Link>
        <div className="flex items-center space-x-6">
          <Link href="/services" className="text-silver hover:text-blue-primary transition-colors">
            Services
          </Link>
          <Link href="/portfolio" className="text-silver hover:text-blue-primary transition-colors">
            Portfolio
          </Link>
          <Link href="/about" className="text-silver hover:text-blue-primary transition-colors">
            About
          </Link>
          <Link href="/blog" className="text-silver hover:text-blue-primary transition-colors">
            Blog
          </Link>
          <Link href="/contact" passHref>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-primary text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-secondary transition-colors"
            >
              Work With Me
            </motion.button>
          </Link>
          <Link href="/contact" passHref>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-blue-primary text-blue-primary px-6 py-2 rounded-md font-semibold hover:bg-blue-primary hover:text-white transition-colors"
            >
              Strategy Call
            </motion.button>
          </Link>
        </div>
      </nav>
    </motion.header>
  );
};

export default Header;
