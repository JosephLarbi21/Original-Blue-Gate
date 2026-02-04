import { useState } from "react";
import { Link } from "react-router-dom";

const BUSINESS_EMAIL = "orders@nellyangepubandgrill.com";

export default function ValentinesBooking() {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    guests: "2",
    date: "",
    time: "07:00pm",
    packageType: "Couple Package",
    notes: "",
  });

  const [status, setStatus] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", text: "" });

    if (!form.fullName.trim() || !form.phone.trim() || !form.date.trim()) {
      setStatus({ type: "error", text: "Please enter Full Name, Phone and Date." });
      return;
    }

    setLoading(true);

    try {
      // reuse your existing reservation email endpoint
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toEmail: BUSINESS_EMAIL,
          // map to your reservation fields
          name: form.fullName,
          phone: form.phone,
          persons: `${form.guests} Guests`,
          date: form.date,
          time: form.time,
          message: `
EVENT: Valentine's Day Booking
Package: ${form.packageType}
Customer Email: ${form.email || "Not provided"}

Notes:
${form.notes || "-"}
          `.trim(),
          eventType: "Valentine’s Day",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Booking failed.");

      setStatus({
        type: "success",
        text: "Booking submitted successfully! We will contact you shortly.",
      });

      setForm({
        fullName: "",
        phone: "",
        email: "",
        guests: "2",
        date: "",
        time: "07:00pm",
        packageType: "Couple Package",
        notes: "",
      });
    } catch (err) {
      setStatus({
        type: "error",
        text: err?.message || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="val-page">
      <section className="val-hero">
        <div className="val-container">
          <Link to="/" className="val-back">
            ← Back Home
          </Link>

          <p className="val-tag">Valentine’s Day • Original Blue Gate</p>

          <h1 className="val-title">
            Reserve Your Table <br /> for Valentine’s Night
          </h1>

          <p className="val-sub">
            Fill this form to book your spot. Limited tables available — we’ll confirm your booking via call/WhatsApp.
          </p>
        </div>
      </section>

      <section className="val-form-wrap">
        <div className="val-container">
          <div className="val-card">
            <h2 className="val-card-title">Customer Booking Details</h2>
            <p className="val-card-desc">
              This booking will be sent to <b>{BUSINESS_EMAIL}</b>.
            </p>

            <form onSubmit={submit} className="val-form">
              <div className="val-grid">
                <div>
                  <label className="val-label">Full Name *</label>
                  <input
                    className="val-input"
                    name="fullName"
                    value={form.fullName}
                    onChange={onChange}
                    placeholder="e.g. Ama Mensah"
                    autoComplete="name"
                  />
                </div>

                <div>
                  <label className="val-label">Phone Number *</label>
                  <input
                    className="val-input"
                    name="phone"
                    value={form.phone}
                    onChange={onChange}
                    placeholder="e.g. 0561272734"
                    autoComplete="tel"
                  />
                </div>

                <div>
                  <label className="val-label">Email (optional)</label>
                  <input
                    className="val-input"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    placeholder="e.g. you@gmail.com"
                    autoComplete="email"
                  />
                </div>

                <div>
                  <label className="val-label">Guests</label>
                  <select className="val-input" name="guests" value={form.guests} onChange={onChange}>
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5">5 Guests</option>
                    <option value="6">6 Guests</option>
                    <option value="7">7 Guests</option>
                    <option value="8">8 Guests</option>
                  </select>
                </div>

                <div>
                  <label className="val-label">Date *</label>
                  <input className="val-input" type="date" name="date" value={form.date} onChange={onChange} />
                </div>

                <div>
                  <label className="val-label">Time</label>
                  <select className="val-input" name="time" value={form.time} onChange={onChange}>
                    <option value="06:00pm">06:00 pm</option>
                    <option value="07:00pm">07:00 pm</option>
                    <option value="08:00pm">08:00 pm</option>
                    <option value="09:00pm">09:00 pm</option>
                    <option value="10:00pm">10:00 pm</option>
                  </select>
                </div>

                <div className="val-full">
                  <label className="val-label">Package</label>
                  <select className="val-input" name="packageType" value={form.packageType} onChange={onChange}>
                    <option>Couple Package</option>
                    <option>VIP Package</option>
                    <option>Group Package</option>
                  </select>
                </div>

                <div className="val-full">
                  <label className="val-label">Notes (optional)</label>
                  <textarea
                    className="val-textarea"
                    name="notes"
                    value={form.notes}
                    onChange={onChange}
                    placeholder="Any special request? (birthday, surprise, preferred seating, etc.)"
                  />
                </div>
              </div>

              {status.text ? <div className={`val-alert ${status.type}`}>{status.text}</div> : null}

              <button type="submit" className="val-btn" disabled={loading}>
                {loading ? "Submitting..." : "Submit Booking"}
              </button>

              <p className="val-footnote">
                Need quick help? Call{" "}
                <a className="val-link" href="tel:+233537965155">
                  +233 53 796 5155
                </a>
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
