import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";

const Vision = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <main className="pt-32 px-6 md:px-12 lg:px-24 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Title - Left aligned */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-12 md:mb-16"
          >
            <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight">
              비전과 목표
            </h1>
          </motion.div>

          {/* Image Section - Centered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mb-12 md:mb-16"
          >
            <div className="w-full h-64 md:h-96 lg:h-[500px] bg-gray-800 flex items-center justify-center">
              <p className="text-gray-500 text-sm">이미지 영역</p>
            </div>
          </motion.div>

          {/* Description Text - Centered */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-center mb-8"
          >
            <p className="text-white text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
              독창적인 기획력과 머물게 하는 콘텐츠로 경험을 설계하는 브랜드 공간 솔루션
            </p>
          </motion.div>

          {/* Separator Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex justify-center"
          >
            <div className="w-full max-w-3xl h-px bg-white"></div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Vision;
