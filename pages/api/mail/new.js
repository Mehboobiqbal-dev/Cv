import nodemailer from "nodemailer";

const PORTFOLIO_EMAIL = "mehboobmehboob090@gmail.com";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const clean = (value, maxLength) =>
  typeof value === "string" ? value.trim().slice(0, maxLength) : "";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const name = clean(req.body?.name, 100);
  const email = clean(req.body?.email, 160).toLowerCase();
  const subject = clean(req.body?.subject, 160);
  const message = clean(req.body?.message, 5000);
  const website = clean(req.body?.website, 200);

  // Bots often fill hidden fields. Return success without sending.
  if (website) {
    return res.status(200).json({ success: true });
  }

  if (!name || !EMAIL_PATTERN.test(email) || !subject || !message) {
    return res.status(400).json({
      error: "Please provide a valid name, email, subject, and message.",
    });
  }

  if (!process.env.GMAIL_APP_PASSWORD) {
    return res.status(503).json({
      error: "Email delivery is not configured yet. Please email Mehboob directly.",
    });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: PORTFOLIO_EMAIL,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: `Mehboob Iqbal Portfolio <${PORTFOLIO_EMAIL}>`,
      to: PORTFOLIO_EMAIL,
      replyTo: `${name} <${email}>`,
      subject: `[Portfolio] ${subject}`,
      text: [
        "New portfolio enquiry",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Subject: ${subject}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });

    return res.status(200).json({
      success: true,
      message: "Thanks—your message has been sent to Mehboob.",
    });
  } catch (error) {
    console.error("Portfolio email delivery failed:", error);
    return res.status(500).json({
      error: "The message could not be sent right now. Please try again shortly.",
    });
  }
}
