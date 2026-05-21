import { motion } from "framer-motion";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { theme } from "../theme";

export default function Cart({ cart, removeFromCart }) {
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, i) => sum + i.price * i.qty,
    0
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        background: theme.colors.bg,
        minHeight: "100vh",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          background: theme.colors.card,
          borderBottom: `1px solid ${theme.colors.border}`,
          padding: "18px 24px",
        }}
      >
        <h1
          style={{
            color: theme.colors.dark,
            fontSize: "22px",
            fontWeight: "600",
          }}
        >
          Your Cart 🛒
        </h1>
      </div>

      <div
        style={{
          padding: "24px",
          maxWidth: "720px",
          margin: "0 auto",
        }}
      >
        {cart.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              background: theme.colors.card,
              borderRadius: theme.radius.card,
              border: `1px solid ${theme.colors.border}`,
              boxShadow: theme.shadow,
            }}
          >
            <div style={{ fontSize: "50px", marginBottom: "10px" }}>
              🛒
            </div>

            <p
              style={{
                color: theme.colors.dark,
                fontSize: "16px",
                marginBottom: "14px",
              }}
            >
              Your cart is empty
            </p>

            <button
              onClick={() => navigate("/")}
              style={{
                background: theme.colors.primary,
                color: "white",
                border: "none",
                padding: "12px 22px",
                borderRadius: theme.radius.button,
                cursor: "pointer",
              }}
            >
              Shop Now
            </button>
          </div>
        ) : (
          <>
            {/* ITEMS */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {cart.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    padding: "14px",
                    background: theme.colors.card,
                    borderRadius: theme.radius.card,
                    border: `1px solid ${theme.colors.border}`,
                    boxShadow: theme.shadow,
                  }}
                >
                  {/* ICON */}
                  <div
                    style={{
                      width: "54px",
                      height: "54px",
                      borderRadius: "14px",
                      background: theme.colors.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "24px",
                    }}
                  >
                    {item.emoji}
                  </div>

                  {/* INFO */}
                  <div style={{ flex: 1 }}>
                    <p
                      style={{
                        color: theme.colors.dark,
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      {item.name}
                    </p>

                    <p
                      style={{
                        color: theme.colors.muted,
                        fontSize: "12px",
                        marginTop: "2px",
                      }}
                    >
                      × {item.qty}
                    </p>

                    <p
                      style={{
                        color: theme.colors.dark,
                        fontSize: "14px",
                        fontWeight: "600",
                        marginTop: "6px",
                      }}
                    >
                      ${(item.price * item.qty).toFixed(2)}
                    </p>
                  </div>

                  {/* DELETE */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      color: theme.colors.primary,
                      fontSize: "16px",
                    }}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>

            {/* SUMMARY */}
            <div
              style={{
                marginTop: "18px",
                padding: "16px",
                background: theme.colors.card,
                borderRadius: theme.radius.card,
                border: `1px solid ${theme.colors.border}`,
                boxShadow: theme.shadow,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span style={{ color: theme.colors.dark }}>
                Subtotal
              </span>

              <span
                style={{
                  color: theme.colors.dark,
                  fontWeight: "600",
                }}
              >
                ${total.toFixed(2)}
              </span>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
