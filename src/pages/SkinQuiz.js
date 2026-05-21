import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import { theme } from "../theme";

export default function SkinQuiz() {
  const navigate = useNavigate();

  // 🛍️ FETCH PRODUCTS FROM SHOPIFY
  const { products, loading: productsLoading } = useProducts();

  const [answers, setAnswers] = useState({
    skinType: "",
    concern: "",
  });

  const [loading, setLoading] = useState(false);

  /* ================= HANDLE INPUT ================= */

  const handleChange = (e) => {
    setAnswers({
      ...answers,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= AI RECOMMENDATION LOGIC ================= */

  const getRecommendations = () => {
    // validation
    if (!answers.skinType || !answers.concern) {
      alert("Please answer all questions ✨");
      return;
    }

    if (productsLoading || products.length === 0) {
      alert("Products are still loading, please wait a moment...");
      return;
    }

    setLoading(true);

    const scored = products.map((p) => {
      let score = 0;
      let reasons = [];

      /* ================= SKIN TYPE MATCH ================= */

      const normalizedSkinTypes =
        p.skinType?.map((s) => s.toLowerCase()) || [];

      if (normalizedSkinTypes.includes(answers.skinType.toLowerCase())) {
        score += 2;
        reasons.push(`Perfect for ${answers.skinType} skin`);
      }

      /* ================= CONCERN MATCH ================= */

      const normalizedConcerns =
        p.concerns?.map((c) => c.toLowerCase()) || [];

      const formattedConcern = answers.concern
        .replace("_", " ")
        .toLowerCase();

      if (normalizedConcerns.includes(formattedConcern)) {
        score += 3;
        reasons.push(`Targets ${formattedConcern}`);
      }

      /* ================= BONUS AI SCORE ================= */

      if (p.tag === "Bestseller" || p.tag === "New") {
        score += 1;
        reasons.push("Trending dermatologist favorite");
      }

      return {
        ...p,
        score,
        reasonText: reasons,
      };
    });

    const results = scored
      .filter((p) => p.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);

    // fake AI delay
    setTimeout(() => {
      setLoading(false);

      /* ================= AI GLOW SCORE ================= */

      let glowScore = 70;

      if (answers.skinType === "dry") glowScore += 5;
      if (answers.skinType === "sensitive") glowScore += 3;
      if (answers.concern === "hydration") glowScore += 10;
      if (answers.concern === "anti-aging") glowScore += 8;
      if (results.length >= 4) glowScore += 7;
      if (glowScore > 100) glowScore = 100;

      /* ================= NAVIGATE ================= */

      navigate("/recommendations", {
        state: {
          recommended: results,
          skinType: answers.skinType,
          concern: answers.concern,
          glowScore,
        },
      });
    }, 1200);
  };

  return (
    <div style={page}>
      <div style={card}>
        {/* HEADER */}
        <div style={badge}>AI POWERED ANALYSIS</div>

        <h1 style={title}>✨ AI Skin Quiz</h1>

        <p style={subtitle}>
          Get personalized skincare recommendations powered by AI.
        </p>

        {/* SKIN TYPE */}
        <label style={label}>Skin Type</label>

        <select
          name="skinType"
          value={answers.skinType}
          onChange={handleChange}
          style={input}
        >
          <option value="">Select your skin type</option>
          <option value="dry">Dry</option>
          <option value="oily">Oily</option>
          <option value="combination">Combination</option>
          <option value="sensitive">Sensitive</option>
        </select>

        {/* CONCERN */}
        <label style={label}>Main Concern</label>

        <select
          name="concern"
          value={answers.concern}
          onChange={handleChange}
          style={input}
        >
          <option value="">Select your concern</option>
          <option value="acne">Acne</option>
          <option value="dark_spots">Dark Spots</option>
          <option value="hydration">Hydration</option>
          <option value="anti-aging">Anti-Aging</option>
        </select>

        {/* AI FEATURES */}
        <div style={features}>
          <div style={feature}>🧠 AI Matching</div>
          <div style={feature}>✨ Smart Routine</div>
          <div style={feature}>💎 Personalized</div>
        </div>

        {/* BUTTON */}
        <button
          onClick={getRecommendations}
          style={{
            ...btn,
            opacity: loading || productsLoading ? 0.8 : 1,
          }}
          disabled={loading || productsLoading}
        >
          {productsLoading
            ? "Loading Products..."
            : loading
            ? "Analyzing Your Skin..."
            : "Get My Routine ✨"}
        </button>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const page = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(to bottom, #fff, #f7f7f7)",
  padding: 20,
};

const card = {
  width: "100%",
  maxWidth: 460,
  background: "#fff",
  padding: 34,
  borderRadius: 28,
  boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
  border: "1px solid #f0f0f0",
};

const badge = {
  display: "inline-block",
  padding: "6px 12px",
  borderRadius: 999,
  background: "#fdf1f4",
  color: theme.colors.primary,
  fontSize: 11,
  fontWeight: 700,
  marginBottom: 16,
};

const title = {
  fontSize: 32,
  marginBottom: 10,
  color: theme.colors.dark,
};

const subtitle = {
  color: "#666",
  marginBottom: 24,
  lineHeight: 1.6,
};

const label = {
  display: "block",
  marginTop: 18,
  marginBottom: 8,
  fontSize: 13,
  fontWeight: 600,
  color: theme.colors.dark,
};

const input = {
  width: "100%",
  padding: 14,
  borderRadius: 14,
  border: "1px solid #ddd",
  fontSize: 14,
  background: "#fafafa",
  outline: "none",
};

const features = {
  display: "flex",
  gap: 10,
  flexWrap: "wrap",
  marginTop: 22,
};

const feature = {
  padding: "8px 12px",
  borderRadius: 999,
  background: "#f8f8f8",
  fontSize: 12,
  color: "#555",
};

const btn = {
  marginTop: 28,
  width: "100%",
  padding: 16,
  borderRadius: 16,
  border: "none",
  background: theme.colors.primary,
  color: "white",
  fontWeight: 700,
  fontSize: 15,
  cursor: "pointer",
};