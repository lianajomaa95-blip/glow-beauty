import { FaWhatsapp } from "react-icons/fa";

export default function WhatsappButton() {
  return (
    <a
      href="https://wa.me/96176809185?text=Hi%20GlowSkin!%20I%20have%20a%20question%20about%20your%20products."
      target="_blank"
      rel="noreferrer"
      title="Chat with us on WhatsApp"
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 950,
        width: 58,
        height: 58,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 30,
        color: "white",
        background: "#25d366",
        boxShadow: "0 6px 20px rgba(37,211,102,0.45)",
        textDecoration: "none",
        transition: "transform 0.2s ease",
        cursor: "pointer",
      }}
    >
      <FaWhatsapp />
    </a>
  );
}