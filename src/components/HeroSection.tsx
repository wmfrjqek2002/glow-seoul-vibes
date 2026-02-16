import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-background/70" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-section-number mb-6"
        >
          당신의 모든 상상은 현실이 됩니다
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-hero-title text-5xl md:text-7xl lg:text-8xl mb-8"
        >
          박용진
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-hero-subtitle max-w-2xl mx-auto mb-12"
        >
          공간의 본질을 이해하고, 브랜드의 이야기를 담아
          <br className="hidden md:block" />
          잊을 수 없는 경험을 설계합니다
        </motion.p>

        <motion.a
          href="#portfolio"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="inline-block border border-primary/40 px-8 py-3 text-sm tracking-[0.2em] text-primary/80 hover:bg-primary/10 transition-colors duration-500"
        >
          프로젝트 보기
        </motion.a>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-px h-16 bg-gradient-to-b from-primary/40 to-transparent" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
