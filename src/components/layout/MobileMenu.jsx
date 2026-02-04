export default function MobileMenu({ open, onClose, links }) {
  return (
    <>
      {/* Overlay */}
      <button
        onClick={onClose}
        aria-label="Close menu overlay"
        className={`fixed inset-0 z-40 bg-black/70 transition-opacity ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Panel */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-[320px] max-w-[85vw] bg-white text-black shadow-2xl transition-transform ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-black/10">
          <p className="font-semibold tracking-wide">Menu</p>
          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full border border-black/20 hover:bg-black/5"
            aria-label="Close menu"
          >
            <ion-icon name="close-outline" aria-hidden="true"></ion-icon>
          </button>
        </div>

        <nav className="px-5 py-5">
          <ul className="space-y-2">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={onClose}
                  className="block rounded-xl px-3 py-2 text-[15px] font-medium hover:bg-black/5"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-2xl bg-black/5 p-4 text-sm">
            <p className="font-semibold mb-2">Visit Us</p>
            <p className="text-black/70">Osu, Mission Street, Accra-Ghana</p>
            <p className="mt-2 text-black/70">Open: 9.30 am - Midnight</p>

            <div className="mt-3 space-y-2">
              <a
                href="mailto:orders@nellyangepubandgrill.com"
                className="block font-medium text-brand-700 hover:underline"
              >
                orders@nellyangepubandgrill.com
              </a>

              <a
                href="tel:+233537965155"
                className="block font-semibold text-black hover:underline"
              >
                Booking: +233 53 796 5155
              </a>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}
