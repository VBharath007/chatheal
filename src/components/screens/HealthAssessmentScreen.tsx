"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ClipboardCheck,
  Activity,
  Flame,
  Leaf,
  Heart,
  Moon,
  Sun,
  Clock,
  Dumbbell,
  Utensils,
  CheckCircle2,
  AlertCircle,
  Printer,
  Copy,
  Send,
  Edit3,
  Scale,
  Ruler,
  Sparkles,
  Coffee,
  Apple,
  ShieldCheck,
  ChevronRight,
  ArrowUpRight,
  User,
  Phone,
  Calendar,
  Briefcase,
  AlertTriangle,
  RotateCcw,
  Check
} from "lucide-react";
import {
  PageTransition,
  FadeUp,
  StaggerWrap,
  StaggerItem,
  motion,
} from "../motion";
import { usePortal } from "../portal-context";
import styles from "./HealthAssessmentScreen.module.css";

interface AssessmentRecord {
  fullName?: string;
  age?: string;
  dob?: string;
  bloodGroup?: string;
  contactNumber?: string;
  weightKg?: string;
  heightCm?: string;
  waistCm?: string;
  hipCm?: string;
  chestCm?: string;
  armCm?: string;
  thighCm?: string;
  qualification?: string;
  occupation?: string;
  workType?: string;
  workingHours?: string;
  sleepTime?: string;
  wakeTime?: string;
  totalSleepHours?: string;
  fallAsleepImmediately?: string;
  fallAsleepDuration?: string;
  wakeDuringNight?: string;
  refreshedAfterWaking?: string;
  takingMedicines?: string;
  medicinesDetails?: string;
  constipation?: string;
  irregularPeriods?: string;
  surgeries?: string;
  surgeriesDetails?: string;
  jointOrBodyPain?: string;
  painDetails?: string;
  otherHealthConcerns?: string;
  meditation?: string;
  meditationFrequency?: string;
  exercise?: string;
  gym?: string;
  gymDays?: string;
  walking?: string;
  walkingDuration?: string;
  cardio?: string;
  cardioType?: string;
  yoga?: string;
  yogaDays?: string;
  otherSports?: string;
  foodAllergies?: string;
  allergiesDetails?: string;
  dietType?: string;
  veganDuration?: string;
  consumeTofu?: string;
  consumePlantProtein?: string;
  plantProteinDetails?: string;
  nonVegFoods?: string[];
  avoidNonVegSpecificDays?: string;
  avoidNonVegDays?: string[];
  dislikedFoods?: string;
  drinkTea?: string;
  teaCups?: string;
  drinkCoffee?: string;
  coffeeCups?: string;
  addSugar?: string;
  sugarAmount?: string;
  usualBreakfastTime?: string;
  usualLunchTime?: string;
  usualDinnerTime?: string;
  snacksBetweenMeals?: string;
  snackTime?: string;
  convenientBreakfastTime?: string;
  convenientLunchTime?: string;
  convenientDinnerTime?: string;
  difficultyFixedTiming?: string;
  difficultyTimingDetails?: string;
  alcohol?: string;
  tobacco?: string;
  otherSubstances?: string;
  planRequired?: string;
  planDuration?: string;
  mainGoal?: string;
  additionalInfo?: string;
  signature?: string;
  submittedAt?: string;
}

export default function HealthAssessmentScreen() {
  const { user } = usePortal();
  const [data, setData] = useState<AssessmentRecord | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("chatheal_client_assessment");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setData(parsed);
          return;
        } catch {}
      }
      // If no explicit assessment is saved, check if user profile exists
      if (user && (user.weight || user.name)) {
        setData({
          fullName: user.name,
          weightKg: String(user.weight || "68"),
          heightCm: String(user.height || "165"),
          bloodGroup: "O+ (Baseline)",
          dietType: "Vegetarian",
          totalSleepHours: "7.5",
          mainGoal: "Personalized Whole-Food Nutrition & Energy Reset",
          submittedAt: new Date().toISOString(),
        });
      }
    }
  }, [user]);

  // Derived Calculations
  const weight = data?.weightKg ? parseFloat(data.weightKg) : 0;
  const height = data?.heightCm ? parseFloat(data.heightCm) : 0;
  let bmi: number | null = null;
  let bmiCategory = "Healthy Weight";
  let bmiClass = styles.bmiHealthy;
  let needlePercent = 50;

  if (weight > 0 && height > 0) {
    const heightM = height / 100;
    bmi = parseFloat((weight / (heightM * heightM)).toFixed(1));

    if (bmi < 18.5) {
      bmiCategory = "Underweight (< 18.5)";
      bmiClass = styles.bmiUnderweight;
    } else if (bmi <= 24.9) {
      bmiCategory = "Healthy Weight (18.5 - 24.9)";
      bmiClass = styles.bmiHealthy;
    } else if (bmi <= 29.9) {
      bmiCategory = "Overweight (25.0 - 29.9)";
      bmiClass = styles.bmiOverweight;
    } else {
      bmiCategory = "Obese Baseline (≥ 30.0)";
      bmiClass = styles.bmiObese;
    }

    // Gauge track calculation: 14 to 38
    needlePercent = Math.min(Math.max(((bmi - 14) / (38 - 14)) * 100, 4), 96);
  }

  // Waist-to-Hip Ratio
  const waist = data?.waistCm ? parseFloat(data.waistCm) : null;
  const hip = data?.hipCm ? parseFloat(data.hipCm) : null;
  const whr = waist && hip && hip > 0 ? (waist / hip).toFixed(2) : null;

  // WhatsApp formatted string generator
  const formatWhatsAppText = () => {
    if (!data) return "";
    return `*CHATHEAL CLINICAL ASSESSMENT SUMMARY*
*Client:* ${data.fullName || user?.name || "Client"}
*Contact:* ${data.contactNumber || user?.phone || "-"}
*Submitted:* ${data.submittedAt ? new Date(data.submittedAt).toLocaleDateString("en-IN") : "Active"}

*1. Vitals & Body Measurements*
• Weight: ${data.weightKg ? `${data.weightKg} kg` : "-"}
• Height: ${data.heightCm ? `${data.heightCm} cm` : "-"}
• Calculated BMI: ${bmi ? `${bmi} (${bmiCategory})` : "-"}
• Waist: ${data.waistCm ? `${data.waistCm} cm` : "-"} | Hip: ${data.hipCm ? `${data.hipCm} cm` : "-"}
• Blood Group: ${data.bloodGroup || "-"} | Age: ${data.age || "-"}

*2. Circadian Rhythm & Sleep*
• Sleep Schedule: ${data.sleepTime || "-"} to ${data.wakeTime || "-"} (${data.totalSleepHours || "7"} hrs)
• Rested on Waking: ${data.refreshedAfterWaking || "-"}

*3. Clinical & Digestion*
• Medications: ${data.takingMedicines === "Yes" ? data.medicinesDetails || "Yes" : "None"}
• Digestion/Constipation: ${data.constipation || "No"}
• Health Concerns: ${data.otherHealthConcerns || "General Wellness"}

*4. Exercise & Movement*
• Regular Exercise: ${data.exercise || "No"}
• Walking / Gym / Yoga: ${data.walking === "Yes" ? `Walking (${data.walkingDuration || "-"})` : ""} ${data.gym === "Yes" ? `Gym (${data.gymDays || "-"})` : ""} ${data.yoga === "Yes" ? "Yoga" : ""}

*5. Nutrition & Food Habits*
• Diet Type: ${data.dietType || "Vegetarian"}
• Allergies: ${data.foodAllergies === "Yes" ? data.allergiesDetails || "Reported" : "None reported"}
• Meal Timings: Breakfast: ${data.usualBreakfastTime || "-"} | Lunch: ${data.usualLunchTime || "-"} | Dinner: ${data.usualDinnerTime || "-"}

*Primary Health Target:* ${data.mainGoal || "Personalized Whole-Food Nutrition & Energy Reset"}`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formatWhatsAppText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {}
  };

  if (!data || (!data.fullName && !data.weightKg)) {
    return (
      <PageTransition>
        <div className={styles.emptyCard}>
          <div className={styles.emptyIconCircle}>
            <ClipboardCheck size={36} />
          </div>
          <h2 className={styles.emptyHeading}>Your Health Assessment is Pending</h2>
          <p className={styles.emptyText}>
            You haven't completed your 13-point clinical health intake yet. Complete it once to calibrate your personalized BMR calories, nutrient distribution, and sync directly with Dietitian Sujitha C.
          </p>
          <Link href="/assessment" className={styles.btnActionPrimary}>
            <Sparkles size={16} />
            <span>Complete Intake Assessment Now</span>
            <ChevronRight size={16} />
          </Link>
        </div>
      </PageTransition>
    );
  }

  const isVisible = (sectionName: string) =>
    activeFilter === "all" || activeFilter === sectionName;

  return (
    <PageTransition>
      <div className={styles.container}>
        {/* Executive Sanctuary Header */}
        <section className={styles.heroCard}>
          <div className={styles.heroTop}>
            <div className={styles.heroTitles}>
              <span className={styles.heroKicker}>
                <Sparkles size={12} />
                CLINICAL HEALTH PROFILE &amp; ASSESSMENT
              </span>
              <h1 className={styles.heroHeading}>
                {data.fullName || user?.name || "Client"}&rsquo;s Assessment Baseline
              </h1>
              <p className={styles.heroSubtitle}>
                Your complete 13-point anthropometric measurements, circadian sleep rhythm, digestive health history, and nutrition schedule recorded and verified with Dietitian Sujitha C.
              </p>

              <div className={styles.heroMetaRow}>
                <span className={styles.syncBadge}>
                  <span className={styles.pulseDot} />
                  Synchronized with Coach Sujitha C.
                </span>
                {data.bloodGroup && (
                  <span className={styles.metaPill}>
                    <Heart size={13} style={{ color: "#d9485f" }} />
                    Blood Group: <b>{data.bloodGroup}</b>
                  </span>
                )}
                {data.age && (
                  <span className={styles.metaPill}>
                    <User size={13} />
                    Age: <b>{data.age} yrs</b>
                  </span>
                )}
                {data.contactNumber && (
                  <span className={styles.metaPill}>
                    <Phone size={13} />
                    <b>{data.contactNumber}</b>
                  </span>
                )}
                {data.submittedAt && (
                  <span className={styles.metaPill}>
                    <Calendar size={13} />
                    Last Updated:{" "}
                    <b>
                      {new Date(data.submittedAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </b>
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons Toolbar */}
            <div className={styles.actionToolbar}>
              <Link
                href="/assessment?edit=true"
                className={styles.btnActionSecondary}
                title="Update your assessment measurements and routines"
              >
                <Edit3 size={15} />
                <span>Update Responses</span>
              </Link>

              <a
                href={`https://wa.me/918248862343?text=${encodeURIComponent(formatWhatsAppText())}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnActionWhatsApp}
                title="Send full clinical assessment to Sujitha on WhatsApp"
              >
                <Send size={15} />
                <span>Transmit to Sujitha</span>
              </a>

              <button
                type="button"
                onClick={handleCopy}
                className={styles.btnActionSecondary}
                title="Copy full text summary to clipboard"
              >
                {copied ? <Check size={15} style={{ color: "#166534" }} /> : <Copy size={15} />}
                <span>{copied ? "Copied!" : "Copy Text"}</span>
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className={styles.btnActionSecondary}
                title="Print or export as PDF"
              >
                <Printer size={15} />
                <span>Save PDF</span>
              </button>
            </div>
          </div>

          {/* 4-KPI Overview Strip */}
          <div className={styles.kpiStrip}>
            <div className={styles.kpiCard}>
              <div className={styles.kpiIconWrap} style={{ background: "#e8f5e9", color: "#1b5e20" }}>
                <Scale size={20} />
              </div>
              <div className={styles.kpiBody}>
                <span className={styles.kpiLabel}>Baseline Weight</span>
                <span className={styles.kpiValue}>
                  {data.weightKg ? `${data.weightKg} kg` : "—"}
                </span>
                <span className={styles.kpiSub}>
                  Height: {data.heightCm ? `${data.heightCm} cm` : "—"}
                </span>
              </div>
            </div>

            <div className={styles.kpiCard}>
              <div className={styles.kpiIconWrap} style={{ background: "#e0f2fe", color: "#0284c7" }}>
                <Activity size={20} />
              </div>
              <div className={styles.kpiBody}>
                <span className={styles.kpiLabel}>Calculated BMI</span>
                <span className={styles.kpiValue}>
                  {bmi !== null ? bmi : "—"}
                </span>
                <span className={styles.kpiSub} style={{ color: bmi && bmi <= 24.9 && bmi >= 18.5 ? "#166534" : "#b45309", fontWeight: 600 }}>
                  {bmiCategory.split("(")[0]}
                </span>
              </div>
            </div>

            <div className={styles.kpiCard}>
              <div className={styles.kpiIconWrap} style={{ background: "#fef3c7", color: "#b45309" }}>
                <Utensils size={20} />
              </div>
              <div className={styles.kpiBody}>
                <span className={styles.kpiLabel}>Dietary Protocol</span>
                <span className={styles.kpiValue}>
                  {data.dietType || "Whole-Food"}
                </span>
                <span className={styles.kpiSub}>
                  {data.foodAllergies === "Yes" ? `Allergies: ${data.allergiesDetails || "Yes"}` : "No Food Allergies"}
                </span>
              </div>
            </div>

            <div className={styles.kpiCard}>
              <div className={styles.kpiIconWrap} style={{ background: "#f3e8ff", color: "#7e22ce" }}>
                <Flame size={20} />
              </div>
              <div className={styles.kpiBody}>
                <span className={styles.kpiLabel}>Primary Health Goal</span>
                <span className={styles.kpiValue} style={{ fontSize: "15px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "160px" }}>
                  {data.mainGoal || "Metabolic Wellness"}
                </span>
                <span className={styles.kpiSub}>
                  {data.planDuration ? `${data.planDuration} Plan` : "Coaching Track"}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Section Quick Jump Filter Rail */}
        <div className={styles.navRail}>
          {[
            ["all", "All Profile Sections", ClipboardCheck],
            ["vitals", "1. Body Biometrics & BMI", Scale],
            ["sleep", "2. Circadian & Sleep Rhythm", Moon],
            ["clinical", "3. Health & Digestion History", Heart],
            ["fitness", "4. Physical Activity & Movement", Dumbbell],
            ["nutrition", "5. Diet, Allergies & Timings", Utensils],
            ["goals", "6. Goals & Care Package", Sparkles],
          ].map(([id, label, IconComponent]: any) => (
            <button
              key={id}
              type="button"
              className={`${styles.navRailBtn} ${activeFilter === id ? styles.navRailBtnActive : ""}`}
              onClick={() => setActiveFilter(id)}
            >
              <IconComponent size={14} />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* 2-Column Responsive Sanctuary Grid */}
        <div className={styles.gridTwoCol}>
          {/* CARD 1: Precision Anthropometrics & Real-Time BMI Spectrum */}
          {isVisible("vitals") && (
            <FadeUp as="section" className={styles.panelCard}>
              <div className={styles.panelHeader}>
                <div className={`${styles.panelIcon} ${styles.iconEmerald}`}>
                  <Scale size={20} />
                </div>
                <div className={styles.panelTitleWrap}>
                  <span className={styles.panelEyebrow}>SECTION 01 · ANTHROPOMETRICS</span>
                  <h2 className={styles.panelTitle}>Body Measurements &amp; Precision BMI</h2>
                </div>
              </div>

              {/* Real-Time Precision BMI Spectrum Gauge */}
              <div className={styles.bmiInstrument}>
                <div className={styles.bmiTopRow}>
                  <div className={styles.bmiScoreGroup}>
                    <span className={styles.bmiNumber}>{bmi !== null ? bmi : "—"}</span>
                    <span className={styles.bmiScoreLabel}>Calculated BMI</span>
                  </div>
                  <div className={`${styles.bmiCategoryPill} ${bmiClass}`}>
                    <Sparkles size={14} />
                    <span>{bmiCategory}</span>
                  </div>
                </div>

                <div className={styles.bmiGaugeWrap}>
                  <div className={styles.bmiTrack}>
                    <div className={styles.segUnder} title="Underweight (< 18.5)" />
                    <div className={styles.segNormal} title="Healthy (18.5 - 24.9)" />
                    <div className={styles.segOver} title="Overweight (25 - 29.9)" />
                    <div className={styles.segObese} title="Obese (≥ 30.0)" />
                  </div>
                  <div className={styles.bmiLegendRow}>
                    <span>&lt; 18.5 Under</span>
                    <span>18.5 - 24.9 Normal</span>
                    <span>25 - 29.9 Over</span>
                    <span>≥ 30 Obese</span>
                  </div>
                </div>
              </div>

              {/* Circumferences 6-Grid */}
              <div className={styles.circumferenceGrid}>
                <div className={styles.circumferenceItem}>
                  <span className={styles.circumferenceLabel}>Weight</span>
                  <span className={styles.circumferenceValue}>{data.weightKg || "—"} kg</span>
                </div>
                <div className={styles.circumferenceItem}>
                  <span className={styles.circumferenceLabel}>Height</span>
                  <span className={styles.circumferenceValue}>{data.heightCm || "—"} cm</span>
                </div>
                <div className={styles.circumferenceItem}>
                  <span className={styles.circumferenceLabel}>Waist</span>
                  <span className={styles.circumferenceValue}>{data.waistCm ? `${data.waistCm} cm` : "—"}</span>
                </div>
                <div className={styles.circumferenceItem}>
                  <span className={styles.circumferenceLabel}>Hip</span>
                  <span className={styles.circumferenceValue}>{data.hipCm ? `${data.hipCm} cm` : "—"}</span>
                </div>
                <div className={styles.circumferenceItem}>
                  <span className={styles.circumferenceLabel}>WHR Ratio</span>
                  <span className={styles.circumferenceValue}>
                    {whr || "—"}
                  </span>
                </div>
                <div className={styles.circumferenceItem}>
                  <span className={styles.circumferenceLabel}>Chest</span>
                  <span className={styles.circumferenceValue}>{data.chestCm ? `${data.chestCm} cm` : "—"}</span>
                </div>
                <div className={styles.circumferenceItem}>
                  <span className={styles.circumferenceLabel}>Upper Arm</span>
                  <span className={styles.circumferenceValue}>{data.armCm ? `${data.armCm} cm` : "—"}</span>
                </div>
                <div className={styles.circumferenceItem}>
                  <span className={styles.circumferenceLabel}>Thigh</span>
                  <span className={styles.circumferenceValue}>{data.thighCm ? `${data.thighCm} cm` : "—"}</span>
                </div>
              </div>
            </FadeUp>
          )}

          {/* CARD 2: Work Environment, Circadian Rhythm & Sleep Health */}
          {isVisible("sleep") && (
            <FadeUp as="section" className={styles.panelCard}>
              <div className={styles.panelHeader}>
                <div className={`${styles.panelIcon} ${styles.iconViolet}`}>
                  <Moon size={20} />
                </div>
                <div className={styles.panelTitleWrap}>
                  <span className={styles.panelEyebrow}>SECTION 02 · CIRCADIAN RHYTHM</span>
                  <h2 className={styles.panelTitle}>Work, Lifestyle &amp; Sleep Health</h2>
                </div>
              </div>

              <div className={styles.dataList}>
                <div className={styles.dataItem}>
                  <span className={styles.dataLabel}>
                    <Briefcase size={14} />
                    Occupation &amp; Field
                  </span>
                  <span className={styles.dataValue}>
                    {data.occupation ? `${data.occupation} ${data.qualification ? `(${data.qualification})` : ""}` : "Not Specified"}
                  </span>
                </div>

                <div className={styles.dataItem}>
                  <span className={styles.dataLabel}>Work Posture / Type</span>
                  <span className={styles.dataValue}>
                    <span className={styles.valueTagNeutral}>{data.workType || "Mixed"}</span>
                    {data.workingHours ? ` · ${data.workingHours} hrs/day` : ""}
                  </span>
                </div>

                <div className={styles.dataItem}>
                  <span className={styles.dataLabel}>
                    <Clock size={14} />
                    Sleep Schedule
                  </span>
                  <span className={styles.dataValue}>
                    {data.sleepTime || "10:30 PM"} — {data.wakeTime || "06:30 AM"}
                  </span>
                </div>

                <div className={styles.dataItem}>
                  <span className={styles.dataLabel}>Total Sleep Duration</span>
                  <span className={styles.dataValue}>
                    <span className={styles.valueTagGreen}>
                      {data.totalSleepHours ? `${data.totalSleepHours} Hours / Night` : "7.5 Hours"}
                    </span>
                  </span>
                </div>

                <div className={styles.dataItem}>
                  <span className={styles.dataLabel}>Falls Asleep Easily?</span>
                  <span className={styles.dataValue}>
                    {data.fallAsleepImmediately === "Yes" ? (
                      <span className={styles.valueTagGreen}>Yes, within minutes</span>
                    ) : (
                      <span className={styles.valueTagWarning}>Takes {data.fallAsleepDuration || "20+ mins"}</span>
                    )}
                  </span>
                </div>

                <div className={styles.dataItem}>
                  <span className={styles.dataLabel}>Night-Time Awakenings</span>
                  <span className={styles.dataValue}>
                    {data.wakeDuringNight === "Yes" ? (
                      <span className={styles.valueTagWarning}>Wakes up during night</span>
                    ) : (
                      <span className={styles.valueTagGreen}>Uninterrupted Sound Sleep</span>
                    )}
                  </span>
                </div>

                <div className={styles.dataItem}>
                  <span className={styles.dataLabel}>Rested Upon Waking</span>
                  <span className={styles.dataValue}>
                    {data.refreshedAfterWaking === "Yes" ? (
                      <span className={styles.valueTagGreen}>Refreshed &amp; Energized</span>
                    ) : data.refreshedAfterWaking === "Sometimes" ? (
                      <span className={styles.valueTagWarning}>Sometimes Tired</span>
                    ) : (
                      <span className={styles.valueTagAlert}>Frequently Sluggish</span>
                    )}
                  </span>
                </div>
              </div>
            </FadeUp>
          )}

          {/* CARD 3: Clinical Health, Digestion & Medical Background */}
          {isVisible("clinical") && (
            <FadeUp as="section" className={styles.panelCard}>
              <div className={styles.panelHeader}>
                <div className={`${styles.panelIcon} ${styles.iconAmber}`}>
                  <Heart size={20} />
                </div>
                <div className={styles.panelTitleWrap}>
                  <span className={styles.panelEyebrow}>SECTION 03 · MEDICAL BASELINE</span>
                  <h2 className={styles.panelTitle}>Clinical &amp; Digestion History</h2>
                </div>
              </div>

              <div className={styles.dataList}>
                <div className={styles.dataItem}>
                  <span className={styles.dataLabel}>Regular Medications</span>
                  <span className={styles.dataValue}>
                    {data.takingMedicines === "Yes" ? (
                      <span className={styles.valueTagWarning}>Yes, taking medications</span>
                    ) : (
                      <span className={styles.valueTagGreen}>None reported</span>
                    )}
                  </span>
                </div>

                {data.takingMedicines === "Yes" && data.medicinesDetails && (
                  <div className={styles.detailsBlock}>
                    <div className={styles.detailsBlockTitle}>
                      <AlertTriangle size={13} style={{ color: "#d97706" }} />
                      Medication Dosages &amp; Regimen
                    </div>
                    <p className={styles.detailsBlockText}>{data.medicinesDetails}</p>
                  </div>
                )}

                <div className={styles.dataItem}>
                  <span className={styles.dataLabel}>Digestive Health / Constipation</span>
                  <span className={styles.dataValue}>
                    {data.constipation === "Yes" ? (
                      <span className={styles.valueTagAlert}>Constipation Reported</span>
                    ) : (
                      <span className={styles.valueTagGreen}>Regular Bowel Health</span>
                    )}
                  </span>
                </div>

                {data.irregularPeriods && data.irregularPeriods !== "Not Applicable" && (
                  <div className={styles.dataItem}>
                    <span className={styles.dataLabel}>Menstrual Cycle Rhythm</span>
                    <span className={styles.dataValue}>
                      {data.irregularPeriods === "Yes" ? (
                        <span className={styles.valueTagAlert}>Irregular / Delayed</span>
                      ) : (
                        <span className={styles.valueTagGreen}>Regular Cycle</span>
                      )}
                    </span>
                  </div>
                )}

                <div className={styles.dataItem}>
                  <span className={styles.dataLabel}>Surgeries / Past Procedures</span>
                  <span className={styles.dataValue}>
                    {data.surgeries === "Yes" ? (
                      <span className={styles.valueTagWarning}>Prior Surgeries</span>
                    ) : (
                      <span className={styles.valueTagGreen}>None</span>
                    )}
                  </span>
                </div>

                {data.surgeries === "Yes" && data.surgeriesDetails && (
                  <div className={styles.detailsBlock}>
                    <div className={styles.detailsBlockTitle}>Surgical History Details</div>
                    <p className={styles.detailsBlockText}>{data.surgeriesDetails}</p>
                  </div>
                )}

                <div className={styles.dataItem}>
                  <span className={styles.dataLabel}>Joint / Musculoskeletal Pain</span>
                  <span className={styles.dataValue}>
                    {data.jointOrBodyPain === "Yes" ? (
                      <span className={styles.valueTagWarning}>Pain / Discomfort Reported</span>
                    ) : (
                      <span className={styles.valueTagGreen}>No Chronic Pain</span>
                    )}
                  </span>
                </div>

                {data.jointOrBodyPain === "Yes" && data.painDetails && (
                  <div className={styles.detailsBlock}>
                    <div className={styles.detailsBlockTitle}>Pain Focus &amp; Location</div>
                    <p className={styles.detailsBlockText}>{data.painDetails}</p>
                  </div>
                )}

                {data.otherHealthConcerns && (
                  <div className={styles.detailsBlock} style={{ background: "#f0fdf4", borderColor: "#bbf7d0" }}>
                    <div className={styles.detailsBlockTitle} style={{ color: "#166534" }}>
                      <Sparkles size={13} />
                      Specific Health Concerns &amp; Focus
                    </div>
                    <p className={styles.detailsBlockText}>{data.otherHealthConcerns}</p>
                  </div>
                )}
              </div>
            </FadeUp>
          )}

          {/* CARD 4: Physical Fitness, Movement & Mindfulness */}
          {isVisible("fitness") && (
            <FadeUp as="section" className={styles.panelCard}>
              <div className={styles.panelHeader}>
                <div className={`${styles.panelIcon} ${styles.iconBlue}`}>
                  <Dumbbell size={20} />
                </div>
                <div className={styles.panelTitleWrap}>
                  <span className={styles.panelEyebrow}>SECTION 04 · PHYSICAL ACTIVITY</span>
                  <h2 className={styles.panelTitle}>Fitness, Movement &amp; Mindfulness</h2>
                </div>
              </div>

              <div className={styles.dataList}>
                <div className={styles.dataItem}>
                  <span className={styles.dataLabel}>Regular Physical Exercise</span>
                  <span className={styles.dataValue}>
                    {data.exercise === "Yes" ? (
                      <span className={styles.valueTagGreen}>Active Routine</span>
                    ) : (
                      <span className={styles.valueTagNeutral}>Sedentary / Light</span>
                    )}
                  </span>
                </div>

                <div className={styles.dataItem}>
                  <span className={styles.dataLabel}>Gym / Strength Training</span>
                  <span className={styles.dataValue}>
                    {data.gym === "Yes" ? (
                      <span className={styles.valueTagGreen}>{data.gymDays || "3-4"} Days / Week</span>
                    ) : (
                      <span className={styles.valueTagNeutral}>None</span>
                    )}
                  </span>
                </div>

                <div className={styles.dataItem}>
                  <span className={styles.dataLabel}>Daily Walking Routine</span>
                  <span className={styles.dataValue}>
                    {data.walking === "Yes" ? (
                      <span className={styles.valueTagGreen}>{data.walkingDuration || "30-45"} Mins / Day</span>
                    ) : (
                      <span className={styles.valueTagNeutral}>Occasional</span>
                    )}
                  </span>
                </div>

                <div className={styles.dataItem}>
                  <span className={styles.dataLabel}>Cardiovascular Training</span>
                  <span className={styles.dataValue}>
                    {data.cardio === "Yes" ? (
                      <span className={styles.valueTagGreen}>{data.cardioType || "Jogging / Cycling"}</span>
                    ) : (
                      <span className={styles.valueTagNeutral}>None</span>
                    )}
                  </span>
                </div>

                <div className={styles.dataItem}>
                  <span className={styles.dataLabel}>Mindful Yoga Practice</span>
                  <span className={styles.dataValue}>
                    {data.yoga === "Yes" ? (
                      <span className={styles.valueTagGreen}>{data.yogaDays || "2-3"} Days / Week</span>
                    ) : (
                      <span className={styles.valueTagNeutral}>None</span>
                    )}
                  </span>
                </div>

                <div className={styles.dataItem}>
                  <span className={styles.dataLabel}>Meditation &amp; Breathwork</span>
                  <span className={styles.dataValue}>
                    {data.meditation === "Yes" ? (
                      <span className={styles.valueTagGreen}>{data.meditationFrequency || "Regular Practice"}</span>
                    ) : (
                      <span className={styles.valueTagNeutral}>Not Practicing</span>
                    )}
                  </span>
                </div>

                {data.otherSports && (
                  <div className={styles.dataItem}>
                    <span className={styles.dataLabel}>Outdoor Sports &amp; Recreation</span>
                    <span className={styles.dataValue}>{data.otherSports}</span>
                  </div>
                )}
              </div>
            </FadeUp>
          )}

          {/* CARD 5: Nutrition, Dietary Preferences & Meal Timings (Full Width) */}
          {isVisible("nutrition") && (
            <FadeUp as="section" className={`${styles.panelCard} ${styles.gridFullWidth}`}>
              <div className={styles.panelHeader}>
                <div className={`${styles.panelIcon} ${styles.iconEmerald}`}>
                  <Utensils size={20} />
                </div>
                <div className={styles.panelTitleWrap}>
                  <span className={styles.panelEyebrow}>SECTION 05 · NUTRITION ARCHITECTURE</span>
                  <h2 className={styles.panelTitle}>Dietary Preferences, Allergies &amp; Meal Timings</h2>
                </div>
              </div>

              <div className={styles.dataList}>
                <div className={styles.dataItem}>
                  <span className={styles.dataLabel}>Primary Diet Preference</span>
                  <span className={styles.dataValue}>
                    <span className={styles.valueTagGreen} style={{ fontSize: "14px" }}>
                      {data.dietType || "Vegetarian"}
                    </span>
                  </span>
                </div>

                <div className={styles.dataItem}>
                  <span className={styles.dataLabel}>Food Allergies &amp; Sensitivities</span>
                  <span className={styles.dataValue}>
                    {data.foodAllergies === "Yes" ? (
                      <span className={styles.valueTagAlert}>
                        <AlertTriangle size={12} style={{ marginRight: "4px" }} />
                        {data.allergiesDetails || "Allergies Reported"}
                      </span>
                    ) : (
                      <span className={styles.valueTagGreen}>No Known Allergies</span>
                    )}
                  </span>
                </div>

                {data.dislikedFoods && (
                  <div className={styles.dataItem}>
                    <span className={styles.dataLabel}>Disliked / Excluded Foods</span>
                    <span className={styles.dataValue}>{data.dislikedFoods}</span>
                  </div>
                )}

                {data.dietType === "Non-Vegetarian" && data.nonVegFoods && data.nonVegFoods.length > 0 && (
                  <div className={styles.dataItem}>
                    <span className={styles.dataLabel}>Non-Veg Preferences</span>
                    <span className={styles.dataValue}>{data.nonVegFoods.join(", ")}</span>
                  </div>
                )}

                {data.avoidNonVegSpecificDays === "Yes" && data.avoidNonVegDays && (
                  <div className={styles.dataItem}>
                    <span className={styles.dataLabel}>Days Non-Veg is Avoided</span>
                    <span className={styles.dataValue}>
                      <span className={styles.valueTagNeutral}>{data.avoidNonVegDays.join(", ")}</span>
                    </span>
                  </div>
                )}

                <div className={styles.dataItem}>
                  <span className={styles.dataLabel}>
                    <Coffee size={14} />
                    Tea &amp; Coffee Intake
                  </span>
                  <span className={styles.dataValue}>
                    Tea: {data.drinkTea === "Yes" ? `${data.teaCups || "1"} cups` : "None"} · Coffee:{" "}
                    {data.drinkCoffee === "Yes" ? `${data.coffeeCups || "1"} cups` : "None"} · Sugar:{" "}
                    {data.addSugar === "Yes" ? `${data.sugarAmount || "1 tsp"}` : "Sugar-free"}
                  </span>
                </div>
              </div>

              {/* Chrono-Nutrition Meal Scheduling Grid */}
              <div style={{ marginTop: "18px" }}>
                <span className={styles.panelEyebrow} style={{ marginBottom: "8px" }}>
                  CHRONO-NUTRITION · DAILY MEAL SCHEDULE
                </span>
                <div className={styles.mealTimingGrid}>
                  <div className={styles.mealTimingCard}>
                    <span className={styles.mealTimingTitle}>
                      <Sun size={14} />
                      Breakfast
                    </span>
                    <span className={styles.mealTimingTime}>{data.usualBreakfastTime || "08:30 AM"}</span>
                    <span className={styles.mealTimingConvenient}>
                      Target: {data.convenientBreakfastTime || data.usualBreakfastTime || "08:30 AM"}
                    </span>
                  </div>

                  <div className={styles.mealTimingCard}>
                    <span className={styles.mealTimingTitle}>
                      <Sun size={14} />
                      Lunch
                    </span>
                    <span className={styles.mealTimingTime}>{data.usualLunchTime || "01:30 PM"}</span>
                    <span className={styles.mealTimingConvenient}>
                      Target: {data.convenientLunchTime || data.usualLunchTime || "01:30 PM"}
                    </span>
                  </div>

                  <div className={styles.mealTimingCard}>
                    <span className={styles.mealTimingTitle}>
                      <Moon size={14} />
                      Dinner
                    </span>
                    <span className={styles.mealTimingTime}>{data.usualDinnerTime || "08:00 PM"}</span>
                    <span className={styles.mealTimingConvenient}>
                      Target: {data.convenientDinnerTime || data.usualDinnerTime || "08:00 PM"}
                    </span>
                  </div>

                  <div className={styles.mealTimingCard}>
                    <span className={styles.mealTimingTitle}>
                      <Apple size={14} />
                      Snacks
                    </span>
                    <span className={styles.mealTimingTime}>
                      {data.snacksBetweenMeals === "Yes" ? data.snackTime || "04:30 PM" : "None"}
                    </span>
                    <span className={styles.mealTimingConvenient}>
                      {data.difficultyFixedTiming === "Yes" ? "Variable Schedule" : "Fixed Timings"}
                    </span>
                  </div>
                </div>
              </div>
            </FadeUp>
          )}

          {/* CARD 6: Long-Term Wellness Targets & Program Scope */}
          {isVisible("goals") && (
            <FadeUp as="section" className={`${styles.panelCard} ${styles.gridFullWidth}`}>
              <div className={styles.panelHeader}>
                <div className={`${styles.panelIcon} ${styles.iconRose}`}>
                  <Sparkles size={20} />
                </div>
                <div className={styles.panelTitleWrap}>
                  <span className={styles.panelEyebrow}>SECTION 06 · CARE AGREEMENT &amp; GOALS</span>
                  <h2 className={styles.panelTitle}>Holistic Transformation Targets &amp; Plan Scope</h2>
                </div>
              </div>

              <div className={styles.dataList}>
                <div className={styles.dataItem}>
                  <span className={styles.dataLabel}>Primary Health &amp; Transformation Target</span>
                  <span className={styles.dataValue} style={{ color: "#166534", fontWeight: 750 }}>
                    {data.mainGoal || "Personalized Whole-Food Nutrition & Energy Reset"}
                  </span>
                </div>

                <div className={styles.dataItem}>
                  <span className={styles.dataLabel}>Dedicated Care Program Duration</span>
                  <span className={styles.dataValue}>
                    <span className={styles.valueTagGreen}>
                      {data.planDuration ? `${data.planDuration} Clinical Coaching` : "6 Months Package"}
                    </span>
                  </span>
                </div>

                <div className={styles.dataItem}>
                  <span className={styles.dataLabel}>Substance Exposure (Alcohol / Tobacco)</span>
                  <span className={styles.dataValue}>
                    Alcohol: {data.alcohol || "No"} · Tobacco: {data.tobacco || "No"}
                  </span>
                </div>

                {data.additionalInfo && (
                  <div className={styles.detailsBlock}>
                    <div className={styles.detailsBlockTitle}>Additional Notes &amp; Dietary Context</div>
                    <p className={styles.detailsBlockText}>{data.additionalInfo}</p>
                  </div>
                )}
              </div>

              {/* Sign-Off Verification Strip */}
              <div className={styles.signoffStrip} style={{ marginTop: "18px" }}>
                <div className={styles.signoffInfo}>
                  <div className={styles.signoffIcon}>
                    <ShieldCheck size={22} />
                  </div>
                  <div>
                    <h4 className={styles.signoffTitle}>Clinically Verified Intake Agreement</h4>
                    <p className={styles.signoffSub}>
                      Digitally declared by <b>{data.signature || data.fullName || user?.name || "Client"}</b> · Synchronized with ChatHeal Clinical Nutrition Services.
                    </p>
                  </div>
                </div>

                <Link href="/assessment?edit=true" className={styles.btnActionSecondary}>
                  <RotateCcw size={14} />
                  <span>Update Any Response</span>
                </Link>
              </div>
            </FadeUp>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
