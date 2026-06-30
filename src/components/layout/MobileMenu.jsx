export default function MobileMenu({ open, onClose, links }) {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-all duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-[300px] max-w-[90vw] bg-[#0a1120] border-l border-white/[0.07] shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.07]">
          <div className="flex items-center gap-3">
            <img
              src="/assets/images/NellyLogo.png"
              alt="Nelly Ange"
              className="h-8 w-auto object-contain"
            />
            <div className="leading-tight">
              <p className="text-[10px] font-semibold tracking-[0.16em] text-brand-400 uppercase">
                Nelly Ange
              </p>
              <p className="text-[9px] text-white/40 tracking-widest uppercase">
                Pub & Grill
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition-all"
            aria-label="Close menu"
          >
            <ion-icon name="close-outline" style={{ fontSize: "18px" }} aria-hidden="true"></ion-icon>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-4 py-5">
          <p className="px-2 mb-3 text-[10px] font-semibold tracking-[0.15em] text-white/30 uppercase">
            Navigate
          </p>
          <ul className="space-y-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] font-medium text-white/70 hover:text-white hover:bg-white/[0.06] transition-all duration-150"
                >
                  <span className="h-1 w-1 rounded-full bg-brand-400/60 shrink-0" />
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Book CTA */}
          <a
            href="#reservation"
            onClick={onClose}
            className="mt-6 flex items-center justify-center gap-2 w-full rounded-xl bg-brand-500 px-4 py-3 text-[13px] font-bold text-[#07101f] shadow-[0_0_20px_rgba(251,191,36,0.2)] hover:bg-brand-400 transition-all active:scale-95"
          >
            <ion-icon name="calendar-outline" style={{ fontSize: "15px" }} aria-hidden="true"></ion-icon>
            Find a Table
          </a>
        </nav>

        {/* Footer contact */}
        <div className="px-5 py-5 border-t border-white/[0.07]">
          <p className="text-[10px] font-semibold tracking-[0.15em] text-white/30 uppercase mb-3">
            Contact Us
          </p>
          <div className="space-y-2.5 text-[13px]">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Osu+Mission+Street+Accra+Ghana"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 text-white/60 hover:text-white transition-colors"
            >
              <ion-icon name="location-outline" style={{ fontSize: "15px" }} aria-hidden="true"></ion-icon>
              <span>Osu, Mission Street, Accra-Ghana</span>
            </a>
            <a
              href="tel:+233537965155"
              className="flex items-center gap-2.5 text-white/60 hover:text-white transition-colors"
            >
              <ion-icon name="call-outline" style={{ fontSize: "15px" }} aria-hidden="true"></ion-icon>
              <span>+233 53 796 5155</span>
            </a>
            <a
              href="mailto:orders@nellyangepubandgrill.com"
              className="flex items-center gap-2.5 text-white/60 hover:text-white transition-colors"
            >
              <ion-icon name="mail-outline" style={{ fontSize: "15px" }} aria-hidden="true"></ion-icon>
              <span>orders@nellyangepubandgrill.com</span>
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
