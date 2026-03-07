export default function WhatsAppFloat({ phone }) {
  const link = `https://wa.me/${phone}?text=${encodeURIComponent(
    "Hello Original Blue Gate, I want to order or book a table."
  )}`;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-4 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-2xl transition hover:scale-110 hover:bg-green-600 sm:bottom-6 sm:right-6"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="h-7 w-7 fill-current"
        aria-hidden="true"
      >
        <path d="M19.11 17.2c-.27-.14-1.6-.79-1.84-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.31.2-.58.07-.27-.14-1.13-.42-2.15-1.33-.79-.71-1.33-1.58-1.49-1.85-.16-.27-.02-.42.12-.56.13-.13.27-.31.41-.47.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.47-.07-.14-.61-1.47-.84-2.02-.22-.53-.45-.45-.61-.46h-.52c-.18 0-.47.07-.72.34-.25.27-.95.93-.95 2.26s.97 2.61 1.11 2.79c.14.18 1.91 2.92 4.64 4.1.65.28 1.16.45 1.56.57.66.21 1.27.18 1.75.11.53-.08 1.6-.65 1.82-1.28.23-.63.23-1.17.16-1.28-.06-.11-.24-.18-.5-.31Z" />
        <path d="M16.02 3.2C8.95 3.2 3.2 8.95 3.2 16.02c0 2.25.59 4.45 1.7 6.39L3 29l6.78-1.78a12.73 12.73 0 0 0 6.24 1.61h.01c7.07 0 12.82-5.75 12.82-12.82 0-3.43-1.34-6.66-3.77-9.08A12.73 12.73 0 0 0 16.02 3.2Zm0 23.42h-.01a10.56 10.56 0 0 1-5.38-1.48l-.39-.23-4.02 1.06 1.07-3.92-.25-.4a10.55 10.55 0 0 1-1.63-5.63c0-5.83 4.75-10.58 10.59-10.58 2.82 0 5.47 1.1 7.46 3.1a10.49 10.49 0 0 1 3.1 7.48c0 5.84-4.75 10.6-10.58 10.6Z" />
      </svg>
    </a>
  );
}