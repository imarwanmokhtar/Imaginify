"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroSection() {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Redirect to app if user is already signed in
    if (isSignedIn) {
      router.push("/app");
    }
    // Mark as loaded after hydration
    setIsLoaded(true);
  }, [isSignedIn, router]);

  const handleGetStarted = () => {
    router.push("/sign-in");
  };

  // Don't render animations until after hydration
  if (!isLoaded) {
    return (
      <div className="bg-gradient-to-b from-purple-50 to-white">
        <div className="mx-auto max-w-7xl px-6 pt-32 pb-24 sm:pt-40 sm:pb-32 lg:px-8 lg:pt-48 lg:pb-40">
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl md:text-7xl">
              Transform Photos with AI: Remove Objects, Restore & Edit
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-3xl">
              Use our free AI image editor to remove unwanted objects, restore old photos, and remove backgrounds instantly. Professional-quality results in seconds.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Button 
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg transition-all duration-300 hover:scale-105"
                onClick={handleGetStarted}
              >
                Try for Free
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-purple-50 to-white">
      <div className="mx-auto max-w-7xl px-6 pt-32 pb-24 sm:pt-40 sm:pb-32 lg:px-8 lg:pt-48 lg:pb-40">
        <AnimatePresence>
          <motion.div 
            className="flex flex-col items-center justify-center text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl md:text-7xl">
              Transform Photos with AI: Remove Objects, Restore & Edit
            </h1>
            <motion.p 
              className="mt-6 text-lg leading-8 text-gray-600 max-w-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Use our free AI image editor to remove unwanted objects, restore old photos, and remove backgrounds instantly. Professional-quality results in seconds.
            </motion.p>
            <motion.div 
              className="mt-10 flex items-center gap-x-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button 
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg transition-all duration-300 hover:scale-105"
                onClick={handleGetStarted}
              >
                Try for Free
              </Button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
} 