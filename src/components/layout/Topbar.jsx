export default function Topbar() {
  return (
    <div className="hidden sm:block fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-black/30 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center gap-6 py-2 text-[13px] text-white/80">
          <a
            href="https://www.google.com/maps/search/?api=1&query=Osu+Mission+Street+Accra+Ghana"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 hover:text-white transition"
          >
            <ion-icon name="location-outline" aria-hidden="true"></ion-icon>
            <span>Osu, Mission Street, Accra-Ghana</span>
          </a>

          <span className="hidden md:inline-block h-1.5 w-1.5 rotate-45 border border-brand-400/80" />

          <div className="hidden md:flex items-center gap-2">
            <ion-icon name="time-outline" aria-hidden="true"></ion-icon>
            <span>Daily : 9.30 am - Midnight</span>
          </div>

          <div className="ml-auto flex items-center gap-6">
            <a
              href="tel:+233537965155"
              className="inline-flex items-center gap-2 hover:text-white transition"
            >
              <ion-icon name="call-outline" aria-hidden="true"></ion-icon>
              <span>+233 53 796 5155</span>
            </a>

            <a
              href="mailto:orders@nellyangepubandgrill.com"
              className="hidden lg:inline-flex items-center gap-2 hover:text-white transition"
            >
              <ion-icon name="mail-outline" aria-hidden="true"></ion-icon>
              <span>orders@nellyangepubandgrill.com</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
