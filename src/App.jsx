import React, { useEffect, useMemo, useState } from "react";
import MenuSection from "./components/menu/MenuSection";
import CookieBanner from "./components/CookieBanner";
import WhatsAppFloat from "./components/What'sAppFloat";
import { Routes, Route } from "react-router-dom";
import ValentinesBooking from "./pages/ValentinesBooking";


const BUSINESS_EMAIL = "orders@nellyangepubandgrill.com";
const WHATSAPP_NUMBER = "233537965155"; // change if different (no + sign)

export default function App() {
  // ---- Preloader (keeps your existing behavior) ----
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

  // ---- Navbar toggle (React-safe; removes mobile crash) ----
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("nav-active", navOpen);

    // close on ESC
    const onKeyDown = (e) => {
      if (e.key === "Escape") setNavOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    // close when resizing to desktop
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

    // basic validation
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
    <>
      {/* COOKIE CONSENT */}
      <CookieBanner />

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
          {/* LOGO (BIGGER & CLEAN) */}
          <a href="#home" className="header-logo" aria-label="Go to home">
            <img src="/assets/images/logo01.jpg" alt="Original BlueGate" className="logo-img" />
          </a>

          {/* DESKTOP NAV */}
          <nav className="navbar-desktop" aria-label="Primary">
            <a href="#home" className="navlink">
              Home
            </a>
            <a href="#menu" className="navlink">
              Grills & Sizzlers
            </a>
            <a href="#about" className="navlink">
              Today's Special
            </a>
            <a href="#events" className="navlink">
              Jazz & Afrobeats 
            </a>
            <a href="#menu" className="navlink">
              Menu
            </a>
          </nav>

          {/* CTA (Desktop) */}
          <a href="#reservation" className="btn btn-secondary header-cta">
            <span className="text text-1">Find A Table</span>
            <span className="text text-2" aria-hidden="true">
              Find A Table
            </span>
          </a>

          {/* MOBILE MENU BUTTON */}
          <button
            className="nav-open-btn"
            aria-label="open menu"
            type="button"
            onClick={() => setNavOpen(true)}
          >
            <span className="line line-1"></span>
            <span className="line line-2"></span>
            <span className="line line-3"></span>
          </button>
        </div>

        {/* MOBILE DRAWER */}
        <div className={`mobile-drawer ${navOpen ? "active" : ""}`} aria-hidden={!navOpen}>
          <div className="mobile-drawer-head">
            <img src="/assets/images/NellyLogo.png" alt="Original BlueGate" className="drawer-logo" />
            <button
              className="drawer-close"
              aria-label="close menu"
              type="button"
              onClick={() => setNavOpen(false)}
            >
              <ion-icon name="close-outline" aria-hidden="true"></ion-icon>
            </button>
          </div>

          <div className="mobile-drawer-links">
            <a href="#home" onClick={() => setNavOpen(false)}>
              Home
            </a>
            <a href="#menu" onClick={() => setNavOpen(false)}>
              Grills & Sizzlers
            </a>
            <a href="#about" onClick={() => setNavOpen(false)}>
              Today's Special
            </a>
            <a href="#events" onClick={() => setNavOpen(false)}>
              Jazz & Afrobeats Nights
            </a>
            <a href="#menu" onClick={() => setNavOpen(false)}>
              Menu
            </a>
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
              <span className="text text-2" aria-hidden="true">
                Book A Table
              </span>
            </a>
          </div>
        </div>

        {/* OVERLAY */}
        <div className={`drawer-overlay ${navOpen ? "active" : ""}`} onClick={() => setNavOpen(false)} />
      </header>

      <main>
        <article>
          {/* HERO (unchanged from your version; keep your slider JS if you want) */}
          <section className="hero text-center" aria-label="home" id="home">
            <ul className="hero-slider" data-hero-slider>
              <li className="slider-item active" data-hero-slider-item>
                <div className="slider-bg">
                  <img src="/assets/images/hero-slider-1.jpg" width="1880" height="950" alt="" className="img-cover" />
                </div>

                <p className="label-2 section-subtitle slider-reveal">Charcoal Grill Sizzlers</p>

                <h1 className="display-1 hero-title slider-reveal">
                  For the love of <br />
                  delicious food
                </h1>

                <p className="body-2 hero-text slider-reveal">
                  Come with family & feel the joy of mouthwatering food
                </p>

                <a href="#menu" className="btn btn-primary slider-reveal">
                  <span className="text text-1">View Our Menu</span>
                  <span className="text text-2" aria-hidden="true">
                    View Our Menu
                  </span>
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

                <p className="body-2 hero-text slider-reveal">
                  Come with family & feel the joy of mouthwatering food
                </p>

                <a href="#menu" className="btn btn-primary slider-reveal">
                  <span className="text text-1">View Our Menu</span>
                  <span className="text text-2" aria-hidden="true">
                    View Our Menu
                  </span>
                </a>
              </li>

              <li className="slider-item" data-hero-slider-item>
                <div className="slider-bg">
                  <img src="/assets/images/hero-slider-1.jpg" width="1880" height="950" alt="" className="img-cover" />
                </div>

               <p className="label-2 section-subtitle slider-reveal">
  Valentine’s Day Special
</p>

<h1 className="display-1 hero-title slider-reveal">
  Celebrate Love at <br />
  Original Blue Gate
</h1>

<p className="body-2 hero-text slider-reveal">
  Join us this Valentine’s Day for an unforgettable evening of great food,
  smooth jazz & afrobeats, romantic ambiance, and special couple packages.
  Limited tables available.
</p>

<a href="/valentines-booking" className="btn btn-primary slider-reveal">
  <span className="text text-1">Reserve for Valentine’s Day</span>
  <span className="text text-2" aria-hidden="true">
    Reserve for Valentine’s Day
  </span>
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

          {/* MENU (UPDATED CARDS WITH IMAGES) */}
          <MenuSection />

          {/* ... keep your other sections as they are ... */}

          {/* RESERVATION (UPDATED - SENDS EMAIL) */}
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
                      <input
                        type="date"
                        name="date"
                        className="input-field"
                        value={booking.date}
                        onChange={onBookingChange}
                      />
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

                  {bookingStatus.text ? (
                    <div className={`form-alert ${bookingStatus.type}`}>{bookingStatus.text}</div>
                  ) : null}

                  <button type="submit" className="btn btn-secondary" disabled={bookingLoading}>
                    <span className="text text-1">{bookingLoading ? "Sending..." : "Book A Table"}</span>
                    <span className="text text-2" aria-hidden="true">
                      {bookingLoading ? "Sending..." : "Book A Table"}
                    </span>
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

          {/* keep your rest... */}
        </article>
      </main>

      {/* FOOTER (keep yours) */}
      <footer className="footer section has-bg-image text-center" style={{ backgroundImage: "url('/assets/images/footer-bg.jpg')" }}>
        <div className="container">
          <div className="footer-top grid-list">
            <div className="footer-brand has-before has-after">
              <address className="body-4">Osu, Mission Street, Accra-Ghana</address>

              <a href={`mailto:${BUSINESS_EMAIL}`} className="body-4 contact-link">
                {BUSINESS_EMAIL}
              </a>

              <a href="tel:+233537965155" className="body-4 contact-link">
                Booking Request : +233 53 796 5155
              </a>

              <p className="body-4">Open : 09:00 am - Midnight</p>

              <div className="wrapper">
                <div className="separator"></div>
                <div className="separator"></div>
                <div className="separator"></div>
              </div>

              <p className="title-1">Get News &amp; Offers</p>

              <p className="label-1">
                Buy and &amp; Get <span className="span">25% Off.</span> with Mastercard
              </p>

              <form action="" className="input-wrapper">
                <div className="icon-wrapper">
                  <ion-icon name="mail-outline" aria-hidden="true"></ion-icon>
                  <input type="email" name="email_address" placeholder="Your email" autoComplete="off" className="input-field" />
                </div>

                <button type="submit" className="btn btn-secondary">
                  <span className="text text-1">Subscribe</span>
                  <span className="text text-2" aria-hidden="true">
                    Subscribe
                  </span>
                </button>
              </form>
            </div>

            <ul className="footer-list">
              <li>
                <a href="#home" className="label-2 footer-link hover-underline">
                  Home
                </a>
              </li>
              <li>
                <a href="#menu" className="label-2 footer-link hover-underline">
                  Menus
                </a>
              </li>
              <li>
                <a href="#about" className="label-2 footer-link hover-underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#events" className="label-2 footer-link hover-underline">
                  Events
                </a>
              </li>
              <li>
                <a href="#reservation" className="label-2 footer-link hover-underline">
                  Contact
                </a>
              </li>
            </ul>

            <ul className="footer-list">
              <li>
                <a href="#" className="label-2 footer-link hover-underline">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="label-2 footer-link hover-underline">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="label-2 footer-link hover-underline">
                  X
                </a>
              </li>
              <li>
                <a href="#" className="label-2 footer-link hover-underline">
                  Tiktok
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Osu+Mission+Street+Accra+Ghana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label-2 footer-link hover-underline"
                >
                  Google Map
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-bottom">
            <p className="copyright">&copy; 2026 Nelly Ange Original Blue Gate Restaurant. All Rights Reserved</p>
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
