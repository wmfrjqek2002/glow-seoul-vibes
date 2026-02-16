import { useState, useCallback } from "react";
import IntroScreen from "@/components/IntroScreen";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import PortfolioSection from "@/components/PortfolioSection";
import PressSection from "@/components/PressSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  const [introComplete, setIntroComplete] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {!introComplete && <IntroScreen onComplete={handleIntroComplete} />}
      <div
        style={{
          opacity: introComplete ? 1 : 0,
          transition: "opacity 0.6s ease-in-out",
        }}
      >
        <Navigation />
        <main>
          <HeroSection />
          <AboutSection />
          <PortfolioSection />
          <PressSection />
          <FooterSection />
        </main>
      </div>
    </div>
  );
};

export default Index;
