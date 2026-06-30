import { useEffect, useMemo, useState } from "react";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const links = useMemo(
    () => [
      { href: "#home", label: "Home" },
      { href: "#menu", label: "Grills & Sizzlers" },
      { href: "#specials", label: "Today's Special" },
      { href: "#african", label: "African Cuisine" },
      { href: "#cocktails", label: "Cocktails & Bar" },
      { href: "#events", label: "Jazz & Afrobeats Nights" },
    ],
    []
  );

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <header
      className={`fixed left-0 w-full z-40 transition-all duration-500 ${
        scrolled
          ? "top-0 py-2 bg-[#07101f]/80 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_32px_rgba(0,0,0,0.5)]"
          : "top-0 sm:top-10 py-5 bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex items-center gap-4">

          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 shrink-0 group">
            <div className="relative">
              <img
                src="/assets/images/NellyLogo.png"
                alt="Nelly Ange"
                className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="hidden sm:block leading-tight">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-brand-400 uppercase">
                Nelly Ange
              </p>
              <p className="text-[10px] text-white/50 tracking-widest uppercase">
                Pub & Grill
              </p>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden xl:flex items-center ml-auto">
            <ul className="flex items-center gap-1">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="relative group inline-flex items-center px-3.5 py-2 text-[13px] font-medium text-white/70 rounded-lg hover:text-white hover:bg-white/[0.06] transition-all duration-200"
                  >
                    {l.label}
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] rounded-full bg-brand-400 group-hover:w-4 transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA */}
          <a
            href="#reservation"
            className="hidden sm:inline-flex ml-auto xl:ml-5 items-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 text-[13px] font-bold text-[#07101f] shadow-[0_0_20px_rgba(251,191,36,0.25)] hover:bg-brand-400 hover:shadow-[0_0_28px_rgba(251,191,36,0.4)] active:scale-95 transition-all duration-200"
          >
            <ion-icon name="calendar-outline" aria-hidden="true" style={{ fontSize: "15px" }}></ion-icon>
            Find a Table
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="xl:hidden ml-2 flex flex-col gap-[5px] items-center justify-center h-10 w-10 rounded-xl border border-white/10 hover:bg-white/5 hover:border-white/20 transition-all duration-200"
            aria-label="Open menu"
          >
            <span className="w-[18px] h-[1.5px] bg-white/80 rounded-full" />
            <span className="w-[13px] h-[1.5px] bg-white/50 rounded-full self-start ml-[5px]" />
            <span className="w-[18px] h-[1.5px] bg-white/80 rounded-full" />
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={links} />
    </header>
  );
}
