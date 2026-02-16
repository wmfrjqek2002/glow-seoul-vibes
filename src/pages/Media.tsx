import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";

interface MediaItem {
  id: number;
  title: string;
  channel: string;
  thumbnail?: string;
  type: "long-form" | "shorts";
}

const longFormItems: MediaItem[] = [
  { id: 1, title: "민주주의의 가치와 실현", channel: "민주고", type: "long-form" },
  { id: 2, title: "경제 발전을 위한 정책 제안", channel: "민주고", type: "long-form" },
  { id: 3, title: "사회 통합과 포용적 정책", channel: "민주고", type: "long-form" },
  { id: 4, title: "미래 세대를 위한 지속 가능한 정책", channel: "민주고", type: "long-form" },
  { id: 5, title: "국정감사에서의 활발한 활동", channel: "민주고", type: "long-form" },
  { id: 6, title: "지역 발전을 위한 특별법 제정", channel: "민주고", type: "long-form" },
  { id: 7, title: "청년 정책 포럼 개최", channel: "민주고", type: "long-form" },
  { id: 8, title: "환경 보호 정책 발표", channel: "민주고", type: "long-form" },
  { id: 9, title: "디지털 뉴딜 정책 제안", channel: "민주고", type: "long-form" },
];

const shortsItems: MediaItem[] = [
  { id: 1, title: "민주주의의 가치", channel: "민주고", type: "shorts" },
  { id: 2, title: "경제 발전 정책", channel: "민주고", type: "shorts" },
  { id: 3, title: "사회 통합", channel: "민주고", type: "shorts" },
  { id: 4, title: "미래 비전", channel: "민주고", type: "shorts" },
  { id: 5, title: "국정감사 활동", channel: "민주고", type: "shorts" },
  { id: 6, title: "지역 발전", channel: "민주고", type: "shorts" },
  { id: 7, title: "청년 정책", channel: "민주고", type: "shorts" },
  { id: 8, title: "환경 보호", channel: "민주고", type: "shorts" },
  { id: 9, title: "디지털 뉴딜", channel: "민주고", type: "shorts" },
  { id: 10, title: "복지 정책", channel: "민주고", type: "shorts" },
  { id: 11, title: "교육 개혁", channel: "민주고", type: "shorts" },
  { id: 12, title: "주거 안정", channel: "민주고", type: "shorts" },
];

const Media = () => {
  const [activeTab, setActiveTab] = useState<"long-form" | "shorts">("long-form");

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <main className="pt-32 pb-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight">
              미디어
            </h1>
          </motion.div>

          {/* Tab Menu */}
          <div className="flex items-center gap-4 mb-12">
            <button
              onClick={() => setActiveTab("long-form")}
              className={`relative px-6 py-3 text-sm font-medium transition-all duration-300 ${
                activeTab === "long-form"
                  ? "text-white"
                  : "text-slate-500 hover:text-white"
              }`}
            >
              Long-form
              {activeTab === "long-form" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab("shorts")}
              className={`relative px-6 py-3 text-sm font-medium transition-all duration-300 ${
                activeTab === "shorts"
                  ? "text-white"
                  : "text-slate-500 hover:text-white"
              }`}
            >
              Shorts
              {activeTab === "shorts" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            {activeTab === "long-form" ? (
              <motion.div
                key="long-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {longFormItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="group cursor-pointer"
                  >
                    {/* Thumbnail - 16:9 */}
                    <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden mb-4 group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-300">
                      {item.thumbnail ? (
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <p className="text-gray-500 text-sm">썸네일 영역</p>
                        </div>
                      )}
                    </div>
                    {/* Channel and Title below card */}
                    <div>
                      <p className="text-slate-400 text-sm mb-1">{item.channel}</p>
                      <h3 className="text-white text-lg font-bold line-clamp-2 group-hover:text-slate-200 transition-colors">
                        {item.title}
                      </h3>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="shorts"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4"
              >
                {shortsItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.03 }}
                    className="group cursor-pointer"
                  >
                    {/* Thumbnail - 9:16 */}
                    <div className="relative aspect-[9/16] bg-gray-800 rounded-lg overflow-hidden group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-300">
                      {item.thumbnail ? (
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <p className="text-gray-500 text-xs">썸네일</p>
                        </div>
                      )}
                      {/* Glassmorphism Title Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 via-black/60 to-transparent backdrop-blur-sm">
                        <p className="text-slate-400 text-xs mb-1">{item.channel}</p>
                        <h3 className="text-white text-sm font-bold line-clamp-2">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Media;
