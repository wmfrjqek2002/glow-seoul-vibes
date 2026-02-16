import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Navigation from "@/components/Navigation";

interface PressItem {
  id: number;
  title: string;
  publisher: string;
  date: string;
  image?: string;
}

// 샘플 데이터 (실제로는 API에서 가져올 데이터)
const allPressItems: PressItem[] = [
  {
    id: 1,
    title: "박용진 의원, 국회의원 선거 당선",
    publisher: "MBC",
    date: "2024.04.10",
  },
  {
    id: 2,
    title: "민주주의 실현을 위한 노력",
    publisher: "중앙일보",
    date: "2024.03.15",
  },
  {
    id: 3,
    title: "경제 발전 정책 제안",
    publisher: "조선일보",
    date: "2024.03.08",
  },
  {
    id: 4,
    title: "사회 통합을 위한 포용적 정책",
    publisher: "한겨레",
    date: "2024.02.20",
  },
  {
    id: 5,
    title: "미래 세대를 위한 지속 가능한 정책",
    publisher: "동아일보",
    date: "2024.02.10",
  },
  {
    id: 6,
    title: "국정감사에서의 활발한 활동",
    publisher: "연합뉴스",
    date: "2024.01.25",
  },
  {
    id: 7,
    title: "지역 발전을 위한 특별법 제정",
    publisher: "매일경제",
    date: "2024.01.15",
  },
  {
    id: 8,
    title: "청년 정책 포럼 개최",
    publisher: "SBS",
    date: "2024.01.05",
  },
  {
    id: 9,
    title: "환경 보호 정책 발표",
    publisher: "YTN",
    date: "2023.12.20",
  },
  {
    id: 10,
    title: "디지털 뉴딜 정책 제안",
    publisher: "KBS",
    date: "2023.12.10",
  },
  {
    id: 11,
    title: "복지 정책 확대 발표",
    publisher: "MBC",
    date: "2023.11.25",
  },
  {
    id: 12,
    title: "교육 개혁 정책 제안",
    publisher: "중앙일보",
    date: "2023.11.15",
  },
  {
    id: 13,
    title: "주거 안정 대책 발표",
    publisher: "조선일보",
    date: "2023.11.05",
  },
  {
    id: 14,
    title: "의료 접근성 개선 정책",
    publisher: "한겨레",
    date: "2023.10.25",
  },
  {
    id: 15,
    title: "교통 인프라 확충",
    publisher: "동아일보",
    date: "2023.10.15",
  },
  {
    id: 16,
    title: "문화 예술 지원 정책",
    publisher: "연합뉴스",
    date: "2023.10.05",
  },
  {
    id: 17,
    title: "스마트시티 구축 계획",
    publisher: "매일경제",
    date: "2023.09.25",
  },
  {
    id: 18,
    title: "노인 복지 정책 강화",
    publisher: "SBS",
    date: "2023.09.15",
  },
  {
    id: 19,
    title: "청년 창업 지원 확대",
    publisher: "YTN",
    date: "2023.09.05",
  },
  {
    id: 20,
    title: "환경 친화적 도시 조성",
    publisher: "KBS",
    date: "2023.08.25",
  },
];

const ITEMS_PER_PAGE = 10;
const FEATURED_COUNT = 2;

const Press = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(allPressItems.length / ITEMS_PER_PAGE);
  
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = allPressItems.slice(startIndex, endIndex);
  
  const featuredItems = currentItems.slice(0, FEATURED_COUNT);
  const regularItems = currentItems.slice(FEATURED_COUNT);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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
              보도
            </h1>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Featured Section - 2x2 Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
                {featuredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative h-64 md:h-80 lg:h-96 rounded-2xl border border-white/10 overflow-hidden group cursor-pointer hover:border-white/30 transition-all duration-300"
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0 bg-gray-800">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <p className="text-gray-500 text-sm">이미지 영역</p>
                        </div>
                      )}
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                      <div className="mb-2">
                        <span className="text-white/80 text-xs font-medium tracking-wide uppercase">
                          {item.publisher}
                        </span>
                      </div>
                      <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-2 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-white/70 text-xs">{item.date}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Regular Grid - 4 columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {regularItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: (index + FEATURED_COUNT) * 0.05 }}
                    className="relative h-64 md:h-72 rounded-2xl border border-white/10 overflow-hidden group cursor-pointer hover:translate-y-[-4px] hover:border-white/30 transition-all duration-300"
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0 bg-gray-800">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <p className="text-gray-500 text-sm">이미지 영역</p>
                        </div>
                      )}
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
                      <div className="mb-2">
                        <span className="text-white/80 text-xs font-medium tracking-wide uppercase">
                          {item.publisher}
                        </span>
                      </div>
                      <h3 className="text-white text-lg md:text-xl font-bold mb-2 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-white/70 text-xs">{item.date}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-16 flex items-center justify-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg border border-white/10 transition-all duration-300 ${
                  currentPage === 1
                    ? "opacity-30 cursor-not-allowed"
                    : "hover:border-white/30 hover:bg-white/5"
                }`}
                aria-label="Previous page"
              >
                <ChevronLeft className="h-5 w-5 text-white" />
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      currentPage === page
                        ? "bg-white text-black"
                        : "text-slate-500 hover:text-white hover:bg-white/10"
                    }`}
                    aria-label={`Go to page ${page}`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg border border-white/10 transition-all duration-300 ${
                  currentPage === totalPages
                    ? "opacity-30 cursor-not-allowed"
                    : "hover:border-white/30 hover:bg-white/5"
                }`}
                aria-label="Next page"
              >
                <ChevronRight className="h-5 w-5 text-white" />
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Press;
