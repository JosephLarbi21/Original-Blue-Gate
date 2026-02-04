import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("cookieConsent");
    if (!saved) setOpen(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setOpen(false);
  };

  const decline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-live="polite" aria-label="Cookie consent">
      <div className="cookie-inner">
        <div className="cookie-text">
          <p className="cookie-title">We use cookies</p>
          <p className="cookie-desc">
            We use cookies to improve your experience and analyze traffic. You can accept or decline.
          </p>
        </div>

        <div className="cookie-actions">
          <button className="cookie-btn ghost" type="button" onClick={decline}>
            Decline
          </button>
          <button className="cookie-btn" type="button" onClick={accept}>
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
