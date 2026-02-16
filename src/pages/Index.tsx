import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import IntroScreen from "@/components/IntroScreen";
import Navigation from "@/components/Navigation";
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
        <main className="flex items-center justify-center min-h-screen">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-hero-title text-4xl md:text-6xl lg:text-7xl text-center"
          >
            안녕하세요 박용진입니다
          </motion.h1>
        </main>
        <FooterSection />
      </div>
    </div>
  );
};

export default Index;
