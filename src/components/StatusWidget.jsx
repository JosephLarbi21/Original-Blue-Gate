"use client";

import { useEffect, useState } from "react";

export default function StatusWidget() {
  const [isOpen, setIsOpen] = useState(false);

  // Function to check Ghana time (GMT)
  const checkGhanaTime = () => {
    const now = new Date();

    // Ghana is GMT (UTC+0)
    const hours = now.getUTCHours();
    const minutes = now.getUTCMinutes();

    // Opening: 10:00 AM
    // Closing: 11:30 PM
    const isAfterOpening =
      hours > 10 || (hours === 10 && minutes >= 0);

    const isBeforeClosing =
      hours < 23 || (hours === 23 && minutes <= 30);

    return isAfterOpening && isBeforeClosing;
  };

  useEffect(() => {
    // Run immediately
    setIsOpen(checkGhanaTime());

    // Update every minute
    const interval = setInterval(() => {
      setIsOpen(checkGhanaTime());
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-2">
      
      {/* STATUS DISPLAY (NO CLICK) */}
      <div
        className={`relative flex items-center gap-3 px-5 py-3 rounded-2xl font-semibold shadow-2xl
        ${
          isOpen
            ? "bg-gradient-to-r from-green-400 to-green-600 text-white shadow-green-500/40"
            : "bg-gradient-to-r from-red-400 to-red-600 text-white shadow-red-500/40"
        }`}
      >
        {/* Animated Dot */}
        <span
          className={`h-3 w-3 rounded-full animate-pulse ${
            isOpen ? "bg-green-200" : "bg-red-200"
          }`}
        ></span>

        {isOpen ? "Restaurant is OPEN" : "Restaurant is CLOSED"}
      </div>

      {/* Working Hours */}
      <div className="text-xs text-white/70 pl-2">
        Hours: 10:00 AM – 11:30 PM (Ghana Time)
      </div>
    </div>
  );
}
 