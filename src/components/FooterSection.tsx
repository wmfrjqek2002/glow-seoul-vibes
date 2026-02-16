const FooterSection = () => {
  return (
    <footer className="py-20 px-6 md:px-12 lg:px-24 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display text-3xl text-foreground font-light mb-4">
              STUDIO MARU
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              공간의 본질을 이해하고, 브랜드의 이야기를 담아
              잊을 수 없는 경험을 설계합니다.
            </p>
          </div>

          <div className="md:text-right space-y-3">
            <p className="text-muted-foreground text-sm">
              서울시 강남구 논현로 123
            </p>
            <p className="text-muted-foreground text-sm">
              contact@studiomaru.kr
            </p>
            <p className="text-muted-foreground text-sm">
              02-1234-5678
            </p>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-xs">
            © 2025 Studio Maru. All rights reserved.
          </p>
          <div className="flex gap-8">
            <span className="text-muted-foreground text-xs hover:text-primary transition-colors cursor-pointer">
              Instagram
            </span>
            <span className="text-muted-foreground text-xs hover:text-primary transition-colors cursor-pointer">
              LinkedIn
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
