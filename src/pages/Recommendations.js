import { useNavigate, useLocation } from "react-router-dom";
import { theme } from "../theme";

export default function Recommendations({
  addToCart,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const recommended =
    location.state?.recommended || [];

  const skinType =
    location.state?.skinType || "";

  const concern =
    location.state?.concern || "";

  /* ================= AI GLOW SCORE ================= */

  let glowScore = 72;

  if (
    skinType === "dry" &&
    concern === "hydration"
  ) {
    glowScore = 94;
  }

  if (
    skinType === "oily" &&
    concern === "acne"
  ) {
    glowScore = 88;
  }

  if (
    skinType === "sensitive"
  ) {
    glowScore = 91;
  }

  if (
    skinType === "combination"
  ) {
    glowScore = 86;
  }

  return (
    <div style={page}>
      {/* HEADER */}

      <h1 style={title}>
        ✨ Your Personalized Skin Routine
      </h1>

      <p style={subtitle}>
        Based on your skin profile,
        our AI selected the best
        skincare products for you.
      </p>

      {/* GLOW SCORE */}

      <div style={scoreCard}>
        <div style={scoreCircle}>
          {glowScore}
        </div>

        <div>
          <div style={scoreLabel}>
            AI Glow Score
          </div>

          <div style={scoreText}>
            Your skin routine is optimized
            for healthier, brighter skin.
          </div>
        </div>
      </div>

      {/* EMPTY STATE */}

      {recommended.length === 0 ? (
        <div style={empty}>
          <h2>
            No recommendations found
          </h2>

          <p style={{ color: "#666" }}>
            Try retaking the quiz with
            different answers.
          </p>

          <button
            onClick={() =>
              navigate("/skin-quiz")
            }
            style={retryBtn}
          >
            Retake Skin Quiz
          </button>
        </div>
      ) : (
        <>
          {/* PRODUCTS */}

          <div style={grid}>
            {recommended.map((p) => (
              <div
                key={p.id}
                style={card}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  style={img}
                />

                <div
                  style={badge}
                >
                  AI Match
                </div>

                <h3 style={productName}>
                  {p.name}
                </h3>

                <p style={brand}>
                  {p.brand}
                </p>

                <p style={description}>
                  {p.description}
                </p>

                <strong style={price}>
                  ${p.price}
                </strong>

                <button
                  onClick={() =>
                    addToCart(p)
                  }
                  style={btn}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>

          {/* ACTIONS */}

          <div style={actions}>
            <button
              onClick={() =>
                navigate("/skin-quiz")
              }
              style={secondaryBtn}
            >
              Retake Quiz
            </button>

            <button
              onClick={() =>
                navigate("/shop")
              }
              style={primaryBtn}
            >
              Continue Shopping
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/* ================= STYLES ================= */

const page = {
  padding: 30,
  background: "#f7f7f7",
  minHeight: "100vh",
};

const title = {
  fontSize: 34,
  marginBottom: 10,
  color: theme.colors.dark,
};

const subtitle = {
  color: "#666",
  marginBottom: 30,
  maxWidth: 700,
  lineHeight: 1.6,
};

const scoreCard = {
  marginBottom: 40,
  display: "flex",
  alignItems: "center",
  gap: 20,
  background: "#fff",
  padding: "20px 26px",
  borderRadius: 24,
  boxShadow:
    "0 10px 30px rgba(0,0,0,0.05)",
  maxWidth: 430,
};

const scoreCircle = {
  width: 90,
  height: 90,
  borderRadius: "50%",
  background:
    "linear-gradient(135deg,#ffb6c1,#c2687a)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  fontSize: 30,
  fontWeight: 800,
};

const scoreLabel = {
  fontSize: 20,
  fontWeight: 700,
  color: theme.colors.dark,
};

const scoreText = {
  marginTop: 6,
  fontSize: 13,
  color: "#666",
  lineHeight: 1.5,
};

const grid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 24,
};

const card = {
  background: "#fff",
  borderRadius: 22,
  overflow: "hidden",
  padding: 18,
  position: "relative",
  boxShadow:
    "0 10px 30px rgba(0,0,0,0.05)",
};

const img = {
  width: "100%",
  height: 220,
  objectFit: "cover",
  borderRadius: 18,
};

const badge = {
  position: "absolute",
  top: 28,
  left: 28,
  background: "#c2687a",
  color: "#fff",
  padding: "6px 10px",
  borderRadius: 20,
  fontSize: 11,
  fontWeight: 700,
};

const productName = {
  marginTop: 16,
  marginBottom: 4,
  color: theme.colors.dark,
};

const brand = {
  fontSize: 13,
  color: "#999",
  marginBottom: 10,
};

const description = {
  fontSize: 13,
  color: "#666",
  lineHeight: 1.6,
  minHeight: 70,
};

const price = {
  display: "block",
  marginTop: 12,
  marginBottom: 14,
  fontSize: 18,
};

const btn = {
  width: "100%",
  padding: 13,
  background: theme.colors.primary,
  color: "#fff",
  border: "none",
  borderRadius: 14,
  fontWeight: 600,
  cursor: "pointer",
};

const actions = {
  marginTop: 40,
  display: "flex",
  gap: 16,
  flexWrap: "wrap",
};

const primaryBtn = {
  padding: "14px 24px",
  background: theme.colors.primary,
  color: "#fff",
  border: "none",
  borderRadius: 14,
  cursor: "pointer",
  fontWeight: 600,
};

const secondaryBtn = {
  padding: "14px 24px",
  background: "#fff",
  border: "1px solid #ddd",
  borderRadius: 14,
  cursor: "pointer",
  fontWeight: 600,
};

const empty = {
  background: "#fff",
  padding: 40,
  borderRadius: 24,
  textAlign: "center",
};

const retryBtn = {
  marginTop: 20,
  padding: "14px 22px",
  border: "none",
  borderRadius: 14,
  background: theme.colors.primary,
  color: "#fff",
  cursor: "pointer",
  fontWeight: 600,
};