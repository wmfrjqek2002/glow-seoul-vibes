import { motion } from "framer-motion";

const aboutItems = [
  {
    number: "01",
    title: "통합 브랜딩 솔루션",
    description:
      "기획부터 디자인, 설계·시공까지 모든 과정을 인하우스에서 책임집니다. 각 분야 전문가들의 긴밀한 협업을 통해 일관성 있는 브랜드를 완성합니다.",
  },
  {
    number: "02",
    title: "독창적인 공간 기획",
    description:
      "역사적·문화적 맥락을 현대적으로 재해석하여, 과거와 현재가 공존하는 차별화된 공간을 창출합니다. 각 공간은 고유의 테마와 브랜드 스토리를 담아냅니다.",
  },
  {
    number: "03",
    title: "지속 가능한 가치 창출",
    description:
      "단순한 인테리어를 넘어, 5년 후에도 경쟁력 있는 브랜드 공간을 만듭니다. 지속 가능한 상권과 브랜드를 창출하는 것이 우리의 목표입니다.",
  },
];

const AboutSection = () => {
  return (
    <section className="py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-24">
          {aboutItems.map((item, index) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="grid md:grid-cols-[120px_1fr] gap-6 md:gap-12 border-t border-border pt-12"
            >
              <span className="text-section-number text-2xl font-display">
                {item.number}
              </span>
              <div>
                <h2 className="text-hero-title text-3xl md:text-4xl mb-6">
                  {item.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed max-w-2xl text-base">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
