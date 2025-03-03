"use client";

import { motion } from 'framer-motion';
import { Wand2, Eraser, Layers, Image as ImageIcon, Palette, Sparkles } from 'lucide-react';

const features = [
  {
    icon: <Wand2 className="w-8 h-8" />,
    title: 'Generative Fill',
    description: 'AI fills missing areas seamlessly with context-aware content.'
  },
  {
    icon: <Eraser className="w-8 h-8" />,
    title: 'Object Remove',
    description: 'Erase unwanted objects with a single click, leaving no trace behind.'
  },
  {
    icon: <Layers className="w-8 h-8" />,
    title: 'Background Remover',
    description: 'Instantly remove and replace backgrounds with AI precision.'
  },
  {
    icon: <ImageIcon className="w-8 h-8" />,
    title: 'Image Restore',
    description: 'Bring old photos back to life with advanced AI restoration.'
  },
  {
    icon: <Palette className="w-8 h-8" />,
    title: 'Object Recolor',
    description: 'Change object colors intelligently while preserving lighting and texture.'
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: 'AI Image Generation',
    description: 'Create stunning images from text descriptions using advanced AI technology.'
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful AI Features</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transform your images with our suite of advanced AI-powered tools
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 text-purple-600">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;