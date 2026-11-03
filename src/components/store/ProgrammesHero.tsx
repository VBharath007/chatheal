"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ProgrammesHero.module.css";

const featuredBowls = [
  {
    title: "Power Bowl",
    image: "/images/power_bowl_photo.jpg",
    word: "Refresh",
    tagline:
      "Delicious, nutrient-packed meals delivered right to your door. Freshness guaranteed, every single day.",
  },
  {
    title: "Green Vitality",
    image: "/images/greens.jpg",
    word: "Nourish",
    tagline:
      "Whole-food botanical nourishment, mindful portions, and energizing Mediterranean goodness.",
  },
  {
    title: "Gentle Reset",
    image: "/images/breakfast.jpg",
    word: "Restore",
    tagline:
      "Antioxidant-rich whole grains, seasonal berries, and restorative rhythms for your daily routine.",
  },
];

export default function ProgrammesHero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredBowls.length);
  };

  const handleScrollToCatalog = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("explore-programmes");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const activeItem = featuredBowls[currentIndex];

  return (
    <section className={styles.heroWrapper} aria-label="Mindful Eating Programmes Hero">
      {/* ==========================================================
          TOP CONTENT ROW: LEFT DETAILS + RIGHT FLOATING GLASS CARD
          ========================================================== */}
      <div className={styles.heroContent}>
        {/* Top-Left: "✦ Mindful Eating" + Subtitle + "Start Your Plan ↗" */}
        <div className={styles.leftBlock}>
          <div className={styles.eyebrow}>
            <span className={styles.sparkleIcon}>✦</span>
            <span>Mindful Eating</span>
          </div>

          <p className={styles.description}>
            {activeItem.tagline}
          </p>

          <Link href="/assessment" className={styles.startPlanBtn} title="Start Your Plan">
            <span>Start Your Plan</span>
            <div className={styles.arrowCircle}>
              <ArrowUpRight size={16} />
            </div>
          </Link>
        </div>

        {/* Top-Right: Floating Glass Card + Next Arrow */}
        <div className={styles.cardAnchor}>
          <div className={styles.floatingCard}>
            <div className={styles.cardPhotoWrap}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeItem.title}
                  src={activeItem.image}
                  alt={activeItem.title}
                  className={styles.cardPhoto}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.22 }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/breakfast.jpg";
                  }}
                />
              </AnimatePresence>
            </div>

            <a
              href="#explore-programmes"
              onClick={handleScrollToCatalog}
              className={styles.cardBadge}
              title={`Explore ${activeItem.title}`}
            >
              <span className={styles.badgeTitle}>{activeItem.title}</span>
              <div className={styles.badgeArrowCircle}>
                <ArrowRight size={13} />
              </div>
            </a>
          </div>

          {/* Floating Navigation Next Arrow on Card Edge */}
          <button
            type="button"
            onClick={handleNext}
            className={styles.navNextBtn}
            title="Next Featured Programme"
            aria-label="Next Featured Programme"
          >
            <ChevronRight size={17} />
          </button>
        </div>
      </div>

      {/* ==========================================================
          BOTTOM: Giant Editorial Typography Spanning Left-to-Right
          Half the word cut off ("pathi word show yakura mathri")
          ========================================================== */}
      <div className={styles.bottomTypographyWrap} aria-hidden="true">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeItem.word}
            className={styles.wordMotionWrap}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className={styles.giantDisplayWord}>
              {activeItem.word}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
