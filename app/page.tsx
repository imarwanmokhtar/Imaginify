"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/landing/Navbar";
import Features from "@/components/landing/Features";
import Testimonials from "@/components/landing/Testimonials";
import Pricing from "@/components/landing/Pricing";
import Footer from "@/components/landing/Footer";
import { Metadata } from 'next'

export const metadata: Metadata = {
  verification: {
    google: 'lHcCG87SVAV7ctEoeANEF9x_GMjS1Yxew6bL4UjcDWQ',
  },
}

export default function LandingPage() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    // Redirect to app if user is already signed in
    if (isSignedIn) {
      router.push("/app");
    }
  }, [isSignedIn, router]);

  const handleGetStarted = () => {
    router.push("/sign-in");
  };

  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <div className="bg-gradient-to-b from-purple-50 to-white">
        <div className="mx-auto max-w-7xl px-6 pt-32 pb-24 sm:pt-40 sm:pb-32 lg:px-8 lg:pt-48 lg:pb-40">
        <motion.div 
          className="flex flex-col items-center justify-center text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl md:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Unleash Your Creativity with AI-Powered Image Editing
          </motion.h1>
          <motion.p 
            className="mt-6 text-lg leading-8 text-gray-600 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Transform your photos effortlessly with AI-driven tools. Remove objects, fill gaps, restore old pictures, and more—all in one place.
          </motion.p>
          <motion.div 
            className="mt-10 flex items-center gap-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button 
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg transition-all duration-300 hover:scale-105"
              onClick={handleGetStarted}
            >
              Try for Free
            </Button>
          </motion.div>
        </motion.div>
        </div>
      </div>
      <Features />
      <Testimonials />
      <Pricing />
      <Footer />
    </div>
  );
}