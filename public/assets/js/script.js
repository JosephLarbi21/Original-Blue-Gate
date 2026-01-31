"use strict";

/**
 * Helper: wait until an element exists in the DOM (React-safe)
 */
function waitForElement(selector, timeout = 5000) {
  return new Promise((resolve) => {
    const existing = document.querySelector(selector);
    if (existing) return resolve(existing);

    const obs = new MutationObserver(() => {
      const el = document.querySelector(selector);
      if (el) {
        obs.disconnect();
        resolve(el);
      }
    });

    obs.observe(document.documentElement, { childList: true, subtree: true });

    // Fallback timeout: resolve null
    setTimeout(() => {
      obs.disconnect();
      resolve(null);
    }, timeout);
  });
}

/**
 * add event listener on multiple elements
 */
const addEventOnElements = function (elements, eventType, callback) {
  if (!elements || !elements.length) return;
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};

(async function init() {
  /**
   * PRELOAD
   * loading will be end after document is loaded
   */
  const preloader = await waitForElement("[data-preaload]");
  // If preloader doesn't exist, don't break anything
  const runPreload = () => {
    if (!preloader) return;
    preloader.classList.add("loaded");
    document.body.classList.add("loaded");
  };

  if (document.readyState === "complete") runPreload();
  else window.addEventListener("load", runPreload, { once: true });

  /**
   * NAVBAR
   */
  const navbar = await waitForElement("[data-navbar]");
  const overlay = await waitForElement("[data-overlay]");
  const navTogglers = document.querySelectorAll("[data-nav-toggler]");

  const toggleNavbar = function () {
    if (!navbar || !overlay) return;
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("nav-active");
  };

  addEventOnElements(navTogglers, "click", toggleNavbar);

  /**
   * HEADER & BACK TOP BTN
   */
  const header = await waitForElement("[data-header]");
  const backTopBtn = await waitForElement("[data-back-top-btn]");

  let lastScrollPos = 0;

  const hideHeader = function () {
    if (!header) return;
    const isScrollBottom = lastScrollPos < window.scrollY;
    if (isScrollBottom) header.classList.add("hide");
    else header.classList.remove("hide");
    lastScrollPos = window.scrollY;
  };

  window.addEventListener("scroll", function () {
    if (!header || !backTopBtn) return;

    if (window.scrollY >= 50) {
      header.classList.add("active");
      backTopBtn.classList.add("active");
      hideHeader();
    } else {
      header.classList.remove("active");
      backTopBtn.classList.remove("active");
    }
  });

  /**
   * HERO SLIDER
   */
  const heroSlider = await waitForElement("[data-hero-slider]");
  const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
  const heroSliderPrevBtn = await waitForElement("[data-prev-btn]");
  const heroSliderNextBtn = await waitForElement("[data-next-btn]");

  if (heroSlider && heroSliderItems.length && heroSliderPrevBtn && heroSliderNextBtn) {
    let currentSlidePos = 0;
    let lastActiveSliderItem = heroSliderItems[0];

    const updateSliderPos = function () {
      if (!lastActiveSliderItem) return;
      lastActiveSliderItem.classList.remove("active");
      heroSliderItems[currentSlidePos].classList.add("active");
      lastActiveSliderItem = heroSliderItems[currentSlidePos];
    };

    const slideNext = function () {
      currentSlidePos = currentSlidePos >= heroSliderItems.length - 1 ? 0 : currentSlidePos + 1;
      updateSliderPos();
    };

    const slidePrev = function () {
      currentSlidePos = currentSlidePos <= 0 ? heroSliderItems.length - 1 : currentSlidePos - 1;
      updateSliderPos();
    };

    heroSliderNextBtn.addEventListener("click", slideNext);
    heroSliderPrevBtn.addEventListener("click", slidePrev);

    /**
     * auto slide
     */
    let autoSlideInterval;

    const autoSlide = function () {
      autoSlideInterval = setInterval(slideNext, 7000);
    };

    addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
      clearInterval(autoSlideInterval);
    });

    addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

    if (document.readyState === "complete") autoSlide();
    else window.addEventListener("load", autoSlide, { once: true });
  }

  /**
   * PARALLAX EFFECT
   */
  const parallaxItems = document.querySelectorAll("[data-parallax-item]");
  if (parallaxItems.length) {
    window.addEventListener("mousemove", function (event) {
      let x = (event.clientX / window.innerWidth) * 10 - 5;
      let y = (event.clientY / window.innerHeight) * 10 - 5;

      x = x - x * 2;
      y = y - y * 2;

      for (let i = 0, len = parallaxItems.length; i < len; i++) {
        const speed = Number(parallaxItems[i].dataset.parallaxSpeed || 1);
        parallaxItems[i].style.transform = `translate3d(${x * speed}px, ${y * speed}px, 0px)`;
      }
    });
  }

  /**
   * NAVBAR ACTIVE LINK (click & scroll)
   */
  const navbarLinks = document.querySelectorAll(".navbar-link");
  const sections = document.querySelectorAll("section[id]");

  if (navbarLinks.length) {
    navbarLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navbarLinks.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
      });
    });
  }

  if (sections.length && navbarLinks.length) {
    window.addEventListener("scroll", () => {
      const scrollPos = window.scrollY + 200;
      sections.forEach((section) => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute("id");
        if (scrollPos >= top && scrollPos < bottom) {
          navbarLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${id}`) link.classList.add("active");
          });
        }
      });
    });
  }
})();
