import Navigation from "@/components/Navigation";

const Guestbook = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <span className="text-section-number">Guestbook</span>
          <h1 className="text-hero-title text-4xl md:text-6xl mt-4 mb-12">방명록</h1>
          <p className="text-muted-foreground leading-relaxed text-lg">
            이 페이지에 방명록 내용이 들어갑니다.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Guestbook;
