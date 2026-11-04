"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  Check,
  Leaf,
  Heart,
  Activity,
  Sun,
  Coffee,
  Zap,
  Compass,
  Utensils,
  Sparkles,
  CheckCircle2,
  Lock,
  MessageSquareHeart,
  FileText,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { programmes } from "@/lib/catalog";
import styles from "./AssessmentPage.module.css";

const steps = [
  {
    stepNumber: "01",
    tag: "YOUR HEALTH GOAL",
    title: "What would you like more of?",
    subtitle: "Choose the primary focus you’d most like to discuss with your coach.",
    tip: "“Every individual is unique. Choose what matters most right now — we build sustainable whole-food routines around your real life, not restrictive diets.”",
    options: [
      {
        id: "routine",
        title: "A balanced food routine",
        desc: "Wholesome meals, portion balance, and easy everyday cooking for you and your family.",
        icon: Leaf,
        tone: "green",
      },
      {
        id: "weight",
        title: "Support with weight & habits",
        desc: "Gentle, sustainable progress and mindful habits without extreme calorie counting.",
        icon: Activity,
        tone: "rose",
      },
      {
        id: "energy",
        title: "Better everyday energy",
        desc: "Overcoming afternoon fatigue, steady blood sugar, and waking up refreshed.",
        icon: Sun,
        tone: "amber",
      },
      {
        id: "holistic",
        title: "A holistic wellness routine",
        desc: "Connecting wholesome food, joyful physical movement, restful sleep, and daily peace.",
        icon: Heart,
        tone: "blue",
      },
    ],
  },
  {
    stepNumber: "02",
    tag: "DAILY ACTIVITY & RHYTHM",
    title: "What feels most like your day?",
    subtitle: "Your work routine and activity patterns are essential to creating an effortless plan.",
    tip: "“Whether you sit at a desk for long hours or are on your feet all day, we balance meal timing and nutrient density to keep your energy steady.”",
    options: [
      {
        id: "desk",
        title: "Mostly at a desk / sitting",
        desc: "Long focus hours, laptop work, screen time; needs quick nourishing meals and anti-slump snacks.",
        icon: Coffee,
        tone: "blue",
      },
      {
        id: "active",
        title: "On my feet through the day",
        desc: "High daily movement, busy physical routine; needs sustained stamina and hydration.",
        icon: Zap,
        tone: "amber",
      },
      {
        id: "mixed",
        title: "A mix of rest and activity",
        desc: "Flexible day with room for walks, moderate exercise, and balanced breaks.",
        icon: Sun,
        tone: "green",
      },
      {
        id: "variable",
        title: "My routine changes often",
        desc: "Shift work, travel, or busy household schedule; needs versatile food habits.",
        icon: Compass,
        tone: "rose",
      },
    ],
  },
  {
    stepNumber: "03",
    tag: "FOOD CULTURE & PREFERENCES",
    title: "What do you enjoy eating?",
    subtitle: "There is always room for your cultural foods, personal traditions, and favorites.",
    tip: "“No strict bans or foreign superfoods are required. Familiar regional dishes and home-cooked meals are always the foundation of true healing.”",
    options: [
      {
        id: "veg",
        title: "Vegetarian",
        desc: "Traditional grains, lentils, pulses, seasonal vegetables, paneer, and dairy.",
        icon: Leaf,
        tone: "green",
      },
      {
        id: "nonveg",
        title: "Non-vegetarian",
        desc: "High-protein balance with lean chicken, seafood, eggs, alongside wholesome plants.",
        icon: Utensils,
        tone: "rose",
      },
      {
        id: "vegan",
        title: "Vegan / plant-based",
        desc: "100% plant foods, millets, legumes, nuts, seeds, greens, and plant milks.",
        icon: Sparkles,
        tone: "amber",
      },
      {
        id: "flexible",
        title: "I’d like to discuss my options",
        desc: "Looking for coach guidance on what suits my digestion, lifestyle, and preferences.",
        icon: Heart,
        tone: "blue",
      },
    ],
  },
];

export default function AssessmentPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  const currentStepData = steps[step];
  const progressPercent = Math.round(((step + (done ? 1 : 0)) / steps.length) * 100);

  // Recommendation Match
  const matchedProgramme =
    answers[0] === "Support with weight & habits"
      ? programmes.find((p) => p.slug === "balanced-living") || programmes[1]
      : answers[0] === "A holistic wellness routine"
      ? programmes.find((p) => p.slug === "whole-you") || programmes[2]
      : programmes[0];

  const handleSelect = (optionTitle: string) => {
    setAnswers((prev) => {
      const updated = [...prev];
      updated[step] = optionTitle;
      return updated;
    });
  };

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep((s) => s + 1);
    } else {
      setDone(true);
    }
  };

  const handleBack = () => {
    if (done) {
      setDone(false);
      setStep(steps.length - 1);
    } else if (step > 0) {
      setStep((s) => s - 1);
    }
  };

  const handleReset = () => {
    setDone(false);
    setStep(0);
    setAnswers([]);
  };

  return (
    <main className={`gl-container ${styles.page}`}>
      {/* Decorative ambient auras */}
      <div className={styles.ambientGlow} aria-hidden="true" />
      <div className={styles.ambientGlowLeft} aria-hidden="true" />

      <div className={styles.layout}>
        {/* Left Column: Inspiration, Coach Companion & Journey */}
        <div className={styles.leftColumn}>
          <div>
            <span className="gl-pill">
              
              PERSONAL DISCOVERY
            </span>
            <h1 className={styles.heroHeading}>
              Let’s start
              <br />
              <em>with you.</em>
            </h1>
            <p className={styles.heroDesc}>
              A few thoughtful questions. A little space to reflect on your daily
              routine, food preferences, and what you need to feel your best.
            </p>
          </div>

          {/* Interactive Steps Journey List */}
          <div className={styles.journeyCard}>
            <div className={styles.journeyTitle}>
              <Clock size={14} />
              <span>Your Discovery Journey</span>
            </div>
            <div className={styles.journeySteps}>
              {steps.map((s, idx) => {
                const isCurrent = !done && step === idx;
                const isCompleted = done || step > idx;
                return (
                  <div
                    key={s.stepNumber}
                    className={`${styles.journeyStepItem} ${
                      isCurrent ? styles.active : ""
                    } ${isCompleted ? styles.completed : ""}`}
                  >
                    <span className={styles.journeyNumber}>
                      {isCompleted ? <Check size={14} strokeWidth={2.4} /> : s.stepNumber}
                    </span>
                    <span className={styles.journeyStepText}>{s.title}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contextual Coach Tip Card */}
          <div className={styles.coachTipCard}>
            <div className={styles.coachTipHeader}>
              <div className={styles.coachAvatar}>SC</div>
              <div className={styles.coachMeta}>
                <span className={styles.coachName}>
                  Sujitha C.
                  <CheckCircle2 size={14} style={{ color: "#2b7a54" }} />
                </span>
                <span className={styles.coachRole}>
                  Certified Nutritionist · Founder
                </span>
              </div>
            </div>
            <p className={styles.coachTipText}>
              {done
                ? "“A wonderful beginning! These answers give us a clear foundation to shape your personal food routine with care.”"
                : currentStepData.tip}
            </p>
            <Leaf size={110} strokeWidth={0.5} className={styles.coachBackgroundLeaf} />
          </div>

          {/* Trust Badges */}
          <div className={styles.trustPills}>
            <span className={styles.trustPill}>
              <Lock size={13} />
              100% Private & Confidential
            </span>
            <span className={styles.trustPill}>
              <ShieldCheck size={14} />
              No Payment Needed
            </span>
            <span className={styles.trustPill}>
              <MessageSquareHeart size={13} />
              1-on-1 Dedicated Guidance
            </span>
          </div>
        </div>

        {/* Right Column: Interactive Glass Questionnaire & Summary */}
        <div className={styles.assessmentCard}>
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div
                key={`step-${step}`}
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -18 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: "flex", flexDirection: "column", height: "100%", flex: 1 }}
              >
                {/* Header with Step Counter & Animated Progress */}
                <div className={styles.cardHeader}>
                  <div className={styles.stepIndicatorRow}>
                    <span className={styles.stepCounterBadge}>
                      STEP {currentStepData.stepNumber} OF 03 · {currentStepData.tag}
                    </span>
                    <span className={styles.progressPercentText}>
                      {progressPercent}% Complete
                    </span>
                  </div>
                  <div className={styles.progressTrack} role="progressbar" aria-valuenow={progressPercent} aria-valuemin={0} aria-valuemax={100}>
                    <div
                      className={styles.progressBarFill}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <h2 className={styles.questionTitle}>{currentStepData.title}</h2>
                  <p className={styles.questionSubtitle}>{currentStepData.subtitle}</p>
                </div>

                {/* Options List */}
                <div
                  className={styles.optionsGrid}
                  role="radiogroup"
                  aria-label={currentStepData.title}
                >
                  {currentStepData.options.map((opt) => {
                    const Icon = opt.icon;
                    const isSelected = answers[step] === opt.title;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        className={`${styles.optionButton} ${
                          isSelected ? styles.selected : ""
                        }`}
                        onClick={() => handleSelect(opt.title)}
                      >
                        <span className={styles.optionIconTile}>
                          <Icon size={22} strokeWidth={1.7} />
                        </span>
                        <div className={styles.optionInfo}>
                          <span className={styles.optionLabel}>{opt.title}</span>
                          <span className={styles.optionHint}>{opt.desc}</span>
                        </div>
                        <span className={styles.radioCircle}>
                          {isSelected && <Check size={14} strokeWidth={2.5} />}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Footer Controls */}
                <div className={styles.cardFooter}>
                  <button
                    type="button"
                    className={styles.backBtn}
                    disabled={step === 0}
                    onClick={handleBack}
                  >
                    <ChevronLeft size={17} />
                    Back
                  </button>
                  <button
                    type="button"
                    className={styles.continueBtn}
                    disabled={!answers[step]}
                    onClick={handleNext}
                  >
                    <span>{step === steps.length - 1 ? "See my tailored summary" : "Continue"}</span>
                    <ArrowRight size={17} />
                  </button>
                </div>
              </motion.div>
            ) : (
              /* ==========================================================
                 DONE: Personalized Roadmap & Programme Match View
                 ========================================================== */
              <motion.div
                key="summary-view"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: "flex", flexDirection: "column", height: "100%", flex: 1 }}
              >
                <div className={styles.summaryCrest}>
                  
                </div>
                <span className="gl-pill" style={{ marginBottom: "10px" }}>
                  <Check size={14} /> YOUR PERSONALIZED SUMMARY
                </span>
                <h2 className={styles.summaryHeading}>
                  A clear beginning,
                  <br />
                  <em>crafted for your everyday.</em>
                </h2>
                <p className={styles.summarySub}>
                  Here is what you’ve shared with us. Nutritionist Sujitha C. uses
                  these starting points to tailor your individual meal roadmap.
                </p>

                {/* 3 Summary Pills */}
                <div className={styles.summaryGrid}>
                  <div className={styles.summaryItemCard}>
                    <span className={styles.summaryItemLabel}>Primary Focus</span>
                    <span className={styles.summaryItemValue}>
                      {answers[0] || "Balanced Routine"}
                    </span>
                  </div>
                  <div className={styles.summaryItemCard}>
                    <span className={styles.summaryItemLabel}>Daily Routine</span>
                    <span className={styles.summaryItemValue}>
                      {answers[1] || "Active Lifestyle"}
                    </span>
                  </div>
                  <div className={styles.summaryItemCard}>
                    <span className={styles.summaryItemLabel}>Food Culture</span>
                    <span className={styles.summaryItemValue}>
                      {answers[2] || "Traditional Meals"}
                    </span>
                  </div>
                </div>

                {/* Matched Programme Card */}
                {matchedProgramme && (
                  <div className={styles.matchBox}>
                    <img
                      src={matchedProgramme.image}
                      alt={matchedProgramme.title}
                      className={styles.matchImage}
                    />
                    <div>
                      <span className={styles.matchBadge}>
                       
                        RECOMMENDED MATCH · {matchedProgramme.weeks} WEEKS
                      </span>
                      <h3 className={styles.matchTitle}>{matchedProgramme.title}</h3>
                      <p className={styles.matchDesc}>{matchedProgramme.description}</p>
                      <div className={styles.matchFeatures}>
                        {matchedProgramme.features.slice(0, 3).map((f) => (
                          <span key={f} className={styles.matchFeatureItem}>
                            <Check size={12} style={{ color: "#277856" }} />
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className={styles.summaryActionRow}>
                  <Link href="/contact" className={styles.primaryActionBtn}>
                    <span>Discuss with ChatHeal Coach</span>
                    <ArrowUpRight size={18} />
                  </Link>
                  <Link
                    href="/packages"
                    className={styles.secondaryActionBtn}
                  >
                    <span>Explore Care Packages</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>

                <div>
                  <button type="button" onClick={handleReset} className={styles.retakeBtn}>
                    <ChevronLeft size={16} />
                    Change or review my answers
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Health Reports Guidance */}
      <div className={styles.reportsSection}>
        <div className={styles.reportsIcon}>
          <FileText size={28} strokeWidth={1.6} />
        </div>
        <div className={styles.reportsContent}>
          <span className="gl-kicker">A MORE COMPLETE PICTURE</span>
          <h3>Have recent medical or health reports?</h3>
          <p>
            During your one-on-one consultation, Sujitha C. can review your existing
            blood sugar (HbA1c), lipid profile, thyroid panel, liver/kidney profiles,
            or vitamin levels. We align your whole-food nutrition plan with your medical
            history to support your overall wellness safely.
          </p>
          <span className={styles.reportsTagline}>
            *ChatHeal provides personalized dietary & lifestyle coaching alongside your physician’s medical care.
          </span>
        </div>
      </div>
    </main>
  );
}
