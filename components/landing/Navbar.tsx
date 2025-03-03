"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/assets/images/logo-text.svg"
              alt="logo"
              width={180}
              height={28}
              style={{ width: 'auto', height: 'auto' }}
            />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-600 hover:text-purple-600 transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-gray-600 hover:text-purple-600 transition-colors">
              Pricing
            </Link>
            <Link href="#testimonials" className="text-gray-600 hover:text-purple-600 transition-colors">
              Testimonials
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/sign-in">
              <Button
                variant="ghost"
                className="hover:bg-purple-50 transition-colors"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button
                className="bg-purple-600 hover:bg-purple-700 text-white transition-colors"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;