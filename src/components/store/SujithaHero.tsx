"use client";

import Link from "next/link";
import { Sparkles, GraduationCap } from "lucide-react";
import styles from "./SujithaHero.module.css";

interface SujithaHeroProps {
  onScrollToStory?: () => void;
}

export default function SujithaHero({ onScrollToStory }: SujithaHeroProps) {
  return (
    <section className={styles.heroSection} aria-label="Meet Sujitha - ChatHeal Founder & Clinical Nutritionist">
      <div className={styles.heroCard}>
        {/* Soft Ambient Radial Glow Behind Card */}
        <div className={styles.ambientGlow} />

        {/* ========================================================
            LEFT COLUMN: EYEBROW, HEADLINE, SUBTITLE, PILL BUTTONS
            ======================================================== */}
        <div className={styles.leftColumn}>
          <div className={styles.eyebrowBadge}>
            <Sparkles size={14} className={styles.sparkleIcon} />
            <span>Meet Sujitha · Chief Nutritionist</span>
          </div>

          <h1 className={styles.headline}>
            Expertise with warmth,
            <span className={styles.headlineAccent}>for your future.</span>
          </h1>

          <p className={styles.subtitle}>
            Meet the person behind ChatHeal, and the personal approach at the heart of your wellness journey. Evidence-based natural nutrition and thoughtful routines crafted for your everyday vitality.
          </p>

          {/* Action Buttons Row: Solid #5ADE96 Pill + Transparent Outline Pill */}
          <div className={styles.actionsRow}>
            <Link
              href="/contact"
              className={styles.primaryBtn}
              title="Get Started with Sujitha"
            >
              <span>Get Started</span>
            </Link>

            <Link
              href="/approach"
              className={styles.secondaryBtn}
              title="Learn about Our Approach"
            >
              <span>Our Approach</span>
            </Link>
          </div>
        </div>

        {/* ========================================================
            RIGHT COLUMN: EXECUTIVE PORTRAIT CARD
            ======================================================== */}
        <div className={styles.rightColumn}>
          <div className={styles.photoFrame}>
            <img
              src="/images/sujitha_executive_portrait.jpeg"
              alt="Sujitha C., Founder and Clinical Nutritionist at ChatHeal"
              className={styles.portraitImg}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/images/wellness_nutritionist_fruits.jpg";
              }}
            />

            {/* Floating Credential Tag */}
            <div className={styles.credentialPill}>
              <GraduationCap size={15} className={styles.gradIcon} />
              <span>PGND · MPhil · Dietetics</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

