import { useState } from "react";
import { FaWhatsapp, FaInstagram, FaEnvelope } from "react-icons/fa";
import { trackContactSubmit } from "../utils/analytics";

export default function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const formData = new FormData(e.target);

    try {
      const response = await fetch("https://formspree.io/f/xrerdnwe", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        trackContactSubmit();
        setSent(true);
        e.target.reset();
      } else {
        setError("Couldn't send. Please try again or use WhatsApp.");
      }
    } catch (err) {
      setError("Network error. Please try again or use WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={page}>
      <div style={header}>
        <h1 style={pageTitle}>Contact Us 📩</h1>
        <p style={pageSub}>We'd love to hear from you!</p>
      </div>

      <div style={mainContent}>
        <div style={cardsGrid}>
          
            href="https://wa.me/96176809185"
            target="_blank"
            rel="noreferrer"
            style={contactCard}
          >
            <FaWhatsapp style={{ fontSize: 32, color: "#25d366" }} />
            <span style={cardTitle}>WhatsApp</span>
            <span style={cardSub}>Chat with us</span>
          </a>

          <a href="mailto:lianajomaa95@gmail.com" style={contactCard}>
            <FaEnvelope style={{ fontSize: 32, color: "#c2687a" }} />
            <span style={cardTitle}>Email</span>
            <span style={cardSub}>Send a message</span>
          </a>

          
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            style={contactCard}
          >
            <FaInstagram style={{ fontSize: 32, color: "#c2687a" }} />
            <span style={cardTitle}>Instagram</span>
            <span style={cardSub}>Follow us</span>
          </a>
        </div>

        <div style={formCard}>
          {sent ? (
            <div style={successBox}>
              <div style={successIcon}>✓</div>
              <h2 style={successTitle}>Message Sent!</h2>
              <p style={successText}>
                Thanks for reaching out — we'll get back to you within 24 hours.
              </p>
              <button onClick={() => setSent(false)} style={resetBtn}>
                Send Another
              </button>
            </div>
          ) : (
            <div>
              <h2 style={formTitle}>Send us a message</h2>

              <form onSubmit={handleSubmit} style={form}>
                <div style={row}>
                  <input
                    name="name"
                    placeholder="Your Name"
                    required
                    style={input}
                  />
                  <input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    required
                    style={input}
                  />
                </div>

                <input
                  name="subject"
                  placeholder="Subject (optional)"
                  style={input}
                />

                <textarea
                  name="message"
                  placeholder="How can we help you?"
                  required
                  rows={5}
                  style={textarea}
                />

                {error && <p style={errorText}>{error}</p>}

                <button type="submit" disabled={submitting} style={submitBtn}>
                  {submitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const page = {
  background: "#fff5f7",
  minHeight: "100vh",
};

const header = {
  background: "#ffffff",
  padding: "24px 28px",
  borderBottom: "1px solid rgba(194,104,122,0.15)",
};

const pageTitle = {
  fontSize: 24,
  fontWeight: 500,
  color: "#7d2a3c",
  margin: 0,
};

const pageSub = {
  fontSize: 14,
  color: "#c2687a",
  marginTop: 4,
};

const mainContent = {
  padding: "28px",
  maxWidth: 600,
  margin: "0 auto",
};

const cardsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: 16,
  marginBottom: 32,
};

const contactCard = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 8,
  padding: "20px 16px",
  borderRadius: 20,
  textAlign: "center",
  background: "#ffffff",
  border: "1px solid rgba(194,104,122,0.15)",
  textDecoration: "none",
  cursor: "pointer",
};

const cardTitle = {
  fontSize: 14,
  fontWeight: 500,
  color: "#7d2a3c",
};

const cardSub = {
  fontSize: 12,
  color: "#c2687a",
};

const formCard = {
  padding: 24,
  borderRadius: 20,
  background: "#ffffff",
  border: "1px solid rgba(194,104,122,0.15)",
};

const formTitle = {
  fontSize: 16,
  fontWeight: 500,
  marginBottom: 18,
  color: "#7d2a3c",
};

const form = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

const row = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 12,
};

const input = {
  width: "100%",
  padding: "12px 16px",
  borderRadius: 12,
  fontSize: 14,
  outline: "none",
  background: "#fff5f7",
  border: "1px solid rgba(194,104,122,0.2)",
  color: "#1a1a1a",
  boxSizing: "border-box",
};

const textarea = {
  width: "100%",
  padding: "12px 16px",
  borderRadius: 12,
  fontSize: 14,
  outline: "none",
  background: "#fff5f7",
  border: "1px solid rgba(194,104,122,0.2)",
  color: "#1a1a1a",
  resize: "vertical",
  fontFamily: "inherit",
  boxSizing: "border-box",
};

const errorText = {
  color: "#c33",
  fontSize: 13,
  margin: 0,
};

const submitBtn = {
  padding: "14px",
  background: "#c2687a",
  color: "#fff",
  border: "none",
  borderRadius: 12,
  fontSize: 15,
  fontWeight: 600,
  marginTop: 6,
  cursor: "pointer",
};

const successBox = {
  textAlign: "center",
  padding: "20px 10px",
};

const successIcon = {
  width: 70,
  height: 70,
  borderRadius: "50%",
  background: "#d7f5df",
  color: "#27ae60",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 34,
  fontWeight: 700,
  margin: "0 auto 16px",
};

const successTitle = {
  fontSize: 22,
  color: "#7d2a3c",
  marginBottom: 8,
};

const successText = {
  color: "rgba(125,42,60,0.7)",
  marginBottom: 20,
  lineHeight: 1.6,
};

const resetBtn = {
  padding: "12px 20px",
  background: "#c2687a",
  color: "#fff",
  border: "none",
  borderRadius: 12,
  cursor: "pointer",
  fontWeight: 600,
};