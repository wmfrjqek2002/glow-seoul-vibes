import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube } from "lucide-react";

const navItems = [
  { label: "박용진은?", path: "/" },
  { label: "비전과 목표", path: "/vision" },
  { label: "보도", path: "/press" },
  { label: "미디어", path: "/media" },
  { label: "방명록", path: "/guestbook" },
];

const NavigationMenuSection = () => {
  return (
    <section className="h-screen snap-start bg-black flex flex-col items-center justify-center">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col items-center justify-center h-full">
        <nav className="flex flex-col items-center gap-8 md:gap-12 mb-16 md:mb-20">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="text-white text-lg md:text-xl tracking-[0.15em] transition-colors hover:text-primary/80"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        
        {/* Social Media Icons */}
        <div className="flex items-center gap-8 md:gap-12">
          <a
            href="https://www.instagram.com/hopeparkyongjin/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-primary/80 transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={32} strokeWidth={1.5} />
          </a>
          <a
            href="https://www.facebook.com/yongjin.bag"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-primary/80 transition-colors"
            aria-label="Facebook"
          >
            <Facebook size={32} strokeWidth={1.5} />
          </a>
          <a
            href="https://www.youtube.com/@hopeparkyongjin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-primary/80 transition-colors"
            aria-label="YouTube"
          >
            <Youtube size={32} strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default NavigationMenuSection;
