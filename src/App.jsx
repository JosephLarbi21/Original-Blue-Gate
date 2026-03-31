import { useEffect, useState } from "react";
import MenuSection from "./components/menu/MenuSection";
import BackToTop from "./components/BackToTop";
import WhatsAppFloat from "./components/What'sAppFloat";
import StatusWidget from "./components/StatusWidget";


const BUSINESS_EMAIL = "orders@nellyangepubandgrill.com";
const WHATSAPP_NUMBER = "233537965155";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Grills", href: "#grills" },
  { label: "Special", href: "#special" },
  { label: "Events", href: "#jazz" },
  { label: "Menu", href: "#menu" },
  { label: "Reservation", href: "#reservation" },
];

export default function App() {
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    if (navOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [navOpen]);

  const [booking, setBooking] = useState({
    name: "",
    phone: "",
    persons: "2-person",
    date: "",
    time: "07:00pm",
    message: "",
  });

  const [bookingStatus, setBookingStatus] = useState({ type: "", text: "" });
  const [bookingLoading, setBookingLoading] = useState(false);

  const onBookingChange = (e) => {
    const { name, value } = e.target;
    setBooking((prev) => ({ ...prev, [name]: value }));
  };

  const submitBooking = async (e) => {
    e.preventDefault();
    setBookingStatus({ type: "", text: "" });

    if (!booking.name.trim() || !booking.phone.trim() || !booking.date) {
      setBookingStatus({
        type: "error",
        text: "Please enter your name, phone number and date.",
      });
      return;
    }

    setBookingLoading(true);

    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...booking,
          toEmail: BUSINESS_EMAIL,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to send booking.");

      setBookingStatus({
        type: "success",
        text: "Booking sent successfully. We will contact you shortly.",
      });

      setBooking({
        name: "",
        phone: "",
        persons: "2-person",
        date: "",
        time: "07:00pm",
        message: "",
      });
    } catch (err) {
      setBookingStatus({
        type: "error",
        text: err.message || "Something went wrong. Please try again.",
      });
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-neutral-950 text-white">
      <WhatsAppFloat phone={WHATSAPP_NUMBER} />
      <BackToTop />
      <StatusWidget/>

      <div className="fixed inset-x-0 top-0 z-[100]">
        <TopBar />

        <header className="border-b border-white/5 bg-neutral-950/70 backdrop-blur-2xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <a href="#home" className="flex min-w-0 items-center gap-3">
              <img
                src="/assets/images/logo01.jpg"
                alt="Original Blue Gate"
                className="h-11 w-11 rounded-full border border-amber-400/30 object-cover shadow-lg shadow-amber-500/10 sm:h-12 sm:w-12"
              />
              <div className="min-w-0">
                <p className="truncate text-[10px] uppercase tracking-[0.35em] text-amber-400 sm:text-xs">
                  NellyAnge Restaurant, Bar & Grill
                </p>
                <p className="truncate text-sm font-semibold text-white sm:text-base">
                  Original Blue Gate
                </p>
              </div>
            </a>

            <nav className="hidden items-center gap-8 lg:flex">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium tracking-wide text-white/75 transition hover:text-amber-400"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="hidden lg:block">
              <a
                href="#reservation"
                className="rounded-full border border-amber-400 bg-amber-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-amber-300"
              >
                Find a Table
              </a>
            </div>

            <button
              type="button"
              onClick={() => setNavOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-amber-400 hover:text-amber-400 lg:hidden"
              aria-label="Open menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 7h16M4 12h16M4 17h16"
                />
              </svg>
            </button>
          </div>

          <div
            className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-all duration-300 lg:hidden ${
              navOpen
                ? "pointer-events-auto opacity-100"
                : "pointer-events-none opacity-0"
            }`}
            onClick={() => setNavOpen(false)}
          />

          <aside
            className={`fixed right-0 top-0 z-50 flex h-screen w-[88%] max-w-sm flex-col border-l border-white/10 bg-neutral-950/95 shadow-2xl backdrop-blur-2xl transition-transform duration-300 ease-out lg:hidden ${
              navOpen ? "translate-x-0" : "translate-x-full"
            }`}
            aria-hidden={!navOpen}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
              <div className="flex min-w-0 items-center gap-3">
                <img
                  src="/assets/images/logo01.jpg"
                  alt="Original Blue Gate"
                  className="h-11 w-11 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate text-[10px] uppercase tracking-[0.35em] text-amber-400">
                    NellyAnge Restaurant, Bar & Grill
                  </p>
                  <p className="truncate text-sm font-semibold text-white">
                    Original Blue Gate
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setNavOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-amber-400 hover:text-amber-400"
                aria-label="Close menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-6">
              <div className="space-y-2">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setNavOpen(false)}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm font-medium text-white/85 transition hover:border-amber-400/30 hover:bg-white/[0.06] hover:text-amber-400"
                  >
                    <span>{link.label}</span>
                    <span className="text-white/30">→</span>
                  </a>
                ))}
              </div>

              <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.35em] text-amber-400">
                  Visit Us
                </p>

                <div className="mt-4 space-y-3 text-sm text-white/70">
                  <p>Osu, Mission Street, Accra-Ghana</p>
                  <p>Daily: 9:30 am - Midnight</p>

                  <a
                    href="tel:+233537965155"
                    className="block transition hover:text-amber-400"
                  >
                    +233 53 796 5155
                  </a>

                  <a
                    href={`mailto:${BUSINESS_EMAIL}`}
                    className="block break-all transition hover:text-amber-400"
                  >
                    {BUSINESS_EMAIL}
                  </a>
                </div>

                <a
                  href="#reservation"
                  onClick={() => setNavOpen(false)}
                  className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-amber-400 px-5 py-3.5 text-sm font-semibold text-black transition hover:bg-amber-300"
                >
                  Book a Table
                </a>
              </div>
            </div>
          </aside>
        </header>
      </div>

      <main className="pt-20 md:pt-[9.5rem]">
        <HeroSection />
        <GrillsSizzlersSection />
        <TodaysSpecialSection />
        <JazzAfrobeatsSection />

        <section
          id="menu"
          className="border-t border-white/5 bg-neutral-950 py-20 sm:py-24"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <p className="mb-3 text-sm uppercase tracking-[0.35em] text-amber-400">
                Our Selection
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Explore Our Menu
              </h2>
            </div>

            <MenuSection />
          </div>
        </section>

        <ReservationSection
          booking={booking}
          bookingStatus={bookingStatus}
          bookingLoading={bookingLoading}
          onBookingChange={onBookingChange}
          submitBooking={submitBooking}
        />
      </main>

      <Footer />
    </div>
  );
}

function TopBar() {
  return (
    <div className="hidden border-b border-white/5 bg-black/50 backdrop-blur-md md:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 text-sm text-white/65 sm:px-6 lg:px-8">
        <a
          href="https://www.google.com/maps/search/?api=1&query=Osu+Mission+Street+Accra+Ghana"
          target="_blank"
          rel="noopener noreferrer"
          className="truncate transition hover:text-amber-400"
        >
          Osu, Mission Street, Accra-Ghana
        </a>

        <div className="flex items-center gap-6">
          <span className="hidden lg:inline">Daily: 9:30 am - Midnight</span>
          <a
            href="tel:+233537965155"
            className="transition hover:text-amber-400"
          >
            +233 53 796 5155
          </a>
          <a
            href={`mailto:${BUSINESS_EMAIL}`}
            className="transition hover:text-amber-400"
          >
            {BUSINESS_EMAIL}
          </a>
        </div>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden border-b border-white/5"
    >
      <div className="absolute inset-0 -z-10">
       <video
  autoPlay
  muted
  loop
  playsInline
  preload="metadata"
  className="h-full w-full object-cover"
  poster="/assets/images/hero-slider-1.jpg"
>
  <source src="/assets/videos/hero-video.mp4" type="video/mp4" />
</video>

        <img
          src="/assets/images/hero-slider-1.jpg"
          alt="Restaurant dining experience"
          className="h-full w-full object-cover md:hidden"
        />

        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.12),transparent_30%)]" />
      </div>

      <div className="relative mx-auto grid min-h-[92vh] max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 md:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-28">
        <div className="max-w-2xl">
          <div className="inline-flex items-center rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.3em] text-amber-300">
            Premium Dining Experience
          </div>

          <h1 className="mt-6 text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-7xl">
            Join us for Tilapia, Charcoal Grill sillzlers & sumptuous food  in Osu.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-white/75 sm:text-lg">
           Welcome to NellyAnge Restaurant, Bar & Grill-The Original Blue Gate- for some
           30 years we've been serving sumptuous African food.
           Now refined & gentrified to include a restaurant and cozy lounge with a warm
           ambience, Afro-Fusion cocktails and live entertainment- and with the capacity
           to serve 100 dinners/guest beautifully
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="#reservation"
              className="inline-flex items-center justify-center rounded-full bg-amber-400 px-6 py-3.5 text-sm font-semibold text-black transition hover:scale-[1.02] hover:bg-amber-300"
            >
              Book a Table
            </a>

            <a
              href="#menu"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-amber-400 hover:text-amber-400"
            >
              Explore Menu
            </a>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
              <p className="text-2xl font-bold text-white">30+</p>
              <p className="mt-1 text-sm text-white/60">
                Years of grill excellence
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
              <p className="text-2xl font-bold text-white">Daily</p>
              <p className="mt-1 text-sm text-white/60">
                Food, drinks & live vibes
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
              <p className="text-2xl font-bold text-white">Osu</p>
              <p className="mt-1 text-sm text-white/60">Prime Accra location</p>
            </div>
          </div>
        </div>

        <div className="relative lg:justify-self-end">
          <div className="absolute -left-6 -top-6 hidden h-24 w-24 rounded-full border border-amber-400/30 bg-amber-400/10 blur-2xl lg:block" />
          <div className="absolute -bottom-8 -right-8 hidden h-28 w-28 rounded-full border border-white/10 bg-white/10 blur-2xl lg:block" />

          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl shadow-black/40 backdrop-blur-md">
            <img
              src="/assets/images/hero-slider-2.jpg"
              alt="Fine dining at Original Blue Gate"
              className="h-[340px] w-full object-cover sm:h-[460px] lg:h-[560px] lg:w-[470px]"
            />
          </div>

          <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/10 bg-black/60 p-4 backdrop-blur-md sm:bottom-6 sm:left-6 sm:right-6">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
              Signature Experience
            </p>
            <p className="mt-2 text-sm text-white/75">
              Great food, cocktails, smooth nights and a warm premium
              atmosphere.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function GrillsSizzlersSection() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");

  const items = [
    {
      title: "Grilled Specials",
      description: "Choose your preferred grilled option",
      image: "/assets/images/grills.jpeg",
      choices: [
        { name: "Tilapia", price: 120 },
        { name: "Chicken", price: 100 },
      ],
      extras: [
        { name: "Extra Pepper", price: 10 },
        { name: "Extra Fish", price: 40 },
      ],
    },
    {
      title: "Fufu with Soup",
      description: "Choose any local soup you prefer",
      image: "/assets/images/fufu.jpeg",
      choices: [
        { name: "Light Soup", price: 80 },
        { name: "Groundnut Soup", price: 85 },
        { name: "Palm Nut Soup", price: 90 },
      ],
      extras: [
        { name: "Extra Meat", price: 20 },
        { name: "Extra Fish", price: 25 },
      ],
    },
    {
      title: "Banku Meals",
      description: "Choose your preferred combination",
      image: "/assets/images/banku.jpg",
      choices: [
        { name: "Banku with Tilapia", price: 100 },
        { name: "Banku with Okro", price: 90 },
        { name: "Banku with Pepper & Fish", price: 95 },
      ],
      extras: [
        { name: "Extra Fish", price: 30 },
        { name: "Extra Pepper", price: 10 },
      ],
    },
  ];

  // 🔥 PRICE LOGIC
  const basePrice = selectedChoice?.price || 0;

  const extrasTotal = selectedExtras.reduce(
    (sum, extra) => sum + extra.price,
    0
  );

  const totalPrice = (basePrice + extrasTotal) * quantity;

  return (
    <section id="grills" className="bg-neutral-950 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="text-center mb-16">
          <p className="text-amber-400 uppercase tracking-[0.3em] text-sm mb-3">
            Premium Menu
          </p>
          <h2 className="text-4xl font-bold text-white">
            Signature Dishes
          </h2>
          <p className="text-white/60 mt-4 max-w-xl mx-auto">
            Experience authentic Ghanaian flavors crafted with passion.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedItem(item);
                setSelectedChoice(null);
                setSelectedExtras([]);
                setQuantity(1);
                setNote("");
              }}
              className="group cursor-pointer rounded-3xl overflow-hidden bg-white/5 border border-white/10 hover:border-amber-400/40 transition"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="text-white/60 mt-2 text-sm">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🔥 MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center p-4">

          <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-neutral-900">

            {/* CLOSE */}
            <button
              onClick={() => setSelectedItem(null)}
              className="sticky top-0 z-20 flex justify-end w-full p-4 bg-black/80"
            >
              ✕
            </button>

            {/* IMAGE */}
            <div className="h-64">
              <img
                src={selectedItem.image}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 text-white">
              <h3 className="text-2xl font-semibold">
                {selectedItem.title}
              </h3>

              <p className="text-white/60 mt-2">
                {selectedItem.description}
              </p>

              {/* CHOICES */}
              <div className="mt-6">
                <p className="text-sm text-white/60 mb-2">
                  Choose an option
                </p>

                {selectedItem.choices.map((choice, index) => (
                  <label
                    key={index}
                    className="flex justify-between bg-white/5 px-3 py-2 rounded-lg mb-2 cursor-pointer"
                  >
                    <div className="flex gap-2">
                      <input
                        type="radio"
                        name="choice"
                        onChange={() => setSelectedChoice(choice)}
                      />
                      {choice.name}
                    </div>
                    <span className="text-amber-400">
                      GH₵ {choice.price}
                    </span>
                  </label>
                ))}
              </div>

              {/* EXTRAS */}
              <div className="mt-6">
                <p className="text-sm text-white/60 mb-2">
                  Add Extras
                </p>

                {selectedItem.extras.map((extra, index) => (
                  <label
                    key={index}
                    className="flex justify-between bg-white/5 px-3 py-2 rounded-lg mb-2 cursor-pointer"
                  >
                    <div className="flex gap-2">
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedExtras([...selectedExtras, extra]);
                          } else {
                            setSelectedExtras(
                              selectedExtras.filter((e) => e !== extra)
                            );
                          }
                        }}
                      />
                      {extra.name}
                    </div>

                    <span className="text-amber-400">
                      + GH₵ {extra.price}
                    </span>
                  </label>
                ))}
              </div>

              {/* QUANTITY */}
              <div className="mt-6 flex justify-between items-center">
                <p className="text-sm text-white/60">Quantity</p>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 bg-white/10 rounded-full"
                  >
                    -
                  </button>

                  <span>{quantity}</span>

                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 bg-amber-400 text-black rounded-full"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* NOTE */}
              <textarea
                placeholder="Add a note..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full mt-4 p-3 rounded-lg bg-white/5"
              />

              {/* TOTAL */}
              <p className="text-2xl font-bold text-amber-400 mt-4">
                GH₵ {totalPrice}
              </p>

              {/* BUTTON */}
              <button
                disabled={!selectedChoice}
                className="w-full mt-4 bg-amber-400 text-black py-3 rounded-full disabled:opacity-50"
              >
                Add to Order • GH₵ {totalPrice}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}



function TodaysSpecialSection() {
  const features = [
    {
      title: "Freshly Prepared",
      text: "Cooked in small batches for maximum taste and quality.",
    },
    {
      title: "Local & Continental",
      text: "A mix of Ghanaian favorites and international plates.",
    },
    {
      title: "Perfect Pairings",
      text: "Enjoy cocktails, wine or soft drinks to match your meal.",
    },
  ];

  return (
    <section
      id="special"
      className="border-t border-white/5 bg-black py-20 sm:py-24"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <div>
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-amber-400">
            Chef’s Pick
          </p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Today’s Special
          </h2>
          <p className="mt-4 max-w-xl text-white/65">
            Limited dishes prepared fresh daily. Ask our team for today’s
            available specials.
          </p>

          <div className="mt-8 space-y-5">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
              >
                <h3 className="text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-white/65">{feature.text}</p>
              </div>
            ))}
          </div>

          <a
            href="#reservation"
            className="mt-8 inline-flex rounded-full bg-amber-400 px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-amber-300"
          >
            Reserve Now
          </a>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="overflow-hidden rounded-[1.75rem] border border-white/10">
            <img
              src="/assets/images/hero-slider-1.jpg"
              alt="Special dish"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="mt-10 overflow-hidden rounded-[1.75rem] border border-white/10">
            <img
              src="/assets/images/hero-slider-2.jpg"
              alt="Chef plating"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function JazzAfrobeatsSection() {
  const items = [
    {
      title: "Live Jazz",
      text: "Relaxed lounge atmosphere with smooth performances.",
      image: "/assets/images/jazz-night.jpg",
    },
    {
      title: "Afrobeats",
      text: "Dance-ready playlists and the best weekend vibe.",
      image: "/assets/images/afrobeat.png",
    },
    {
      title: "Cocktails & Drinks",
      text: "Signature cocktails, wine, spirits and chilled beverages.",
      image: "/assets/images/cocktail.jpg",
    },
  ];

  return (
    <section id="jazz" className="border-t border-white/5 bg-neutral-950 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-amber-400">
            Live Nights
          </p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Jazz & Afrobeats
          </h2>
          <p className="mt-4 text-white/65">
            Smooth jazz vibes, Afrobeats energy, cocktails and great food —
            the perfect night out in Osu.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.title}
              className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 transition duration-300 hover:-translate-y-1 hover:border-amber-400/40 hover:bg-white/[0.07]"
            >
              <div className="overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 leading-7 text-white/65">{item.text}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#reservation"
            className="inline-flex rounded-full bg-amber-400 px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-amber-300"
          >
            Book for Event Night
          </a>
        </div>
      </div>
    </section>
  );
}

function ReservationSection({
  booking,
  bookingStatus,
  bookingLoading,
  onBookingChange,
  submitBooking,
}) {
  return (
    <section
      id="reservation"
      className="border-t border-white/5 bg-black py-20 sm:py-24"
    >
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.4fr_0.9fr] lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-neutral-900 p-6 sm:p-8">
          <div className="mb-8">
            <p className="mb-3 text-sm uppercase tracking-[0.35em] text-amber-400">
              Reservation
            </p>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Online Reservation
            </h2>
            <p className="mt-3 text-white/65">
              Booking request{" "}
              <a
                href="tel:+233537965155"
                className="text-amber-400 hover:text-amber-300"
              >
                +233 53 796 5155
              </a>{" "}
              or fill out the form below.
            </p>
          </div>

          <form onSubmit={submitBooking} className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                autoComplete="off"
                value={booking.name}
                onChange={onBookingChange}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none transition placeholder:text-white/40 focus:border-amber-400"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                autoComplete="off"
                value={booking.phone}
                onChange={onBookingChange}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none transition placeholder:text-white/40 focus:border-amber-400"
              />
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              <select
                name="persons"
                value={booking.persons}
                onChange={onBookingChange}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none transition focus:border-amber-400"
              >
                <option value="1-person">1 Person</option>
                <option value="2-person">2 Person</option>
                <option value="3-person">3 Person</option>
                <option value="4-person">4 Person</option>
                <option value="5-person">5 Person</option>
                <option value="6-person">6 Person</option>
                <option value="7-person">7 Person</option>
              </select>

              <input
                type="date"
                name="date"
                value={booking.date}
                onChange={onBookingChange}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none transition focus:border-amber-400"
              />

              <select
                name="time"
                value={booking.time}
                onChange={onBookingChange}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none transition focus:border-amber-400"
              >
                <option value="08:00am">08 : 00 am</option>
                <option value="09:00am">09 : 00 am</option>
                <option value="10:00am">10 : 00 am</option>
                <option value="11:00am">11 : 00 am</option>
                <option value="12:00pm">12 : 00 pm</option>
                <option value="01:00pm">01 : 00 pm</option>
                <option value="02:00pm">02 : 00 pm</option>
                <option value="03:00pm">03 : 00 pm</option>
                <option value="04:00pm">04 : 00 pm</option>
                <option value="05:00pm">05 : 00 pm</option>
                <option value="06:00pm">06 : 00 pm</option>
                <option value="07:00pm">07 : 00 pm</option>
                <option value="08:00pm">08 : 00 pm</option>
                <option value="09:00pm">09 : 00 pm</option>
                <option value="10:00pm">10 : 00 pm</option>
              </select>
            </div>

            <textarea
              name="message"
              placeholder="Message"
              autoComplete="off"
              rows="5"
              value={booking.message}
              onChange={onBookingChange}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none transition placeholder:text-white/40 focus:border-amber-400"
            />

            {bookingStatus.text ? (
              <div
                className={`rounded-2xl px-4 py-3 text-sm ${
                  bookingStatus.type === "success"
                    ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                    : "border border-red-500/30 bg-red-500/10 text-red-300"
                }`}
              >
                {bookingStatus.text}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={bookingLoading}
              className="inline-flex rounded-full bg-amber-400 px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {bookingLoading ? "Sending..." : "Book A Table"}
            </button>
          </form>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-sm">
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-amber-400">
            Contact Us
          </p>
          <h3 className="text-3xl font-bold text-white">
            Visit Original Blue Gate
          </h3>

          <div className="mt-8 space-y-6 text-white/70">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-white/45">
                Booking Request
              </p>
              <a
                href="tel:+233537965155"
                className="mt-2 block text-lg font-semibold text-white hover:text-amber-400"
              >
                +233 53 796 5155
              </a>
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-white/45">
                Location
              </p>
              <p className="mt-2">Osu, Mission Street, Accra-Ghana</p>
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-white/45">
                Lunch Time
              </p>
              <p className="mt-2">Monday to Sunday</p>
              <p>11:00 am - 2:30 pm</p>
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-white/45">
                Dinner Time
              </p>
              <p className="mt-2">Monday to Sunday</p>
              <p>05:00 pm - 10:00 pm</p>
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-white/45">
                Email
              </p>
              <a
                href={`mailto:${BUSINESS_EMAIL}`}
                className="mt-2 block hover:text-amber-400"
              >
                {BUSINESS_EMAIL}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <img
                src="/assets/images/logo01.jpg"
                alt="Original Blue Gate"
                className="h-14 w-14 rounded-full object-cover"
              />
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-amber-400">
                  Nelly Ange
                </p>
                <p className="text-lg font-semibold text-white">
                  Original Blue Gate
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-xl leading-7 text-white/65">
              Great food, warm atmosphere, and unforgettable moments. Join us
              for local and continental dishes, grills, cocktails, and live
              nights.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
                Daily: 9:30am – Midnight
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
                Osu, Mission Street • Accra
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="mt-5 space-y-3 text-white/65">
              <li>
                <a href="#home" className="hover:text-amber-400">
                  Home
                </a>
              </li>
              <li>
                <a href="#grills" className="hover:text-amber-400">
                  Grills & Sizzlers
                </a>
              </li>
              <li>
                <a href="#special" className="hover:text-amber-400">
                  Today’s Special
                </a>
              </li>
              <li>
                <a href="#jazz" className="hover:text-amber-400">
                  Jazz & Afrobeats
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-amber-400">
                  Menu
                </a>
              </li>
              <li>
                <a href="#reservation" className="hover:text-amber-400">
                  Reservations
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">Contact</h3>
            <ul className="mt-5 space-y-3 text-white/65">
              <li>
                <a href="tel:+233537965155" className="hover:text-amber-400">
                  +233 53 796 5155
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BUSINESS_EMAIL}`}
                  className="hover:text-amber-400"
                >
                  {BUSINESS_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/233537965155?text=Hello%20Original%20Blue%20Gate%2C%20I%20want%20to%20book%20a%20table%20or%20place%20an%20order."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400"
                >
                  WhatsApp: +233 53 796 5155
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Osu+Mission+Street+Accra+Ghana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400"
                >
                  Open in Google Maps
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/5 pt-6 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} Nelly Ange Original Blue Gate
            Restaurant. All Rights Reserved.
          </p>
          <div className="flex items-center gap-3">
            <a href="#reservation" className="hover:text-amber-400">
              Book a Table
            </a>
            <span>•</span>
            <a href="#menu" className="hover:text-amber-400">
              View Menu
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}