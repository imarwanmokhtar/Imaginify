"use client";

import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold">ImageAI</h3>
            <p className="text-gray-400 text-sm">
              Transform your images with the power of AI. Fast, easy, and professional results.
            </p>
            <div className="flex space-x-4">
              <Link 
                href="#" 
                className="hover:text-purple-400 transition-colors" 
                aria-label="Follow us on Facebook"
              >
                <Facebook size={20} aria-hidden="true" />
              </Link>
              <Link 
                href="#" 
                className="hover:text-purple-400 transition-colors"
                aria-label="Follow us on Twitter"
              >
                <Twitter size={20} aria-hidden="true" />
              </Link>
              <Link 
                href="#" 
                className="hover:text-purple-400 transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={20} aria-hidden="true" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="#features" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
              <li><Link href="#pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/sign-in" className="text-gray-400 hover:text-white transition-colors">Sign In</Link></li>
              <li><Link href="/sign-up" className="text-gray-400 hover:text-white transition-colors">Sign Up</Link></li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/coming-soon" className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="/coming-soon" className="text-gray-400 hover:text-white transition-colors">Documentation</Link></li>
              <li><Link href="/coming-soon" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold">Newsletter</h3>
            <p className="text-gray-400 text-sm">Stay updated with our latest features and releases.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 text-white px-4 py-2 rounded-md flex-grow focus:outline-none focus:ring-2 focus:ring-purple-500"
                aria-label="Email for newsletter"
              />
              <Link href="/sign-in">
                <Button 
                  className="bg-purple-600 hover:bg-purple-700"
                  aria-label="Subscribe to newsletter"
                >
                  <Mail className="w-4 h-4" aria-hidden="true" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm"
        >
          <p>&copy; {new Date().getFullYear()} Imaginify. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;