// src/components/ErrorBoundary.js
//
// Catches JavaScript errors anywhere in its children's component tree.
// Shows a graceful fallback UI instead of a white screen of death.

import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log to console (in production, send to error tracking service)
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = "/";
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={page}>
          <div style={card}>
            <div style={icon}>⚠️</div>
            <h1 style={title}>Something went wrong</h1>
            <p style={text}>
              We're sorry — an unexpected error occurred. Don't worry, your
              data is safe.
            </p>

            <div style={details}>
              <details>
                <summary style={summary}>Technical details</summary>
                <pre style={errorMsg}>
                  {this.state.error?.message || "Unknown error"}
                </pre>
              </details>
            </div>

            <div style={buttons}>
              <button onClick={this.handleReload} style={primaryBtn}>
                Reload Page
              </button>
              <button onClick={this.handleReset} style={secondaryBtn}>
                Go to Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/* ================= STYLES ================= */

const page = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#fff5f7",
  padding: 20,
};

const card = {
  background: "#ffffff",
  padding: "50px 40px",
  borderRadius: 24,
  textAlign: "center",
  maxWidth: 500,
  width: "100%",
  boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
};

const icon = {
  fontSize: 60,
  marginBottom: 20,
};

const title = {
  fontFamily: "'Playfair Display', serif",
  fontSize: 28,
  color: "#7d2a3c",
  margin: "0 0 12px",
};

const text = {
  color: "#666",
  lineHeight: 1.6,
  marginBottom: 24,
};

const details = {
  background: "#fafafa",
  padding: 12,
  borderRadius: 10,
  marginBottom: 24,
  textAlign: "left",
};

const summary = {
  cursor: "pointer",
  fontSize: 12,
  fontWeight: 600,
  color: "#888",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
};

const errorMsg = {
  marginTop: 8,
  fontSize: 11,
  color: "#c33",
  background: "#fff",
  padding: 10,
  borderRadius: 6,
  border: "1px solid #fee",
  overflow: "auto",
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
};

const buttons = {
  display: "flex",
  gap: 10,
  justifyContent: "center",
  flexWrap: "wrap",
};

const primaryBtn = {
  padding: "12px 24px",
  background: "#c2687a",
  color: "#fff",
  border: "none",
  borderRadius: 12,
  cursor: "pointer",
  fontWeight: 600,
  fontSize: 14,
};

const secondaryBtn = {
  padding: "12px 24px",
  background: "transparent",
  color: "#7d2a3c",
  border: "1px solid #7d2a3c",
  borderRadius: 12,
  cursor: "pointer",
  fontWeight: 600,
  fontSize: 14,
};