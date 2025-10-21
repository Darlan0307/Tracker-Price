import LandingHeader from "@/components/landing/LandingHeader";
import HeroSection from "@/components/landing/HeroSection";
import WhatIsSection from "@/components/landing/WhatIsSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import PlatformsCarousel from "@/components/landing/PlatformsCarousel";
import CTASection from "@/components/landing/CTASection";
import LandingFooter from "@/components/landing/LandingFooter";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <LandingHeader />
      <HeroSection />
      <PlatformsCarousel />
      <WhatIsSection />
      <HowItWorksSection />
      <CTASection />
      <LandingFooter />
    </div>
  );
};

export default Landing;
