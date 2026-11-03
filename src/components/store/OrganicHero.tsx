"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, Play, ArrowRight, X } from "lucide-react";
import styles from "./OrganicHero.module.css";

export default function OrganicHero() {
  const [showVideoModal, setShowVideoModal] = useState(false);

  return (
    <section className={styles.heroWrapper}>
      <div className={styles.heroStage}>
        {/* Background Sculpted Light-Luxury SVG Canopy */}
        <svg
          className={styles.canopySvg}
          viewBox="0 0 1440 640"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="canopyGrad" cx="50%" cy="36%" r="66%">
              <stop offset="0%" stopColor="#effbf3" />
              <stop offset="50%" stopColor="#d9f4e4" />
              <stop offset="100%" stopColor="#c2edd3" />
            </radialGradient>
          </defs>
          <path
            d="M 0,0 L 1440,0 L 1440,420 L 1180,420 Q 1150,420 1130,450 L 1025,605 Q 1005,635 970,635 L 470,635 Q 435,635 415,605 L 310,450 Q 290,420 260,420 L 0,420 Z"
            fill="url(#canopyGrad)"
            stroke="rgba(90, 222, 150, 0.45)"
            strokeWidth="1.5"
          />
        </svg>

        {/* Soft Ambient Radial Glow Behind Centerpiece */}
        <div className={styles.ambientGlow} />

        {/* Top Centered Eyebrow */}
        <div className={styles.eyebrow}>
          AI-POWERED ORGANIC LIVING
        </div>

        {/* ==========================================================
            CENTERSTAGE: "Eat" + Organic Produce + "Better."
            ========================================================== */}
        <div className={styles.centerstage}>
          {/* Ghost Watermark Lettering in Deep Green Background */}
          <span className={styles.ghostLeft} aria-hidden="true">Eat</span>
          <span className={styles.ghostRight} aria-hidden="true">Better.</span>

          {/* Main Foreground Typography & Produce Centerpiece */}
          <div className={styles.titleCluster}>
            <h1 className={styles.titleEat}>Eat</h1>

            <div className={styles.produceWrap}>
              <img
                src="/images/produce-cutout.png"
                alt="Fresh organic heirloom tomatoes, avocado, lettuce and broccoli"
                className={styles.produceImg}
                onError={(e) => {
                  // Fallback
                  (e.target as HTMLImageElement).src = "/images/organic-centerpiece.jpg";
                }}
              />
            </div>

            <h1 className={styles.titleBetter}>Better.</h1>
          </div>

          {/* Floating Callout Cards (Row on Mobile, Anchored on Desktop) */}
          <div className={styles.cardsRow}>
            {/* Card: 100% Organic */}
            <div className={styles.cardOrganic}>
              <img
                src="/images/thumb-organic.png"
                alt="Organic Sprout"
                className={styles.cardThumb}
              />
              <div className={styles.cardText}>
                <span className={styles.cardTextBig}>100%</span>
                <span className={styles.cardTextSub}>Organic</span>
              </div>
              <div className={styles.cardProgressBar} />
            </div>

            {/* Card: Farm to Table */}
            <div className={styles.cardFarm}>
              <div className={styles.cardText}>
                <span className={styles.cardTextBig}>Farm to</span>
                <span className={styles.cardTextSub}>Table</span>
              </div>
              <img
                src="/images/thumb-farm.png"
                alt="Farm Greens"
                className={styles.cardThumb}
              />
              <div className={styles.cardProgressBar} />
            </div>
          </div>
        </div>

        {/* ==========================================================
            SCULPTED BOTTOM DOCK ROW (Matches White & Green Regions)
            ========================================================== */}
        <div className={styles.bottomDockRow}>
          {/* Left White Plateau */}
          <div className={styles.dockLeft}>
            <div className={styles.actionCirclesRow}>
              <a
                href="tel:+918248862343"
                className={styles.callCircleBtn}
                title="Call Wellness Concierge"
                aria-label="Call Wellness Concierge"
              >
                <Phone size={17} fill="currentColor" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className={styles.linkedInCircleBtn}
                title="Connect on LinkedIn"
                aria-label="Connect on LinkedIn"
              >
                in
              </a>
            </div>

            <p className={styles.dockLeftQuote}>
              Nature helps people build healthier eating habits
            </p>
          </div>

          {/* Center Green Tongue (Resting over Green SVG) */}
          <div className={styles.dockCenter}>
            <p className={styles.dockCenterText}>
              Discover a new way to experience organic food.
            </p>

            <Link href="/assessment" className={styles.getStartedBtn}>
              <span>GET STARTED</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Right White Plateau */}
          <div className={styles.dockRight}>
            <button
              type="button"
              onClick={() => setShowVideoModal(true)}
              className={styles.watchVideoBtn}
            >
              <span className={styles.playCircle}>
                <Play size={10} fill="currentColor" />
              </span>
              <span>WATCH VIDEO</span>
            </button>

            <div className={styles.statRow}>
              <span className={styles.statNumber}>12M</span>
              <span className={styles.statLabel}>
                Healthy meals personalized
              </span>
            </div>

            <Link href="/recipes" className={styles.exploreLink}>
              EXPLORE NUTRITION
            </Link>
          </div>
        </div>
      </div>

      {/* Video Modal Popup */}
      {showVideoModal && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setShowVideoModal(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(10, 30, 20, 0.78)",
            backdropFilter: "blur(10px)",
            zIndex: 9999,
            display: "grid",
            placeItems: "center",
            padding: "20px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#133d2c",
              border: "1px solid rgba(90, 222, 150, 0.4)",
              borderRadius: "24px",
              padding: "24px",
              maxWidth: "680px",
              width: "100%",
              color: "#ffffff",
              boxShadow: "0 28px 70px rgba(0, 0, 0, 0.45)",
              position: "relative",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 700, color: "#ffffff" }}>
                Eat Better with ChatHeal
              </h3>
              <button
                type="button"
                onClick={() => setShowVideoModal(false)}
                style={{
                  background: "rgba(255, 255, 255, 0.15)",
                  border: "none",
                  color: "#ffffff",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  display: "grid",
                  placeItems: "center",
                  cursor: "pointer",
                }}
              >
                <X size={16} />
              </button>
            </div>
            <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", borderRadius: "16px", background: "#051f13" }}>
              <img
                src="/images/breakfast.jpg"
                alt="Video Preview"
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }}
              />
              <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", background: "rgba(0, 0, 0, 0.3)" }}>
                <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#5ADE96", display: "grid", placeItems: "center", color: "#0c3822", boxShadow: "0 8px 24px rgba(90, 222, 150, 0.4)" }}>
                  <Play size={26} fill="currentColor" />
                </div>
              </div>
            </div>
            <p style={{ marginTop: "14px", fontSize: "13px", color: "#b9edd0", lineHeight: 1.45 }}>
              A thoughtful look into our farm-to-table nutrition philosophy and mindful living principles.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
