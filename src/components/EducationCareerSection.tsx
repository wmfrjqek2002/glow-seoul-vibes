import { motion } from "framer-motion";

const educationItems = [
  "성균관대학교 졸업",
  "화계초. 신일중, 고등학교 졸업",
  "전북 장수 출생",
];

const careerItems = [
  "2020.06 ~ 제21대 국회 전반기 정무위원회 위원",
  "2020.06 ~ 제21대 국회 전반기 예산결산특별위원회 위원",
  "2018.10 ~ 2019.05 제20대 국회 4차산업혁명특별위원회 간사",
  "2018.07 ~ 제20대 국회 후반기 교육위원회 위원",
  "2018.07 ~ 2019.06 제20대 국회 후반기 예산결산특별위원회 위원",
  "2017.11 ~ 2018.05 더불어민주당 이건희 등 차명계좌 과세 및 금융실명제 제도 개선 TF 간사",
  "2017.09 더불어민주당 적폐청산위원회 위원",
  "2017.08 제20대 국회 정치개혁특별위원회 위원",
  "2017.05 ~ 2018.05 제20대 국회 전반기 운영위원회 위원",
  "2017.05 ~ 2018.05 더불어민주당 원내부대표",
  "2016.06 ~ 2018.07 제20대 국회 전반기 정무위원회 위원",
  "2016.05 ~ 제20대 국회의원 (서울 강북구을/더불어민주당)",
  "2016.04 ~ 2016.08 더불어민주당 비상대책위원장 비서실장",
  "2015.12 더불어민주당 정책위원회 부의장",
  "2015.08 ~ 2015.12 새정치민주연합 정책위원회 부의장",
  "2013.05 ~ 2014.01 민주당 대변인",
  "2012.03 ~ 2013.05 민주통합당 대변인",
];

const EducationCareerSection = () => {
  return (
    <section id="education-career" className="min-h-screen snap-start py-20 px-6 md:px-12 lg:px-24 bg-black flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* 학력사항 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-8"
          >
            <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight">
              학력사항
            </h2>
            <ul className="flex flex-col gap-4">
              {educationItems.map((item, index) => (
                <li
                  key={index}
                  className="text-white/90 text-sm md:text-base leading-relaxed flex items-start gap-3"
                >
                  <span className="text-primary mt-1.5">∙</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* 주요경력 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-8"
          >
            <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight">
              주요경력
            </h2>
            <ul className="flex flex-col gap-3">
              {careerItems.map((item, index) => (
                <li
                  key={index}
                  className="text-white/90 text-sm md:text-base leading-relaxed flex items-start gap-3"
                >
                  <span className="text-primary mt-1.5 flex-shrink-0">∙</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EducationCareerSection;
