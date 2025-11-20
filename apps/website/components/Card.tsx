
import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  motionProps?: any; // Framer Motion props
}

const Card = ({ children, className, motionProps }: CardProps) => {
  return (
    <motion.div
      className={`bg-brand-slate rounded-md p-6 shadow-soft ${className}`}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
};

export default Card;
