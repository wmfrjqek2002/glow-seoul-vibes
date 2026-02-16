import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
      {phase !== "exit" ? null : null}
      <motion.div
        key="intro"
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        initial={{ opacity: 1 }}
        animate={phase === "exit" ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {/* Subtle top line */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px bg-primary/20"
          initial={{ height: 0 }}
          animate={{ height: 60 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          style={{ top: "35%" }}
        />

        {/* Subtitle */}
        <motion.p
          className="text-section-number text-xs md:text-sm mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          당신의 모든 상상은 현실이 됩니다
        </motion.p>

        {/* Main logo text */}
        <motion.h1
          className="font-display text-4xl md:text-6xl lg:text-7xl tracking-wider text-muted-foreground/60 font-light"
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          animate={{ opacity: 1, letterSpacing: "0.15em" }}
          transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
        >
          박용진
        </motion.h1>

        {/* Bottom line */}
        <motion.div
          className="mt-10 w-px bg-primary/20"
          initial={{ height: 0 }}
          animate={{ height: 40 }}
          transition={{ duration: 0.6, delay: 1.4, ease: "easeOut" }}
        />

        {/* CTA hint */}
        <motion.p
          className="absolute bottom-12 text-muted-foreground/30 text-xs tracking-[0.3em]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.8 }}
        >
          YONGJIN PARK
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
};

export default IntroScreen;
