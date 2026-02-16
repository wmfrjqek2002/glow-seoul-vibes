import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import backgroundImg from "@/assets/background.jpg";

const IntroScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"logo" | "exit">("logo");

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase("exit"), 2400);
    const timer2 = setTimeout(() => onComplete(), 3200);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        key="intro"
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        initial={{ opacity: 1 }}
        animate={phase === "exit" ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{ 
          backgroundImage: `url(${backgroundImg})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Subtle top line */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px bg-primary/20"
          initial={{ height: 0 }}
          animate={{ height: 60 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          style={{ top: "35%" }}
        />

        {/* Main logo text */}
        <motion.h1
          className="text-hero-title text-4xl md:text-6xl lg:text-7xl text-center font-light"
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          animate={phase === "exit" 
            ? { opacity: 0, letterSpacing: "0.15em" } 
            : { opacity: 1, letterSpacing: "0.15em" }
          }
          transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
        >
          안녕하세요 박용진입니다
        </motion.h1>

        {/* Bottom line */}
        <motion.div
          className="mt-10 w-px bg-primary/20"
          initial={{ height: 0 }}
          animate={{ height: 40 }}
          transition={{ duration: 0.6, delay: 1.4, ease: "easeOut" }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default IntroScreen;
