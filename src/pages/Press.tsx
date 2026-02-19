import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import { getPressItems, type PressItem } from "@/lib/store";

const ITEMS_PER_PAGE = 10;
const FEATURED_COUNT = 2;

const Press = () => {
  const [allPressItems, setAllPressItems] = useState<PressItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadPressItems = async () => {
      const items = await getPressItems();
      setAllPressItems(items);
    };
    loadPressItems();
  }, []);

  const totalPages = Math.ceil(allPressItems.length / ITEMS_PER_PAGE) || 1;
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
                {featuredItems.map((item, index) => {
                  const Wrapper = item.link ? "a" : "div";
                  return (
                  <Wrapper key={item.id} {...(item.link ? { href: item.link, target: "_blank", rel: "noopener noreferrer" } : {})}>
                  <motion.div
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
                  </Wrapper>
                  );
                })}
              </div>

              {/* Regular Grid - 4 columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {regularItems.map((item, index) => {
                  const Wrapper = item.link ? "a" : "div";
                  return (
                  <Wrapper key={item.id} {...(item.link ? { href: item.link, target: "_blank", rel: "noopener noreferrer" } : {})}>
                  <motion.div
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
                  </Wrapper>
                  );
                })}
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
