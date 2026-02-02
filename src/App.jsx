import MenuSection from "./components/menu/MenuSection";



export default function App() {
  return (
    <>
      {/* PRELOADER */}
      <div className="preload" data-preaload>
        <div className="circle"></div>
        <p className="text">Original BlueGate</p>
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

          <a href="mailto:orders@nellyangepubandgrill.com" className="topbar-item link">
            <div className="icon">
              <ion-icon name="mail-outline" aria-hidden="true"></ion-icon>
            </div>

            <span className="span">Orders@nellyangepubandgrill.com</span>
          </a>
        </div>
      </div>

      {/* HEADER */}
 

      <header className="header" data-header>
        <div className="container ">
    <a href="#home" className="header-logo" aria-label="Go to home">
      <img
        src="/assets/images/NellyLogo.png"   // <-- replace with your logo path
        alt="Original BlueGate"
        className="logo-img"
      />
    </a>

          <nav className="navbar" data-navbar>
            <button className="close-btn" aria-label="close menu" data-nav-toggler>
              <ion-icon name="close-outline" aria-hidden="true"></ion-icon>
            </button>

            <ul className="navbar-list">
              <li className="navbar-item">
                <a href="#home" className="navbar-link hover-underline">
                  <span>Home</span>
                </a>
              </li>

              <li className="navbar-item">
                <a href="#menu" className="navbar-link hover-underline">
                  <span>Menu</span>
                </a>
              </li>

              <li className="navbar-item">
                <a href="#about" className="navbar-link hover-underline">
                  <span>About Us</span>
                </a>
              </li>

              <li className="navbar-item">
                <a href="#events" className="navbar-link hover-underline">
                  <span>Events</span>
                </a>
              </li>

              <li className="navbar-item">
                <a href="#reservation" className="navbar-link hover-underline">
                  <span>Contact</span>
                </a>
              </li>
            </ul>

            <div className="text-center">
              <p className="navbar-title">Visit Us</p>
              <address>Osu, Mission Street, Accra-Ghana</address>
              <p>Open: 9.30 am - Midnight</p>
              <a href="mailto:nellyange20@gmail.com">orders@nellyangepubandgrill.com</a>
              <p>Booking Request</p>
              <a href="tel:+233537965155">+233 53 796 5155</a>
            </div>
          </nav>

          <a href="#reservation" className="btn btn-secondary">
            <span className="text text-1">Find A Table</span>
            <span className="text text-2" aria-hidden="true">
              Find A Table
            </span>
          </a>

          <button className="nav-open-btn" aria-label="open menu" data-nav-toggler>
            <span className="line line-1"></span>
            <span className="line line-2"></span>
            <span className="line line-3"></span>
          </button>

          <div className="overlay" data-overlay data-nav-toggler></div>
        </div>
      </header>

      <main>
        <article>
          {/* HERO */}
          <section className="hero text-center" aria-label="home" id="home">
            <ul className="hero-slider" data-hero-slider>
              <li className="slider-item active" data-hero-slider-item>
                <div className="slider-bg">
                  <img
                    src="/assets/images/hero-slider-1.jpg"
                    width="1880"
                    height="950"
                    alt=""
                    className="img-cover"
                  />
                </div>

                <p className="label-2 section-subtitle slider-reveal">Tradational & Hygine</p>

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
                  <img
                    src="/assets/images/hero-slider-2.jpg"
                    width="1880"
                    height="950"
                    alt=""
                    className="img-cover"
                  />
                </div>

                <p className="label-2 section-subtitle slider-reveal">delightful experience</p>

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
                  <img
                    src="/assets/images/hero-slider-1.jpg"
                    width="1880"
                    height="950"
                    alt=""
                    className="img-cover"
                  />
                </div>

                <p className="label-2 section-subtitle slider-reveal">amazing & delicious</p>

                <h1 className="display-1 hero-title slider-reveal">
                  Where every flavor <br />
                  tells a story
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

          {/* MENU */}
          <MenuSection />


          {/* SERVICE */}
          <section className="section service bg-black-10 text-center" aria-label="service">
            <div className="container">
              <p className="section-subtitle label-2">Flavors For Royalty</p>
              <h2 className="headline-1 section-title">We Offer Top Notch</h2>

              <p className="section-text">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum has been the
                industrys standard dummy text ever.
              </p>

              <ul className="grid-list">
                <li>
                  <div className="service-card">
                    <a href="#" className="has-before hover:shine">
                      <figure className="card-banner img-holder" style={{ "--width": 285, "--height": 336 }}>
                        <img
                          src="/assets/images/service-1.jpg"
                          width="285"
                          height="336"
                          loading="lazy"
                          alt="Breakfast"
                          className="img-cover"
                        />
                      </figure>
                    </a>

                    <div className="card-content">
                      <h3 className="title-4 card-title">
                        <a href="#">Grills & Sizzlers</a>
                      </h3>

                      <a href="#menu" className="btn-text hover-underline label-2">
                        View Menu
                      </a>
                    </div>
                  </div>
                </li>

                <li>
                  <div className="service-card">
                    <a href="#" className="has-before hover:shine">
                      <figure className="card-banner img-holder" style={{ "--width": 285, "--height": 336 }}>
                        <img
                          src="/assets/images/service-2.jpg"
                          width="285"
                          height="336"
                          loading="lazy"
                          alt="Appetizers"
                          className="img-cover"
                        />
                      </figure>
                    </a>

                    <div className="card-content">
                      <h3 className="title-4 card-title">
                        <a href="#">African Cuisine</a>
                      </h3>

                      <a href="#menu" className="btn-text hover-underline label-2">
                        View Menu
                      </a>
                    </div>
                  </div>
                </li>

                <li>
                  <div className="service-card">
                    <a href="#" className="has-before hover:shine">
                      <figure className="card-banner img-holder" style={{ "--width": 285, "--height": 336 }}>
                        <img
                          src="/assets/images/service-3.jpg"
                          width="285"
                          height="336"
                          loading="lazy"
                          alt="Drinks"
                          className="img-cover"
                        />
                      </figure>
                    </a>

                    <div className="card-content">
                      <h3 className="title-4 card-title">
                        <a href="#">Drinks</a>
                      </h3>

                      <a href="#menu" className="btn-text hover-underline label-2">
                        View Menu
                      </a>
                    </div>
                  </div>
                </li>
              </ul>

              <img
                src="/assets/images/shape-1.png"
                width="246"
                height="412"
                loading="lazy"
                alt="shape"
                className="shape shape-1 move-anim"
              />
              <img
                src="/assets/images/shape-2.png"
                width="343"
                height="345"
                loading="lazy"
                alt="shape"
                className="shape shape-2 move-anim"
              />
            </div>
          </section>

          {/* ABOUT */}
          <section className="section about text-center" aria-labelledby="about-label" id="about">
            <div className="container">
              <div className="about-content">
                <p className="label-2 section-subtitle" id="about-label">
                  Our Story
                </p>

                <h2 className="headline-1 section-title">Every Fla vor Tells a Story</h2>

                <p className="section-text">
                  Lorem Ipsum is simply dummy text of the printingand typesetting industry lorem Ipsum has been the
                  industrys standard dummy text ever since the when an unknown printer took a galley of type and
                  scrambled it to make a type specimen book It has survived not only five centuries, but also the leap
                  into.
                </p>

                <div className="contact-label">Book Through Call</div>

                <a href="tel:+233537965155" className="body-1 contact-number hover-underline">
                  +233 53 796 5155
                </a>

                <a href="#" className="btn btn-primary">
                  <span className="text text-1">Read More</span>
                  <span className="text text-2" aria-hidden="true">
                    Read More
                  </span>
                </a>
              </div>

              <figure className="about-banner">
                <img
                  src="/assets/images/hero-slider-1.jpg"
                  width="570"
                  height="570"
                  loading="lazy"
                  alt="about banner"
                  className="w-100"
                  data-parallax-item
                  data-parallax-speed="1"
                />

                <div className="abs-img abs-img-1 has-before" data-parallax-item data-parallax-speed="1.75">

                </div>

                <div className="abs-img abs-img-2 has-before">
                  <img src="/assets/images/badge-2.png" width="133" height="134" loading="lazy" alt="" />
                </div>
              </figure>

              <img src="/assets/images/shape-3.png" width="197" height="194" loading="lazy" alt="" className="shape" />
            </div>
          </section>

          {/* SPECIAL DISH */}
          <section className="special-dish text-center" aria-labelledby="dish-label">
            <div className="special-dish-banner">
              <img
                src="/assets/images/service-1.jpg"
                width="940"
                height="900"
                loading="lazy"
                alt="special dish"
                className="img-cover"
              />
            </div>

            <div className="special-dish-content bg-black-10">
              <div className="container">
                <img src="/assets/images/badge-1.png" width="28" height="41" loading="lazy" alt="badge" className="abs-img" />

                <p className="section-subtitle label-2">Special Dish</p>

                <h2 className="headline-1 section-title">Grills & Sizzlers</h2>

                <p className="section-text">
                  Lorem Ipsum is simply dummy text of the printingand typesetting industry lorem Ipsum has been the
                  industrys standard dummy text ever since the when an unknown printer took a galley of type.
                </p>

                <div className="wrapper">
                  <del className="del body-3">₵40.00</del>
                  <span className="span body-1">₵20.00</span>
                </div>

                <a href="#menu" className="btn btn-primary">
                  <span className="text text-1">View All Menu</span>
                  <span className="text text-2" aria-hidden="true">
                    View All Menu
                  </span>
                </a>
              </div>
            </div>

            <img src="/assets/images/shape-4.png" width="179" height="359" loading="lazy" alt="" className="shape shape-1" />
            <img src="/assets/images/shape-9.png" width="351" height="462" loading="lazy" alt="" className="shape shape-2" />
          </section>



          {/* TESTIMONIALS */}
          <section
            className="section testi text-center has-bg-image"
            style={{ backgroundImage: "url('/assets/images/hero-slider-1.jpg')" }}
            aria-label="testimonials"
            id="testimonial"
          >
            <div className="container">
              <div className="quote">”</div>

              <p className="headline-2 testi-text">
                I wanted to thank you for inviting me down for that amazing dinner the other night. The food was
                extraordinary.
              </p>

              <div className="wrapper">
                <div className="separator"></div>
                <div className="separator"></div>
                <div className="separator"></div>
              </div>

              <div className="profile">
                <img src="/assets/images/testi-avatar.jpg" width="100" height="100" loading="lazy" alt="Sam Jhonson" className="img" />
                <p className="label-2 profile-name">Sam Jhonson</p>
              </div>
            </div>
          </section>

          {/* RESERVATION */}
          <section className="reservation" id="reservation">
            <div className="container">
              <div className="form reservation-form bg-black-10">
                <form action="" className="form-left">
                  <h2 className="headline-1 text-center">Online Reservation</h2>

                  <p className="form-text text-center">
                    Booking request <a href="tel:+233537965155" className="link">+233 53 796 5155</a>
                    {" "}or fill out the order form
                  </p>

                  <div className="input-wrapper">
                    <input type="text" name="name" placeholder="Your Name" autoComplete="off" className="input-field" />
                    <input type="tel" name="phone" placeholder="Phone Number" autoComplete="off" className="input-field" />
                  </div>

                  <div className="input-wrapper">
                    <div className="icon-wrapper">
                      <ion-icon name="person-outline" aria-hidden="true"></ion-icon>

                      <select name="person" className="input-field">
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
                      <input type="date" name="reservation-date" className="input-field" />
                      <ion-icon name="chevron-down" aria-hidden="true"></ion-icon>
                    </div>

                    <div className="icon-wrapper">
                      <ion-icon name="time-outline" aria-hidden="true"></ion-icon>

                      <select name="time" className="input-field">
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

                  <textarea name="message" placeholder="Message" autoComplete="off" className="input-field"></textarea>

                  <button type="submit" className="btn btn-secondary">
                    <span className="text text-1">Book A Table</span>
                    <span className="text text-2" aria-hidden="true">Book A Table</span>
                  </button>
                </form>

                <div
                  className="form-right text-center"
                  style={{ backgroundImage: "url('/assets/images/form-pattern.png')" }}
                >
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

          {/* FEATURES */}
          <section className="section features text-center" aria-label="features" id="features">
            <div className="container">
              <p className="section-subtitle label-2">Why Choose Us</p>
              <h2 className="headline-1 section-title">Our Strength</h2>

              <ul className="grid-list">
                <li className="feature-item">
                  <div className="feature-card">
                    <div className="card-icon">
                      <img src="/assets/images/features-icon-1.png" width="100" height="80" loading="lazy" alt="icon" />
                    </div>

                    <h3 className="title-2 card-title">Hygienic Food</h3>
                    <p className="label-1 card-text">Lorem Ipsum is simply dummy printing and typesetting.</p>
                  </div>
                </li>

                <li className="feature-item">
                  <div className="feature-card">
                    <div className="card-icon">
                      <img src="/assets/images/features-icon-2.png" width="100" height="80" loading="lazy" alt="icon" />
                    </div>

                    <h3 className="title-2 card-title">Fresh Environment</h3>
                    <p className="label-1 card-text">Lorem Ipsum is simply dummy printing and typesetting.</p>
                  </div>
                </li>

                <li className="feature-item">
                  <div className="feature-card">
                    <div className="card-icon">
                      <img src="/assets/images/features-icon-3.png" width="100" height="80" loading="lazy" alt="icon" />
                    </div>

                    <h3 className="title-2 card-title">Skilled Chefs</h3>
                    <p className="label-1 card-text">Lorem Ipsum is simply dummy printing and typesetting.</p>
                  </div>
                </li>

                <li className="feature-item">
                  <div className="feature-card">
                    <div className="card-icon">
                      <img src="/assets/images/features-icon-4.png" width="100" height="80" loading="lazy" alt="icon" />
                    </div>

                    <h3 className="title-2 card-title">Event & Party</h3>
                    <p className="label-1 card-text">Lorem Ipsum is simply dummy printing and typesetting.</p>
                  </div>
                </li>
              </ul>

              <img src="/assets/images/shape-7.png" width="208" height="178" loading="lazy" alt="shape" className="shape shape-1" />
              <img src="/assets/images/shape-8.png" width="120" height="115" loading="lazy" alt="shape" className="shape shape-2" />
            </div>
          </section>

          {/* EVENT */}
          <section className="section event bg-black-10" aria-label="event" id="events">
            <div className="container">
              <p className="section-subtitle label-2 text-center">Recent Updates</p>
              <h2 className="section-title headline-1 text-center">Upcoming Event</h2>

              <ul className="grid-list">
                <li>
                  <div className="event-card has-before hover:shine">
                    <div className="card-banner img-holder" style={{ "--width": 350, "--height": 450 }}>
                      <img
                        src="/assets/images/event-1.jpg"
                        width="350"
                        height="450"
                        loading="lazy"
                        alt="Jazz And Afrobeats Night"
                        className="img-cover"
                      />

                      <time className="publish-date label-2" dateTime="2026-02-14">
                        14/02/2026
                      </time>
                    </div>

                    <div className="card-content">
                      <p className="section-subtitle label-2 text-center">Jazz And Afrobeats Night</p>
                      <h3 className="card-title title-2 text-center">Come With Family & Friends for quality experience</h3>
                    </div>
                  </div>
                </li>

                <li>
                  <div className="event-card has-before hover:shine">
                    <div className="card-banner img-holder" style={{ "--width": 350, "--height": 450 }}>
                      <img
                        src="/assets/images/event-2.jpg"
                        width="350"
                        height="450"
                        loading="lazy"
                        alt="Flavour so good you’ll try to eat with your eyes."
                        className="img-cover"
                      />

                      <time className="publish-date label-2" dateTime="2025-09-08">
                        08/09/2026
                      </time>
                    </div>

                    <div className="card-content">
                      <p className="section-subtitle label-2 text-center">Healthy Food</p>
                      <h3 className="card-title title-2 text-center">Flavour so good you’ll try to eat with your eyes.</h3>
                    </div>
                  </div>
                </li>

                <li>
                  <div className="event-card has-before hover:shine">
                    <div className="card-banner img-holder" style={{ "--width": 350, "--height": 450 }}>
                      <img
                        src="/assets/images/event-3.jpg"
                        width="350"
                        height="450"
                        loading="lazy"
                        alt="Flavour so good you’ll try to eat with your eyes."
                        className="img-cover"
                      />

                      <time className="publish-date label-2" dateTime="2025-09-03">
                        03/09/2026
                      </time>
                    </div>

                    <div className="card-content">
                      <p className="section-subtitle label-2 text-center">Recipie</p>
                      <h3 className="card-title title-2 text-center">Flavour so good you’ll try to eat with your eyes.</h3>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </section>
        </article>
      </main>

      {/* FOOTER */}
      <footer className="footer section has-bg-image text-center" style={{ backgroundImage: "url('/assets/images/footer-bg.jpg')" }}>
        <div className="container">
          <div className="footer-top grid-list">
            <div className="footer-brand has-before has-after">
              <address className="body-4">Osu, Mission Street, Accra-Ghana</address>

              <a href="mailto:orders@nellyangepubandgrill.com" className="body-4 contact-link">
                orders@nellyangepubandgrill.com
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
                Subscribe us &amp; Get <span className="span">25% Off.</span> with Mastercard
              </p>

              <form action="" className="input-wrapper">
                <div className="icon-wrapper">
                  <ion-icon name="mail-outline" aria-hidden="true"></ion-icon>

                  <input type="email" name="email_address" placeholder="Your email" autoComplete="off" className="input-field" />
                </div>

                <button type="submit" className="btn btn-secondary">
                  <span className="text text-1">Subscribe</span>
                  <span className="text text-2" aria-hidden="true">Subscribe</span>
                </button>
              </form>
            </div>

            <ul className="footer-list">
              <li><a href="#home" className="label-2 footer-link hover-underline">Home</a></li>
              <li><a href="#menu" className="label-2 footer-link hover-underline">Menus</a></li>
              <li><a href="#about" className="label-2 footer-link hover-underline">About Us</a></li>
              <li><a href="#events" className="label-2 footer-link hover-underline">Events</a></li>
              <li><a href="#reservation" className="label-2 footer-link hover-underline">Contact</a></li>
            </ul>

            <ul className="footer-list">
              <li><a href="#" className="label-2 footer-link hover-underline">Facebook</a></li>
              <li><a href="#" className="label-2 footer-link hover-underline">Instagram</a></li>
              <li><a href="#" className="label-2 footer-link hover-underline">X</a></li>
              <li><a href="#" className="label-2 footer-link hover-underline">Tiktok</a></li>
              <li><a href="#" className="label-2 footer-link hover-underline">Google Map</a></li>
            </ul>
          </div>

          <div className="footer-bottom">
            <p className="copyright">
              &copy; 2026 Nelly Ange Original Blue Gate Restaurant. All Rights Reserved
            </p>
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
