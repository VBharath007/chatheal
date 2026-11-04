"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Check,
  ArrowRight,
  ShieldCheck,
  Video,
  MessageCircle,
  Leaf,
  Heart,
  ArrowUpRight,
} from "lucide-react";
import { packages } from "@/lib/catalog";
import SubscriptionModal from "@/components/store/SubscriptionModal";
import styles from "./PackagesPage.module.css";

export default function PackagesPage() {
  const [activeModalPackage, setActiveModalPackage] = useState<
    "monthly" | "six-month" | "yearly" | null
  >(null);

  const handleSelectPackage = (pkgId: "monthly" | "six-month" | "yearly") => {
    setActiveModalPackage(pkgId);
  };

  return (
    <main className={styles.pageWrapper}>
      {/* ==========================================================
          LUXURY EDITORIAL HERO
          ========================================================== */}
      <section className={styles.heroSection} aria-label="Care Packages Overview">
        <div className={styles.heroEyebrowPill}>
          <Sparkles size={13} className={styles.sparkleGold} />
          <span>Transparent Clinical Care</span>
        </div>

        <h1 className={styles.heroTitle}>
          Simple, Thoughtful Care.
          <br />
          <em>Crafted for Your Life.</em>
        </h1>

        <p className={styles.heroSubtitle}>
          1-on-1 clinical nutrition mentorship with Founder & Dietitian Sujitha C.
          Honest pricing, tailored whole-food protocols, and zero shortcuts.
        </p>

        {/* Clean 3-Pillar Micro Badges */}
        <div className={styles.trustPillarsRow}>
          <div className={styles.trustPillarItem}>
            <Leaf size={14} className={styles.sparkleGold} />
            <span>100% Whole-Food Focus</span>
          </div>
          <span className={styles.trustPillarDot} aria-hidden="true">·</span>
          <div className={styles.trustPillarItem}>
            <Video size={14} className={styles.sparkleGold} />
            <span>1-on-1 Video Care</span>
          </div>
          <span className={styles.trustPillarDot} aria-hidden="true">·</span>
          <div className={styles.trustPillarItem}>
            <MessageCircle size={14} className={styles.sparkleGold} />
            <span>Daily WhatsApp Mentorship</span>
          </div>
        </div>
      </section>

      {/* ==========================================================
          PACKAGES SHOWCASE (3 MINIMALIST LUXURY CARDS)
          ========================================================== */}
      <section className={styles.packagesSection} aria-label="Available Packages">
        <div className={styles.packagesGrid}>
          {packages.map((pkg) => {
            const isPopular = pkg.id === "six-month";
            const isVip = pkg.id === "yearly";

            return (
              <article
                key={pkg.id}
                className={`${styles.packageCard} ${
                  isPopular
                    ? styles.packageCardPopular
                    : isVip
                    ? styles.packageCardVIP
                    : ""
                }`}
              >
                {/* Floating Ribbon Badge */}
                {pkg.badge && (
                  <div
                    className={`${styles.cardBadge} ${
                      isPopular
                        ? styles.badgePopular
                        : isVip
                        ? styles.badgeGold
                        : ""
                    }`}
                  >
                    {pkg.badge}
                  </div>
                )}

                {/* Card Title & Duration */}
                <div className={styles.cardHeader}>
                  <span className={styles.planEyebrow}>{pkg.eyebrow}</span>
                  <h2 className={styles.planTitle}>{pkg.title}</h2>
                  <span className={styles.planDurationLabel}>
                    {pkg.durationLabel}
                  </span>
                </div>

                {/* Price Display */}
                <div className={styles.priceBox}>
                  <div className={styles.priceMainRow}>
                    <span className={styles.currency}>₹</span>
                    <span className={styles.priceAmount}>
                      {pkg.price.toLocaleString("en-IN")}
                    </span>
                    <span className={styles.pricePeriod}>
                      {pkg.id === "monthly" ? "/ mo" : "total"}
                    </span>
                  </div>

                  <div className={styles.effectiveMonthlyRow}>
                    <span className={styles.effectiveBadge}>
                      ₹{pkg.effectiveMonthly.toLocaleString("en-IN")} / month
                    </span>
                    {pkg.savingsText && (
                      <span className={styles.savingsTag}>{pkg.savingsText}</span>
                    )}
                  </div>
                </div>

                {/* Key Features List (Uncluttered) */}
                <ul className={styles.featuresList}>
                  {pkg.features.map((feat) => (
                    <li key={feat} className={styles.featureItem}>
                      <span className={styles.checkIcon}>
                        <Check size={11} strokeWidth={3} />
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Action CTA Button */}
                <button
                  type="button"
                  onClick={() => handleSelectPackage(pkg.id)}
                  className={`${styles.ctaButton} ${
                    isPopular
                      ? styles.btnPopular
                      : isVip
                      ? styles.btnGold
                      : styles.btnSecondary
                  }`}
                  aria-label={`Select ${pkg.title}`}
                >
                  <span>Select {pkg.period}</span>
                  <ArrowRight size={16} />
                </button>

                <p className={styles.guaranteeFootnote}>
                  {pkg.id === "monthly"
                    ? "Renew or cancel anytime · No lock-in"
                    : pkg.id === "six-month"
                    ? "14-day vacation pause protection"
                    : "VIP 24/7 priority line · 30-day pause"}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* ==========================================================
          SIDE-BY-SIDE INCLUSIONS COMPARISON TABLE
          ========================================================== */}
      <section className={styles.tableSection} aria-label="Package Inclusions Comparison">
        <div className={styles.tableHeading}>
          <h2>Compare Package Inclusions</h2>
          <p>A transparent breakdown of each tier to help you choose the right level of support.</p>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.compareTable}>
            <thead>
              <tr>
                <th>Care Features</th>
                <th>Per Month (₹3,000)</th>
                <th>6 Months (₹12,000)</th>
                <th>Yearly VIP (₹20,000)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={styles.featureNameCol}>1:1 Video Consultations</td>
                <td>2 Sessions</td>
                <td className={styles.checkCell}>12 Scheduled Sessions</td>
                <td className={styles.checkCell}>24+ Sessions + On-Demand</td>
              </tr>
              <tr>
                <td className={styles.featureNameCol}>Daily Meal & Food Diary Review</td>
                <td className={styles.checkCell}>Included (30 Days)</td>
                <td className={styles.checkCell}>Included (6 Months)</td>
                <td className={styles.checkCell}>VIP Priority (365 Days)</td>
              </tr>
              <tr>
                <td className={styles.featureNameCol}>Clinical Pathology & Blood Work Review</td>
                <td>—</td>
                <td className={styles.checkCell}>Bi-Annual (2 Reviews)</td>
                <td className={styles.checkCell}>Quarterly (4 Reviews/yr)</td>
              </tr>
              <tr>
                <td className={styles.featureNameCol}>WhatsApp Direct Coach Access</td>
                <td>Mon–Fri Standard</td>
                <td className={styles.checkCell}>Priority Mon–Sat</td>
                <td className={styles.checkCell}>VIP 24/7 Dedicated Line</td>
              </tr>
              <tr>
                <td className={styles.featureNameCol}>Hormone & Gut-Health Protocol</td>
                <td>Basic Guidelines</td>
                <td className={styles.checkCell}>Customized Protocol</td>
                <td className={styles.checkCell}>Advanced Clinical Strategy</td>
              </tr>
              <tr>
                <td className={styles.featureNameCol}>Bespoke Grocery & Pantry Overhaul</td>
                <td>—</td>
                <td>Starter Checklist</td>
                <td className={styles.checkCell}>Personalized Curation</td>
              </tr>
              <tr>
                <td className={styles.featureNameCol}>Vacation Pause Protection</td>
                <td>—</td>
                <td className={styles.checkCell}>Up to 14 Days</td>
                <td className={styles.checkCell}>Up to 30 Days Anytime</td>
              </tr>
              <tr>
                <td className={styles.featureNameCol}>Effective Monthly Rate</td>
                <td>₹3,000 / mo</td>
                <td className={styles.checkCell}>₹2,000 / mo</td>
                <td className={styles.checkCell}>₹1,667 / mo (Save 44%)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ==========================================================
          FOUNDER SUJITHA C. CLINICAL PROMISE NOTE
          ========================================================== */}
      <section className={styles.tableSection}>
        <div className={styles.coachNoteCard}>
          <div className={styles.coachAvatar}>SC</div>
          <div className={styles.coachBody}>
            <small>A Personal Note From Your Dietitian</small>
            <h3>“Every body has a unique rhythm. Real health begins when we listen to it.”</h3>
            <p>
              “Restrictive meal plans fail because they are not built for real life. Whether you
              start with our monthly reset or our signature 6-month partnership, my commitment is
              to provide evidence-based, whole-food nutrition and steady compassion to help you thrive.”
            </p>
            <div style={{ marginTop: "14px", display: "flex", alignItems: "center", gap: "10px" }}>
              <strong style={{ fontSize: "14px", color: "#1b4434" }}>Sujitha C.</strong>
              <span style={{ fontSize: "12px", color: "#6a8878" }}>
                · Founder, B.Sc. Clinical Nutrition & Dietetics
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================
          FREQUENTLY ASKED QUESTIONS
          ========================================================== */}
      <section className={styles.faqSection} aria-label="Frequently Asked Questions">
        <div className={styles.faqHeading}>
          <h2>Common Questions</h2>
          <p>Everything you need to know about our packages and clinical process.</p>
        </div>

        <div className={styles.faqList}>
          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>How do I know which package is right for me?</h3>
            <p className={styles.faqAnswer}>
              If you wish to test nutrition coaching or jumpstart your dietary habits, the <strong>Per Month (₹3,000)</strong> plan is ideal. If you are addressing metabolic health, PCOS, weight balance, or long-term habits, the <strong>6-Month Package (₹12,000)</strong> provides the essential physiological window. For comprehensive year-round VIP support, the <strong>Yearly Package (₹20,000)</strong> delivers our best value and deepest transformation.
            </p>
          </div>

          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>What happens immediately after I select a package?</h3>
            <p className={styles.faqAnswer}>
              Upon confirming your package, you will be invited to complete your detailed intake questionnaire in your private wellness portal. Dietitian Sujitha C. will review your medical history, food routines, and lifestyle before your first 1-on-1 video onboarding session.
            </p>
          </div>

          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>Can I upgrade from Monthly to a 6-Month or Yearly package?</h3>
            <p className={styles.faqAnswer}>
              Yes! You can easily upgrade your plan within the first 30 days, and your initial ₹3,000 payment will be credited toward your 6-month or yearly package.
            </p>
          </div>

          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>What if I travel or go on vacation during my package?</h3>
            <p className={styles.faqAnswer}>
              The 6-month package includes a 14-day pause option, and the yearly VIP package includes a 30-day pause option. Simply notify coach Sujitha, and your duration will be frozen until you return.
            </p>
          </div>
        </div>
      </section>

      {/* Modal with chosen package */}
      {activeModalPackage && (
        <SubscriptionModal
          isOpen={!!activeModalPackage}
          initialPackage={activeModalPackage}
          onClose={() => setActiveModalPackage(null)}
          onSuccess={() => {
            setActiveModalPackage(null);
            window.location.href = "/wellness";
          }}
        />
      )}
    </main>
  );
}
