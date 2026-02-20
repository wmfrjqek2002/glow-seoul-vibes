import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import FooterSection from "@/components/FooterSection";
import EducationCareerSection from "@/components/EducationCareerSection";
import HistorySection from "@/components/HistorySection";
import NavigationMenuSection from "@/components/NavigationMenuSection";
import backgroundImg from "@/assets/background.jpg";

const Index = () => {
  const location = useLocation();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hash = location.hash?.slice(1);
    if (hash && (hash === "education-career" || hash === "history")) {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.pathname, location.hash]);

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
      <div>
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
