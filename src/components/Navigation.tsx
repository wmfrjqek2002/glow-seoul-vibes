import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";

const aboutSubmenus = [
  { label: "프로필", path: "/#education-career" },
  { label: "걸어온 길", path: "/#history" },
];

const navItems = [
  {
    label: "박용진은?",
    path: "/",
    submenus: aboutSubmenus,
  },
  { label: "비전과 목표", path: "/vision" },
  { label: "보도", path: "/press" },
  { label: "미디어", path: "/media" },
  { label: "방명록", path: "/guestbook" },
];

const isAboutActive = (pathname: string) => pathname === "/";

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-black/90 backdrop-blur-md" : "bg-black"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center px-6 md:px-12 py-6">
        <div className="flex items-center gap-8 md:gap-12">
          {navItems.map((item) => {
            const hasSubmenus = "submenus" in item && item.submenus?.length;
            const isActive = hasSubmenus
              ? isAboutActive(location.pathname)
              : location.pathname === item.path;

            if (hasSubmenus) {
              return (
                <div
                  key={item.path}
                  className="relative group"
                  onMouseEnter={() => setAboutOpen(true)}
                  onMouseLeave={() => setAboutOpen(false)}
                >
                  <Link
                    to={item.path}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/?reset=intro", { replace: false });
                    }}
                    className={`text-xs tracking-[0.15em] transition-colors ${
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                  <AnimatePresence>
                    {aboutOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-2"
                      >
                        <div className="bg-black/95 backdrop-blur-md border border-white/10 rounded-md py-2 min-w-[140px] shadow-xl">
                          {item.submenus!.map((sub) => (
                            <Link
                              key={sub.path}
                              to={sub.path}
                              className={`block px-4 py-2.5 text-xs tracking-[0.15em] transition-colors ${
                                location.hash === `#${sub.path.split("#")[1]}`
                                  ? "text-foreground bg-white/5"
                                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                              }`}
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`text-xs tracking-[0.15em] transition-colors ${
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
