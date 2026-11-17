"use client";

import { useState, useId } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Sparkles,
  ShieldCheck,
  Clock,
  HeartPulse,
  User,
  Phone,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import styles from "./AssessmentPage.module.css";

// --- DATA STRUCTURES & OPTIONS ---

interface HealthConditionOption {
  id: string;
  title: string;
  desc: string;
  icon: string;
}

const HEALTH_CONDITIONS: HealthConditionOption[] = [
  { id: "pcod", title: "PCOD / PCOS", desc: "Hormonal balance & cycle health", icon: "🌸" },
  { id: "thyroid", title: "Thyroid Imbalance", desc: "Hypo / Hyperthyroid or metabolic sluggishness", icon: "🦋" },
  { id: "diabetes", title: "Diabetes / Blood Sugar", desc: "Insulin resistance, pre-diabetes, HbA1c", icon: "🩸" },
  { id: "cholesterol", title: "Cholesterol / Heart", desc: "Lipid profile optimization & cardiac wellness", icon: "🫀" },
  { id: "fatty_liver", title: "Fatty Liver", desc: "Grade 1/2 reversal & metabolic reset", icon: "🌿" },
  { id: "weight", title: "Weight & Stubborn Fat", desc: "Sustainable fat loss & inch reduction", icon: "⚖️" },
  { id: "gut", title: "Gut Health & Bloating", desc: "Acidity, IBS, constipation, indigestion", icon: "🥣" },
  { id: "fatigue", title: "Fatigue / Low Energy", desc: "Cellular vitality & stamina boost", icon: "⚡" },
  { id: "hair_skin", title: "Hair Fall & Skin Concerns", desc: "Nutrient absorption & hormonal glow", icon: "✨" },
  { id: "hypertension", title: "Hypertension / BP", desc: "Blood pressure regulation & heart calm", icon: "💓" },
  { id: "general", title: "None / General Vitality", desc: "Preventative wellness & optimal living", icon: "🌱" },
  { id: "other", title: "Other Condition", desc: "Specific medical history or other concerns", icon: "📝" },
];

interface FoodPreferenceOption {
  id: string;
  title: string;
  desc: string;
  icon: string;
  hint?: string;
}

const FOOD_PREFERENCES: FoodPreferenceOption[] = [
  { id: "veg", title: "Vegetarian", desc: "Pure plant & wholesome dairy meals", icon: "🥗" },
  { id: "non_veg", title: "Non-Vegetarian", desc: "Includes poultry, fish, meat & eggs", icon: "🍗" },
  { id: "eggetarian", title: "Eggetarian", desc: "Plant-based & dairy meals enriched with eggs", icon: "🥚", hint: "Vegetarian + eggs" },
  { id: "vegan", title: "Vegan", desc: "100% plant-derived, zero animal/dairy products", icon: "🥑" },
  { id: "jain", title: "Jain / Sattvic", desc: "Vegetarian without root vegetables, onion or garlic", icon: "🌿" },
];

interface GoalOption {
  id: string;
  title: string;
  desc: string;
  icon: string;
}

const WELLNESS_GOALS: GoalOption[] = [
  { id: "fat_loss", title: "Targeted Weight & Fat Loss", desc: "Sustainable calorie balance without starvation", icon: "🎯" },
  { id: "muscle_tone", title: "Lean Toning & Strength", desc: "Muscle definition, core strength & vitality", icon: "💪" },
  { id: "hormone_balance", title: "Hormonal Balance & Peace", desc: "Cycle regularity & endocrine restoration", icon: "🌸" },
  { id: "gut_reset", title: "Gut Reset & Bloat Relief", desc: "Effortless digestion & microbiome health", icon: "🥣" },
  { id: "restorative_sleep", title: "Restorative Sleep & Rejuvenation", desc: "Deep sleep, low cortisol & stress relief", icon: "🌙" },
  { id: "disease_reversal", title: "Metabolic Disease Reversal", desc: "Clinically guided biomarker correction", icon: "🩺" },
  { id: "glowing_skin", title: "Glowing Skin & Vitality", desc: "Biochemical nutrient nourishment from within", icon: "✨" },
];

export default function AssessmentPage() {
  const otherConditionId = useId();
  // Form State
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"Female" | "Male" | "Other" | "Prefer not to say">("Female");
  const [whatsApp, setWhatsApp] = useState("");

  // Height & Weight State
  const [heightUnit, setHeightUnit] = useState<"cm" | "ft">("cm");
  const [heightCm, setHeightCm] = useState("165");
  const [heightFt, setHeightFt] = useState("5");
  const [heightIn, setHeightIn] = useState("5");
  const [weightKg, setWeightKg] = useState("64");

  // Selection Cards State
  const [selectedConditions, setSelectedConditions] = useState<string[]>(["weight"]);
  const [otherConditionText, setOtherConditionText] = useState("");
  const [selectedFoodPref, setSelectedFoodPref] = useState<string>("veg");
  const [selectedGoals, setSelectedGoals] = useState<string[]>(["fat_loss", "gut_reset"]);

  // Consent & Status
  const [consent, setConsent] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Sync Height when switching units
  const handleUnitToggle = (unit: "cm" | "ft") => {
    if (unit === heightUnit) return;
    if (unit === "ft") {
      const cmVal = parseFloat(heightCm) || 165;
      const totalInches = cmVal / 2.54;
      const ft = Math.floor(totalInches / 12);
      const inches = Math.round(totalInches % 12);
      setHeightFt(String(ft));
      setHeightIn(String(inches));
    } else {
      const ftVal = parseFloat(heightFt) || 5;
      const inVal = parseFloat(heightIn) || 5;
      const totalInches = ftVal * 12 + inVal;
      const cm = Math.round(totalInches * 2.54);
      setHeightCm(String(cm));
    }
    setHeightUnit(unit);
  };

  const handleFtInChange = (newFt: string, newIn: string) => {
    setHeightFt(newFt);
    setHeightIn(newIn);
    const f = parseFloat(newFt) || 0;
    const i = parseFloat(newIn) || 0;
    const totalInches = f * 12 + i;
    const cm = Math.round(totalInches * 2.54);
    if (cm > 0) setHeightCm(String(cm));
  };

  const handleCmChange = (val: string) => {
    setHeightCm(val);
    const cmVal = parseFloat(val) || 0;
    if (cmVal > 0) {
      const totalInches = cmVal / 2.54;
      const ft = Math.floor(totalInches / 12);
      const inches = Math.round(totalInches % 12);
      setHeightFt(String(ft));
      setHeightIn(String(inches));
    }
  };

  // Toggle multi-select card
  const toggleCondition = (id: string) => {
    if (id === "general") {
      setSelectedConditions(["general"]);
      return;
    }
    setSelectedConditions((prev) => {
      const filtered = prev.filter((item) => item !== "general");
      if (filtered.includes(id)) {
        return filtered.filter((item) => item !== id);
      } else {
        return [...filtered, id];
      }
    });
  };

  const toggleGoal = (id: string) => {
    setSelectedGoals((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((g) => g !== id) : prev) : [...prev, id]
    );
  };

  // Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!fullName.trim()) {
      setErrorMsg("Please enter your full name.");
      window.scrollTo({ top: 300, behavior: "smooth" });
      return;
    }

    if (!age.trim() || parseInt(age, 10) < 10) {
      setErrorMsg("Please enter a valid age.");
      window.scrollTo({ top: 300, behavior: "smooth" });
      return;
    }

    if (!whatsApp.trim() || whatsApp.replace(/\D/g, "").length < 8) {
      setErrorMsg("Please enter a valid WhatsApp or contact number.");
      window.scrollTo({ top: 300, behavior: "smooth" });
      return;
    }

    if (!consent) {
      setErrorMsg("Please agree to the privacy consent to complete your assessment.");
      return;
    }

    setIsSubmitting(true);

    const submissionData = {
      fullName: fullName.trim(),
      age: age.trim(),
      gender,
      contactNumber: whatsApp.trim(),
      heightCm,
      heightDisplay: `${heightFt} ft ${heightIn} in (${heightCm} cm)`,
      weightKg,
      healthConditions: selectedConditions,
      otherCondition: otherConditionText,
      dietType: selectedFoodPref,
      wellnessGoals: selectedGoals,
      submittedAt: new Date().toISOString(),
      source: "quick_assessment",
    };

    try {
      // Store locally for portal hydration & instant client review
      localStorage.setItem("chatheal_client_assessment", JSON.stringify(submissionData));
      localStorage.setItem("chatheal_quick_assessment", JSON.stringify(submissionData));
    } catch {}

    setTimeout(() => {
      setIsSubmitting(false);
      setIsCompleted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 600);
  };

  // Build WhatsApp Message for Thank You screen CTA
  const foodPrefTitle = FOOD_PREFERENCES.find((f) => f.id === selectedFoodPref)?.title || selectedFoodPref;
  const goalsTitles = selectedGoals
    .map((g) => WELLNESS_GOALS.find((item) => item.id === g)?.title)
    .filter(Boolean)
    .join(", ");
  const conditionsTitles = selectedConditions
    .map((c) => (c === "other" && otherConditionText ? otherConditionText : HEALTH_CONDITIONS.find((item) => item.id === c)?.title))
    .filter(Boolean)
    .join(", ");

  const waMessage = encodeURIComponent(
    `Hello Sujitha, I completed my ChatHeal Wellness Assessment!\n\n` +
      `👤 Name: ${fullName}\n` +
      `🎂 Age: ${age} | Gender: ${gender}\n` +
      `📏 Height: ${heightCm} cm (${heightFt}'${heightIn}") | Weight: ${weightKg} kg\n` +
      `🥗 Food Preference: ${foodPrefTitle}\n` +
      `🎯 Primary Goals: ${goalsTitles}\n` +
      `🩺 Health Background: ${conditionsTitles}\n\n` +
      `Looking forward to our personalized consultation call.`
  );
  const waUrl = `https://wa.me/918248862343?text=${waMessage}`;

  return (
    <div className={styles.page}>
      <div className={styles.ambientOrb1} />
      <div className={styles.ambientOrb2} />

      {/* 1. Header: Logo & Return to Portal Link */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/" className={styles.brandLink} aria-label="ChatHeal Home">
            <Image
              src="/logo.png"
              alt="ChatHeal - Wellness by Sujitha"
              width={260}
              height={78}
              className={styles.brandLogo}
              priority
            />
          </Link>
          <div className={styles.headerActions}>
            <span className={styles.badgePill}>
              <Sparkles size={13} /> Quick Intake
            </span>
            <Link href="/contact" className={styles.returnBtn}>
              <ArrowLeft size={14} />
              <span className={styles.returnBtnTextFull}>Return to Portal</span>
              <span className={styles.returnBtnTextShort}>Portal</span>
            </Link>
          </div>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {!isCompleted ? (
          <motion.main
            key="assessment-form"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {/* 2. Intro: Heading, description, supporting text */}
            <div className={styles.introContainer}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <span className={styles.introKicker}>
                  <HeartPulse size={14} /> Complimentary Intake Studio
                </span>
                <h1 className={styles.mainTitle}>
                  Personalized Nutrition & <span>Wellness Assessment</span>
                </h1>
                <p className={styles.mainDesc}>
                  Share your metabolic baseline with Sujitha in 2 minutes. We will review your goals and formulate your bespoke nutrition protocol.
                </p>
                <div className={styles.guaranteeRow}>
                  <span className={styles.guaranteeChip}>
                    <Clock size={13} /> 2-Minute Quick Intake
                  </span>
                  <span className={styles.guaranteeChip}>
                    <ShieldCheck size={13} /> 100% Confidential
                  </span>
                  <span className={styles.guaranteeChip}>
                    <CheckCircle2 size={13} /> Certified Clinical Dietetics
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Form Container Card */}
            <div className={styles.formCard}>
              <form onSubmit={handleSubmit} noValidate>
                {/* 3. Section 1: Personal Details */}
                <section className={styles.section}>
                  <div className={styles.sectionHeader}>
                    <span className={styles.sectionNumber}>01</span>
                    <div className={styles.sectionHeaderText}>
                      <h3>Personal Details</h3>
                      <p>Tell us a bit about yourself so we can address your consultation directly.</p>
                    </div>
                  </div>

                  <div className={styles.inputGrid2}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>
                        Full Name <span className={styles.requiredStar}>*</span>
                      </label>
                      <div className={styles.inputWrap}>
                        <User size={17} className={styles.inputIcon} />
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Priya Sharma"
                          className={`${styles.input} ${styles.inputWithIcon}`}
                        />
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>
                        Age <span className={styles.requiredStar}>*</span>
                      </label>
                      <input
                        type="number"
                        required
                        min="10"
                        max="100"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="e.g. 29"
                        className={styles.input}
                      />
                    </div>
                  </div>

                  <div style={{ marginTop: "18px" }}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Gender</label>
                      <div className={styles.genderGrid}>
                        {(["Female", "Male", "Other", "Prefer not to say"] as const).map((g) => (
                          <button
                            key={g}
                            type="button"
                            onClick={() => setGender(g)}
                            className={`${styles.genderPill} ${gender === g ? styles.genderPillActive : ""}`}
                          >
                            {gender === g && <Check size={14} />}
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: "18px" }}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>
                        WhatsApp / Contact Number <span className={styles.requiredStar}>*</span>
                        <span className={styles.labelHint}>For plan delivery & call scheduling</span>
                      </label>
                      <div className={styles.phoneWrap}>
                        <span className={styles.phonePrefix}>
                          <Phone size={14} /> +91
                        </span>
                        <input
                          type="tel"
                          required
                          value={whatsApp}
                          onChange={(e) => setWhatsApp(e.target.value)}
                          placeholder="98765 43210"
                          className={styles.phoneInput}
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {/* 4. Section 2: Body Information */}
                <section className={styles.section}>
                  <div className={styles.sectionHeader}>
                    <span className={styles.sectionNumber}>02</span>
                    <div className={styles.sectionHeaderText}>
                      <h3>Body Information</h3>
                      <p>Essential metrics to assess metabolic baseline and nutritional requirements.</p>
                    </div>
                  </div>

                  <div className={styles.heightWeightGrid}>
                    <div className={styles.formGroup}>
                      <div className={styles.fieldHeaderRow}>
                        <label className={styles.label}>
                          Height <span className={styles.requiredStar}>*</span>
                        </label>
                        <div className={styles.unitToggleGroup}>
                          <button
                            type="button"
                            onClick={() => handleUnitToggle("cm")}
                            className={`${styles.unitToggleBtn} ${heightUnit === "cm" ? styles.unitToggleBtnActive : ""}`}
                          >
                            cm
                          </button>
                          <button
                            type="button"
                            onClick={() => handleUnitToggle("ft")}
                            className={`${styles.unitToggleBtn} ${heightUnit === "ft" ? styles.unitToggleBtnActive : ""}`}
                          >
                            ft / in
                          </button>
                        </div>
                      </div>

                      {heightUnit === "cm" ? (
                        <div className={styles.unitSuffixWrap}>
                          <input
                            type="number"
                            min="90"
                            max="230"
                            value={heightCm}
                            onChange={(e) => handleCmChange(e.target.value)}
                            className={styles.input}
                          />
                          <span className={styles.unitSuffix}>cm</span>
                        </div>
                      ) : (
                        <div className={styles.ftInInputs}>
                          <div className={styles.unitSuffixWrap}>
                            <input
                              type="number"
                              min="3"
                              max="7"
                              value={heightFt}
                              onChange={(e) => handleFtInChange(e.target.value, heightIn)}
                              className={styles.input}
                            />
                            <span className={styles.unitSuffix}>ft</span>
                          </div>
                          <div className={styles.unitSuffixWrap}>
                            <input
                              type="number"
                              min="0"
                              max="11"
                              value={heightIn}
                              onChange={(e) => handleFtInChange(heightFt, e.target.value)}
                              className={styles.input}
                            />
                            <span className={styles.unitSuffix}>in</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className={styles.formGroup}>
                      <div className={styles.fieldHeaderRow}>
                        <label className={styles.label}>
                          Weight <span className={styles.requiredStar}>*</span>
                        </label>
                        <span className={styles.labelHint}>Standard (kg)</span>
                      </div>
                      <div className={styles.unitSuffixWrap}>
                        <input
                          type="number"
                          min="30"
                          max="200"
                          value={weightKg}
                          onChange={(e) => setWeightKg(e.target.value)}
                          className={styles.input}
                        />
                        <span className={styles.unitSuffix}>kg</span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 5. Section 3: Health Background */}
                <section className={styles.section}>
                  <div className={styles.sectionHeader}>
                    <span className={styles.sectionNumber}>03</span>
                    <div className={styles.sectionHeaderText}>
                      <h3>Health Background</h3>
                      <p>Select any diagnosed conditions or metabolic concerns (multi-select):</p>
                    </div>
                  </div>

                  <div className={styles.cardsGrid}>
                    {HEALTH_CONDITIONS.map((cond) => {
                      const isActive = selectedConditions.includes(cond.id);
                      return (
                        <motion.div
                          key={cond.id}
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => toggleCondition(cond.id)}
                          className={`${styles.selectCard} ${isActive ? styles.selectCardActive : ""}`}
                          role="checkbox"
                          aria-checked={isActive}
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === " " || e.key === "Enter") {
                              e.preventDefault();
                              toggleCondition(cond.id);
                            }
                          }}
                        >
                          <span className={styles.cardIcon}>{cond.icon}</span>
                          <div className={styles.cardContent}>
                            <div className={styles.cardTitle}>{cond.title}</div>
                            <div className={styles.cardSubtitle}>{cond.desc}</div>
                          </div>
                          <div className={styles.checkIndicator}>{isActive && <Check size={12} strokeWidth={3} />}</div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Dedicated "Other" input field */}
                  <AnimatePresence>
                    {selectedConditions.includes("other") && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className={styles.otherFieldContainer}
                      >
                        <label htmlFor={otherConditionId} className={styles.label} style={{ marginBottom: "6px" }}>
                          Please specify other health concerns, medications or surgeries:
                        </label>
                        <textarea
                          id={otherConditionId}
                          value={otherConditionText}
                          onChange={(e) => setOtherConditionText(e.target.value)}
                          placeholder="e.g. Acid reflux after dinner, mild knee discomfort, takes Metformin 500mg..."
                          className={styles.textarea}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </section>

                {/* 6. Section 4: Food Preference */}
                <section className={styles.section}>
                  <div className={styles.sectionHeader}>
                    <span className={styles.sectionNumber}>04</span>
                    <div className={styles.sectionHeaderText}>
                      <h3>Food Preference</h3>
                      <p>Choose your everyday dietary lifestyle (single-select):</p>
                    </div>
                  </div>

                  <div className={styles.cardsGrid}>
                    {FOOD_PREFERENCES.map((food) => {
                      const isActive = selectedFoodPref === food.id;
                      return (
                        <motion.div
                          key={food.id}
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedFoodPref(food.id)}
                          className={`${styles.selectCard} ${isActive ? styles.selectCardActive : ""}`}
                          role="radio"
                          aria-checked={isActive}
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === " " || e.key === "Enter") {
                              e.preventDefault();
                              setSelectedFoodPref(food.id);
                            }
                          }}
                        >
                          <span className={styles.cardIcon}>{food.icon}</span>
                          <div className={styles.cardContent}>
                            <div className={styles.cardTitle}>{food.title}</div>
                            <div className={styles.cardSubtitle}>{food.desc}</div>
                            {food.hint && <span className={styles.cardBadge}>{food.hint}</span>}
                          </div>
                          <div className={styles.checkIndicator}>{isActive && <Check size={12} strokeWidth={3} />}</div>
                        </motion.div>
                      );
                    })}
                  </div>
                </section>

                {/* 7. Section 5: Wellness Goals */}
                <section className={styles.section}>
                  <div className={styles.sectionHeader}>
                    <span className={styles.sectionNumber}>05</span>
                    <div className={styles.sectionHeaderText}>
                      <h3>Wellness Goals</h3>
                      <p>What are your main aspirations for this consultation? (Select all that apply):</p>
                    </div>
                  </div>

                  <div className={styles.cardsGrid}>
                    {WELLNESS_GOALS.map((goal) => {
                      const isActive = selectedGoals.includes(goal.id);
                      return (
                        <motion.div
                          key={goal.id}
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => toggleGoal(goal.id)}
                          className={`${styles.selectCard} ${isActive ? styles.selectCardActive : ""}`}
                          role="checkbox"
                          aria-checked={isActive}
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === " " || e.key === "Enter") {
                              e.preventDefault();
                              toggleGoal(goal.id);
                            }
                          }}
                        >
                          <span className={styles.cardIcon}>{goal.icon}</span>
                          <div className={styles.cardContent}>
                            <div className={styles.cardTitle}>{goal.title}</div>
                            <div className={styles.cardSubtitle}>{goal.desc}</div>
                          </div>
                          <div className={styles.checkIndicator}>{isActive && <Check size={12} strokeWidth={3} />}</div>
                        </motion.div>
                      );
                    })}
                  </div>
                </section>

                {/* 8. Privacy & Consent Checkbox */}
                <label className={styles.consentBox}>
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className={styles.consentCheckbox}
                  />
                  <span className={styles.consentText}>
                    I agree to the <Link href="/privacy" target="_blank">Privacy Policy</Link> and consent to ChatHeal & Sujitha contacting me via WhatsApp/Phone with my personalized metabolic intake evaluation.
                  </span>
                </label>

                {/* Error Banner */}
                {errorMsg && (
                  <div className={styles.errorBanner} role="alert">
                    <AlertCircle size={18} />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* 9. Button: Complete My Assessment → */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={styles.submitBtn}
                >
                  {isSubmitting ? (
                    <>
                      <Sparkles size={18} className="animate-spin" /> Saving Your Assessment...
                    </>
                  ) : (
                    <>
                      Complete My Assessment <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.main>
        ) : (
          /* 10. Thank You Message (Replaces form after success) */
          <motion.div
            key="thank-you-screen"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className={styles.successCard}
          >
            <div className={styles.successIconWrap}>
              <CheckCircle2 size={42} strokeWidth={2.4} />
            </div>

            <h2 className={styles.successTitle}>Assessment Received!</h2>
            <p className={styles.successSubtitle}>
              Thank you, <strong>{fullName}</strong>! Sujitha and the ChatHeal clinical wellness team have received your baseline assessment. We will curate your tailored nutrition plan.
            </p>

            {/* Submission Summary Box */}
            <div className={styles.summaryBox}>
              <div className={styles.summaryHeader}>
                <h4>Intake Summary</h4>
                <span className={styles.badgePill}>
                  <Check size={12} /> Verified
                </span>
              </div>

              <div className={styles.summaryGrid}>
                <div className={styles.summaryItem}>
                  <label>Client</label>
                  <span>{fullName} ({age} yrs, {gender})</span>
                </div>
                <div className={styles.summaryItem}>
                  <label>WhatsApp</label>
                  <span>+91 {whatsApp}</span>
                </div>
                <div className={styles.summaryItem}>
                  <label>Height & Weight</label>
                  <span>{heightCm} cm · {weightKg} kg</span>
                </div>
                <div className={styles.summaryItem}>
                  <label>Food Preference</label>
                  <span>
                    {FOOD_PREFERENCES.find((f) => f.id === selectedFoodPref)?.icon}{" "}
                    {foodPrefTitle}
                    {FOOD_PREFERENCES.find((f) => f.id === selectedFoodPref)?.hint && (
                      <small style={{ color: "#5d7568", fontWeight: 500 }}>
                        {" "}
                        ({FOOD_PREFERENCES.find((f) => f.id === selectedFoodPref)?.hint})
                      </small>
                    )}
                  </span>
                </div>
              </div>

              {/* Health Background / Conditions (Section 03) */}
              <div className={styles.summarySectionDivider}>
                <div className={styles.summaryItem}>
                  <label>Health Background & Concerns</label>
                  <div className={styles.tagsRow}>
                    {selectedConditions.map((c) => {
                      if (c === "other") {
                        return (
                          <span key={c} className={`${styles.tagPill} ${styles.tagPillAmber}`}>
                            📝 {otherConditionText ? otherConditionText : "Other Health Concern"}
                          </span>
                        );
                      }
                      const cond = HEALTH_CONDITIONS.find((item) => item.id === c);
                      return (
                        <span key={c} className={styles.tagPill}>
                          {cond?.icon} {cond?.title || c}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Wellness Goals (Section 05) */}
              <div className={styles.summarySectionDivider}>
                <div className={styles.summaryItem}>
                  <label>Selected Wellness Goals</label>
                  <div className={styles.tagsRow}>
                    {selectedGoals.map((g) => {
                      const goal = WELLNESS_GOALS.find((item) => item.id === g);
                      return (
                        <span key={g} className={`${styles.tagPill} ${styles.tagPillGoal}`}>
                          {goal?.icon} {goal?.title || g}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className={styles.successActions}>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.whatsappCta}
              >
                <MessageCircle size={20} /> Connect with Sujitha on WhatsApp <ExternalLink size={15} />
              </a>
              <Link href="/" className={styles.secondaryReturnBtn}>
                <ArrowLeft size={16} /> Return to Home
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
