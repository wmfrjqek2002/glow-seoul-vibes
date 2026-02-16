const FooterSection = () => {
  return (
    <footer className="h-screen snap-start py-20 px-6 md:px-12 lg:px-24 bg-black flex items-center">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          {/* Left side */}
          <div className="flex flex-col gap-6">
            <p className="text-white text-sm font-light">
              20, 21대 국회의원
            </p>
            <h2 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight">
              안녕하세요, 박용진입니다!
            </h2>
            <div className="flex flex-col gap-2 mt-4">
              <p className="text-white text-sm leading-relaxed">
                저는 더불어민주당 소속으로 강북을 20, 21대 국회의원을 역임했습니다.
              </p>
              <p className="text-white text-sm leading-relaxed">
                항상 시민들의 목소리에 귀기울여 살기 좋은 대한민국 만들겠습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
