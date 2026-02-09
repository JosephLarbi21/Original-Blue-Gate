import React, { useEffect, useState } from "react";
import MenuSection from "./components/menu/MenuSection";
import WhatsAppFloat from "./components/What'sAppFloat";

const BUSINESS_EMAIL = "orders@nellyangepubandgrill.com";
const WHATSAPP_NUMBER = "233537965155"; // change if different (no + sign)

export default function App() {
  // ---- Preloader ----
  useEffect(() => {
    const preloader = document.querySelector("[data-preaload]");
    const runPreload = () => {
      if (!preloader) return;
      preloader.classList.add("loaded");
      document.body.classList.add("loaded");
    };

    if (document.readyState === "complete") runPreload();
    else window.addEventListener("load", runPreload, { once: true });
  }, []);

  // ---- Navbar toggle ----
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("nav-active", navOpen);

    const onKeyDown = (e) => {
      if (e.key === "Escape") setNavOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    const onResize = () => {
      if (window.innerWidth >= 1200) setNavOpen(false);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [navOpen]);

  // ---- Header active & back-to-top ----
  useEffect(() => {
    const header = document.querySelector("[data-header]");
    const backTopBtn = document.querySelector("[data-back-top-btn]");
    let lastScrollPos = 0;

    const hideHeader = () => {
      if (!header) return;
      const isScrollBottom = lastScrollPos < window.scrollY;
      if (isScrollBottom) header.classList.add("hide");
      else header.classList.remove("hide");
      lastScrollPos = window.scrollY;
    };

    const onScroll = () => {
      if (!header || !backTopBtn) return;
      if (window.scrollY >= 50) {
        header.classList.add("active");
        backTopBtn.classList.add("active");
        hideHeader();
      } else {
        header.classList.remove("active");
        backTopBtn.classList.remove("active");
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ---- Reservation form (sends email via /api/reservation) ----
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
      setBookingStatus({ type: "error", text: "Please enter your name, phone number and date." });
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

      setBookingStatus({ type: "success", text: "Booking sent successfully. We will contact you shortly." });

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
    <>
      {/* WHATSAPP FLOAT */}
      <WhatsAppFloat phone={WHATSAPP_NUMBER} />

      {/* PRELOADER */}
      <div className="preload" data-preaload>
        <div className="circle"></div>
        <p className="text">Original Blue Gate</p>
      </div>

      {/* TOP BAR */}
      <div className="topbar">
        <div className="container">
          <address className="topbar-item">
            <div className="icon">
              <ion-icon name="location-outline" aria-hidden="true"></ion-icon>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Osu+Mission+Street+Accra+Ghana"
              target="_blank"
              rel="noopener noreferrer"
              className="span"
            >
              Osu, Mission Street, Accra-Ghana
            </a>
          </address>

          <div className="separator"></div>

          <div className="topbar-item item-2">
            <div className="icon">
              <ion-icon name="time-outline" aria-hidden="true"></ion-icon>
            </div>
            <span className="span">Daily : 9.30 am - Midnight</span>
          </div>

          <a href="tel:+233537965155" className="topbar-item link">
            <div className="icon">
              <ion-icon name="call-outline" aria-hidden="true"></ion-icon>
            </div>
            <span className="span">+233 53 796 5155</span>
          </a>

          <div className="separator"></div>

          <a href={`mailto:${BUSINESS_EMAIL}`} className="topbar-item link">
            <div className="icon">
              <ion-icon name="mail-outline" aria-hidden="true"></ion-icon>
            </div>
            <span className="span">{BUSINESS_EMAIL}</span>
          </a>
        </div>
      </div>

      {/* HEADER */}
      <header className="header" data-header>
        <div className="container">
          <a href="#home" className="header-logo" aria-label="Go to home">
            <img src="/assets/images/logo01.jpg" alt="Original BlueGate" className="logo-img" />
          </a>

          {/* DESKTOP NAV */}
          <nav className="navbar-desktop" aria-label="Primary">
            <a href="#home" className="navlink">Home</a>
            <a href="#grills" className="navlink">Grills & Sizzlers</a>
            <a href="#special" className="navlink">Today's Special</a>
            <a href="#jazz" className="navlink">Jazz & Afrobeats</a>
            <a href="#menu" className="navlink">Menu</a>
          </nav>

          <a href="#reservation" className="btn btn-secondary header-cta">
            <span className="text text-1">Find A Table</span>
            <span className="text text-2" aria-hidden="true">Find A Table</span>
          </a>

          <button className="nav-open-btn" aria-label="open menu" type="button" onClick={() => setNavOpen(true)}>
            <span className="line line-1"></span>
            <span className="line line-2"></span>
            <span className="line line-3"></span>
          </button>
        </div>

        {/* MOBILE DRAWER */}
        <div className={`mobile-drawer ${navOpen ? "active" : ""}`} aria-hidden={!navOpen}>
          <div className="mobile-drawer-head">
            <img src="/assets/images/logo01.jpg" alt="Original BlueGate" className="drawer-logo" />
            <button className="drawer-close" aria-label="close menu" type="button" onClick={() => setNavOpen(false)}>
              <ion-icon name="close-outline" aria-hidden="true"></ion-icon>
            </button>
          </div>

          <div className="mobile-drawer-links">
            <a href="#home" onClick={() => setNavOpen(false)}>Home</a>
            <a href="#grills" onClick={() => setNavOpen(false)}>Grills & Sizzlers</a>
            <a href="#special" onClick={() => setNavOpen(false)}>Today's Special</a>
            <a href="#jazz" onClick={() => setNavOpen(false)}>Jazz & Afrobeats</a>
            <a href="#menu" onClick={() => setNavOpen(false)}>Menu</a>
          </div>

          <div className="mobile-drawer-info">
            <p className="drawer-title">Visit Us</p>
            <p>Osu, Mission Street, Accra-Ghana</p>
            <p>Open: 9.30 am - Midnight</p>
            <a href={`mailto:${BUSINESS_EMAIL}`}>{BUSINESS_EMAIL}</a>

            <p className="drawer-title">Booking</p>
            <a href="tel:+233537965155">+233 53 796 5155</a>

            <a href="#reservation" className="btn btn-secondary drawer-cta" onClick={() => setNavOpen(false)}>
              <span className="text text-1">Book A Table</span>
              <span className="text text-2" aria-hidden="true">Book A Table</span>
            </a>
          </div>
        </div>

        <div className={`drawer-overlay ${navOpen ? "active" : ""}`} onClick={() => setNavOpen(false)} />
      </header>

      <main>
        <article>
          {/* HERO */}
          <section className="hero text-center" aria-label="home" id="home">
            <ul className="hero-slider" data-hero-slider>
              <li className="slider-item active" data-hero-slider-item>
                <div className="slider-bg">
                  <img src="/assets/images/hero-slider-1.jpg" width="1880" height="950" alt="" className="img-cover" />
                </div>

                <p className="label-2 section-subtitle slider-reveal">Charcoal Grill Sizzlers</p>

                <h1 className="display-1 hero-title slider-reveal">
                  Some 30 years of mouthwatering grills have <br />
                  become our speciality
                </h1>

                <p className="body-2 hero-text slider-reveal">order now come dine with family and friends</p>

                <a href="#menu" className="btn btn-primary slider-reveal">
                  <span className="text text-1">View Our Menu</span>
                  <span className="text text-2" aria-hidden="true">View Our Menu</span>
                </a>
              </li>

              <li className="slider-item" data-hero-slider-item>
                <div className="slider-bg">
                  <img src="/assets/images/hero-slider-2.jpg" width="1880" height="950" alt="" className="img-cover" />
                </div>

                <p className="label-2 section-subtitle slider-reveal">Delightful experience</p>

                <h1 className="display-1 hero-title slider-reveal">
                  Flavors Inspired by <br />
                  the Seasons
                </h1>

                <p className="body-2 hero-text slider-reveal">Come with family & feel the joy of mouthwatering food</p>

                <a href="#menu" className="btn btn-primary slider-reveal">
                  <span className="text text-1">View Our Menu</span>
                  <span className="text text-2" aria-hidden="true">View Our Menu</span>
                </a>
              </li>

              <li className="slider-item" data-hero-slider-item>
                <div className="slider-bg">
                  <img src="/assets/images/hero-slider-1.jpg" width="1880" height="950" alt="" className="img-cover" />
                </div>

                <p className="label-2 section-subtitle slider-reveal">Valentine’s Day Special</p>

                <h1 className="display-1 hero-title slider-reveal">
                  Celebrate Love at <br />
                  Original Blue Gate
                </h1>

                <p className="body-2 hero-text slider-reveal">
                  Join us this Valentine’s Day for an unforgettable evening of great food, smooth jazz & afrobeats,
                  romantic ambiance, and special couple packages. Limited tables available.
                </p>

                <a href="#reservation" className="btn btn-primary slider-reveal">
                  <span className="text text-1">Reserve for Valentine’s Day</span>
                  <span className="text text-2" aria-hidden="true">Reserve for Valentine’s Day</span>
                </a>
              </li>
            </ul>

            <button className="slider-btn prev" aria-label="slide to previous" data-prev-btn>
              <ion-icon name="chevron-back"></ion-icon>
            </button>

            <button className="slider-btn next" aria-label="slide to next" data-next-btn>
              <ion-icon name="chevron-forward"></ion-icon>
            </button>

            <a href="#reservation" className="hero-btn has-after">
              <img src="/assets/images/hero-icon.png" width="48" height="48" alt="booking icon" />
              <span className="label-2 text-center span">Book A Table</span>
            </a>
          </section>

          {/* GRILLS & SIZZLERS */}
          <GrillsSizzlersSection />

          {/* TODAY'S SPECIAL */}
          <TodaysSpecialSection />

          {/* JAZZ & AFROBEATS */}
          <JazzAfrobeatsSection />

          {/* MENU */}
          <MenuSection />

          {/* RESERVATION */}
          <section className="reservation" id="reservation">
            <div className="container">
              <div className="form reservation-form bg-black-10">
                <form className="form-left" onSubmit={submitBooking}>
                  <h2 className="headline-1 text-center">Online Reservation</h2>

                  <p className="form-text text-center">
                    Booking request{" "}
                    <a href="tel:+233537965155" className="link">
                      +233 53 796 5155
                    </a>{" "}
                    or fill out the order form
                  </p>

                  <div className="input-wrapper">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      autoComplete="off"
                      className="input-field"
                      value={booking.name}
                      onChange={onBookingChange}
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      autoComplete="off"
                      className="input-field"
                      value={booking.phone}
                      onChange={onBookingChange}
                    />
                  </div>

                  <div className="input-wrapper">
                    <div className="icon-wrapper">
                      <ion-icon name="person-outline" aria-hidden="true"></ion-icon>
                      <select name="persons" className="input-field" value={booking.persons} onChange={onBookingChange}>
                        <option value="1-person">1 Person</option>
                        <option value="2-person">2 Person</option>
                        <option value="3-person">3 Person</option>
                        <option value="4-person">4 Person</option>
                        <option value="5-person">5 Person</option>
                        <option value="6-person">6 Person</option>
                        <option value="7-person">7 Person</option>
                      </select>
                      <ion-icon name="chevron-down" aria-hidden="true"></ion-icon>
                    </div>

                    <div className="icon-wrapper">
                      <ion-icon name="calendar-clear-outline" aria-hidden="true"></ion-icon>
                      <input type="date" name="date" className="input-field" value={booking.date} onChange={onBookingChange} />
                      <ion-icon name="chevron-down" aria-hidden="true"></ion-icon>
                    </div>

                    <div className="icon-wrapper">
                      <ion-icon name="time-outline" aria-hidden="true"></ion-icon>
                      <select name="time" className="input-field" value={booking.time} onChange={onBookingChange}>
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
                      <ion-icon name="chevron-down" aria-hidden="true"></ion-icon>
                    </div>
                  </div>

                  <textarea
                    name="message"
                    placeholder="Message"
                    autoComplete="off"
                    className="input-field"
                    value={booking.message}
                    onChange={onBookingChange}
                  ></textarea>

                  {bookingStatus.text ? <div className={`form-alert ${bookingStatus.type}`}>{bookingStatus.text}</div> : null}

                  <button type="submit" className="btn btn-secondary" disabled={bookingLoading}>
                    <span className="text text-1">{bookingLoading ? "Sending..." : "Book A Table"}</span>
                    <span className="text text-2" aria-hidden="true">{bookingLoading ? "Sending..." : "Book A Table"}</span>
                  </button>
                </form>

                <div className="form-right text-center" style={{ backgroundImage: "url('/assets/images/form-pattern.png')" }}>
                  <h2 className="headline-1 text-center">Contact Us</h2>

                  <p className="contact-label">Booking Request</p>

                  <a href="tel:+233537965155" className="body-1 contact-number hover-underline">
                    +233 53 796 5155
                  </a>

                  <div className="separator"></div>

                  <p className="contact-label">Location</p>

                  <address className="body-4">Osu, Mission Street, Accra-Ghana</address>

                  <p className="contact-label">Lunch Time</p>
                  <p className="body-4">
                    Monday to Sunday <br />
                    11.00 am - 2.30pm
                  </p>

                  <p className="contact-label">Dinner Time</p>
                  <p className="body-4">
                    Monday to Sunday <br />
                    05.00 pm - 10.00pm
                  </p>
                </div>
              </div>
            </div>
          </section>
        </article>
      </main>

      {/* FOOTER */}
      <footer className="footer-pro" aria-label="Footer">
        <div className="footer-pro__bg" />

        <div className="container footer-pro__container">
          <div className="footer-pro__top">
            <div className="footer-pro__brand">
              <a href="#home" className="footer-pro__logo" aria-label="Original Blue Gate Home">
                <img src="/assets/images/logo01.jpg" alt="Original Blue Gate" className="footer-pro__logo-img" loading="lazy" />
              </a>

              <p className="footer-pro__about">
                Great food, warm atmosphere, and unforgettable moments. Join us at Original Blue Gate for local & continental
                dishes, grills, cocktails, and live nights.
              </p>

              <div className="footer-pro__badges">
                <span className="footer-pro__badge">
                  <ion-icon name="time-outline" aria-hidden="true"></ion-icon>
                  Daily: 9:30am – Midnight
                </span>
                <span className="footer-pro__badge">
                  <ion-icon name="location-outline" aria-hidden="true"></ion-icon>
                  Osu, Mission Street • Accra
                </span>
              </div>
            </div>

            <div className="footer-pro__col">
              <h3 className="footer-pro__title">Quick Links</h3>
              <ul className="footer-pro__links">
                <li><a href="#home">Home</a></li>
                <li><a href="#grills">Grills & Sizzlers</a></li>
                <li><a href="#special">Today's Special</a></li>
                <li><a href="#jazz">Jazz & Afrobeats</a></li>
                <li><a href="#menu">Menu</a></li>
                <li><a href="#reservation">Reservations</a></li>
              </ul>
            </div>

            <div className="footer-pro__col">
              <h3 className="footer-pro__title">Contact</h3>

              <ul className="footer-pro__contact">
                <li>
                  <ion-icon name="call-outline" aria-hidden="true"></ion-icon>
                  <a href="tel:+233537965155">+233 53 796 5155</a>
                </li>
                <li>
                  <ion-icon name="mail-outline" aria-hidden="true"></ion-icon>
                  <a href={`mailto:${BUSINESS_EMAIL}`}>{BUSINESS_EMAIL}</a>
                </li>
                <li>
                  <ion-icon name="logo-whatsapp" aria-hidden="true"></ion-icon>
                  <a
                    href="https://wa.me/233561272734?text=Hello%20Original%20Blue%20Gate%2C%20I%20want%20to%20book%20a%20table%20or%20place%20an%20order."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp: +233 56 127 2734
                  </a>
                </li>
                <li>
                  <ion-icon name="map-outline" aria-hidden="true"></ion-icon>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Osu+Mission+Street+Accra+Ghana"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open in Google Maps
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-pro__col footer-pro__newsletter">
              <h3 className="footer-pro__title">News & Offers</h3>
              <p className="footer-pro__muted">Subscribe to get updates on events, specials & deals.</p>

              <form className="footer-pro__form" onSubmit={(e) => e.preventDefault()}>
                <div className="footer-pro__input">
                  <ion-icon name="mail-outline" aria-hidden="true"></ion-icon>
                  <input type="email" placeholder="Your email address" autoComplete="email" required />
                </div>

                <button className="footer-pro__btn" type="submit">Subscribe</button>
              </form>

              <div className="footer-pro__social">
                <a href="#" aria-label="Facebook" className="footer-pro__social-link">
                  <ion-icon name="logo-facebook" aria-hidden="true"></ion-icon>
                </a>
                <a href="#" aria-label="Instagram" className="footer-pro__social-link">
                  <ion-icon name="logo-instagram" aria-hidden="true"></ion-icon>
                </a>
                <a href="#" aria-label="X (Twitter)" className="footer-pro__social-link">
                  <ion-icon name="logo-twitter" aria-hidden="true"></ion-icon>
                </a>
                <a href="#" aria-label="TikTok" className="footer-pro__social-link">
                  <ion-icon name="logo-tiktok" aria-hidden="true"></ion-icon>
                </a>
              </div>
            </div>
          </div>

          <div className="footer-pro__bottom">
            <p className="footer-pro__copyright">
              &copy; {new Date().getFullYear()} Nelly Ange Original Blue Gate Restaurant. All Rights Reserved.
            </p>

            <div className="footer-pro__bottom-links">
              <a href="#reservation">Book a Table</a>
              <span className="footer-pro__dot">•</span>
              <a href="#menu">View Menu</a>
            </div>
          </div>
        </div>
      </footer>

      {/* BACK TO TOP */}
      <a href="#top" className="back-top-btn active" aria-label="back to top" data-back-top-btn>
        <ion-icon name="chevron-up" aria-hidden="true"></ion-icon>
      </a>
    </>
  );
}

/* ===================== SECTIONS ===================== */

function GrillsSizzlersSection() {
  return (
    <section className="section pro-section" id="grills" aria-label="Grills and Sizzlers">
      <div className="container">
        <p className="label-2 section-subtitle">Signature Flames</p>
        <h2 className="headline-1 section-title">Grills &amp; Sizzlers</h2>
        <p className="section-text">
          Charcoal-grilled favorites, juicy skewers and sizzling platters — prepared fresh and served hot.
        </p>

        <div className="pro-grid">
          <article className="pro-card">
            <div className="pro-card__img">
              <img src="/assets/images/hero-slider-1.jpg" alt="Charcoal grilled dishes" className="img-cover" />
            </div>
            <h3 className="title-2">Charcoal Grill</h3>
            <p className="body-4">
              Tilapia, chicken, beef and kebabs seasoned to perfection and grilled over open flame.
            </p>
          </article>

          <article className="pro-card">
            <div className="pro-card__img">
              <img src="/assets/images/menu-1.png" alt="Sizzling platter" className="img-cover" />
            </div>
            <h3 className="title-2">Sizzlers</h3>
            <p className="body-4">
              Sizzling platters served with rich sauces, grilled sides and that fresh-from-the-pan aroma.
            </p>
          </article>

          <article className="pro-card">
            <div className="pro-card__img">
              <img src="/assets/images/menu-2.png" alt="Sides and sauces" className="img-cover" />
            </div>
            <h3 className="title-2">Sides &amp; Sauces</h3>
            <p className="body-4">
              Banku, kenkey, fries, fried plantain, shito, pepper sauce and more to match your grill.
            </p>
          </article>
        </div>

        <div className="pro-cta">
          <a href="#reservation" className="btn btn-secondary">
            <span className="text text-1">Book a Table</span>
            <span className="text text-2" aria-hidden="true">Book a Table</span>
          </a>
          <a href="#menu" className="btn btn-primary">
            <span className="text text-1">View Menu</span>
            <span className="text text-2" aria-hidden="true">View Menu</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function TodaysSpecialSection() {
  return (
    <section className="section pro-section" id="special" aria-label="Today's Special">
      <div className="container pro-split">
        <div className="pro-split__text">
          <p className="label-2 section-subtitle">Chef’s Pick</p>
          <h2 className="headline-1 section-title">Today’s Special</h2>
          <p className="section-text">
            Limited dishes prepared fresh daily. Ask our team for today’s available specials.
          </p>

          <div className="pro-feature">
            <ion-icon name="sparkles-outline" aria-hidden="true"></ion-icon>
            <div>
              <h3 className="title-2">Freshly Prepared</h3>
              <p className="body-4">Cooked in small batches for maximum taste and quality.</p>
            </div>
          </div>

          <div className="pro-feature">
            <ion-icon name="restaurant-outline" aria-hidden="true"></ion-icon>
            <div>
              <h3 className="title-2">Local &amp; Continental</h3>
              <p className="body-4">A mix of Ghanaian favorites and international plates.</p>
            </div>
          </div>

          <div className="pro-feature">
            <ion-icon name="wine-outline" aria-hidden="true"></ion-icon>
            <div>
              <h3 className="title-2">Perfect Pairings</h3>
              <p className="body-4">Enjoy cocktails, wine or soft drinks to match your meal.</p>
            </div>
          </div>

          <div className="pro-cta">
            <a href="#reservation" className="btn btn-secondary">
              <span className="text text-1">Reserve Now</span>
              <span className="text text-2" aria-hidden="true">Reserve Now</span>
            </a>
          </div>
        </div>

        <div className="pro-split__media">
          <div className="pro-media">
            <img src="/assets/images/about-banner.jpg" alt="Special dish" className="img-cover" />
          </div>
          <div className="pro-media">
            <img src="/assets/images/about-abs-image.jpg" alt="Chef plating" className="img-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

function JazzAfrobeatsSection() {
  return (
    <section className="section pro-section" id="jazz" aria-label="Jazz and Afrobeats">
      <div className="container">
        <p className="label-2 section-subtitle">Live Nights</p>
        <h2 className="headline-1 section-title">Jazz &amp; Afrobeats</h2>
        <p className="section-text">
          Smooth jazz vibes, Afrobeats energy, cocktails and great food — the perfect night out in Osu.
        </p>

        <div className="pro-grid">
          <article className="pro-card">
            <div className="pro-card__img">
              <img src="/assets/images/event-1.jpg" alt="Live jazz night" className="img-cover" />
            </div>
            <h3 className="title-2">Live Jazz</h3>
            <p className="body-4">Relaxed lounge atmosphere with smooth performances.</p>
          </article>

          <article className="pro-card">
            <div className="pro-card__img">
              <img src="/assets/images/event-2.jpg" alt="Afrobeats night" className="img-cover" />
            </div>
            <h3 className="title-2">Afrobeats</h3>
            <p className="body-4">Dance-ready playlists and the best weekend vibe.</p>
          </article>

          <article className="pro-card">
            <div className="pro-card__img">
              <img src="/assets/images/event-3.jpg" alt="Cocktails and drinks" className="img-cover" />
            </div>
            <h3 className="title-2">Cocktails &amp; Drinks</h3>
            <p className="body-4">Signature cocktails, wine, spirits, and chilled beverages.</p>
          </article>
        </div>

        <div className="pro-cta">
          <a href="#reservation" className="btn btn-secondary">
            <span className="text text-1">Book for Event Night</span>
            <span className="text text-2" aria-hidden="true">Book for Event Night</span>
          </a>
        </div>
      </div>
    </section>
  );
}
