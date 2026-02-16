import { motion } from "framer-motion";

const pressItems = [
  { title: "World Brand Design Awards 수상", source: "Design Magazine" },
  { title: "최대 규모 스카이 라운지 공간 디자인 설계", source: "Architecture Today" },
  { title: "도시재생의 새로운 패러다임을 제시하다", source: "Seoul Economy" },
  { title: "브랜드 공간 디자인의 미래를 이끌다", source: "Creative Review" },
];

const PressSection = () => {
  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="text-section-number">Press</span>
          <h2 className="text-hero-title text-4xl md:text-5xl mt-4">
            In The Media
          </h2>
        </motion.div>

        <div className="space-y-0">
          {pressItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex items-center justify-between py-6 border-b border-border cursor-pointer hover:pl-4 transition-all duration-300"
            >
              <h3 className="font-display text-xl md:text-2xl text-foreground/80 group-hover:text-primary transition-colors duration-300 font-light">
                {item.title}
              </h3>
              <span className="text-muted-foreground text-sm hidden md:block">
                {item.source}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PressSection;
