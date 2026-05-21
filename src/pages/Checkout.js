import { useState } from "react";
import { theme } from "../theme";
import {
  trackBeginCheckout,
  trackPurchase,
  trackApplyPromo,
} from "../utils/analytics";

const PROMO_CODES = {
  GLOW10: { type: "percent", value: 10, label: "10% off your order" },
  WELCOME20: { type: "percent", value: 20, label: "20% off — welcome!" },
  FREESHIP: { type: "shipping", value: 0, label: "Free shipping" },
};

export default function Checkout({ cart = [], clearCart }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "Lebanon",
    card: "",
    expiry: "",
    cvv: "",
    whishPhone: "",
  });

  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.qty || 1),
    0
  );

  let shipping = subtotal > 80 ? 0 : 10;
  let discount = 0;

  if (appliedPromo) {
    if (appliedPromo.type === "percent") {
      discount = (subtotal * appliedPromo.value) / 100;
    } else if (appliedPromo.type === "shipping") {
      shipping = 0;
    }
  }

  const codFee = paymentMethod === "cod" ? 2 : 0;
  const total = Math.max(0, subtotal - discount + shipping + codFee);

  const applyPromo = () => {
    setPromoError("");
    const code = promoInput.trim().toUpperCase();
    if (!code) {
      setPromoError("Enter a promo code");
      return;
    }
    if (appliedPromo) {
      setPromoError("Only one promo code can be applied");
      return;
    }
    const found = PROMO_CODES[code];
    if (!found) {
      setPromoError("Invalid promo code");
      return;
    }
    setAppliedPromo({ code, ...found });
    setPromoInput("");

    const discountAmount =
      found.type === "percent" ? (subtotal * found.value) / 100 : 10;
    trackApplyPromo(code, discountAmount);
  };

  const removePromo = () => {
    setAppliedPromo(null);
    setPromoError("");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.name || !form.email || !form.phone || !form.address) {
      alert("Please fill all shipping fields (name, email, phone, address)");
      return false;
    }
    if (paymentMethod === "card") {
      if (!form.card || !form.expiry || !form.cvv) {
        alert("Please fill all card details");
        return false;
      }
    }
    if (paymentMethod === "whish") {
      if (!form.whishPhone) {
        alert("Please enter your Whish phone number");
        return false;
      }
    }
    return true;
  };

  const generateOrderNumber = () => {
    const year = new Date().getFullYear();
    const random = Math.floor(1000 + Math.random() * 9000);
    return `GB-${year}-${random}`;
  };

  const handleCheckout = () => {
    if (!validateForm()) return;
    trackBeginCheckout(cart, appliedPromo?.code);
    setLoading(true);

    setTimeout(() => {
      const newOrderNumber = generateOrderNumber();
      const order = {
        orderNumber: newOrderNumber,
        date: new Date().toISOString(),
        items: cart,
        subtotal,
        shipping,
        codFee,
        discount,
        promoCode: appliedPromo?.code || null,
        total,
        paymentMethod,
        customer: {
          name: form.name,
          email: form.email,
          phone: form.phone,
          address: form.address,
          city: form.city,
          country: form.country,
        },
        status: paymentMethod === "cod" ? "pending_delivery" : "paid",
      };

      const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
      localStorage.setItem(
        "orders",
        JSON.stringify([order, ...existingOrders])
      );

      trackPurchase(order);

      if (typeof clearCart === "function") clearCart();
      setOrderNumber(newOrderNumber);
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  if (success) {
    const isCOD = paymentMethod === "cod";
    const methodLabel =
      paymentMethod === "card"
        ? "Credit Card"
        : paymentMethod === "whish"
        ? "Whish Money"
        : "Cash on Delivery";

    return (
      <div style={successPage}>
        <div style={successCard}>
          <div style={successIcon}>✓</div>
          <h1 style={successTitle}>
            {isCOD ? "Order Placed" : "Payment Confirmed"}
          </h1>
          <p style={successText}>
            {isCOD
              ? `Your order is on the way! Have $${total.toFixed(
                  2
                )} ready in cash when our courier arrives. ✨`
              : "Your skincare essentials are on the way ✨"}
          </p>
          <div style={orderDetailsBox}>
            <div style={detailRow}>
              <span style={detailLabel}>Order Number</span>
              <strong>{orderNumber}</strong>
            </div>
            <div style={detailRow}>
              <span style={detailLabel}>Payment Method</span>
              <span>{methodLabel}</span>
            </div>
            {appliedPromo && (
              <div style={detailRow}>
                <span style={detailLabel}>Promo Applied</span>
                <span>{appliedPromo.code}</span>
              </div>
            )}
            <div style={detailRow}>
              <span style={detailLabel}>Total</span>
              <strong>${total.toFixed(2)}</strong>
            </div>
            <div style={detailRow}>
              <span style={detailLabel}>Estimated Delivery</span>
              <span>3–5 business days</span>
            </div>
          </div>
          <button
            onClick={() => (window.location.href = "/")}
            style={successBtn}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div style={successPage}>
        <div style={successCard}>
          <div style={{ fontSize: 50 }}>🛒</div>
          <h1 style={successTitle}>Your cart is empty</h1>
          <p style={successText}>Add some products before checking out.</p>
          <button
            onClick={() => (window.location.href = "/shop")}
            style={successBtn}
          >
            Go to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={page} className="checkout-page">
      <div style={container} className="checkout-grid">
        <div style={left} className="checkout-left">
          <h1 style={title} className="checkout-title">
            Secure Checkout
          </h1>
          <p style={subtitle}>Complete your order</p>

          <div style={section}>
            <h3 style={sectionTitle}>📦 Shipping Details</h3>

            <div style={grid} className="checkout-row">
              <input
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                style={input}
              />
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                style={input}
              />
            </div>

            <input
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              style={{ ...input, marginTop: 14 }}
            />

            <input
              name="address"
              placeholder="Street Address"
              value={form.address}
              onChange={handleChange}
              style={{ ...input, marginTop: 14 }}
            />

            <div style={{ ...grid, marginTop: 14 }} className="checkout-row">
              <input
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                style={input}
              />
              <input
                name="country"
                placeholder="Country"
                value={form.country}
                onChange={handleChange}
                style={input}
              />
            </div>
          </div>

          <div style={section}>
            <h3 style={sectionTitle}>💰 Payment Method</h3>

            <div style={methodsRow}>
              <div
                onClick={() => setPaymentMethod("cod")}
                style={methodCard(paymentMethod === "cod")}
              >
                <div style={methodIcon}>📦</div>
                <div style={methodName}>Cash on Delivery</div>
                <div style={methodHint}>+$2 fee</div>
              </div>
              <div
                onClick={() => setPaymentMethod("whish")}
                style={methodCard(paymentMethod === "whish")}
              >
                <div style={methodIcon}>📱</div>
                <div style={methodName}>Whish Money</div>
                <div style={methodHint}>Via Whish app</div>
              </div>
              <div
                onClick={() => setPaymentMethod("card")}
                style={methodCard(paymentMethod === "card")}
              >
                <div style={methodIcon}>💳</div>
                <div style={methodName}>Credit Card</div>
                <div style={methodHint}>Visa / MC</div>
              </div>
            </div>

            {paymentMethod === "cod" && (
              <div style={noteBox}>
                💵 <strong>Cash on Delivery</strong>
                <p style={noteText}>
                  Pay <strong>${total.toFixed(2)}</strong> in cash when our
                  courier delivers your order.
                </p>
              </div>
            )}

            {paymentMethod === "whish" && (
              <div>
                <div style={noteBox}>
                  📱 <strong>Whish Money</strong>
                  <p style={noteText}>
                    After placing your order, send{" "}
                    <strong>${total.toFixed(2)}</strong> via Whish to{" "}
                    <strong>+961 71 234 567</strong>.
                  </p>
                </div>
                <input
                  name="whishPhone"
                  placeholder="Your Whish Phone"
                  value={form.whishPhone}
                  onChange={handleChange}
                  style={{ ...input, marginTop: 14 }}
                />
              </div>
            )}

            {paymentMethod === "card" && (
              <div style={{ marginTop: 14 }}>
                <input
                  name="card"
                  placeholder="Card Number"
                  value={form.card}
                  onChange={handleChange}
                  style={input}
                />
                <div style={{ ...grid, marginTop: 14 }} className="checkout-row">
                  <input
                    name="expiry"
                    placeholder="MM/YY"
                    value={form.expiry}
                    onChange={handleChange}
                    style={input}
                  />
                  <input
                    name="cvv"
                    placeholder="CVV"
                    value={form.cvv}
                    onChange={handleChange}
                    style={input}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div style={summary} className="checkout-summary">
          <h3 style={summaryTitle}>Order Summary</h3>

          <div style={items}>
            {cart.map((item) => (
              <div key={item.id} style={itemRow}>
                <img src={item.image} alt={item.name} style={itemImage} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={itemName}>{item.name}</p>
                  <p style={itemQty}>Qty: {item.qty}</p>
                </div>
                <strong style={{ flexShrink: 0, fontSize: 14 }}>
                  ${(item.price * item.qty).toFixed(2)}
                </strong>
              </div>
            ))}
          </div>

          <div style={promoSection}>
            <h4 style={promoTitle}>🎟️ Promo Code</h4>

            {appliedPromo ? (
              <div style={appliedPromoBox}>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <strong>{appliedPromo.code}</strong>
                  <div style={promoLabel}>{appliedPromo.label}</div>
                </div>
                <button onClick={removePromo} style={removePromoBtn}>
                  ✕
                </button>
              </div>
            ) : (
              <div>
                <div style={promoInputRow}>
                  <input
                    placeholder="Enter code"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    style={promoInputStyle}
                  />
                  <button onClick={applyPromo} style={applyBtn}>
                    Apply
                  </button>
                </div>
                {promoError && <div style={promoErrorText}>{promoError}</div>}
                <div style={promoHint}>
                  Try: <code style={code}>GLOW10</code>,{" "}
                  <code style={code}>WELCOME20</code>,{" "}
                  <code style={code}>FREESHIP</code>
                </div>
              </div>
            )}
          </div>

          <div style={totals}>
            <div style={totalRow}>
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            {discount > 0 && (
              <div style={{ ...totalRow, color: "#1d8a3f" }}>
                <span>Discount ({appliedPromo.code})</span>
                <span>−${discount.toFixed(2)}</span>
              </div>
            )}

            <div style={totalRow}>
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : `$${shipping}`}</span>
            </div>

            {codFee > 0 && (
              <div style={totalRow}>
                <span>COD Fee</span>
                <span>${codFee.toFixed(2)}</span>
              </div>
            )}

            <div style={totalFinal}>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            disabled={loading}
            style={{
              ...checkoutBtn,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading
              ? "Processing..."
              : paymentMethod === "cod"
              ? `Place Order — $${total.toFixed(2)}`
              : paymentMethod === "whish"
              ? `Confirm Order — $${total.toFixed(2)}`
              : `Pay $${total.toFixed(2)}`}
          </button>

          <p style={secureNote}>🔒 Demo checkout — no real payment</p>
        </div>
      </div>

      {/* 📱 BULLETPROOF MOBILE STYLES */}
      <style>{`
        @media (max-width: 900px) {
          .checkout-page {
            padding: 16px 12px !important;
          }
          .checkout-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .checkout-left {
            padding: 18px !important;
          }
          .checkout-summary {
            position: static !important;
            padding: 18px !important;
          }
          .checkout-row {
            grid-template-columns: 1fr !important;
          }
          .checkout-title {
            font-size: 24px !important;
          }
        }
        @media (max-width: 480px) {
          .checkout-page {
            padding: 12px 8px !important;
          }
          .checkout-left, .checkout-summary {
            padding: 14px !important;
            border-radius: 12px !important;
          }
        }
      `}</style>
    </div>
  );
}

/* ================= STYLES ================= */

const page = {
  background: theme.colors.bg,
  minHeight: "100vh",
  padding: "40px 20px",
};

const container = {
  maxWidth: 1300,
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "1.3fr 0.7fr",
  gap: 30,
};

const left = {
  background: theme.colors.card,
  borderRadius: 20,
  padding: 30,
};

const title = { fontSize: 34, color: theme.colors.dark, margin: 0 };
const subtitle = { color: theme.colors.muted, marginTop: 6 };
const section = { marginTop: 30 };
const sectionTitle = { marginBottom: 16, color: theme.colors.dark };

const grid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 14,
};

const input = {
  width: "100%",
  padding: "14px",
  borderRadius: 12,
  border: `1px solid ${theme.colors.border}`,
  fontSize: 14,
  outline: "none",
  background: theme.colors.inputBg,
  color: theme.colors.text,
  boxSizing: "border-box",
};

const methodsRow = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 8,
  marginBottom: 18,
};

const methodCard = (active) => ({
  padding: "14px 8px",
  borderRadius: 12,
  border: `2px solid ${active ? theme.colors.primary : theme.colors.border}`,
  background: active ? "rgba(194,104,122,0.08)" : theme.colors.inputBg,
  cursor: "pointer",
  textAlign: "center",
  transition: "0.2s ease",
});

const methodIcon = { fontSize: 22, marginBottom: 6 };
const methodName = { fontSize: 11, fontWeight: 600, color: theme.colors.dark };
const methodHint = { fontSize: 10, color: theme.colors.muted, marginTop: 2 };

const noteBox = {
  background: "#fff8ed",
  border: "1px solid #ffe2b3",
  borderRadius: 12,
  padding: "14px 16px",
  marginTop: 8,
  color: "#5a4a30",
};

const noteText = { fontSize: 13, marginTop: 6, lineHeight: 1.5 };

const summary = {
  background: theme.colors.card,
  borderRadius: 20,
  padding: 24,
  height: "fit-content",
  position: "sticky",
  top: 100,
};

const summaryTitle = { marginBottom: 20, color: theme.colors.dark, fontSize: 18 };
const items = { display: "flex", flexDirection: "column", gap: 14 };

const itemRow = {
  display: "flex",
  gap: 10,
  alignItems: "center",
};

const itemImage = {
  width: 50,
  height: 50,
  objectFit: "cover",
  borderRadius: 10,
  flexShrink: 0,
};

const itemName = {
  fontSize: 13,
  fontWeight: 600,
  margin: 0,
  color: theme.colors.dark,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

const itemQty = { fontSize: 11, color: theme.colors.muted, margin: 0 };

const promoSection = {
  marginTop: 24,
  paddingTop: 20,
  borderTop: `1px solid ${theme.colors.border}`,
};

const promoTitle = { fontSize: 14, marginBottom: 10, color: theme.colors.dark };

const promoInputRow = {
  display: "flex",
  gap: 8,
};

const promoInputStyle = {
  flex: 1,
  minWidth: 0,
  padding: "10px 12px",
  borderRadius: 10,
  border: `1px solid ${theme.colors.border}`,
  background: theme.colors.inputBg,
  color: theme.colors.text,
  fontSize: 13,
  outline: "none",
  textTransform: "uppercase",
  boxSizing: "border-box",
};

const applyBtn = {
  padding: "10px 14px",
  background: theme.colors.primary,
  color: "#fff",
  border: "none",
  borderRadius: 10,
  cursor: "pointer",
  fontWeight: 600,
  fontSize: 12,
  whiteSpace: "nowrap",
  flexShrink: 0,
};

const promoErrorText = { color: "#c33", fontSize: 12, marginTop: 8 };

const promoHint = {
  fontSize: 11,
  color: theme.colors.muted,
  marginTop: 8,
  lineHeight: 1.6,
};

const code = {
  background: theme.colors.inputBg,
  padding: "2px 5px",
  borderRadius: 4,
  fontSize: 10,
};

const appliedPromoBox = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 12,
  background: "#d7f5df",
  borderRadius: 10,
  color: "#1d8a3f",
  gap: 10,
};

const promoLabel = { fontSize: 11, marginTop: 2 };

const removePromoBtn = {
  background: "transparent",
  border: "none",
  color: "#1d8a3f",
  cursor: "pointer",
  fontSize: 16,
  flexShrink: 0,
};

const totals = {
  marginTop: 20,
  borderTop: `1px solid ${theme.colors.border}`,
  paddingTop: 16,
};

const totalRow = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 8,
  fontSize: 14,
  color: theme.colors.text,
};

const totalFinal = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: 18,
  fontWeight: 700,
  marginTop: 12,
  borderTop: `1px solid ${theme.colors.border}`,
  paddingTop: 12,
  color: theme.colors.dark,
};

const checkoutBtn = {
  marginTop: 20,
  width: "100%",
  padding: "16px",
  borderRadius: 12,
  border: "none",
  background: theme.colors.primary,
  color: "#fff",
  fontWeight: 600,
  fontSize: 14,
  transition: "0.3s ease",
};

const secureNote = {
  textAlign: "center",
  fontSize: 11,
  color: theme.colors.muted,
  marginTop: 12,
};

const successPage = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: theme.colors.bg,
  padding: 20,
};

const successCard = {
  background: theme.colors.card,
  padding: "40px 28px",
  borderRadius: 24,
  textAlign: "center",
  maxWidth: 480,
  width: "100%",
  boxShadow: theme.shadow.card,
};

const successIcon = {
  width: 80,
  height: 80,
  borderRadius: "50%",
  background: "#d7f5df",
  color: "#27ae60",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 36,
  margin: "0 auto 20px",
  fontWeight: "700",
};

const successTitle = {
  fontSize: 26,
  marginBottom: 10,
  color: theme.colors.dark,
};

const successText = {
  color: theme.colors.muted,
  marginBottom: 24,
  lineHeight: 1.6,
  fontSize: 14,
};

const orderDetailsBox = {
  background: theme.colors.inputBg,
  borderRadius: 14,
  padding: 18,
  marginBottom: 24,
  textAlign: "left",
};

const detailRow = {
  display: "flex",
  justifyContent: "space-between",
  padding: "6px 0",
  fontSize: 13,
  color: theme.colors.text,
  gap: 10,
};

const detailLabel = { color: theme.colors.muted, flexShrink: 0 };

const successBtn = {
  padding: "14px 24px",
  borderRadius: 12,
  border: "none",
  background: theme.colors.primary,
  color: "#fff",
  fontWeight: "600",
  cursor: "pointer",
  fontSize: 14,
  width: "100%",
};