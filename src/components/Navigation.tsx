import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/90 backdrop-blur-md" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-6">
        <a href="#" className="font-display text-xl text-foreground tracking-wider font-light">
          STUDIO MARU
        </a>
        <div className="hidden md:flex items-center gap-10">
          <a href="#portfolio" className="text-xs tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors">
            PORTFOLIO
          </a>
          <a href="#" className="text-xs tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors">
            ABOUT
          </a>
          <a href="#" className="text-xs tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors">
            CONTACT
          </a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
