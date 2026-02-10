import React from "react";

/**
 * ErrorBoundary catches runtime/render errors in React components
 * and shows a fallback UI instead of breaking the whole app.
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("🔥 Caught by ErrorBoundary:", error, info);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
    // optionally reload page
    // window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={fallbackWrap}>
          <div style={fallbackCard}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L2 22h20L12 2z"
                stroke="#ff4757"
                strokeWidth="2"
                fill="none"
              />
              <circle cx="12" cy="17" r="1.5" fill="#ff4757" />
              <path d="M12 8v5" stroke="#ff4757" strokeWidth="2" />
            </svg>
            <h2 style={{ fontWeight: "700" }}>Something went wrong 😢</h2>
            <p style={{ color: "#555", maxWidth: "400px", textAlign: "center" }}>
              We couldn’t load this section right now. Try again or reload the page.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={this.handleRetry} style={retryBtn}>
                Retry
              </button>
              <button onClick={() => window.location.reload()} style={reloadBtn}>
                Reload
              </button>
            </div>
            {process.env.NODE_ENV === "development" && (
              <details style={{ marginTop: 8, color: "#999", fontSize: "12px" }}>
                <summary>Error message</summary>
                {this.state.error?.toString()}
              </details>
            )}
          </div>
        </div>
      );
    }

    // No error → render normally
    return this.props.children;
  }
}

/* ✨ Simple fallback styles */
const fallbackWrap = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg,#fff,#f3f4f6)",
};

const fallbackCard = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 12,
  padding: "32px",
  borderRadius: "16px",
  background: "#fff",
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
};

const retryBtn = {
  background: "#ff4757",
  color: "#fff",
  border: "none",
  padding: "8px 16px",
  borderRadius: 8,
  cursor: "pointer",
  fontWeight: 600,
};

const reloadBtn = {
  background: "#fff",
  border: "1px solid #ddd",
  color: "#333",
  padding: "8px 16px",
  borderRadius: 8,
  cursor: "pointer",
  fontWeight: 600,
};
