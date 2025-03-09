"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Professional Photographer',
    image: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=6366f1&color=fff',
    stars: 5,
    text: 'Imaginify has revolutionized my workflow. The AI-powered features save me hours of editing time!'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Digital Artist',
    image: 'https://ui-avatars.com/api/?name=Michael+Chen&background=6366f1&color=fff',
    stars: 5,
    text: 'The generative fill feature is mind-blowing. It helps me create stunning compositions effortlessly.'
  },
  {
    id: 3,
    name: 'Emma Davis',
    role: 'Social Media Manager',
    image: 'https://ui-avatars.com/api/?name=Emma+Davis&background=6366f1&color=fff',
    stars: 5,
    text: 'Background removal and object recoloring have never been easier. A must-have tool for content creators!'
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" className="py-24 bg-purple-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied users who have transformed their images with Imaginify
          </p>
        </motion.div>

        <div className="relative h-[400px] max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <div className="bg-white p-8 rounded-2xl shadow-xl">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {testimonials[currentIndex].name}
                    </h3>
                    <p className="text-gray-600">{testimonials[currentIndex].role}</p>
                  </div>
                  <div className="flex ml-auto">
                    {[...Array(testimonials[currentIndex].stars)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-lg text-gray-700 italic">
                  &quot;{testimonials[currentIndex].text}&quot;
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-8 h-8 p-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-purple-600 w-12' : 'bg-purple-200'
                }`}
                aria-label={`View testimonial ${index + 1} of ${testimonials.length}`}
              >
                <span className={`block w-4 h-4 rounded-full ${
                  index === currentIndex ? 'bg-white' : 'bg-purple-400'
                }`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;