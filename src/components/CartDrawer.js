import { useNavigate } from "react-router-dom";
import { theme } from "../theme";

export default function CartDrawer({
  cart = [],
  isOpen,
  onClose,
  onRemove,
  onUpdateQty,
}) {
  const navigate = useNavigate();

  // 🧠 SAFE TOTAL
  const total = cart.reduce(
    (sum, item) =>
      sum +
      Number(item.price) * Number(item.qty || 1),
    0
  );

  return (
    <>
      {/* ================= BACKDROP ================= */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(6px)",
            zIndex: 9998, // 🔥 ABOVE EVERYTHING EXCEPT DRAWER
          }}
        />
      )}

      {/* ================= DRAWER ================= */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100vh",
          width: "390px",
          maxWidth: "100%",
          background: theme.colors.card || "#fff",
          zIndex: 9999, // 🔥 TOP LAYER
          transform: isOpen
            ? "translateX(0)"
            : "translateX(100%)",
          transition: "0.35s ease",
          boxShadow: "-12px 0 40px rgba(0,0,0,0.15)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* ================= HEADER ================= */}
        <div
          style={{
            padding: "18px",
            borderBottom: `1px solid ${theme.colors.border}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3 style={{ margin: 0, fontSize: "16px" }}>
            Your Cart ({cart.length})
          </h3>

          <button
            onClick={onClose}
            style={{
              border: "none",
              background: "transparent",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>

        {/* ================= ITEMS ================= */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "12px",
          }}
        >
          {cart.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                marginTop: "60px",
                color: "#999",
              }}
            >
              <div style={{ fontSize: "40px" }}>🛍️</div>
              <p>Your cart is empty</p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  gap: "12px",
                  padding: "12px",
                  borderBottom:
                    "1px solid rgba(0,0,0,0.05)",
                  alignItems: "center",
                }}
              >
                {/* IMAGE */}
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "58px",
                    height: "58px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />

                {/* INFO */}
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: "500",
                    }}
                  >
                    {item.name}
                  </div>

                  <div
                    style={{
                      fontSize: "12px",
                      color: "#888",
                      marginTop: "2px",
                    }}
                  >
                    ${item.price}
                  </div>

                  {/* QTY */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginTop: "6px",
                    }}
                  >
                    <button
                      onClick={() =>
                        onUpdateQty?.(item.id, -1)
                      }
                      style={qtyBtn}
                    >
                      −
                    </button>

                    <span style={{ fontSize: "12px" }}>
                      {item.qty || 1}
                    </span>

                    <button
                      onClick={() =>
                        onUpdateQty?.(item.id, 1)
                      }
                      style={qtyBtn}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* REMOVE */}
                <button
                  onClick={() => onRemove?.(item.id)}
                  style={removeBtn}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {/* ================= FOOTER ================= */}
        <div
          style={{
            padding: "16px",
            borderTop: "1px solid rgba(0,0,0,0.08)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "12px",
              fontWeight: "600",
            }}
          >
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button
            disabled={cart.length === 0}
            onClick={() => {
              onClose?.();
              navigate("/checkout");
            }}
            style={{
              ...checkoutBtn,
              opacity: cart.length === 0 ? 0.5 : 1,
              cursor:
                cart.length === 0
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
}

/* ================= STYLES ================= */

const qtyBtn = {
  width: "26px",
  height: "26px",
  borderRadius: "6px",
  border: "1px solid #ddd",
  background: "white",
  cursor: "pointer",
};

const removeBtn = {
  border: "none",
  background: "transparent",
  color: "#d33",
  cursor: "pointer",
  fontSize: "12px",
};

const checkoutBtn = {
  width: "100%",
  padding: "12px",
  background: theme.colors.primary,
  color: "white",
  border: "none",
  borderRadius: "10px",
  fontWeight: "600",
};