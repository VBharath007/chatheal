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
  ChevronDown,
} from "lucide-react";
import { packages } from "@/lib/catalog";
import SubscriptionModal from "@/components/store/SubscriptionModal";
import styles from "./PackagesPage.module.css";

export default function PackagesPage() {
  const [activeModalPackage, setActiveModalPackage] = useState<
    "monthly" | "six-month" | "yearly" | null
  >(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSelectPackage = (pkgId: "monthly" | "six-month" | "yearly") => {
    setActiveModalPackage(pkgId);
  };

  const faqItems = [
    {
      tag: "Plan Choice",
      q: "Which plan is right for me?",
      a: (
        <div className={styles.faqAnswerBreakdown}>
          <p>Choose based on your immediate health goal:</p>
          <ul className={styles.faqShortList}>
            <li>
              <strong>1 Month (₹3,000)</strong> — Quick reset &amp; trial to jumpstart clean food habits.
            </li>
            <li>
              <strong>6 Months (₹12,000)</strong> — Best for weight balance, PCOS, thyroid &amp; sustained metabolic healing.
            </li>
            <li>
              <strong>1 Year VIP (₹20,000)</strong> — Deepest lifestyle transformation with 24/7 dedicated coach line.
            </li>
          </ul>
        </div>
      ),
    },
    {
      tag: "Next Steps",
      q: "What happens right after I choose a plan?",
      a: (
        <p>
          You will complete a quick 5-minute health assessment form. Dietitian Sujitha reviews your routine and conducts your <strong>1-on-1 video onboarding consultation</strong> within 24 hours.
        </p>
      ),
    },
    {
      tag: "Upgrades",
      q: "Can I upgrade my plan later?",
      a: (
        <p>
          <strong>Yes, anytime!</strong> Upgrading within the first 30 days credits your full ₹3,000 payment towards the 6-month or yearly plan.
        </p>
      ),
    },
    {
      tag: "Vacation Pause",
      q: "What if I travel or go on vacation?",
      a: (
        <p>
          <strong>Pause protection is included.</strong> The 6-month plan has a 14-day pause, and the yearly plan has a 30-day pause. Just message on WhatsApp to freeze your days anytime.
        </p>
      ),
    },
    {
      tag: "Diet Approach",
      q: "Do you prescribe medicine pills or strict fasting?",
      a: (
        <p>
          <strong>Zero pills. Zero starving.</strong> 100% natural kitchen whole foods, home-cooked regional recipes, and natural herbal detox drinks crafted specifically for your body.
        </p>
      ),
    },
  ];

  return (
    <main className={styles.pageWrapper}>
      {/* ==========================================================
          LUXURY EDITORIAL SPLIT HERO
          ========================================================== */}
      <section className={styles.heroSection} aria-label="Care Packages Overview">
        <div className={styles.heroContainer}>
          {/* Left Column: Editorial Copy & Trust Badges */}
          <div className={styles.heroCopyCol}>
            <div className={styles.heroEyebrowPill}>
              <Sparkles size={13} className={styles.sparkleGold} />
              <span>ONE BODY · ONE UNIQUE HEALTH PLAN</span>
            </div>

            <h1 className={styles.heroTitle}>
              Personalized Wellness Programs.
              <br />
              <em>Crafted for Your Life.</em>
            </h1>

            <p className={styles.heroSubtitle}>
              1-on-1 personalized nutrition &amp; holistic wellness guidance with Founder Sujitha C.
              We don&apos;t give everyone the same diet plan — tailored whole-food protocols, natural detox routines, and zero shortcuts.
            </p>

            {/* Founder Verification Bar */}
            <div className={styles.founderTrustCard}>
              <div className={styles.founderAvatarWrap}>
                <img
                  src="/images/sujitha_executive_portrait.jpeg"
                  alt="Dietitian Sujitha C."
                  className={styles.founderAvatarImg}
                />
                <span className={styles.founderVerifiedDot} title="Verified Practitioner">✓</span>
              </div>
              <div className={styles.founderTrustInfo}>
                <div className={styles.founderNameRow}>
                  <strong>Guided directly by Sujitha C.</strong>
                  <span className={styles.founderVerifiedBadge}>
                    <ShieldCheck size={12} /> Verified
                  </span>
                </div>
                <span>Founder &amp; Clinical Nutritionist · ChatHeal</span>
              </div>
            </div>

            {/* Clean 4-Pillar Micro Badges in Responsive Grid */}
            <div className={styles.trustPillarsGrid}>
              <div className={styles.trustPillarCard}>
                <Leaf size={15} className={styles.pillarIconGreen} />
                <span>100% Whole Foods</span>
              </div>
              <div className={styles.trustPillarCard}>
                <Sparkles size={15} className={styles.pillarIconGold} />
                <span>Detox &amp; Hydration</span>
              </div>
              <div className={styles.trustPillarCard}>
                <Video size={15} className={styles.pillarIconBlue} />
                <span>1-on-1 Consultations</span>
              </div>
              <div className={styles.trustPillarCard}>
                <MessageCircle size={15} className={styles.pillarIconEmerald} />
                <span>Direct WhatsApp Mentorship</span>
              </div>
            </div>

            {/* Hero Quick Actions */}
            <div className={styles.heroActionsRow}>
              <a href="#available-packages" className={styles.heroPrimaryBtn}>
                <span>Explore Care Packages</span>
                <ArrowRight size={16} />
              </a>
              <Link href="/assessment" className={styles.heroSecondaryBtn}>
                <span>Fill Assessment Form</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Showcase with Overlaid Floating Cards */}
          <div className={styles.heroVisualCol}>
            <div className={styles.heroArtStage}>
              {/* Soft ambient orbit / glowing background circle */}
              <div className={styles.heroArtGlow} />

              {/* Main Visual Picture Frame */}
              <div className={styles.heroImgFrame}>
                <img
                  src="/images/stage4_custom_plan_clean.jpg"
                  alt="Bespoke whole-food nutrition plan and fresh nourish bowl"
                  className={styles.heroMainImg}
                />
              </div>

              {/* Floating Glass Micro Card - Top Left */}
              <div className={styles.floatGlassTop}>
                <div className={styles.floatIconCircleRose}>
                  <Heart size={16} />
                </div>
                <div>
                  <strong>Root-Cause Nutrition</strong>
                  <small>No starvation diets or pills</small>
                </div>
              </div>

              {/* Floating Glass Micro Card - Bottom Right */}
              <div className={styles.floatGlassBottom}>
                <div className={styles.floatIconCircleGold}>
                  <Sparkles size={16} />
                </div>
                <div>
                  <strong>Daily Accountability</strong>
                  <small>Meal feedback &amp; habit tracking</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================
          PACKAGES SHOWCASE (3 MINIMALIST LUXURY CARDS)
          ========================================================== */}
      <section id="available-packages" className={styles.packagesSection} aria-label="Available Packages">
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
          INCLUDED IN EVERY PLAN (SIGNATURE FOUNDATIONAL STANDARDS TABLE)
          ========================================================== */}
      <section className={styles.inclusionsSection} aria-label="Features Included in Every Plan">
        <div className={styles.tableSanctuaryCard}>
          {/* Top Heading Block */}
          <div className={styles.tableHeading}>
            <div className={styles.tableEyebrowPill}>
              <Sparkles size={13} className={styles.sparkleGold} />
              <span>INCLUDED IN EVERY PLAN</span>
            </div>
            <h2>
              A plan for your food.
              <br />
              <em>Support for your routine.</em>
            </h2>
            <p>
              Six-month and yearly prices are totals for the full duration. These 6 foundational pillars are 100% guaranteed across all packages from Day 01.
            </p>
          </div>

          {/* Table Container */}
          <div className={styles.tableWrapper}>
            <div className={styles.mobileTableHint}>
              <span>← Swipe horizontally to compare all 3 plans →</span>
            </div>

            <table className={styles.compareTable}>
              <thead>
                <tr>
                  <th className={styles.thFeatureCol}>
                    <span className={styles.thFeatureTitle}>Foundational Care Pillars</span>
                  </th>
                  <th className={styles.thPlanCol}>
                    <div className={styles.thPlanHeader}>
                      <span className={styles.thPlanName}>Per Month</span>
                      <strong className={styles.thPlanPrice}>₹3,000</strong>
                      <span className={styles.thPlanMeta}>30 Days Reset</span>
                    </div>
                  </th>
                  <th className={`${styles.thPlanCol} ${styles.thPlanColPopular}`}>
                    <div className={styles.thPopularBadge}>★ Most Popular</div>
                    <div className={styles.thPlanHeader}>
                      <span className={styles.thPlanName}>6 Months</span>
                      <strong className={styles.thPlanPrice}>₹12,000</strong>
                      <span className={styles.thPlanMeta}>₹2,000 / month</span>
                    </div>
                  </th>
                  <th className={`${styles.thPlanCol} ${styles.thPlanColVip}`}>
                    <div className={styles.thVipBadge}>👑 Save 44%</div>
                    <div className={styles.thPlanHeader}>
                      <span className={styles.thPlanName}>Yearly VIP</span>
                      <strong className={styles.thPlanPrice}>₹20,000</strong>
                      <span className={styles.thPlanMeta}>₹1,667 / month</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    title: "Complete Body & Lifestyle Assessment",
                    desc: "Biometrics, daily routine, sleep rhythm & digestive health baseline review",
                    monthly: "Included (Day 01)",
                    sixMonth: "Included (Day 01)",
                    yearly: "Included (Day 01)",
                  },
                  {
                    title: "Clinical Blood Test & Biomarker Review",
                    desc: "Doctor & dietitian analysis of recent lab reports and metabolic markers",
                    monthly: "Included (Intake)",
                    sixMonth: "Included (Bi-Annual)",
                    yearly: "Included (Quarterly VIP)",
                  },
                  {
                    title: "Personalized Weekly Whole-Food Plan",
                    desc: "Custom recipes, portion guidance, pantry swaps and kitchen integration",
                    monthly: "Included (Weekly)",
                    sixMonth: "Included (Weekly)",
                    yearly: "Included (Priority Weekly)",
                  },
                  {
                    title: "Hydration & Botanical Detox Guidance",
                    desc: "Targeted botanical infusions and cellular cleansing water routines",
                    monthly: "Included (Daily Routine)",
                    sixMonth: "Included (Daily Routine)",
                    yearly: "Included (Daily VIP Support)",
                  },
                  {
                    title: "Suitable Workout & Mindful Yoga",
                    desc: "Low-impact physical movements harmonized with your daily energy",
                    monthly: "Included",
                    sixMonth: "Included",
                    yearly: "Included (Personalized)",
                  },
                  {
                    title: "Weekly Check-Ins & Plan Adjustments",
                    desc: "Continuous progress monitoring, routine feedback and gentle calibrations",
                    monthly: "Included (Every 7 Days)",
                    sixMonth: "Included (Every 7 Days)",
                    yearly: "Included (Every 7 Days VIP)",
                  },
                ].map((item) => (
                  <tr key={item.title}>
                    <td className={styles.featureNameCol}>
                      <strong>{item.title}</strong>
                      <small>{item.desc}</small>
                    </td>
                    <td>
                      <span className={styles.cellBadgeGreen}>
                        <Check size={12} strokeWidth={3} /> {item.monthly}
                      </span>
                    </td>
                    <td className={styles.highlightCol}>
                      <span className={styles.cellBadgeGreen}>
                        <Check size={12} strokeWidth={3} /> {item.sixMonth}
                      </span>
                    </td>
                    <td className={styles.highlightVipCol}>
                      <span className={styles.cellBadgeGold}>
                        <Sparkles size={12} /> {item.yearly}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom Table Guarantee Footnote */}
          <div className={styles.tableGuaranteeFooter}>
            <ShieldCheck size={16} className={styles.guaranteeShieldIcon} />
            <span>
              Zero Hidden Charges · Transparent pricing · All 6 foundational pillars 100% guaranteed across every plan duration.
            </span>
          </div>
        </div>
      </section>

      {/* ==========================================================
          FOUNDER SUJITHA C. CLINICAL PROMISE NOTE
          ========================================================== */}
      {/* <section className={styles.tableSection}>
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
      </section> */}

      {/* ==========================================================
          FREQUENTLY ASKED QUESTIONS (INTERACTIVE LUXURY ACCORDION)
          ========================================================== */}
      <section className={styles.faqSection} aria-label="Frequently Asked Questions">
        <div className={styles.faqHeading}>
          <div className={styles.faqEyebrowPill}>
            <Sparkles size={13} className={styles.sparkleGold} />
            <span>TRANSPARENT ANSWERS</span>
          </div>
          <h2>Common Questions</h2>
          <p>Everything you need to know about our packages and clinical process.</p>
        </div>

        <div className={styles.faqAccordionList}>
          {faqItems.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={item.q}
                className={`${styles.faqAccordionItem} ${isOpen ? styles.faqAccordionOpen : ""}`}
              >
                <button
                  type="button"
                  className={styles.faqAccordionBtn}
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                >
                  <div className={styles.faqQuestionContent}>
                    <span className={styles.faqTagPill}>{item.tag}</span>
                    <span className={styles.faqQuestionTitle}>{item.q}</span>
                  </div>
                  <div className={`${styles.faqChevronWrap} ${isOpen ? styles.chevronRotated : ""}`}>
                    <ChevronDown size={18} />
                  </div>
                </button>

                {isOpen && (
                  <div className={styles.faqAnswerContainer}>
                    <div className={styles.faqAnswerDivider} />
                    <div className={styles.faqAnswerBody}>{item.a}</div>
                  </div>
                )}
              </div>
            );
          })}
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
