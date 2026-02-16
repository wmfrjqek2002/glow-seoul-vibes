import { motion } from "framer-motion";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";
import portfolio6 from "@/assets/portfolio-6.jpg";

const projects = [
  { image: portfolio1, title: "Café Lumière", subtitle: "서울 익선동 카페 프로젝트" },
  { image: portfolio2, title: "Golden Hall", subtitle: "인스파이어 리조트 다이닝" },
  { image: portfolio3, title: "Heritage House", subtitle: "창신동 도시재생 프로젝트" },
  { image: portfolio4, title: "The Atrium", subtitle: "호텔 로비 & 라운지" },
  { image: portfolio5, title: "Maison Noir", subtitle: "갤러리형 리테일 스페이스" },
  { image: portfolio6, title: "Nuit Bar", subtitle: "프리미엄 와인바" },
];

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="text-section-number">Portfolio</span>
          <h2 className="text-hero-title text-4xl md:text-5xl mt-4">
            Selected Works
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative aspect-[4/3] overflow-hidden cursor-pointer"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 portfolio-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <h3 className="font-display text-2xl md:text-3xl text-foreground font-light">
                  {project.title}
                </h3>
                <p className="text-sm text-foreground/60 mt-1 font-body">
                  {project.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
