// public/images/ 경로 사용 (빌드 시 assets 미존재해도 배포 성공)
const historyImages = [
  "/images/history1.jpg",
  "/images/history2.jpg",
  "/images/history3.jpg",
  "/images/history4.jpg",
  "/images/history5.jpg",
];

interface HistoryItemProps {
  title: string;
  description: string;
  image?: string;
  isReversed?: boolean;
  id?: string;
}

const HistoryItem = ({ title, description, image, isReversed = false, id }: HistoryItemProps) => {
  const contentSection = (
    <div className="flex flex-col gap-6 flex-1">
      <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight whitespace-pre-line">
        {title}
      </h2>
      <p className="text-white text-sm leading-relaxed max-w-2xl whitespace-pre-line">
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
    <section id={id} className="h-screen snap-start py-20 px-6 md:px-12 lg:px-24 bg-black flex items-center">
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
      title: "장난꾸러기였지만,위인전을 좋아했던 강북 소년",
      description: "동네 골목골목을 헤집고 다니던 장난꾸러기 소년. 가난했지만 자식 교육에 힘썻던 부모님 덕분에 책을 많이 읽으며 자랐다.책 중에 특히 위인전을 좋아햇는데 위인들의 자신을 돌보지 않는 헌신은 후일 사회적 약자와 일하는 사람들을 위해 자신을 던지는 데 큰 역할을 햇다. 전북 장수에서 태어나 경찰 공무원이엇던 아버지를 따라 전주로 이사했다. 현재의 강북구로 이사와 화계초등학교, 신일중, 신일고를 졸업했다.",
      image: historyImages[0],
    },
    {
      title: "사회적 불합리에 항거하고 사회적 약자를 위해 뛰었던 열혈 청년",
      description: "고등학생 시절부터 87년 6월 항쟁 등 민주화를 겪으면서 사회적 불합리에 대한 문제의식과 해결방법 등을 고민하며 대학에서 본격적으로 사회적 약자를 대변하기 위해 노력했다. 성균관대 총학생회장, 서울 북부지구 총학생회연합 의장을 역임했고, 만 29세라는 젊은 나이로 강북구(을) 국회의원 선거에 출마해 13.3%를 득표하며 파란을 일으켰다. 2000년에는 문화일보에서 선정한 '차세대 리더 100린'에 선정되기도 하는 등 리더로서의 자질을 일찌감치 보였다.",
      image: historyImages[1],
    },
    {
      title: "세 번의 옥고, \n그리고 정치의 길",
      description: "사회적 약자와 일하는 사람들을 대변할 수 있는 정당이 필요하다는 판단아래 함계 고난의 길을 걸어온 사람들과 민주노동당을 창당했다. 창당 직후 출마한 국회의원 선거에서 당 출마자 중 서울지역 최고 득표율을 달성하며 파란을 일으켰고, 지금의 최고위원에 해당하는 전국집행위원에 선출되었다. 정당의 고위직이었지만 언제나 현장에서 사회적 약자들과 함께 했었고, 이런 활동 중 '대우자동차 정리해고 반대 전국민중대회'에 참여했다 세 번째 옥고를 치렀다. 사회적 약자들을 대변하고 함께하다 세 번이나 옥고를 치렀지만 정치는 더렵고 힘든 사람을 대변할 수 잇어야 한다는 신념으로 언제나 실천적 대안을 모색했다.",
      image: historyImages[2],
    },
    {
      title: "합리적 진보의 길,\n민주당 대변인 역사를 쓰다.",
      description: "진보정당의 부대표까지 역임했지만, 2011년 국민에 대한 '공감'보다 '자기주장'이 강했던 진보정당의 한계를 깨고 국민 속으로 들어가기 위해, '혁신과 통합' 상임운영위원, '시민통합당' 지도위원으로서 민주통합당 창당에 함께 했다. 이루 쟁쟁한 국회의원들 사이에서 당 대변인으로 2년여를 활동했다. 대표가 8번이나 바뀌었지만 관례를 깨고 '민주당 최장수 대변인'이 될 수 있었던 것은 날카로운 분석과 해박한 지식, 그리고 무엇보다 '공감' 능력 덕분이었다.",
      image: historyImages[3],
    },
    {
      title: "강북 발전의 길. 교육과 \n공동체 복원에서 답을 찾다",
      description: "국민의 삶은 어려워지고 갈등은 심해져 법죄로까지 커지는 상황을 강북지역에서라도 타계해 보고자 2011년 (사)강북마을학교를 설립했다. 도서관 역할과 함께 각종 체럼 및 멘토-멘티 프로그램 등을 운영하며, 아이들과 학부모들에게 대안 교육의 창을 열었고, 지역 사랑방으로써 주민들의 어려움을 나누는 소통의 장을 만들었다.",
      image: historyImages[4],
    },
  ];
  return (
    <>
      {historyItems.map((item, index) => {
        const isReversed = (index + 1) % 2 === 0;
        
        return (
          <HistoryItem
            key={index}
            id={index === 0 ? "history" : undefined}
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
