import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  try {
    const { name, phone, persons, date, time, message, toEmail } = req.body || {};

    if (!name || !phone || !date) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: String(process.env.SMTP_SECURE || "true") === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const subject = `${(req.body?.eventType || "Table Booking")} - ${name} (${phone})`;

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6">
        <h2>New Table Reservation</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Persons:</b> ${persons || "-"}</p>
        <p><b>Date:</b> ${date}</p>
        <p><b>Time:</b> ${time || "-"}</p>
        <p><b>Message:</b><br/>${(message || "").replace(/\n/g, "<br/>")}</p>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: toEmail || "orders@nellyangepubandgrill.com",
      subject,
      html,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ message: err?.message || "Email failed." });
  }
}
