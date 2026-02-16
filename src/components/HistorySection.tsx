import history1 from "@/assets/history1.jpg";
import history2 from "@/assets/history2.webp";
import history3 from "@/assets/history3.webp";
import history4 from "@/assets/history4.jpg";
import history5 from "@/assets/history5.jpg";

interface HistoryItemProps {
  title: string;
  description: string;
  image?: string;
  isReversed?: boolean;
}

const HistoryItem = ({ title, description, image, isReversed = false }: HistoryItemProps) => {
  const contentSection = (
    <div className="flex flex-col gap-6 flex-1">
      <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight">
        {title}
      </h2>
      <p className="text-white text-sm leading-relaxed max-w-2xl">
        {description}
      </p>
    </div>
  );

  const imageSection = (
    <div className="w-full md:w-96 h-64 md:h-80 bg-gray-800 flex items-center justify-center">
      {image ? (
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
      ) : (
        <p className="text-gray-500 text-sm">이미지 영역</p>
      )}
    </div>
  );

  return (
    <section className="h-screen snap-start py-20 px-6 md:px-12 lg:px-24 bg-black flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          {isReversed ? (
            <>
              {contentSection}
              {imageSection}
            </>
          ) : (
            <>
              {imageSection}
              {contentSection}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

const HistorySection = () => {
  const historyItems = [
    {
      title: "민주화의 역사와 함께 했습니다",
      description: "고2 시절 스승님의 노조 설치로 구속되자 이에 저항하여 교내 시위를 하였습니다.",
      image: history1,
    },
    {
      title: "노동자를 위해 함께 싸웠습니다",
      description: "성균관대학교 총학생회장 시절 노동운동을 지원하다 구속되고 노동자의권리를 위해 열심히 투쟁하였습니다.",
      image: history2,
    },
    {
      title: "진보정치를 통해 대한민국 정치에 도전했습니다",
      description: "국민승리21에 입당하여 지속적으로 진보 정당 운동을 했습니다. 젊은 나이에 진보덩당으로 강북을 국회의원 후보로 2번 도전했지만 모두 낙선했습니다.",
      image: history3,
    },
    {
      title: "민주당에서 새로운 시작을 했습니다.",
      description: "민주통합당의 최고위원 선거에 도전 후 대변인으로 활동했습니다. 20대 국회의원 선거에서는 강북을에 당선되어 이건희 삼성전자 회장 차명 계좌 공개, 유치원 3법, 현대자동차 리콜 등 여러가지 성과를 냈습니다.",
      image: history4,
    },
    {
      title: "저의 도전은 현재 진행 중입니다.",
      description: "더불어민주당 당대표 선거, 대선 출마 등 새로운 도전을 이어나갔습니다. 양심과 가치의 더불어민주당을 지키기 위해 노력 중입니다. 현재 원외에 있지만 저의 도전은 끝나지 않았습니다.",
      image: history5,
    },
  ];
  return (
    <>
      {historyItems.map((item, index) => {
        const isReversed = (index + 1) % 2 === 0;
        
        return (
          <HistoryItem
            key={index}
            title={item.title}
            description={item.description}
            image={item.image}
            isReversed={isReversed}
          />
        );
      })}
    </>
  );
};

export default HistorySection;
