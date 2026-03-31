"use client";

import { useEffect, useState } from "react";

export default function StatusWidget() {
  const [isOpen, setIsOpen] = useState(false);

  // Function to check the current time in Ghana
  const checkGhanaTime = () => {
    const now = new Date();

    // Convert to Ghana timezone (GMT)
    const utcHours = now.getUTCHours();
    const utcMinutes = now.getUTCMinutes();

    // Opening: 10:00 AM
    // Closing: 11:30 PM
    const openHour = 10;
    const closeHour = 23;
    const closeMinute = 30;

    const open = utcHours > openHour || (utcHours === openHour && utcMinutes >= 0);
    const close =
      utcHours < closeHour || (utcHours === closeHour && utcMinutes <= closeMinute);

    return open && close;
  };

  useEffect(() => {
    // Set initial status
    setIsOpen(checkGhanaTime());

    // Update status every minute
    const interval = setInterval(() => {
      setIsOpen(checkGhanaTime());
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const toggleStatus = () => setIsOpen((prev) => !prev);

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3">
      <button
        onClick={toggleStatus}
        className={`relative flex items-center gap-3 px-5 py-3 rounded-2xl font-semibold shadow-2xl transition-all duration-300
          ${isOpen ? "bg-gradient-to-r from-green-400 to-green-600 text-white shadow-green-500/50" 
                    : "bg-gradient-to-r from-red-400 to-red-600 text-white shadow-red-500/50"}
          hover:scale-105 hover:shadow-lg`}
      >
        {/* Status Dot */}
        <span
          className={`h-3 w-3 rounded-full ${
            isOpen ? "bg-green-200 animate-pulse" : "bg-red-200 animate-pulse"
          }`}
        ></span>
        {isOpen ? "Restaurant is OPEN" : "Restaurant is CLOSED"}
      </button>

      {/* Optional: Add a tooltip for hours */}
      <div className="text-xs text-white/70">
        Hours: 10:00 AM - 11:30 PM (GMT)
      </div>
    </div>
  );
}
