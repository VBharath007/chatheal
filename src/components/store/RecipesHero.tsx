"use client";

import React from "react";
import Link from "next/link";
import { Star, Sparkles } from "lucide-react";
import styles from "./RecipesHero.module.css";

interface RecipesHeroProps {
  onScrollToExplore?: () => void;
}

export default function RecipesHero({ onScrollToExplore }: RecipesHeroProps) {
  const handleScrollToRecipes = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onScrollToExplore) {
      onScrollToExplore();
      return;
    }
    const el = document.getElementById("explore-recipes");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className={styles.heroOuter} aria-label="Freshly Harvested Whole Food Recipes & Stories">
      <div className={styles.heroInner}>
        {/* ====================================================
            LEFT COLUMN: TYPOGRAPHY, BUTTON, RATING & FRUIT CARD
            ==================================================== */}
        <div className={styles.leftColumn}>
          {/* Top Headline: "Freshly" [Circular Fruit Badge] "Harvested" */}
          <h1 className={styles.headlineWrap}>
            <span className={styles.wordMain}>Freshly</span>

            <div className={styles.fruitBadgeWrap} title="Nourish with Heart">
              {/* Circular Fresh Organic Fruit Badge */}
              <img
                src="/images/fruit_badge@2x.png"
                alt="Fresh organic fruits badge"
                className={styles.fruitImg}
              />

              {/* Curved Script Text "Nourish with Heart" (Hugs Top Circle Rim) */}
              <svg className={styles.curvedSvg} viewBox="0 0 160 160" aria-hidden="true">
                <defs>
                  <path
                    id="fruitCurvePath"
                    d="M 24,54 A 62,62 0 0,1 136,54"
                    fill="transparent"
                  />
                </defs>
                <text className={styles.curvedScriptText}>
                  <textPath href="#fruitCurvePath" startOffset="50%" textAnchor="middle">
                    Nourish with Heart
                  </textPath>
                </text>
              </svg>
            </div>

            <span className={styles.wordMain}>Harvested</span>
          </h1>

          {/* Subtitle */}
          <p className={styles.subtitle}>
            Small-batch nutrient-dense recipes crafted with organic whole fruits, seasonal herbs, and zero shortcuts.
          </p>

          {/* Actions & Highlights Grid (Fills the gap between Left Card and Right Nutritionist) */}
          <div className={styles.bottomContentGrid}>
            {/* Left Sub-Column: Button, Social Proof & Fresh Harvest Board */}
            <div className={styles.leftActionsSubCol}>
              <div className={styles.actionsRow}>
                <a
                  href="#explore-recipes"
                  onClick={handleScrollToRecipes}
                  className={styles.organicButton}
                  title="Explore Wholesome Recipes"
                  aria-label="Explore Wholesome Recipes"
                >
                  Explore Recipes
                </a>

                <div className={styles.statBadge} aria-label="100+ Wholesome Recipes, 5 star rating">
                  <span className={styles.statNumber}>100+</span>
                  <span className={styles.statLabel}>Wholesome Recipes</span>
                  <div className={styles.starRow} aria-hidden="true">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} fill="#c89b3c" stroke="#c89b3c" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom-Left Card with Fresh Harvest Board & Quote */}
              <div className={styles.produceCard}>
                <div className={styles.produceVisualWrap}>
                  <img
                    src="/images/fresh_harvest_board.jpg"
                    alt="Fresh organic figs, pomegranate seeds, and emerald grapes on olive wood board"
                    className={styles.produceVisual}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/images/fresh_fruit_card.png";
                    }}
                  />
                </div>

                <div className={styles.produceTextWrap}>
                  <div className={styles.produceTag}>
                    <Sparkles size={11} className={styles.tagIcon} />
                    <span>Crafted Fresh</span>
                  </div>
                  <p className={styles.produceQuote}>
                    Every recipe is <strong>100% Whole Foods</strong>. Organically grown fruits, seasonal herbs & zero shortcuts.
                  </p>
                </div>
              </div>
            </div>

            {/* Middle Sub-Column: Editorial Botanical Promise (Fills the Gap with Rich Substance!) */}
            <div className={styles.middlePillarsCol}>
              <div className={styles.pillarsHeader}>
                <span className={styles.pillarsEyebrow}>ORGANIC PROMISE</span>
                <div className={styles.pillarStars} aria-hidden="true">
                  <span>★</span>
                  <span>★</span>
                </div>
              </div>

              <div className={styles.pillarItem}>
                <div className={styles.pillarBullet}>01</div>
                <div className={styles.pillarText}>
                  <h4>100% Whole Foods</h4>
                  <p>Sun-ripened fruits & heirloom botanicals direct from sustainable organic groves.</p>
                </div>
              </div>

              <div className={styles.pillarItem}>
                <div className={styles.pillarBullet}>02</div>
                <div className={styles.pillarText}>
                  <h4>Zero Preservatives</h4>
                  <p>Small-batch preparations crafted fresh every day with zero refined additives.</p>
                </div>
              </div>

              <div className={styles.pillarItem}>
                <div className={styles.pillarBullet}>03</div>
                <div className={styles.pillarText}>
                  <h4>Coach Calibrated</h4>
                  <p>Every recipe formulated for balanced energy flux & gut microbiome vitality.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ====================================================
            RIGHT COLUMN: SMILING NUTRITIONIST WITH ORGANIC FRUIT BASKET
            ==================================================== */}
        <div className={styles.rightColumn}>
          <img
            src="/images/nutritionist_blended.png"
            alt="Radiant nutritionist smiling and holding a basket overflowing with fresh organic fruits and produce"
            className={styles.nutritionistVisual}
          />
        </div>
      </div>
    </section>
  );
}
