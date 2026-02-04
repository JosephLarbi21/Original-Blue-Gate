export default function WhatsAppFloat({ phone }) {
  const link = `https://wa.me/${phone}?text=${encodeURIComponent(
   "Hello Original Blue Gate, I want to order or book a table."
  )}`;

  return (
    <a className="whatsapp-float" href={link} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
      <ion-icon name="logo-whatsapp" aria-hidden="true"></ion-icon>
    </a>
  );
}
