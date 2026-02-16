import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import IntroScreen from "@/components/IntroScreen";
import Navigation from "@/components/Navigation";
import FooterSection from "@/components/FooterSection";
import HistorySection from "@/components/HistorySection";
import NavigationMenuSection from "@/components/NavigationMenuSection";
import backgroundImg from "@/assets/background.jpg";

const Index = () => {
  const [introComplete, setIntroComplete] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  return (
    <div 
      className="h-screen overflow-y-scroll snap-y snap-mandatory bg-background relative"
      style={{ 
        backgroundImage: `url(${backgroundImg})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center -230px',
        backgroundAttachment: 'fixed',
        paddingTop: '80px'
      }}
    >
      {!introComplete && <IntroScreen onComplete={handleIntroComplete} />}
      <div
        style={{
          opacity: introComplete ? 1 : 0,
          transition: "opacity 0.6s ease-in-out",
        }}
      >
        <Navigation />
        <main className="flex items-center justify-center h-screen snap-start pt-20">
        </main>
        <FooterSection />
        <HistorySection />
        <NavigationMenuSection />
      </div>
    </div>
  );
};

export default Index;
