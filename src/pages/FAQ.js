import { useState } from "react";
import { motion } from "framer-motion";
import { theme } from "../theme";

const FAQS = [
  {
    category: "Orders",
    items: [
      {
        q: "How do I place an order?",
        a: "Browse our products, add items to your cart, and proceed to checkout. You'll be asked to fill in your shipping details and payment method. We support credit card, Whish Money, and Cash on Delivery.",
      },
      {
        q: "Can I modify my order after placing it?",
        a: "If your order hasn't shipped yet, contact us immediately via WhatsApp or our Contact page. We'll do our best to accommodate changes. Once shipped, modifications aren't possible.",
      },
      {
        q: "Do you offer gift wrapping?",
        a: "Currently, we don't offer gift wrapping, but we include a free thank-you card with every order. Gift wrapping is coming soon!",
      },
    ],
  },
  {
    category: "Shipping",
    items: [
      {
        q: "How long does shipping take?",
        a: "Beirut and suburbs: 1–2 business days. Other Lebanese cities: 2–4 business days. We process orders within 24 hours (Mon–Fri).",
      },
      {
        q: "Do you ship internationally?",
        a: "Not yet — we currently only ship within Lebanon. International shipping is on our roadmap! Subscribe to our newsletter to be the first to know.",
      },
      {
        q: "How can I track my order?",
        a: "After your order ships, you'll receive an email with a tracking link. You can also view all your orders anytime from the 'My Orders' page.",
      },
    ],
  },
  {
    category: "Products",
    items: [
      {
        q: "Are your products authentic?",
        a: "Yes! We source directly from authorized distributors and brand partners. Every product comes with full authentication.",
      },
      {
        q: "How do I choose the right product for my skin type?",
        a: "Try our AI Skin Quiz! In under 2 minutes, we'll recommend personalized products based on your skin type and concerns. You can also chat with our AI Skin Coach for tailored advice.",
      },
      {
        q: "What if I have a reaction to a product?",
        a: "Stop using the product immediately and contact us within 48 hours. We'll process a full refund — even if the product is opened. Your skin health matters most.",
      },
    ],
  },
  {
    category: "Payments & Returns",
    items: [
      {
        q: "What payment methods do you accept?",
        a: "Credit/Debit Cards (Visa, Mastercard), Whish Money, and Cash on Delivery (with a $2 handling fee).",
      },
      {
        q: "Is it safe to enter my credit card details?",
        a: "Yes — all payments are processed through secure, encrypted channels. We never store your full card details on our servers.",
      },
      {
        q: "What's your return policy?",
        a: "We offer 30-day returns. Unopened items can be returned for a full refund. Opened items can be returned if defective, expired, or caused an allergic reaction. See our Returns page for details.",
      },
      {
        q: "How do I use a promo code?",
        a: "Enter your code at checkout in the 'Promo Code' field and click Apply. The discount will be deducted from your total automatically.",
      },
    ],
  },
  {
    category: "Account",
    items: [
      {
        q: "Do I need an account to order?",
        a: "No — you can check out as a guest. However, creating an account lets you track orders, save your wishlist, and reorder faster.",
      },
      {
        q: "How do I save products for later?",
        a: "Click the ❤️ heart icon on any product to add it to your wishlist. You can access your wishlist anytime from the navbar.",
      },
    ],
  },
];

export default function FAQ() {
  const [openItem, setOpenItem] = useState(null);

  const toggle = (id) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={page}
    >
      <div style={header}>
        <h1 style={title}>Frequently Asked Questions</h1>
        <p style={subtitle}>
          Find quick answers to common questions. Can't find what you're looking
          for? Contact us — we're here to help.
        </p>
      </div>

      <div style={container}>
        {FAQS.map((category, ci) => (
          <div key={ci} style={categoryBlock}>
            <h2 style={categoryTitle}>{category.category}</h2>

            <div style={list}>
              {category.items.map((item, ii) => {
                const id = `${ci}-${ii}`;
                const isOpen = openItem === id;
                return (
                  <div key={id} style={faqItem}>
                    <button
                      onClick={() => toggle(id)}
                      style={question}
                    >
                      <span>{item.q}</span>
                      <span style={chevron}>{isOpen ? "−" : "+"}</span>
                    </button>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        style={answerWrap}
                      >
                        <p style={answer}>{item.a}</p>
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ================= STYLES ================= */

const page = {
  background: theme.colors.bg,
  minHeight: "100vh",
};

const header = {
  textAlign: "center",
  padding: "50px 24px 30px",
  background: theme.colors.card,
  borderBottom: `1px solid ${theme.colors.border}`,
};

const title = {
  fontSize: 36,
  fontWeight: 700,
  color: theme.colors.dark,
  margin: 0,
};

const subtitle = {
  fontSize: 15,
  color: theme.colors.muted,
  marginTop: 10,
  maxWidth: 600,
  marginLeft: "auto",
  marginRight: "auto",
  lineHeight: 1.6,
};

const container = {
  maxWidth: 800,
  margin: "0 auto",
  padding: "40px 24px 60px",
};

const categoryBlock = {
  marginBottom: 36,
};

const categoryTitle = {
  fontSize: 20,
  fontWeight: 700,
  color: theme.colors.dark,
  marginBottom: 14,
  marginTop: 0,
};

const list = {
  display: "flex",
  flexDirection: "column",
  gap: 10,
};

const faqItem = {
  background: theme.colors.card,
  borderRadius: 14,
  border: `1px solid ${theme.colors.border}`,
  overflow: "hidden",
};

const question = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  padding: "16px 20px",
  background: "transparent",
  border: "none",
  cursor: "pointer",
  textAlign: "left",
  fontSize: 14,
  fontWeight: 500,
  color: theme.colors.dark,
  fontFamily: "inherit",
};

const chevron = {
  fontSize: 22,
  color: theme.colors.primary,
  marginLeft: 12,
};

const answerWrap = {
  overflow: "hidden",
};

const answer = {
  padding: "0 20px 16px",
  margin: 0,
  fontSize: 14,
  lineHeight: 1.7,
  color: theme.colors.muted,
};