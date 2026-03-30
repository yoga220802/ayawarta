"use client";

import FeatureSection from "./components/landing/featureSection";
import Footer from "./components/landing/footer";
import Header from "./components/landing/header";
import HeroSection from "./components/landing/homeSection";
import PricingSection from "./components/landing/pricingSection";
import TestimonialSection from "./components/landing/testimonialSection";
import ThemeSection from "./components/landing/themeSection";

export default function HomePage() {
  return (
    <main>
      <Header />
      <HeroSection />
      <FeatureSection />
      <PricingSection />
      <ThemeSection />
      <TestimonialSection />
      <Footer />
    </main>
  );
}
