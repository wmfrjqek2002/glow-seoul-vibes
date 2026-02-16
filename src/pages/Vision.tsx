import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";

const Vision = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sections = [
    { title: "강한 대한민국", description: "독창적인 기획력과 머물게 하는 콘텐츠로 경험을 설계하는 브랜드 공간 솔루션" },
    { title: "민주주의", description: "시민의 권리와 자유를 보장하는 민주주의 실현" },
    { title: "경제 발전", description: "지속 가능한 경제 성장과 일자리 창출" },
    { title: "사회 통합", description: "모든 시민이 함께하는 포용적 사회" },
    { title: "미래 비전", description: "다음 세대를 위한 지속 가능한 미래 설계" },
  ];

  useEffect(() => {
    const container = document.getElementById("vision-scroll-container");
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const width = container.clientWidth;
      const index = Math.round(scrollLeft / width);
      setCurrentIndex(index);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="h-screen bg-black flex flex-col overflow-hidden">
      <Navigation />
      
      {/* Fixed Title */}
      <div className="pt-24 pb-4 px-6 md:px-12 lg:px-24 flex-shrink-0">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight">
            비전과 목표
          </h1>
        </motion.div>
      </div>

      {/* Horizontal Scroll Container */}
      <div
        id="vision-scroll-container"
        className="flex-1 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
      >
        <div className="flex h-full">
          {sections.map((section, index) => (
            <section
              key={index}
              className="w-screen flex-shrink-0 h-full snap-center flex flex-col justify-center px-6 md:px-12 lg:px-24"
            >
              <div className="max-w-7xl mx-auto w-full flex flex-col items-center justify-center">
                {/* Title - Left top, above image */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="w-full max-w-2xl mb-2"
                >
                  <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold">
                    {section.title}
                  </h2>
                </motion.div>

                {/* Image - Smaller */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="w-full max-w-2xl mb-6"
                >
                  <div className="w-full h-48 md:h-64 lg:h-80 bg-gray-800 flex items-center justify-center">
                    <p className="text-gray-500 text-sm">이미지 영역</p>
                  </div>
                </motion.div>

                {/* Description Text - Centered, multi-line */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-center mb-6"
                >
                  <p className="text-white text-base md:text-lg leading-relaxed max-w-2xl mx-auto whitespace-pre-line">
                    {section.description.split(' ').join(' / ')}
                  </p>
                </motion.div>
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="flex-shrink-0 pb-8 flex justify-center gap-2">
        {sections.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              const container = document.getElementById("vision-scroll-container");
              if (container) {
                container.scrollTo({
                  left: index * container.clientWidth,
                  behavior: "smooth",
                });
              }
            }}
            animate={{
              scale: currentIndex === index ? 1.2 : 1,
              opacity: currentIndex === index ? 1 : 0.4,
            }}
            transition={{ duration: 0.3 }}
            className={`transition-all duration-300 ${
              currentIndex === index
                ? "w-8 h-2 bg-white rounded-full"
                : "w-2 h-2 bg-white/40 rounded-full"
            }`}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Vision;
