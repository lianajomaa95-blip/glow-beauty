import { useState } from "react";
import useProducts from "../hooks/useProducts";
import { theme } from "../theme";

export default function SkinCoach() {
  // 🛍️ FETCH PRODUCTS FROM SHOPIFY
  const { products } = useProducts();

  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi 👋 I'm your AI Skin Coach. Ask me anything about your skin or routine.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= AI LOGIC ================= */

  const getReply = (userText) => {
    const text = userText.toLowerCase();

    // simple product match AI
    const matched = products.find(
      (p) =>
        p.name?.toLowerCase().includes(text) ||
        p.type?.toLowerCase().includes(text) ||
        p.category?.toLowerCase().includes(text)
    );

    if (text.includes("acne")) {
      return {
        text:
          "For acne, I recommend gentle cleansing + salicylic acid treatments. Avoid over-washing your skin.",
        product: products.find((p) =>
          p.concerns?.some((c) => c.toLowerCase().includes("acne"))
        ),
      };
    }

    if (text.includes("dry")) {
      return {
        text:
          "For dry skin, focus on hydration + barrier repair with ceramides and hyaluronic acid.",
        product: products.find((p) =>
          p.skinType?.some((s) => s.toLowerCase().includes("dry"))
        ),
      };
    }

    if (text.includes("routine")) {
      return {
        text:
          "A good routine is: Cleanser → Serum → Moisturizer → SPF (morning).",
      };
    }

    if (matched) {
      return {
        text: `I found a good match for you: ${matched.name}. It fits your concern and skin needs.`,
        product: matched,
      };
    }

    return {
      text:
        "Tell me more about your skin type or concern so I can help you better.",
    };
  };

  /* ================= SEND MESSAGE ================= */

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const reply = getReply(userMessage.text);

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: reply.text,
          product: reply.product,
        },
      ]);

      setLoading(false);
    }, 800);
  };

  return (
    <div style={page}>
      <div style={chatBox}>
        {/* HEADER */}
        <h1 style={title}>🧴 AI Skin Coach</h1>

        <p style={subtitle}>
          Chat with your personal skincare assistant
        </p>

        {/* CHAT */}
        <div style={messagesBox}>
          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                ...msg,
                alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                background:
                  m.role === "user" ? theme.colors.primary : "#f1f1f1",
                color: m.role === "user" ? "#fff" : "#000",
              }}
            >
              <p style={{ margin: 0 }}>{m.text}</p>

              {/* PRODUCT SUGGESTION */}
              {m.product && (
                <div style={productCard}>
                  <img
                    src={m.product.image}
                    alt={m.product.name}
                    style={img}
                  />

                  <div>
                    <p style={{ margin: 0 }}>{m.product.name}</p>
                    <small>${m.product.price}</small>
                  </div>
                </div>
              )}
            </div>
          ))}

          {loading && <div style={typing}>AI is thinking...</div>}
        </div>

        {/* INPUT */}
        <div style={inputBox}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about acne, dryness, routine..."
            style={inputStyle}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />

          <button onClick={sendMessage} style={btn}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const page = {
  minHeight: "100vh",
  background: "#f7f7f7",
  display: "flex",
  justifyContent: "center",
  padding: 20,
};

const chatBox = {
  width: "100%",
  maxWidth: 600,
  background: "#fff",
  borderRadius: 20,
  padding: 20,
  display: "flex",
  flexDirection: "column",
  height: "90vh",
};

const title = {
  marginBottom: 5,
};

const subtitle = {
  color: "#666",
  marginBottom: 10,
};

const messagesBox = {
  flex: 1,
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: 10,
  padding: 10,
};

const msg = {
  padding: 12,
  borderRadius: 14,
  maxWidth: "80%",
};

const inputBox = {
  display: "flex",
  gap: 10,
  marginTop: 10,
};

const inputStyle = {
  flex: 1,
  padding: "12px 14px",
  borderRadius: 12,
  border: "1px solid #e5e5e5",
  outline: "none",
  fontSize: 14,
};

const btn = {
  padding: "12px 16px",
  background: theme.colors.primary,
  color: "#fff",
  border: "none",
  borderRadius: 12,
  cursor: "pointer",
};

const typing = {
  fontSize: 12,
  color: "#888",
  fontStyle: "italic",
};

const productCard = {
  marginTop: 8,
  display: "flex",
  gap: 10,
  alignItems: "center",
  background: "#fff",
  padding: 8,
  borderRadius: 10,
};

const img = {
  width: 40,
  height: 40,
  objectFit: "cover",
  borderRadius: 8,
};