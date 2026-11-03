import Link from "next/link";
import { Sparkles, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main
      className="loading-screen"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        background:
          "radial-gradient(ellipse at 50% 30%, #f0fdf4 0%, #f8fafc 100%)",
      }}
    >
      <div
        style={{
          maxWidth: 440,
          width: "100%",
          background: "#ffffff",
          padding: "2.5rem 2rem",
          borderRadius: "1.25rem",
          border: "1px solid #e2e8f0",
          boxShadow: "0 20px 40px -15px rgba(15,23,42,0.08)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "#ecfdf5",
            color: "#059669",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1.25rem",
          }}
        >
          
        </div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "0.25rem 0.75rem",
            borderRadius: 9999,
            background: "#f1f5f9",
            color: "#475569",
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: "0.75rem",
          }}
        >
          404 · Page Not Found
        </div>
        <h1
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "1.75rem",
            fontWeight: 700,
            color: "#0f172a",
            marginBottom: "0.5rem",
          }}
        >
          Looking for something?
        </h1>
        <p
          style={{
            color: "#64748b",
            fontSize: "0.9375rem",
            lineHeight: 1.6,
            marginBottom: "1.75rem",
          }}
        >
          The wellness section or routine you requested could not be located.
          Let's guide you back to your personal dashboard.
        </p>
        <Link
          className="btn primary"
          href="/"
          style={{ width: "100%", justifyContent: "center", gap: "0.5rem" }}
        >
          <ArrowLeft size={16} />
          Return to Member Overview
        </Link>
      </div>
    </main>
  );
}
