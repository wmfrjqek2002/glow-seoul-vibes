import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import vision1 from "@/assets/vision1.jpg";
import vision2 from "@/assets/vision2.jpg";
import vision3 from "@/assets/vision3.jpg";
import vision4 from "@/assets/vision4.jpg";
import vision5 from "@/assets/vision5.jpg";

const AUTO_SCROLL_INTERVAL = 5000; // 5초마다 자동 넘김

const visionImages = [vision1, vision2, vision3, vision4, vision5];

const Vision = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // imagePosition: 0 = 상단, 50 = 중앙, 100 = 하단. 각 섹션마다 0~100으로 조정하세요.
  const sections = [
    { title: "공정한 시장경제", description: "반칙과 특권이 없는 투명한 시장 질서를 확립하여 기업의 창의성과 역동성이 살아나는 경제 생태계 조성", imagePosition: 20 },
    { title: "공평한 사회", description: "법 앞의 평등을 실현하고 시민 개개인의 기본권과 자유가 온전히 보장되는 성숙한 민주주의 구현", imagePosition: 30 },
    { title: "실질적 재벌개혁", description: "지배구조의 투명성을 높여 시장의 공정성을 회복하고 지속 가능한 성장과 양질의 일자리 창출", imagePosition: 25 },
    { title: "포용적 경제민주화", description: "부의 편중을 막고 성장의 과실을 모든 시민이 나누는 상생의 포용적 공동체 구축", imagePosition: 30 },
    { title: "지속 가능한 미래 비전", description: "기후 위기 대응과 신성장 동력 확보를 통해 다음 세대를 위한 혁신적인 미래 설계", imagePosition: 50 },
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

  // 자동 스크롤
  useEffect(() => {
    const container = document.getElementById("vision-scroll-container");
    if (!container) return;

    const autoScroll = () => {
      const nextIndex = (currentIndex + 1) % sections.length;
      setCurrentIndex(nextIndex);
      container.scrollTo({
        left: nextIndex * container.clientWidth,
        behavior: "smooth",
      });
    };

    const timer = setInterval(autoScroll, AUTO_SCROLL_INTERVAL);
    return () => clearInterval(timer);
  }, [currentIndex, sections.length]);

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
                  <img
                    src={visionImages[index]}
                    alt={section.title}
                    className="w-full h-48 md:h-64 lg:h-80 object-cover"
                    style={{ objectPosition: `center ${section.imagePosition ?? 50}%` }}
                  />
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
                    {section.description}
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
