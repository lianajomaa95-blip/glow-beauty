import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { theme } from "../theme";

const slides = [
  {
    tag: "Dermatologist Approved",
    title: "Build Your Perfect Skincare Routine",
    sub: "Premium skincare essentials for hydration, glow & healthy skin.",
    btn: "Shop Skincare",
    link: "/shop",
    image:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=1600&auto=format&fit=crop",
  },
  {
    tag: "Trusted Global Brands",
    title: "Luxury Skincare for Every Skin Type",
    sub: "Discover authentic products from top international brands.",
    btn: "Explore Products",
    link: "/shop",
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1600&auto=format&fit=crop",
  },
  {
    tag: "New Collection",
    title: "Healthy Skin Starts Here",
    sub: "Hydrating formulas and gentle ingredients for daily glow.",
    btn: "Start Shopping",
    link: "/shop",
    image:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=1600&auto=format&fit=crop",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const timerRef = useRef(null);

  const slide = slides[current];

  const start = () => {
    timerRef.current = setInterval(() => {
      setCurrent((p) => (p + 1) % slides.length);
    }, 5000);
  };

  useEffect(() => {
    start();
    return () => clearInterval(timerRef.current);
  }, []);

  const pause = () => clearInterval(timerRef.current);

  const prev = () =>
    setCurrent((c) => (c - 1 + slides.length) % slides.length);

  const next = () =>
    setCurrent((c) => (c + 1) % slides.length);

  return (
    <div
      onMouseEnter={pause}
      onMouseLeave={start}
      style={{
        position: "relative",
        height: "480px",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        backgroundImage: `
          linear-gradient(
            rgba(255,255,255,0.65),
            rgba(255,255,255,0.65)
          ),
          url(${slide.image})
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* LEFT */}
      <button onClick={prev} style={btnStyle}>
        ‹
      </button>

      {/* CONTENT */}
      <div style={{ textAlign: "center", maxWidth: "700px", padding: "0 20px" }}>
        <div style={tagStyle}>{slide.tag}</div>

        <h1 style={titleStyle}>{slide.title}</h1>

        <p style={subStyle}>{slide.sub}</p>

        <button
          onClick={() => navigate(slide.link)}
          style={ctaStyle}
        >
          {slide.btn}
        </button>
      </div>

      {/* RIGHT */}
      <button onClick={next} style={btnStyle}>
        ›
      </button>

      {/* DOTS */}
      <div style={dotsWrap}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              ...dot,
              width: i === current ? "26px" : "8px",
              background:
                i === current
                  ? theme.colors.primary
                  : "rgba(194,104,122,0.3)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ===== styles (clean + reusable) ===== */

const btnStyle = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  width: "44px",
  height: "44px",
  borderRadius: "50%",
  border: `1px solid ${theme.colors.border}`,
  background: "rgba(255,255,255,0.92)",
  color: theme.colors.primary,
  fontSize: "22px",
  cursor: "pointer",
};

const tagStyle = {
  display: "inline-block",
  padding: "8px 16px",
  borderRadius: "999px",
  background: "rgba(255,255,255,0.9)",
  color: theme.colors.primary,
  fontSize: "12px",
  marginBottom: "16px",
  border: `1px solid ${theme.colors.border}`,
};

const titleStyle = {
  color: theme.colors.dark,
  fontSize: "42px",
  fontWeight: "700",
  lineHeight: "1.1",
};

const subStyle = {
  color: theme.colors.muted,
  fontSize: "15px",
  marginTop: "14px",
  marginBottom: "24px",
  lineHeight: "1.7",
};

const ctaStyle = {
  padding: "12px 26px",
  borderRadius: "999px",
  border: "none",
  background: theme.colors.primary,
  color: "white",
  fontWeight: "600",
  cursor: "pointer",
};

const dotsWrap = {
  position: "absolute",
  bottom: "20px",
  display: "flex",
  gap: "8px",
};

const dot = {
  height: "8px",
  borderRadius: "20px",
  border: "none",
  cursor: "pointer",
};