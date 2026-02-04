import { useEffect, useMemo, useState } from "react";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const links = useMemo(
    () => [
      { href: "#home", label: "Home" },
      { href: "#menu", label: "Grills & Sizzlers" },
      { href: "#specials", label: "Today’s Special" },
      { href: "#african", label: "African Cuisine" },
      { href: "#cocktails", label: "Cocktails & Bar" },
      { href: "#events", label: "Jazz & Afrobeats Nights" },
    ],
    []
  );

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed left-0 w-full z-40 transition-all ${
        scrolled
          ? "top-0 bg-[#0b0f16]/80 backdrop-blur border-b border-white/10 py-3"
          : "top-0 sm:top-10 bg-transparent py-6"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <a href="#home" className="flex items-center">
            <img
              src="/assets/images/NellyLogo.png"
              alt="Original Blue Gate"
              className="h-11 w-auto object-contain"
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden xl:block ml-auto">
            <ul className="flex items-center gap-8 text-[14px] font-semibold text-white/85">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="relative py-2 hover:text-white transition after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-brand-400 after:transition-all hover:after:w-full"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA */}
          <a
            href="#reservation"
            className="hidden sm:inline-flex ml-auto xl:ml-6 items-center justify-center rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-[#07101f] hover:bg-brand-400 transition"
          >
            Find A Table
          </a>

          {/* Mobile open button */}
          <button
            onClick={() => setMenuOpen(true)}
            className="xl:hidden ml-2 grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white hover:bg-white/5"
            aria-label="Open menu"
          >
            <ion-icon name="menu-outline" aria-hidden="true"></ion-icon>
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={links} />
    </header>
  );
}
