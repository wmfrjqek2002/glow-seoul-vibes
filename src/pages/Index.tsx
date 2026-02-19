import { useState, useCallback, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import IntroScreen from "@/components/IntroScreen";
import Navigation from "@/components/Navigation";
import FooterSection from "@/components/FooterSection";
import EducationCareerSection from "@/components/EducationCareerSection";
import HistorySection from "@/components/HistorySection";
import NavigationMenuSection from "@/components/NavigationMenuSection";
import backgroundImg from "@/assets/background.jpg";

const Index = () => {
  const [introComplete, setIntroComplete] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reset = new URLSearchParams(location.search).get("reset");
    if (reset === "intro") {
      setIntroComplete(false);
      scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
      navigate("/", { replace: true });
    }
  }, [location.search, location.pathname, navigate]);

  useEffect(() => {
    const hash = location.hash?.slice(1);
    if (hash && (hash === "education-career" || hash === "history")) {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.pathname, location.hash]);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  return (
    <div 
      ref={scrollRef}
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
        <EducationCareerSection />
        <HistorySection />
        <NavigationMenuSection />
      </div>
    </div>
  );
};

export default Index;
