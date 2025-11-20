
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card } from '@sugarstudio/ui';

interface BlogCardProps {
  title: string;
  description: string;
  date: string;
  slug: string;
  category?: string;
  image?: string;
}

const BlogCard = ({ title, description, date, slug, category, image }: BlogCardProps) => {
  return (
    <Link href={`/blog/${slug}`} passHref>
      <Card
        motionProps={{
          initial: { y: 50, opacity: 0 },
          whileInView: { y: 0, opacity: 1 },
          viewport: { once: true },
          transition: { duration: 0.6 },
        }}
        className="flex flex-col h-full cursor-pointer hover:shadow-lg hover:shadow-blue-primary/20 transition-shadow duration-300"
      >
        {image && (
          <div className="w-full h-48 bg-brand-black rounded-md mb-6 overflow-hidden">
            <img src={image} alt={title} className="object-cover w-full h-full" />
          </div>
        )}
        {category && (
          <span className="text-blue-primary text-sm font-semibold mb-2 uppercase">{category}</span>
        )}
        <h3 className="text-2xl font-bold text-silver mb-3 flex-grow">{title}</h3>
        <p className="text-brand-gray text-base mb-4">{description}</p>
        <p className="text-brand-gray text-sm mt-auto">{date}</p>
      </Card>
    </Link>
  );
};

export default BlogCard;
