"use client";

import FeaturesSection from "./components/landing/featureSection";
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

			<FeaturesSection />

			<PricingSection />

			<ThemeSection />

			<TestimonialSection />

			<Footer />
		</main>
	);
}
