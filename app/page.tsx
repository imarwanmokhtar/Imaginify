import { Suspense } from "react";
import Navbar from "@/components/landing/Navbar";
import Features from "@/components/landing/Features";
import Testimonials from "@/components/landing/Testimonials";
import Pricing from "@/components/landing/Pricing";
import Footer from "@/components/landing/Footer";
import HeroSection from "@/components/landing/HeroSection";
import Head from "next/head";

export default function LandingPage() {
  return (
    <>
      <Head>
        <meta name="google-site-verification" content="nlXoUekknA8avDb5j2o9THmz1XR-CZxz5LN4EysJa6s" />
      </Head>
      <div className="min-h-screen w-full">
        <Navbar />
        <Suspense fallback={
          <div className="mx-auto max-w-7xl px-6 pt-32 pb-24 sm:pt-40 sm:pb-32 lg:px-8 lg:pt-48 lg:pb-40">
            <div className="flex flex-col items-center justify-center text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl md:text-7xl">
                Transform Photos with AI: Remove Objects, Restore & Edit
              </h1>
            </div>
          </div>
        }>
          <HeroSection />
        </Suspense>
        <Features />
        <Testimonials />
        <Pricing />
        <Footer />
      </div>
    </>
  );
}