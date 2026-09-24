import type { Metadata } from "next";
import { CategoriesSection } from "@/components/home/categories-section";
import { FeaturedDevelopers } from "@/components/home/featured-developers";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { HeroSection } from "@/components/home/hero-section";
import { HowItWorks } from "@/components/home/how-it-works";
import { NewsletterStrip } from "@/components/home/newsletter-strip";
import { PopularAreas } from "@/components/home/popular-areas";
import { RecentlyAdded } from "@/components/home/recently-added";
import { VideoSection } from "@/components/home/video-section";
import { FinalCTA } from "@/components/sections/final-cta";
import { LatestVideos } from "@/components/sections/latest-videos";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { WhyChoose } from "@/components/sections/why-choose";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: { absolute: siteConfig.seo.title },
  description: siteConfig.seo.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <NewsletterStrip />
      <VideoSection />
      <HowItWorks />
      <CategoriesSection />
      <FeaturedProjects />
      <PopularAreas />
      <FeaturedDevelopers />
      <RecentlyAdded />
      <TestimonialsSection />
      <WhyChoose />
      <FinalCTA />
      <LatestVideos />
    </>
  );
}
