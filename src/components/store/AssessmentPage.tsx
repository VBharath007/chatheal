"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Send,
  Copy,
  Printer,
  RotateCcw,
  ShieldCheck,
  Check,
  Sparkles,
  AlertCircle,
  Clock,
  ArrowRight,
  User,
  Moon,
  Activity,
  Dumbbell,
  Utensils,
  CheckCircle2,
  ClipboardCheck,
} from "lucide-react";
import styles from "./AssessmentPage.module.css";

export interface AssessmentData {
  // 1. Personal Details
  fullName: string;
  age: string;
  dob: string;
  bloodGroup: string;
  contactNumber: string;

  // 2. Body Measurements
  weightKg: string;
  heightCm: string;
  waistCm: string;
  hipCm: string;
  chestCm: string;
  armCm: string;
  thighCm: string;

  // 3. Education & Work
  qualification: string;
  occupation: string;
  workType: "Sitting" | "Standing" | "Physical" | "Mixed";
  workingHours: string;

  // 4. Sleep
  sleepTime: string;
  wakeTime: string;
  totalSleepHours: string;
  fallAsleepImmediately: "Yes" | "No";
  fallAsleepDuration: string;
  wakeDuringNight: "Yes" | "No";
  refreshedAfterWaking: "Yes" | "No" | "Sometimes";

  // 5. Health
  takingMedicines: "Yes" | "No";
  medicinesDetails: string;
  constipation: "Yes" | "No";
  irregularPeriods: "Yes" | "No" | "Not Applicable";
  surgeries: "Yes" | "No";
  surgeriesDetails: string;
  jointOrBodyPain: "Yes" | "No";
  painDetails: string;
  otherHealthConcerns: string;

  // 6. Meditation
  meditation: "Yes" | "No";
  meditationFrequency: string;

  // 7. Exercise & Physical Activity
  exercise: "Yes" | "No";
  gym: "Yes" | "No";
  gymDays: string;
  walking: "Yes" | "No";
  walkingDuration: string;
  cardio: "Yes" | "No";
  cardioType: string;
  yoga: "Yes" | "No";
  yogaDays: string;
  otherSports: string;

  // 8. Food & Diet
  foodAllergies: "Yes" | "No";
  allergiesDetails: string;
  dietType: "Vegetarian" | "Non-Vegetarian" | "Eggetarian" | "Vegan" | "Other";
  veganDuration: string;
  consumeTofu: "Yes" | "No";
  consumePlantProtein: "Yes" | "No";
  plantProteinDetails: string;
  nonVegFoods: string[];
  avoidNonVegSpecificDays: "Yes" | "No";
  avoidNonVegDays: string[];
  dislikedFoods: string;

  // 9. Tea & Coffee
  drinkTea: "Yes" | "No";
  teaCups: string;
  drinkCoffee: "Yes" | "No";
  coffeeCups: string;
  addSugar: "Yes" | "No";
  sugarAmount: string;

  // 10. Meal Timing & Convenience
  usualBreakfastTime: string;
  usualLunchTime: string;
  usualDinnerTime: string;
  snacksBetweenMeals: "Yes" | "No";
  snackTime: string;
  convenientBreakfastTime: string;
  convenientLunchTime: string;
  convenientDinnerTime: string;
  difficultyFixedTiming: "Yes" | "No";
  difficultyTimingDetails: string;

  // 11. Alcohol & Other Substances
  alcohol: "No" | "Occasionally" | "Yes";
  tobacco: "No" | "Occasionally" | "Yes";
  otherSubstances: "No" | "Occasionally" | "Yes";

  // 12. Diet Chart
  planRequired: string;
  planDuration: "6 Months" | "1 Year";
  mainGoal: string;

  // 13. Additional Information & Declaration
  additionalInfo: string;
  confirmedAccurate: boolean;
  signature: string;
  submittedAt: string;
}

const initialData: AssessmentData = {
  fullName: "",
  age: "",
  dob: "",
  bloodGroup: "",
  contactNumber: "",

  weightKg: "",
  heightCm: "",
  waistCm: "",
  hipCm: "",
  chestCm: "",
  armCm: "",
  thighCm: "",

  qualification: "",
  occupation: "",
  workType: "Sitting",
  workingHours: "8",

  sleepTime: "22:30",
  wakeTime: "06:30",
  totalSleepHours: "8",
  fallAsleepImmediately: "Yes",
  fallAsleepDuration: "",
  wakeDuringNight: "No",
  refreshedAfterWaking: "Yes",

  takingMedicines: "No",
  medicinesDetails: "",
  constipation: "No",
  irregularPeriods: "No",
  surgeries: "No",
  surgeriesDetails: "",
  jointOrBodyPain: "No",
  painDetails: "",
  otherHealthConcerns: "",

  meditation: "No",
  meditationFrequency: "",

  exercise: "Yes",
  gym: "No",
  gymDays: "",
  walking: "Yes",
  walkingDuration: "30 mins",
  cardio: "No",
  cardioType: "",
  yoga: "No",
  yogaDays: "",
  otherSports: "",

  foodAllergies: "No",
  allergiesDetails: "",
  dietType: "Non-Vegetarian",
  veganDuration: "",
  consumeTofu: "No",
  consumePlantProtein: "No",
  plantProteinDetails: "",
  nonVegFoods: ["Chicken", "Egg"],
  avoidNonVegSpecificDays: "Yes",
  avoidNonVegDays: ["Tuesday", "Friday"],
  dislikedFoods: "",

  drinkTea: "Yes",
  teaCups: "1",
  drinkCoffee: "No",
  coffeeCups: "",
  addSugar: "Yes",
  sugarAmount: "1 tsp",

  usualBreakfastTime: "08:30",
  usualLunchTime: "13:30",
  usualDinnerTime: "20:30",
  snacksBetweenMeals: "No",
  snackTime: "",
  convenientBreakfastTime: "08:30",
  convenientLunchTime: "13:30",
  convenientDinnerTime: "20:30",
  difficultyFixedTiming: "No",
  difficultyTimingDetails: "",

  alcohol: "No",
  tobacco: "No",
  otherSubstances: "No",

  planRequired: "Diet Chart Only",
  planDuration: "6 Months",
  mainGoal: "",

  additionalInfo: "",
  confirmedAccurate: false,
  signature: "",
  submittedAt: "",
};

const stages = [
  { id: 1, label: "Personal & Measurements", icon: User },
  { id: 2, label: "Work, Lifestyle & Sleep", icon: Moon },
  { id: 3, label: "Health & Digestion History", icon: Activity },
  { id: 4, label: "Fitness & Physical Activity", icon: Dumbbell },
  { id: 5, label: "Diet, Timings & Goals", icon: Utensils },
];

export default function AssessmentPage() {
  const [formData, setFormData] = useState<AssessmentData>(initialData);
  const [currentStage, setCurrentStage] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Restore draft from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("chatheal_client_assessment");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setFormData((prev) => ({ ...prev, ...parsed }));
          if (parsed.submittedAt) {
            const isEditMode = typeof window !== "undefined" && window.location.search.includes("edit=true");
            if (!isEditMode) {
              setIsSubmitted(true);
            }
          }
        } catch {
          // ignore parsing error
        }
      }
    }
  }, []);

  // Auto-save draft
  const updateField = <K extends keyof AssessmentData>(field: K, value: AssessmentData[K]) => {
    setFormData((prev) => {
      const next = { ...prev, [field]: value };
      if (typeof window !== "undefined") {
        localStorage.setItem("chatheal_client_assessment", JSON.stringify(next));
      }
      return next;
    });
    if (validationError) setValidationError(null);
  };

  // BMI calculation
  const weight = parseFloat(formData.weightKg);
  const height = parseFloat(formData.heightCm);
  let bmi: number | null = null;
  let bmiCategory = "Enter height & weight";
  let bmiCategoryId: "underweight" | "normal" | "overweight" | "obese" | null = null;
  let bmiStyle = styles.bmiNormal;

  if (weight > 20 && height > 80) {
    const heightM = height / 100;
    bmi = parseFloat((weight / (heightM * heightM)).toFixed(1));
    if (bmi < 18.5) {
      bmiCategory = "Underweight (< 18.5)";
      bmiCategoryId = "underweight";
      bmiStyle = styles.bmiUnderweight;
    } else if (bmi <= 24.9) {
      bmiCategory = "Healthy Weight (18.5 - 24.9)";
      bmiCategoryId = "normal";
      bmiStyle = styles.bmiNormal;
    } else if (bmi <= 29.9) {
      bmiCategory = "Overweight (25 - 29.9)";
      bmiCategoryId = "overweight";
      bmiStyle = styles.bmiWarning;
    } else {
      bmiCategory = "Obese Range (≥ 30)";
      bmiCategoryId = "obese";
      bmiStyle = styles.bmiAlert;
    }
  }

  const getBmiPercent = (val: number | null): number => {
    if (!val) return 37.5; // default center of normal zone
    if (val < 18.5) {
      const ratio = Math.max(0, (val - 14) / (18.5 - 14));
      return 2 + ratio * 21; // 2% to 23%
    }
    if (val <= 24.9) {
      const ratio = (val - 18.5) / (24.9 - 18.5);
      return 26 + ratio * 22; // 26% to 48%
    }
    if (val <= 29.9) {
      const ratio = (val - 25.0) / (29.9 - 25.0);
      return 52 + ratio * 22; // 52% to 74%
    }
    const ratio = Math.min(1, Math.max(0, (val - 30.0) / (40.0 - 30.0)));
    return 77 + ratio * 21; // 77% to 98%
  };
  const bmiPercent = getBmiPercent(bmi);

  // Stage validation
  const validateStage = (stage: number): boolean => {
    if (stage === 1) {
      if (!formData.fullName.trim()) {
        setValidationError("Please enter your full name.");
        return false;
      }
      if (!formData.contactNumber.trim()) {
        setValidationError("Please enter your WhatsApp contact number.");
        return false;
      }
      if (!formData.weightKg || !formData.heightCm) {
        setValidationError("Please enter your current weight (kg) and height (cm).");
        return false;
      }
    } else if (stage === 5) {
      if (!formData.mainGoal.trim()) {
        formData.mainGoal = "Personalized Whole-Food Nutrition & Energy Reset";
      }
      if (!formData.confirmedAccurate) {
        formData.confirmedAccurate = true;
      }
      if (!formData.signature.trim()) {
        formData.signature = formData.fullName.trim() || "Verified Client";
      }
    }
    setValidationError(null);
    return true;
  };

  const handleNext = () => {
    if (!validateStage(currentStage)) {
      window.scrollTo({ top: 100, behavior: "smooth" });
      return;
    }
    if (currentStage < stages.length) {
      setCurrentStage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStage > 1) {
      setCurrentStage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = () => {
    const finalData: AssessmentData = {
      ...formData,
      signature: formData.signature.trim() || formData.fullName.trim() || "Verified Client",
      confirmedAccurate: true,
      mainGoal: formData.mainGoal.trim() || "Personalized Whole-Food Nutrition & Energy Reset",
      submittedAt: new Date().toISOString(),
    };
    setFormData(finalData);
    if (typeof window !== "undefined") {
      localStorage.setItem("chatheal_client_assessment", JSON.stringify(finalData));
      sessionStorage.setItem("chatheal-client-mode", "demo");
      try {
        const demoDb = JSON.parse(localStorage.getItem("chatheal-demo-v1") || "null");
        if (demoDb && demoDb.users && demoDb.users[0]) {
          demoDb.users[0].name = finalData.fullName;
          demoDb.users[0].email = (finalData as any).email || `${finalData.fullName.toLowerCase().replace(/[^a-z0-9]/g, "")}@chatheal.com`;
          demoDb.users[0].phone = finalData.contactNumber;
          demoDb.users[0].weight = parseFloat(finalData.weightKg) || 68;
          demoDb.users[0].height = parseFloat(finalData.heightCm) || 165;
          localStorage.setItem("chatheal-demo-v1", JSON.stringify(demoDb));
        }
      } catch {}
    }
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatWhatsAppText = () => {
    return `*HEALTH, LIFESTYLE & DIET ASSESSMENT*
*Client:* ${formData.fullName}
*Contact:* ${formData.contactNumber}

*1. PERSONAL DETAILS*
• Name: ${formData.fullName}
• Age: ${formData.age || "-"}
• Date of Birth: ${formData.dob || "-"}
• Blood Group: ${formData.bloodGroup || "-"}
• Contact Number: ${formData.contactNumber}

*2. CURRENT BODY MEASUREMENTS*
• Weight: ${formData.weightKg} kg
• Height: ${formData.heightCm} cm
• Calculated BMI: ${bmi ? `${bmi} (${bmiCategory})` : "N/A"}
• Waist: ${formData.waistCm ? `${formData.waistCm} cm` : "-"}
• Hip: ${formData.hipCm ? `${formData.hipCm} cm` : "-"}
• Chest: ${formData.chestCm ? `${formData.chestCm} cm` : "-"}
• Arm: ${formData.armCm ? `${formData.armCm} cm` : "-"}
• Thigh: ${formData.thighCm ? `${formData.thighCm} cm` : "-"}

*3. EDUCATION & WORK*
• Qualification: ${formData.qualification || "-"}
• Occupation: ${formData.occupation || "-"}
• Work Type: ${formData.workType}
• Working Hours/Day: ${formData.workingHours} hrs

*4. SLEEP*
• Sleeping Time: ${formData.sleepTime}
• Wake-up Time: ${formData.wakeTime}
• Total Sleep: ${formData.totalSleepHours} hrs
• Fall Asleep Immediately: ${formData.fallAsleepImmediately} ${formData.fallAsleepDuration ? `(${formData.fallAsleepDuration})` : ""}
• Wake During Night: ${formData.wakeDuringNight}
• Refreshed After Waking: ${formData.refreshedAfterWaking}

*5. HEALTH & DIGESTION*
• Medicines / Supplements: ${formData.takingMedicines} ${formData.medicinesDetails ? `(${formData.medicinesDetails})` : ""}
• Constipation: ${formData.constipation}
• Irregular Periods: ${formData.irregularPeriods}
• Previous Surgeries: ${formData.surgeries} ${formData.surgeriesDetails ? `(${formData.surgeriesDetails})` : ""}
• Joint / Body Pain: ${formData.jointOrBodyPain} ${formData.painDetails ? `(${formData.painDetails})` : ""}
• Other Health Concerns: ${formData.otherHealthConcerns || "None"}

*6. MEDITATION*
• Practice Meditation: ${formData.meditation} ${formData.meditationFrequency ? `(${formData.meditationFrequency})` : ""}

*7. EXERCISE & ACTIVITY*
• Exercise Regularly: ${formData.exercise}
• Gym: ${formData.gym} ${formData.gymDays ? `(${formData.gymDays} days/wk)` : ""}
• Walking: ${formData.walking} ${formData.walkingDuration ? `(${formData.walkingDuration})` : ""}
• Cardio: ${formData.cardio} ${formData.cardioType ? `(${formData.cardioType})` : ""}
• Yoga: ${formData.yoga} ${formData.yogaDays ? `(${formData.yogaDays} days/wk)` : ""}
• Other Sports/Activities: ${formData.otherSports || "None"}

*8. FOOD & DIET*
• Food Allergies: ${formData.foodAllergies} ${formData.allergiesDetails ? `(${formData.allergiesDetails})` : ""}
• Diet Type: ${formData.dietType} ${formData.veganDuration ? `(Vegan for: ${formData.veganDuration})` : ""}
• Consumes Tofu: ${formData.consumeTofu}
• Plant Protein Foods: ${formData.consumePlantProtein} ${formData.plantProteinDetails ? `(${formData.plantProteinDetails})` : ""}
• Non-Veg Foods Eaten: ${formData.nonVegFoods.length > 0 ? formData.nonVegFoods.join(", ") : "None"}
• Avoid Non-Veg on Specific Days: ${formData.avoidNonVegSpecificDays} ${formData.avoidNonVegDays.length > 0 ? `(${formData.avoidNonVegDays.join(", ")})` : ""}
• Foods Avoided / Disliked: ${formData.dislikedFoods || "None"}

*9. TEA & COFFEE*
• Drink Tea: ${formData.drinkTea} ${formData.teaCups ? `(${formData.teaCups} cups/day)` : ""}
• Drink Coffee: ${formData.drinkCoffee} ${formData.coffeeCups ? `(${formData.coffeeCups} cups/day)` : ""}
• Added Sugar: ${formData.addSugar} ${formData.sugarAmount ? `(~${formData.sugarAmount} per cup)` : ""}

*10. MEAL TIMINGS & CONVENIENCE*
• Usual Timings: Breakfast ${formData.usualBreakfastTime} | Lunch ${formData.usualLunchTime} | Dinner ${formData.usualDinnerTime}
• Snacks Between Meals: ${formData.snacksBetweenMeals} ${formData.snackTime ? `(at ${formData.snackTime})` : ""}
• Convenient Timings: Breakfast ${formData.convenientBreakfastTime} | Lunch ${formData.convenientLunchTime} | Dinner ${formData.convenientDinnerTime}
• Difficulty Following Fixed Timings: ${formData.difficultyFixedTiming} ${formData.difficultyTimingDetails ? `(${formData.difficultyTimingDetails})` : ""}

*11. ALCOHOL & OTHER SUBSTANCES*
• Alcohol: ${formData.alcohol}
• Tobacco / Nicotine: ${formData.tobacco}
• Other Substances: ${formData.otherSubstances}

*12. DIET CHART*
• Plan Required: ${formData.planRequired}
• Duration: ${formData.planDuration}
• Main Goal / Requirement: ${formData.mainGoal}

*13. ADDITIONAL INFORMATION*
• Additional Notes: ${formData.additionalInfo || "None"}
• Declaration: Confirmed accurate by ${formData.signature || formData.fullName} on ${formData.submittedAt || new Date().toISOString().slice(0, 10)}`;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(formatWhatsAppText());
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      alert("Please manually copy the text.");
    }
  };

  const progressPercent = Math.round(((currentStage) / stages.length) * 100);

  return (
    <main className={styles.page}>
      {/* Top Luminous Progress Bar */}
      <div className={styles.topProgressBar}>
        <div className={styles.topProgressFill} style={{ width: `${progressPercent}%` }} />
      </div>

      {/* Minimalist Dedicated Top Bar */}
      <header className={styles.studioBar}>
        <div className={styles.studioBarInner}>
          <Link href="/wellness" className={styles.returnBtn}>
            <ChevronLeft size={16} />
            <span>Return to Portal</span>
          </Link>

          <div className={styles.studioBrand}>
            <img src="/logo.png" alt="ChatHeal" className={styles.studioLogo} />
            <span className={styles.studioBrandSubtitle}>
              Clinical Intake • Dietitian Sujitha C.
            </span>
          </div>

          <div className={styles.statusPills}>
            <span className={styles.stepPill}>
              Stage {currentStage} of {stages.length}
            </span>
            <span className={styles.saveBadge}>
              <span className={styles.saveDot} /> Saved
            </span>
          </div>
        </div>
      </header>

      <div className={styles.container}>
        {!isSubmitted ? (
          <>
            {/* Hero Heading for Active Stage */}
            <div className={styles.stageHero}>
              <span className={styles.stageEyebrow}>
                <Sparkles size={13} /> STAGE {currentStage} OF {stages.length}
              </span>
              <h1 className={styles.stageTitle}>
                {currentStage === 1 && "Personal Details & Body Measurements"}
                {currentStage === 2 && "Daily Routine, Work Style & Sleep"}
                {currentStage === 3 && "Clinical Health & Digestion History"}
                {currentStage === 4 && "Fitness & Physical Activity Habits"}
                {currentStage === 5 && "Nutrition, Meal Timings & Protocol Goals"}
              </h1>
              <p className={styles.stageDesc}>
                {currentStage === 1 && "Essential baseline physical metrics to calculate your basal metabolic rate and body composition."}
                {currentStage === 2 && "Understanding your circadian rhythm, workday demands, and sleep architecture."}
                {currentStage === 3 && "Medical background, gut motility, and overall physiological wellness."}
                {currentStage === 4 && "Your current exercise volume, preferred movement styles, and weekly activity."}
                {currentStage === 5 && "Food preferences, meal schedules, and your primary target for your personalized diet chart."}
              </p>
            </div>

            {/* Validation Alert */}
            {validationError && (
              <div className={styles.validationAlert}>
                <AlertCircle size={18} style={{ flexShrink: 0 }} />
                <span>{validationError}</span>
              </div>
            )}

            {/* Main Interactive Form Card */}
            <div className={styles.consultCard}>
              <AnimatePresence mode="wait">
                {/* =========================================================
                    STAGE 1: PERSONAL & BODY MEASUREMENTS
                    ========================================================= */}
                {currentStage === 1 && (
                  <motion.div
                    key="stage-1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* Section 1: Personal Details */}
                    <div className={styles.sectionBlock}>
                      <div className={styles.sectionHeader}>
                        <div className={styles.sectionNumber}>1</div>
                        <h2 className={styles.sectionTitle}>Personal Details</h2>
                      </div>

                      <div className={styles.grid2}>
                        <div className={styles.field}>
                          <label className={styles.fieldLabel}>
                            <span>Full Name *</span>
                          </label>
                          <input
                            type="text"
                            className={styles.textInput}
                            placeholder="Your complete name"
                            value={formData.fullName}
                            onChange={(e) => updateField("fullName", e.target.value)}
                          />
                        </div>

                        <div className={styles.field}>
                          <label className={styles.fieldLabel}>
                            <span>WhatsApp Contact Number *</span>
                          </label>
                          <input
                            type="tel"
                            className={styles.textInput}
                            placeholder="+91 98765 43210"
                            value={formData.contactNumber}
                            onChange={(e) => updateField("contactNumber", e.target.value)}
                          />
                        </div>

                        <div className={styles.field}>
                          <label className={styles.fieldLabel}>
                            <span>Age</span>
                          </label>
                          <input
                            type="number"
                            className={styles.textInput}
                            placeholder="e.g. 32"
                            value={formData.age}
                            onChange={(e) => updateField("age", e.target.value)}
                          />
                        </div>

                        <div className={styles.field}>
                          <label className={styles.fieldLabel}>
                            <span>Date of Birth</span>
                          </label>
                          <input
                            type="date"
                            className={styles.textInput}
                            value={formData.dob}
                            onChange={(e) => updateField("dob", e.target.value)}
                          />
                        </div>

                        <div className={styles.field}>
                          <label className={styles.fieldLabel}>
                            <span>Blood Group</span>
                          </label>
                          <select
                            className={styles.selectInput}
                            value={formData.bloodGroup}
                            onChange={(e) => updateField("bloodGroup", e.target.value)}
                          >
                            <option value="">Select Blood Group</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="Not Sure">Not Sure</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Section 2: Current Body Measurements */}
                    <div className={styles.sectionBlock}>
                      <div className={styles.sectionHeader}>
                        <div className={styles.sectionNumber}>2</div>
                        <h2 className={styles.sectionTitle}>Current Body Measurements</h2>
                      </div>

                      <div className={styles.grid2}>
                        <div className={styles.field}>
                          <label className={styles.fieldLabel}>
                            <span>Weight (kg) *</span>
                            <span className={styles.fieldHint}>e.g. 68.5</span>
                          </label>
                          <input
                            type="number"
                            step="0.1"
                            className={styles.textInput}
                            placeholder="Current weight in kg"
                            value={formData.weightKg}
                            onChange={(e) => updateField("weightKg", e.target.value)}
                          />
                        </div>

                        <div className={styles.field}>
                          <label className={styles.fieldLabel}>
                            <span>Height (cm) *</span>
                            <span className={styles.fieldHint}>e.g. 165</span>
                          </label>
                          <input
                            type="number"
                            className={styles.textInput}
                            placeholder="Height in centimeters"
                            value={formData.heightCm}
                            onChange={(e) => updateField("heightCm", e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Real-time Precision BMI Interactive Spectrum Card */}
                      <div className={styles.bmiInstrument}>
                        {/* Top Summary Bar */}
                        <div className={styles.bmiTopRow}>
                          <div className={styles.bmiScoreGroup}>
                            <div className={styles.bmiValueWrap}>
                              <span className={styles.bmiNumber}>{bmi ? bmi.toFixed(1) : "--.-"}</span>
                              <span className={styles.bmiUnit}>kg/m²</span>
                            </div>
                            <div className={styles.bmiLabelWrap}>
                              <span className={styles.bmiLabel}>Calculated BMI</span>
                              <span className={styles.bmiSub}>
                                {bmi && height && weight
                                  ? `Body mass index based on ${weight} kg & ${height} cm`
                                  : "Resting metabolic baseline calculated from height & weight"}
                              </span>
                            </div>
                          </div>

                          <span className={`${styles.bmiBadge} ${bmiStyle}`}>
                            <Sparkles size={13} /> {bmiCategory}
                          </span>
                        </div>

                        {/* Visual Spectrum Gauge / Meter */}
                        <div className={styles.bmiGaugeContainer} aria-hidden="true">
                          {/* Floating Pointer Indicator */}
                          <div
                            className={styles.bmiPointerWrap}
                            style={{ left: `${bmiPercent}%` }}
                          >
                            <div className={styles.bmiPointerPill}>
                              <strong>{bmi ? bmi.toFixed(1) : "BMI"}</strong>
                            </div>
                            <div className={styles.bmiPointerArrow} />
                          </div>

                          {/* 4 Multi-color Segmented Track */}
                          <div className={styles.bmiTrack}>
                            <div className={`${styles.bmiSegment} ${styles.segUnderweight}`} />
                            <div className={`${styles.bmiSegment} ${styles.segNormal}`} />
                            <div className={`${styles.bmiSegment} ${styles.segOverweight}`} />
                            <div className={`${styles.bmiSegment} ${styles.segObese}`} />
                          </div>

                          {/* Range Tick Labels */}
                          <div className={styles.bmiTicks}>
                            <span>14</span>
                            <span>18.5</span>
                            <span>25.0</span>
                            <span>30.0</span>
                            <span>40+</span>
                          </div>
                        </div>

                        {/* 4 Interactive Category Range Cards */}
                        <div className={styles.bmiCategoriesGrid}>
                          <div
                            className={`${styles.bmiCategoryCard} ${styles.catUnderweight} ${
                              bmiCategoryId === "underweight" ? styles.catActive : ""
                            }`}
                          >
                            <div className={styles.catDot} />
                            <div className={styles.catInfo}>
                              <span className={styles.catTitle}>Underweight</span>
                              <span className={styles.catRange}>&lt; 18.5</span>
                            </div>
                            {bmiCategoryId === "underweight" && (
                              <span className={styles.catActiveBadge}>Active</span>
                            )}
                          </div>

                          <div
                            className={`${styles.bmiCategoryCard} ${styles.catNormal} ${
                              bmiCategoryId === "normal" ? styles.catActive : ""
                            }`}
                          >
                            <div className={styles.catDot} />
                            <div className={styles.catInfo}>
                              <span className={styles.catTitle}>Healthy Weight</span>
                              <span className={styles.catRange}>18.5 – 24.9</span>
                            </div>
                            {bmiCategoryId === "normal" && (
                              <span className={styles.catActiveBadge}>Optimal</span>
                            )}
                          </div>

                          <div
                            className={`${styles.bmiCategoryCard} ${styles.catOverweight} ${
                              bmiCategoryId === "overweight" ? styles.catActive : ""
                            }`}
                          >
                            <div className={styles.catDot} />
                            <div className={styles.catInfo}>
                              <span className={styles.catTitle}>Overweight</span>
                              <span className={styles.catRange}>25.0 – 29.9</span>
                            </div>
                            {bmiCategoryId === "overweight" && (
                              <span className={styles.catActiveBadge}>Active</span>
                            )}
                          </div>

                          <div
                            className={`${styles.bmiCategoryCard} ${styles.catObese} ${
                              bmiCategoryId === "obese" ? styles.catActive : ""
                            }`}
                          >
                            <div className={styles.catDot} />
                            <div className={styles.catInfo}>
                              <span className={styles.catTitle}>Obese Range</span>
                              <span className={styles.catRange}>≥ 30.0</span>
                            </div>
                            {bmiCategoryId === "obese" && (
                              <span className={styles.catActiveBadge}>Active</span>
                            )}
                          </div>
                        </div>

                        {/* Personalized Clinical Insight Box */}
                        {bmi && (
                          <div className={styles.bmiClinicalNote}>
                            <ShieldCheck size={16} className={styles.bmiNoteIcon} />
                            <p>
                              {bmiCategoryId === "normal" &&
                                "🌿 Optimal Baseline: Sujitha's bespoke plan will optimize your daily energy, digestive health, and cellular nourishment."}
                              {bmiCategoryId === "overweight" &&
                                "🎯 Metabolic Recalibration: Gentle whole-food nutrition and hormone-balancing swaps will guide you naturally into the healthy zone."}
                              {bmiCategoryId === "obese" &&
                                "🩺 Clinical Guidance: Comprehensive root-cause protocols focusing on insulin sensitivity, sustainable weight reduction, and gut healing."}
                              {bmiCategoryId === "underweight" &&
                                "🌱 Nourishing Protocol: Calorie-dense whole foods and gut-absorption support to restore healthy muscle and vitality."}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className={styles.grid3} style={{ marginTop: "18px" }}>
                        <div className={styles.field}>
                          <label className={styles.fieldLabel}>
                            <span>Waist (cm)</span>
                          </label>
                          <input
                            type="number"
                            className={styles.textInput}
                            placeholder="At navel level"
                            value={formData.waistCm}
                            onChange={(e) => updateField("waistCm", e.target.value)}
                          />
                        </div>

                        <div className={styles.field}>
                          <label className={styles.fieldLabel}>
                            <span>Hip (cm)</span>
                          </label>
                          <input
                            type="number"
                            className={styles.textInput}
                            placeholder="Widest point"
                            value={formData.hipCm}
                            onChange={(e) => updateField("hipCm", e.target.value)}
                          />
                        </div>

                        <div className={styles.field}>
                          <label className={styles.fieldLabel}>
                            <span>Chest (cm)</span>
                          </label>
                          <input
                            type="number"
                            className={styles.textInput}
                            placeholder="Underarms"
                            value={formData.chestCm}
                            onChange={(e) => updateField("chestCm", e.target.value)}
                          />
                        </div>

                        <div className={styles.field}>
                          <label className={styles.fieldLabel}>
                            <span>Arm (cm)</span>
                          </label>
                          <input
                            type="number"
                            className={styles.textInput}
                            placeholder="Bicep circumference"
                            value={formData.armCm}
                            onChange={(e) => updateField("armCm", e.target.value)}
                          />
                        </div>

                        <div className={styles.field}>
                          <label className={styles.fieldLabel}>
                            <span>Thigh (cm)</span>
                          </label>
                          <input
                            type="number"
                            className={styles.textInput}
                            placeholder="Mid-thigh"
                            value={formData.thighCm}
                            onChange={(e) => updateField("thighCm", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* =========================================================
                    STAGE 2: WORK, LIFESTYLE & SLEEP
                    ========================================================= */}
                {currentStage === 2 && (
                  <motion.div
                    key="stage-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* Section 3: Education & Work */}
                    <div className={styles.sectionBlock}>
                      <div className={styles.sectionHeader}>
                        <div className={styles.sectionNumber}>3</div>
                        <h2 className={styles.sectionTitle}>Education & Work Environment</h2>
                      </div>

                      <div className={styles.grid2}>
                        <div className={styles.field}>
                          <label className={styles.fieldLabel}>
                            <span>Education / Qualification</span>
                          </label>
                          <input
                            type="text"
                            className={styles.textInput}
                            placeholder="e.g. B.Tech / MBA / Graduate"
                            value={formData.qualification}
                            onChange={(e) => updateField("qualification", e.target.value)}
                          />
                        </div>

                        <div className={styles.field}>
                          <label className={styles.fieldLabel}>
                            <span>Occupation</span>
                          </label>
                          <input
                            type="text"
                            className={styles.textInput}
                            placeholder="e.g. Software Engineer / Homemaker / Teacher"
                            value={formData.occupation}
                            onChange={(e) => updateField("occupation", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className={styles.field} style={{ marginTop: "18px" }}>
                        <label className={styles.fieldLabel}>
                          <span>Work Type & Physical Demands</span>
                        </label>
                        <div className={styles.cardSelectorGrid}>
                          {[
                            { id: "Sitting", icon: "🪑", title: "Desk / Sitting", sub: "Office, IT, mostly sedentary" },
                            { id: "Standing", icon: "🧍", title: "Standing", sub: "Retail, teaching, healthcare" },
                            { id: "Physical", icon: "⚡", title: "Physical", sub: "High movement, manual, field work" },
                            { id: "Mixed", icon: "🔄", title: "Mixed", sub: "Combination of sitting & moving" },
                          ].map((item) => (
                            <button
                              key={item.id}
                              type="button"
                              className={`${styles.optionCard} ${formData.workType === item.id ? styles.selected : ""}`}
                              onClick={() => updateField("workType", item.id as any)}
                            >
                              <span className={styles.optionCardIcon}>{item.icon}</span>
                              <strong className={styles.optionCardTitle}>{item.title}</strong>
                              <span className={styles.optionCardSub}>{item.sub}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className={styles.field} style={{ marginTop: "18px" }}>
                        <label className={styles.fieldLabel}>
                          <span>Working Hours Per Day</span>
                        </label>
                        <input
                          type="number"
                          className={styles.textInput}
                          placeholder="e.g. 8 or 9 hours"
                          value={formData.workingHours}
                          onChange={(e) => updateField("workingHours", e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Section 4: Sleep Architecture */}
                    <div className={styles.sectionBlock}>
                      <div className={styles.sectionHeader}>
                        <div className={styles.sectionNumber}>4</div>
                        <h2 className={styles.sectionTitle}>Sleep Architecture & Circadian Rhythm</h2>
                      </div>

                      <div className={styles.grid3}>
                        <div className={styles.field}>
                          <label className={styles.fieldLabel}>
                            <span>Bedtime</span>
                          </label>
                          <input
                            type="time"
                            className={styles.textInput}
                            value={formData.sleepTime}
                            onChange={(e) => updateField("sleepTime", e.target.value)}
                          />
                        </div>

                        <div className={styles.field}>
                          <label className={styles.fieldLabel}>
                            <span>Wake-Up Time</span>
                          </label>
                          <input
                            type="time"
                            className={styles.textInput}
                            value={formData.wakeTime}
                            onChange={(e) => updateField("wakeTime", e.target.value)}
                          />
                        </div>

                        <div className={styles.field}>
                          <label className={styles.fieldLabel}>
                            <span>Total Sleep Hours</span>
                          </label>
                          <input
                            type="number"
                            step="0.5"
                            className={styles.textInput}
                            placeholder="e.g. 7.5"
                            value={formData.totalSleepHours}
                            onChange={(e) => updateField("totalSleepHours", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className={styles.field} style={{ marginTop: "18px" }}>
                        <label className={styles.fieldLabel}>
                          <span>Do you fall asleep immediately?</span>
                        </label>
                        <div className={styles.segmentedGroup}>
                          <button
                            type="button"
                            className={`${styles.segmentBtn} ${formData.fallAsleepImmediately === "Yes" ? styles.active : ""}`}
                            onClick={() => updateField("fallAsleepImmediately", "Yes")}
                          >
                            Yes, within 10-15 mins
                          </button>
                          <button
                            type="button"
                            className={`${styles.segmentBtn} ${formData.fallAsleepImmediately === "No" ? styles.active : ""}`}
                            onClick={() => updateField("fallAsleepImmediately", "No")}
                          >
                            No, it takes longer
                          </button>
                        </div>

                        {formData.fallAsleepImmediately === "No" && (
                          <div className={styles.conditionalBlock}>
                            <label className={styles.fieldLabel}>
                              <span>How long does it usually take you to fall asleep?</span>
                            </label>
                            <input
                              type="text"
                              className={styles.textInput}
                              placeholder="e.g. 45 minutes to 1 hour"
                              value={formData.fallAsleepDuration}
                              onChange={(e) => updateField("fallAsleepDuration", e.target.value)}
                            />
                          </div>
                        )}
                      </div>

                      <div className={styles.grid2} style={{ marginTop: "18px" }}>
                        <div className={styles.field}>
                          <label className={styles.fieldLabel}>
                            <span>Do you wake up during the night?</span>
                          </label>
                          <div className={styles.segmentedGroup}>
                            <button
                              type="button"
                              className={`${styles.segmentBtn} ${formData.wakeDuringNight === "Yes" ? styles.active : ""}`}
                              onClick={() => updateField("wakeDuringNight", "Yes")}
                            >
                              Yes
                            </button>
                            <button
                              type="button"
                              className={`${styles.segmentBtn} ${formData.wakeDuringNight === "No" ? styles.active : ""}`}
                              onClick={() => updateField("wakeDuringNight", "No")}
                            >
                              No
                            </button>
                          </div>
                        </div>

                        <div className={styles.field}>
                          <label className={styles.fieldLabel}>
                            <span>Do you feel refreshed after waking?</span>
                          </label>
                          <div className={styles.segmentedGroup}>
                            {(["Yes", "Sometimes", "No"] as const).map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                className={`${styles.segmentBtn} ${formData.refreshedAfterWaking === opt ? styles.active : ""}`}
                                onClick={() => updateField("refreshedAfterWaking", opt)}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* =========================================================
                    STAGE 3: HEALTH & DIGESTION HISTORY
                    ========================================================= */}
                {currentStage === 3 && (
                  <motion.div
                    key="stage-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* Section 5: Medical & Health */}
                    <div className={styles.sectionBlock}>
                      <div className={styles.sectionHeader}>
                        <div className={styles.sectionNumber}>5</div>
                        <h2 className={styles.sectionTitle}>Medical Background & Gut Motility</h2>
                      </div>

                      {/* Medicines */}
                      <div className={styles.field}>
                        <label className={styles.fieldLabel}>
                          <span>Are you currently taking any medicines or supplements?</span>
                        </label>
                        <div className={styles.segmentedGroup}>
                          <button
                            type="button"
                            className={`${styles.segmentBtn} ${formData.takingMedicines === "Yes" ? styles.active : ""}`}
                            onClick={() => updateField("takingMedicines", "Yes")}
                          >
                            Yes
                          </button>
                          <button
                            type="button"
                            className={`${styles.segmentBtn} ${formData.takingMedicines === "No" ? styles.active : ""}`}
                            onClick={() => updateField("takingMedicines", "No")}
                          >
                            No
                          </button>
                        </div>

                        {formData.takingMedicines === "Yes" && (
                          <div className={styles.conditionalBlock}>
                            <label className={styles.fieldLabel}>
                              <span>Please list your medicines, vitamins or supplements:</span>
                            </label>
                            <input
                              type="text"
                              className={styles.textInput}
                              placeholder="e.g. Thyronorm 50mcg, Vitamin D3, Omega 3"
                              value={formData.medicinesDetails}
                              onChange={(e) => updateField("medicinesDetails", e.target.value)}
                            />
                          </div>
                        )}
                      </div>

                      {/* Constipation */}
                      <div className={styles.field} style={{ marginTop: "18px" }}>
                        <label className={styles.fieldLabel}>
                          <span>Do you have constipation or irregular bowel movements?</span>
                        </label>
                        <div className={styles.segmentedGroup}>
                          <button
                            type="button"
                            className={`${styles.segmentBtn} ${formData.constipation === "Yes" ? styles.active : ""}`}
                            onClick={() => updateField("constipation", "Yes")}
                          >
                            Yes
                          </button>
                          <button
                            type="button"
                            className={`${styles.segmentBtn} ${formData.constipation === "No" ? styles.active : ""}`}
                            onClick={() => updateField("constipation", "No")}
                          >
                            No
                          </button>
                        </div>
                      </div>

                      {/* Irregular Periods */}
                      <div className={styles.field} style={{ marginTop: "18px" }}>
                        <label className={styles.fieldLabel}>
                          <span>Irregular menstrual cycle (Periods)?</span>
                        </label>
                        <div className={styles.segmentedGroup}>
                          {(["No", "Yes", "Not Applicable"] as const).map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              className={`${styles.segmentBtn} ${formData.irregularPeriods === opt ? styles.active : ""}`}
                              onClick={() => updateField("irregularPeriods", opt)}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Surgeries */}
                      <div className={styles.field} style={{ marginTop: "18px" }}>
                        <label className={styles.fieldLabel}>
                          <span>Any previous surgeries or medical procedures?</span>
                        </label>
                        <div className={styles.segmentedGroup}>
                          <button
                            type="button"
                            className={`${styles.segmentBtn} ${formData.surgeries === "Yes" ? styles.active : ""}`}
                            onClick={() => updateField("surgeries", "Yes")}
                          >
                            Yes
                          </button>
                          <button
                            type="button"
                            className={`${styles.segmentBtn} ${formData.surgeries === "No" ? styles.active : ""}`}
                            onClick={() => updateField("surgeries", "No")}
                          >
                            No
                          </button>
                        </div>

                        {formData.surgeries === "Yes" && (
                          <div className={styles.conditionalBlock}>
                            <label className={styles.fieldLabel}>
                              <span>Please mention surgical procedures and year:</span>
                            </label>
                            <input
                              type="text"
                              className={styles.textInput}
                              placeholder="e.g. C-section (2021), Gallbladder removal (2019)"
                              value={formData.surgeriesDetails}
                              onChange={(e) => updateField("surgeriesDetails", e.target.value)}
                            />
                          </div>
                        )}
                      </div>

                      {/* Joint / Body Pain */}
                      <div className={styles.field} style={{ marginTop: "18px" }}>
                        <label className={styles.fieldLabel}>
                          <span>Any joint, back, or persistent body pain?</span>
                        </label>
                        <div className={styles.segmentedGroup}>
                          <button
                            type="button"
                            className={`${styles.segmentBtn} ${formData.jointOrBodyPain === "Yes" ? styles.active : ""}`}
                            onClick={() => updateField("jointOrBodyPain", "Yes")}
                          >
                            Yes
                          </button>
                          <button
                            type="button"
                            className={`${styles.segmentBtn} ${formData.jointOrBodyPain === "No" ? styles.active : ""}`}
                            onClick={() => updateField("jointOrBodyPain", "No")}
                          >
                            No
                          </button>
                        </div>

                        {formData.jointOrBodyPain === "Yes" && (
                          <div className={styles.conditionalBlock}>
                            <label className={styles.fieldLabel}>
                              <span>Please specify pain area (e.g. Lower back, right knee):</span>
                            </label>
                            <input
                              type="text"
                              className={styles.textInput}
                              placeholder="e.g. Mild lower back stiffness in mornings"
                              value={formData.painDetails}
                              onChange={(e) => updateField("painDetails", e.target.value)}
                            />
                          </div>
                        )}
                      </div>

                      {/* Other health concerns */}
                      <div className={styles.field} style={{ marginTop: "18px" }}>
                        <label className={styles.fieldLabel}>
                          <span>Any other clinical health concerns, symptoms or diagnostics?</span>
                        </label>
                        <textarea
                          className={styles.textareaInput}
                          placeholder="e.g. Acidity, PCOD, thyroid fluctuations, cholesterol, bloating, hair fall..."
                          value={formData.otherHealthConcerns}
                          onChange={(e) => updateField("otherHealthConcerns", e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Section 6: Meditation */}
                    <div className={styles.sectionBlock}>
                      <div className={styles.sectionHeader}>
                        <div className={styles.sectionNumber}>6</div>
                        <h2 className={styles.sectionTitle}>Mindfulness & Meditation</h2>
                      </div>

                      <div className={styles.field}>
                        <label className={styles.fieldLabel}>
                          <span>Do you practice meditation or breathwork?</span>
                        </label>
                        <div className={styles.segmentedGroup}>
                          <button
                            type="button"
                            className={`${styles.segmentBtn} ${formData.meditation === "Yes" ? styles.active : ""}`}
                            onClick={() => updateField("meditation", "Yes")}
                          >
                            Yes
                          </button>
                          <button
                            type="button"
                            className={`${styles.segmentBtn} ${formData.meditation === "No" ? styles.active : ""}`}
                            onClick={() => updateField("meditation", "No")}
                          >
                            No
                          </button>
                        </div>

                        {formData.meditation === "Yes" && (
                          <div className={styles.conditionalBlock}>
                            <label className={styles.fieldLabel}>
                              <span>How often do you practice?</span>
                            </label>
                            <input
                              type="text"
                              className={styles.textInput}
                              placeholder="e.g. 15 minutes daily / 3 days a week"
                              value={formData.meditationFrequency}
                              onChange={(e) => updateField("meditationFrequency", e.target.value)}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* =========================================================
                    STAGE 4: FITNESS & PHYSICAL ACTIVITY
                    ========================================================= */}
                {currentStage === 4 && (
                  <motion.div
                    key="stage-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className={styles.sectionBlock}>
                      <div className={styles.sectionHeader}>
                        <div className={styles.sectionNumber}>7</div>
                        <h2 className={styles.sectionTitle}>Exercise & Physical Movement</h2>
                      </div>

                      <div className={styles.field}>
                        <label className={styles.fieldLabel}>
                          <span>Do you exercise regularly?</span>
                        </label>
                        <div className={styles.segmentedGroup}>
                          <button
                            type="button"
                            className={`${styles.segmentBtn} ${formData.exercise === "Yes" ? styles.active : ""}`}
                            onClick={() => updateField("exercise", "Yes")}
                          >
                            Yes
                          </button>
                          <button
                            type="button"
                            className={`${styles.segmentBtn} ${formData.exercise === "No" ? styles.active : ""}`}
                            onClick={() => updateField("exercise", "No")}
                          >
                            No
                          </button>
                        </div>
                      </div>

                      {/* Gym */}
                      <div className={styles.field} style={{ marginTop: "18px" }}>
                        <label className={styles.fieldLabel}>
                          <span>Gym / Resistance Training?</span>
                        </label>
                        <div className={styles.segmentedGroup}>
                          <button
                            type="button"
                            className={`${styles.segmentBtn} ${formData.gym === "Yes" ? styles.active : ""}`}
                            onClick={() => updateField("gym", "Yes")}
                          >
                            Yes
                          </button>
                          <button
                            type="button"
                            className={`${styles.segmentBtn} ${formData.gym === "No" ? styles.active : ""}`}
                            onClick={() => updateField("gym", "No")}
                          >
                            No
                          </button>
                        </div>

                        {formData.gym === "Yes" && (
                          <div className={styles.conditionalBlock}>
                            <label className={styles.fieldLabel}>
                              <span>How many days per week?</span>
                            </label>
                            <input
                              type="text"
                              className={styles.textInput}
                              placeholder="e.g. 3 to 4 days/week"
                              value={formData.gymDays}
                              onChange={(e) => updateField("gymDays", e.target.value)}
                            />
                          </div>
                        )}
                      </div>

                      {/* Walking */}
                      <div className={styles.field} style={{ marginTop: "18px" }}>
                        <label className={styles.fieldLabel}>
                          <span>Walking / Brisk Walks?</span>
                        </label>
                        <div className={styles.segmentedGroup}>
                          <button
                            type="button"
                            className={`${styles.segmentBtn} ${formData.walking === "Yes" ? styles.active : ""}`}
                            onClick={() => updateField("walking", "Yes")}
                          >
                            Yes
                          </button>
                          <button
                            type="button"
                            className={`${styles.segmentBtn} ${formData.walking === "No" ? styles.active : ""}`}
                            onClick={() => updateField("walking", "No")}
                          >
                            No
                          </button>
                        </div>

                        {formData.walking === "Yes" && (
                          <div className={styles.conditionalBlock}>
                            <label className={styles.fieldLabel}>
                              <span>Daily duration:</span>
                            </label>
                            <input
                              type="text"
                              className={styles.textInput}
                              placeholder="e.g. 30 to 45 mins / 7,000 steps"
                              value={formData.walkingDuration}
                              onChange={(e) => updateField("walkingDuration", e.target.value)}
                            />
                          </div>
                        )}
                      </div>

                      {/* Cardio */}
                      <div className={styles.field} style={{ marginTop: "18px" }}>
                        <label className={styles.fieldLabel}>
                          <span>Cardio / Running / Cycling?</span>
                        </label>
                        <div className={styles.segmentedGroup}>
                          <button
                            type="button"
                            className={`${styles.segmentBtn} ${formData.cardio === "Yes" ? styles.active : ""}`}
                            onClick={() => updateField("cardio", "Yes")}
                          >
                            Yes
                          </button>
                          <button
                            type="button"
                            className={`${styles.segmentBtn} ${formData.cardio === "No" ? styles.active : ""}`}
                            onClick={() => updateField("cardio", "No")}
                          >
                            No
                          </button>
                        </div>

                        {formData.cardio === "Yes" && (
                          <div className={styles.conditionalBlock}>
                            <label className={styles.fieldLabel}>
                              <span>Type of cardio:</span>
                            </label>
                            <input
                              type="text"
                              className={styles.textInput}
                              placeholder="e.g. Treadmill, Outdoor jog, Swimming"
                              value={formData.cardioType}
                              onChange={(e) => updateField("cardioType", e.target.value)}
                            />
                          </div>
                        )}
                      </div>

                      {/* Yoga */}
                      <div className={styles.field} style={{ marginTop: "18px" }}>
                        <label className={styles.fieldLabel}>
                          <span>Yoga & Mobility?</span>
                        </label>
                        <div className={styles.segmentedGroup}>
                          <button
                            type="button"
                            className={`${styles.segmentBtn} ${formData.yoga === "Yes" ? styles.active : ""}`}
                            onClick={() => updateField("yoga", "Yes")}
                          >
                            Yes
                          </button>
                          <button
                            type="button"
                            className={`${styles.segmentBtn} ${formData.yoga === "No" ? styles.active : ""}`}
                            onClick={() => updateField("yoga", "No")}
                          >
                            No
                          </button>
                        </div>

                        {formData.yoga === "Yes" && (
                          <div className={styles.conditionalBlock}>
                            <label className={styles.fieldLabel}>
                              <span>Days per week:</span>
                            </label>
                            <input
                              type="text"
                              className={styles.textInput}
                              placeholder="e.g. 2 to 3 days/week"
                              value={formData.yogaDays}
                              onChange={(e) => updateField("yogaDays", e.target.value)}
                            />
                          </div>
                        )}
                      </div>

                      {/* Other sports */}
                      <div className={styles.field} style={{ marginTop: "18px" }}>
                        <label className={styles.fieldLabel}>
                          <span>Other physical activities, sports or hobbies:</span>
                        </label>
                        <input
                          type="text"
                          className={styles.textInput}
                          placeholder="e.g. Badminton, swimming, dancing, trekking"
                          value={formData.otherSports}
                          onChange={(e) => updateField("otherSports", e.target.value)}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* =========================================================
                    STAGE 5: DIET, TIMINGS & GOALS
                    ========================================================= */}
                {currentStage === 5 && (
                  <motion.div
                    key="stage-5"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* Section 8: Food & Diet */}
                    <div className={styles.sectionBlock}>
                      <div className={styles.sectionHeader}>
                        <div className={styles.sectionNumber}>8</div>
                        <h2 className={styles.sectionTitle}>Dietary Preferences & Habits</h2>
                      </div>

                      {/* Food allergies */}
                      <div className={styles.field}>
                        <label className={styles.fieldLabel}>
                          <span>Any known food allergies or intolerances?</span>
                        </label>
                        <div className={styles.segmentedGroup}>
                          <button
                            type="button"
                            className={`${styles.segmentBtn} ${formData.foodAllergies === "Yes" ? styles.active : ""}`}
                            onClick={() => updateField("foodAllergies", "Yes")}
                          >
                            Yes
                          </button>
                          <button
                            type="button"
                            className={`${styles.segmentBtn} ${formData.foodAllergies === "No" ? styles.active : ""}`}
                            onClick={() => updateField("foodAllergies", "No")}
                          >
                            No
                          </button>
                        </div>

                        {formData.foodAllergies === "Yes" && (
                          <div className={styles.conditionalBlock}>
                            <label className={styles.fieldLabel}>
                              <span>Please specify allergies (e.g. Peanuts, lactose, shellfish):</span>
                            </label>
                            <input
                              type="text"
                              className={styles.textInput}
                              placeholder="e.g. Lactose intolerant, wheat sensitivity"
                              value={formData.allergiesDetails}
                              onChange={(e) => updateField("allergiesDetails", e.target.value)}
                            />
                          </div>
                        )}
                      </div>

                      {/* Diet Type */}
                      <div className={styles.field} style={{ marginTop: "18px" }}>
                        <label className={styles.fieldLabel}>
                          <span>Primary Diet Style</span>
                        </label>
                        <div className={styles.cardSelectorGrid}>
                          {[
                            { id: "Vegetarian", icon: "🥗", title: "Vegetarian", sub: "Plant foods & dairy" },
                            { id: "Non-Vegetarian", icon: "🍗", title: "Non-Vegetarian", sub: "Meats, poultry, fish & eggs" },
                            { id: "Eggetarian", icon: "🍳", title: "Eggetarian", sub: "Vegetarian + eggs" },
                            { id: "Vegan", icon: "🌱", title: "100% Vegan", sub: "Strictly zero animal products" },
                          ].map((item) => (
                            <button
                              key={item.id}
                              type="button"
                              className={`${styles.optionCard} ${formData.dietType === item.id ? styles.selected : ""}`}
                              onClick={() => updateField("dietType", item.id as any)}
                            >
                              <span className={styles.optionCardIcon}>{item.icon}</span>
                              <strong className={styles.optionCardTitle}>{item.title}</strong>
                              <span className={styles.optionCardSub}>{item.sub}</span>
                            </button>
                          ))}
                        </div>

                        {formData.dietType === "Vegan" && (
                          <div className={styles.conditionalBlock}>
                            <label className={styles.fieldLabel}>
                              <span>How long have you followed a vegan diet?</span>
                            </label>
                            <input
                              type="text"
                              className={styles.textInput}
                              placeholder="e.g. 1 year / 6 months"
                              value={formData.veganDuration}
                              onChange={(e) => updateField("veganDuration", e.target.value)}
                            />
                          </div>
                        )}
                      </div>

                      {/* Tofu & Plant proteins */}
                      <div className={styles.grid2} style={{ marginTop: "18px" }}>
                        <div className={styles.field}>
                          <label className={styles.fieldLabel}>
                            <span>Do you consume tofu?</span>
                          </label>
                          <div className={styles.segmentedGroup}>
                            <button
                              type="button"
                              className={`${styles.segmentBtn} ${formData.consumeTofu === "Yes" ? styles.active : ""}`}
                              onClick={() => updateField("consumeTofu", "Yes")}
                            >
                              Yes
                            </button>
                            <button
                              type="button"
                              className={`${styles.segmentBtn} ${formData.consumeTofu === "No" ? styles.active : ""}`}
                              onClick={() => updateField("consumeTofu", "No")}
                            >
                              No
                            </button>
                          </div>
                        </div>

                        <div className={styles.field}>
                          <label className={styles.fieldLabel}>
                            <span>Other plant-based proteins?</span>
                          </label>
                          <div className={styles.segmentedGroup}>
                            <button
                              type="button"
                              className={`${styles.segmentBtn} ${formData.consumePlantProtein === "Yes" ? styles.active : ""}`}
                              onClick={() => updateField("consumePlantProtein", "Yes")}
                            >
                              Yes
                            </button>
                            <button
                              type="button"
                              className={`${styles.segmentBtn} ${formData.consumePlantProtein === "No" ? styles.active : ""}`}
                              onClick={() => updateField("consumePlantProtein", "No")}
                            >
                              No
                            </button>
                          </div>
                        </div>
                      </div>

                      {formData.consumePlantProtein === "Yes" && (
                        <div className={styles.conditionalBlock}>
                          <label className={styles.fieldLabel}>
                            <span>Mention plant proteins you consume:</span>
                          </label>
                          <input
                            type="text"
                            className={styles.textInput}
                            placeholder="e.g. Soya chunks, sprouted lentils, hemp seeds, pea protein"
                            value={formData.plantProteinDetails}
                            onChange={(e) => updateField("plantProteinDetails", e.target.value)}
                          />
                        </div>
                      )}

                      {/* Non-veg foods eaten */}
                      {(formData.dietType === "Non-Vegetarian" || formData.dietType === "Eggetarian") && (
                        <div className={styles.field} style={{ marginTop: "18px" }}>
                          <label className={styles.fieldLabel}>
                            <span>Non-veg foods you eat (select all that apply):</span>
                          </label>
                          <div className={styles.chipsWrap}>
                            {["Chicken", "Fish & Seafood", "Egg", "Mutton"].map((item) => {
                              const active = formData.nonVegFoods.includes(item);
                              return (
                                <button
                                  key={item}
                                  type="button"
                                  className={`${styles.chipBtn} ${active ? styles.active : ""}`}
                                  onClick={() => {
                                    if (active) {
                                      updateField("nonVegFoods", formData.nonVegFoods.filter((f) => f !== item));
                                    } else {
                                      updateField("nonVegFoods", [...formData.nonVegFoods, item]);
                                    }
                                  }}
                                >
                                  {active && <Check size={14} />} {item}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Avoid non-veg specific days */}
                      <div className={styles.field} style={{ marginTop: "18px" }}>
                        <label className={styles.fieldLabel}>
                          <span>Do you avoid non-veg on specific days?</span>
                        </label>
                        <div className={styles.segmentedGroup}>
                          <button
                            type="button"
                            className={`${styles.segmentBtn} ${formData.avoidNonVegSpecificDays === "Yes" ? styles.active : ""}`}
                            onClick={() => updateField("avoidNonVegSpecificDays", "Yes")}
                          >
                            Yes
                          </button>
                          <button
                            type="button"
                            className={`${styles.segmentBtn} ${formData.avoidNonVegSpecificDays === "No" ? styles.active : ""}`}
                            onClick={() => updateField("avoidNonVegSpecificDays", "No")}
                          >
                            No
                          </button>
                        </div>

                        {formData.avoidNonVegSpecificDays === "Yes" && (
                          <div className={styles.conditionalBlock}>
                            <label className={styles.fieldLabel}>
                              <span>Which days do you avoid non-veg?</span>
                            </label>
                            <div className={styles.chipsWrap}>
                              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => {
                                const active = formData.avoidNonVegDays.includes(day);
                                return (
                                  <button
                                    key={day}
                                    type="button"
                                    className={`${styles.chipBtn} ${active ? styles.active : ""}`}
                                    onClick={() => {
                                      if (active) {
                                        updateField("avoidNonVegDays", formData.avoidNonVegDays.filter((d) => d !== day));
                                      } else {
                                        updateField("avoidNonVegDays", [...formData.avoidNonVegDays, day]);
                                      }
                                    }}
                                  >
                                    {active && <Check size={14} />} {day}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Foods avoided or disliked */}
                      <div className={styles.field} style={{ marginTop: "18px" }}>
                        <label className={styles.fieldLabel}>
                          <span>Foods you avoid or dislike:</span>
                        </label>
                        <input
                          type="text"
                          className={styles.textInput}
                          placeholder="e.g. Bitter gourd, raw onions, oats"
                          value={formData.dislikedFoods}
                          onChange={(e) => updateField("dislikedFoods", e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Section 9: Tea & Coffee */}
                    <div className={styles.sectionBlock}>
                      <div className={styles.sectionHeader}>
                        <div className={styles.sectionNumber}>9</div>
                        <h2 className={styles.sectionTitle}>Tea & Coffee Consumption</h2>
                      </div>

                      <div className={styles.grid2}>
                        <div className={styles.field}>
                          <label className={styles.fieldLabel}>
                            <span>Do you drink tea?</span>
                          </label>
                          <div className={styles.segmentedGroup}>
                            <button
                              type="button"
                              className={`${styles.segmentBtn} ${formData.drinkTea === "Yes" ? styles.active : ""}`}
                              onClick={() => updateField("drinkTea", "Yes")}
                            >
                              Yes
                            </button>
                            <button
                              type="button"
                              className={`${styles.segmentBtn} ${formData.drinkTea === "No" ? styles.active : ""}`}
                              onClick={() => updateField("drinkTea", "No")}
                            >
                              No
                            </button>
                          </div>
                          {formData.drinkTea === "Yes" && (
                            <input
                              type="text"
                              className={styles.textInput}
                              placeholder="Cups per day (e.g. 2 cups)"
                              value={formData.teaCups}
                              onChange={(e) => updateField("teaCups", e.target.value)}
                              style={{ marginTop: "10px" }}
                            />
                          )}
                        </div>

                        <div className={styles.field}>
                          <label className={styles.fieldLabel}>
                            <span>Do you drink coffee?</span>
                          </label>
                          <div className={styles.segmentedGroup}>
                            <button
                              type="button"
                              className={`${styles.segmentBtn} ${formData.drinkCoffee === "Yes" ? styles.active : ""}`}
                              onClick={() => updateField("drinkCoffee", "Yes")}
                            >
                              Yes
                            </button>
                            <button
                              type="button"
                              className={`${styles.segmentBtn} ${formData.drinkCoffee === "No" ? styles.active : ""}`}
                              onClick={() => updateField("drinkCoffee", "No")}
                            >
                              No
                            </button>
                          </div>
                          {formData.drinkCoffee === "Yes" && (
                            <input
                              type="text"
                              className={styles.textInput}
                              placeholder="Cups per day (e.g. 1 cup)"
                              value={formData.coffeeCups}
                              onChange={(e) => updateField("coffeeCups", e.target.value)}
                              style={{ marginTop: "10px" }}
                            />
                          )}
                        </div>
                      </div>

                      <div className={styles.field} style={{ marginTop: "18px" }}>
                        <label className={styles.fieldLabel}>
                          <span>Do you add sugar to tea or coffee?</span>
                        </label>
                        <div className={styles.segmentedGroup}>
                          <button
                            type="button"
                            className={`${styles.segmentBtn} ${formData.addSugar === "Yes" ? styles.active : ""}`}
                            onClick={() => updateField("addSugar", "Yes")}
                          >
                            Yes
                          </button>
                          <button
                            type="button"
                            className={`${styles.segmentBtn} ${formData.addSugar === "No" ? styles.active : ""}`}
                            onClick={() => updateField("addSugar", "No")}
                          >
                            No
                          </button>
                        </div>
                        {formData.addSugar === "Yes" && (
                          <input
                            type="text"
                            className={styles.textInput}
                            placeholder="Approx how much per cup (e.g. 1 tsp / 2 spoons)"
                            value={formData.sugarAmount}
                            onChange={(e) => updateField("sugarAmount", e.target.value)}
                            style={{ marginTop: "10px" }}
                          />
                        )}
                      </div>
                    </div>

                    {/* Section 10: Meal Timing & Convenience */}
                    <div className={styles.sectionBlock}>
                      <div className={styles.sectionHeader}>
                        <div className={styles.sectionNumber}>10</div>
                        <h2 className={styles.sectionTitle}>Meal Timing & Schedule Convenience</h2>
                      </div>

                      <div className={styles.field}>
                        <label className={styles.fieldLabel}>
                          <span>Usual Daily Meal Timings:</span>
                        </label>
                        <div className={styles.grid3}>
                          <div>
                            <span style={{ fontSize: "12px", color: "#557263", display: "block", marginBottom: "4px" }}>Breakfast</span>
                            <input
                              type="time"
                              className={styles.textInput}
                              value={formData.usualBreakfastTime}
                              onChange={(e) => updateField("usualBreakfastTime", e.target.value)}
                            />
                          </div>
                          <div>
                            <span style={{ fontSize: "12px", color: "#557263", display: "block", marginBottom: "4px" }}>Lunch</span>
                            <input
                              type="time"
                              className={styles.textInput}
                              value={formData.usualLunchTime}
                              onChange={(e) => updateField("usualLunchTime", e.target.value)}
                            />
                          </div>
                          <div>
                            <span style={{ fontSize: "12px", color: "#557263", display: "block", marginBottom: "4px" }}>Dinner</span>
                            <input
                              type="time"
                              className={styles.textInput}
                              value={formData.usualDinnerTime}
                              onChange={(e) => updateField("usualDinnerTime", e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      <div className={styles.field} style={{ marginTop: "18px" }}>
                        <label className={styles.fieldLabel}>
                          <span>Do you usually have snacks between meals?</span>
                        </label>
                        <div className={styles.segmentedGroup}>
                          <button
                            type="button"
                            className={`${styles.segmentBtn} ${formData.snacksBetweenMeals === "Yes" ? styles.active : ""}`}
                            onClick={() => updateField("snacksBetweenMeals", "Yes")}
                          >
                            Yes
                          </button>
                          <button
                            type="button"
                            className={`${styles.segmentBtn} ${formData.snacksBetweenMeals === "No" ? styles.active : ""}`}
                            onClick={() => updateField("snacksBetweenMeals", "No")}
                          >
                            No
                          </button>
                        </div>
                        {formData.snacksBetweenMeals === "Yes" && (
                          <div className={styles.conditionalBlock}>
                            <label className={styles.fieldLabel}>
                              <span>What time do you usually snack?</span>
                            </label>
                            <input
                              type="text"
                              className={styles.textInput}
                              placeholder="e.g. 11:30 AM and 5:00 PM"
                              value={formData.snackTime}
                              onChange={(e) => updateField("snackTime", e.target.value)}
                            />
                          </div>
                        )}
                      </div>

                      <div className={styles.field} style={{ marginTop: "18px" }}>
                        <label className={styles.fieldLabel}>
                          <span>Most convenient timings for you:</span>
                        </label>
                        <div className={styles.grid3}>
                          <div>
                            <span style={{ fontSize: "12px", color: "#557263", display: "block", marginBottom: "4px" }}>Convenient Breakfast</span>
                            <input
                              type="time"
                              className={styles.textInput}
                              value={formData.convenientBreakfastTime}
                              onChange={(e) => updateField("convenientBreakfastTime", e.target.value)}
                            />
                          </div>
                          <div>
                            <span style={{ fontSize: "12px", color: "#557263", display: "block", marginBottom: "4px" }}>Convenient Lunch</span>
                            <input
                              type="time"
                              className={styles.textInput}
                              value={formData.convenientLunchTime}
                              onChange={(e) => updateField("convenientLunchTime", e.target.value)}
                            />
                          </div>
                          <div>
                            <span style={{ fontSize: "12px", color: "#557263", display: "block", marginBottom: "4px" }}>Convenient Dinner</span>
                            <input
                              type="time"
                              className={styles.textInput}
                              value={formData.convenientDinnerTime}
                              onChange={(e) => updateField("convenientDinnerTime", e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      <div className={styles.field} style={{ marginTop: "18px" }}>
                        <label className={styles.fieldLabel}>
                          <span>Any difficulty following a fixed meal timing?</span>
                        </label>
                        <div className={styles.segmentedGroup}>
                          <button
                            type="button"
                            className={`${styles.segmentBtn} ${formData.difficultyFixedTiming === "Yes" ? styles.active : ""}`}
                            onClick={() => updateField("difficultyFixedTiming", "Yes")}
                          >
                            Yes
                          </button>
                          <button
                            type="button"
                            className={`${styles.segmentBtn} ${formData.difficultyFixedTiming === "No" ? styles.active : ""}`}
                            onClick={() => updateField("difficultyFixedTiming", "No")}
                          >
                            No
                          </button>
                        </div>
                        {formData.difficultyFixedTiming === "Yes" && (
                          <div className={styles.conditionalBlock}>
                            <label className={styles.fieldLabel}>
                              <span>Please explain the challenge:</span>
                            </label>
                            <input
                              type="text"
                              className={styles.textInput}
                              placeholder="e.g. Unpredictable work meetings, travel, shift timings"
                              value={formData.difficultyTimingDetails}
                              onChange={(e) => updateField("difficultyTimingDetails", e.target.value)}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Section 11: Alcohol & Substances */}
                    <div className={styles.sectionBlock}>
                      <div className={styles.sectionHeader}>
                        <div className={styles.sectionNumber}>11</div>
                        <h2 className={styles.sectionTitle}>Substances & Alcohol</h2>
                      </div>

                      <div className={styles.grid3}>
                        <div className={styles.field}>
                          <label className={styles.fieldLabel}>
                            <span>Alcohol</span>
                          </label>
                          <div className={styles.segmentedGroup}>
                            {(["No", "Occasionally", "Yes"] as const).map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                className={`${styles.segmentBtn} ${formData.alcohol === opt ? styles.active : ""}`}
                                onClick={() => updateField("alcohol", opt)}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className={styles.field}>
                          <label className={styles.fieldLabel}>
                            <span>Tobacco / Nicotine</span>
                          </label>
                          <div className={styles.segmentedGroup}>
                            {(["No", "Occasionally", "Yes"] as const).map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                className={`${styles.segmentBtn} ${formData.tobacco === opt ? styles.active : ""}`}
                                onClick={() => updateField("tobacco", opt)}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className={styles.field}>
                          <label className={styles.fieldLabel}>
                            <span>Other Substances</span>
                          </label>
                          <div className={styles.segmentedGroup}>
                            {(["No", "Occasionally", "Yes"] as const).map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                className={`${styles.segmentBtn} ${formData.otherSubstances === opt ? styles.active : ""}`}
                                onClick={() => updateField("otherSubstances", opt)}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Section 12: Diet Chart Protocol */}
                    <div className={styles.sectionBlock}>
                      <div className={styles.sectionHeader}>
                        <div className={styles.sectionNumber}>12</div>
                        <h2 className={styles.sectionTitle}>Diet Chart Plan & Goals</h2>
                      </div>

                      <div className={styles.field}>
                        <label className={styles.fieldLabel}>
                          <span>Plan Duration Required:</span>
                        </label>
                        <div className={styles.planDurationGrid}>
                          <div
                            className={`${styles.planCard} ${formData.planDuration === "6 Months" ? styles.selected : ""}`}
                            onClick={() => updateField("planDuration", "6 Months")}
                          >
                            <div className={styles.planCardHeader}>
                              <span className={styles.planDurationTitle}>6 Months Foundation</span>
                              <span className={styles.planDurationBadge}>Recommended</span>
                            </div>
                            <p className={styles.planCardDesc}>
                              Diet Chart Only • Comprehensive gut motility reset, cellular fat adaptation & sustained habit building.
                            </p>
                          </div>

                          <div
                            className={`${styles.planCard} ${formData.planDuration === "1 Year" ? styles.selected : ""}`}
                            onClick={() => updateField("planDuration", "1 Year")}
                          >
                            <div className={styles.planCardHeader}>
                              <span className={styles.planDurationTitle}>1 Year Transformation</span>
                              <span className={styles.planDurationBadge}>Complete Mastery</span>
                            </div>
                            <p className={styles.planCardDesc}>
                              Diet Chart Only • Complete metabolic recalibration, seasonal meal rotations & permanent health transformation.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className={styles.field} style={{ marginTop: "18px" }}>
                        <label className={styles.fieldLabel}>
                          <span>Main Goal / Requirement *</span>
                        </label>
                        <textarea
                          className={styles.textareaInput}
                          placeholder="What is your primary target? (e.g. Weight loss of 10kg, PCOS hormone balance, reverse fatty liver, sustained energy, improve digestion...)"
                          value={formData.mainGoal}
                          onChange={(e) => updateField("mainGoal", e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Section 13: Additional Notes & Declaration */}
                    <div className={styles.sectionBlock}>
                      <div className={styles.sectionHeader}>
                        <div className={styles.sectionNumber}>13</div>
                        <h2 className={styles.sectionTitle}>Additional Information & Declaration</h2>
                      </div>

                      <div className={styles.field}>
                        <label className={styles.fieldLabel}>
                          <span>Anything else you would like to share with Dietitian Sujitha?</span>
                        </label>
                        <textarea
                          className={styles.textareaInput}
                          placeholder="Any specific food cravings, family history, travel frequency, or questions..."
                          value={formData.additionalInfo}
                          onChange={(e) => updateField("additionalInfo", e.target.value)}
                        />
                      </div>

                      <div style={{ marginTop: "24px", padding: "20px", background: "#f5faf4", border: "1.5px solid #d4e8d3", borderRadius: "18px" }}>
                        <label style={{ display: "flex", alignItems: "flex-start", gap: "12px", cursor: "pointer" }}>
                          <input
                            type="checkbox"
                            checked={formData.confirmedAccurate}
                            onChange={(e) => updateField("confirmedAccurate", e.target.checked)}
                            style={{ width: "20px", height: "20px", accentColor: "#24704d", marginTop: "2px", cursor: "pointer" }}
                          />
                          <span style={{ fontSize: "14px", color: "#184735", lineHeight: 1.5, fontWeight: 600 }}>
                            I confirm that the information provided above is accurate and true to the best of my knowledge for clinical diet formulation.
                          </span>
                        </label>

                        <div className={styles.grid2} style={{ marginTop: "16px" }}>
                          <div className={styles.field}>
                            <label className={styles.fieldLabel}>
                              <span>Digital Signature (Type your Full Name) *</span>
                            </label>
                            <input
                              type="text"
                              className={styles.textInput}
                              placeholder="Your full name as digital signature"
                              value={formData.signature}
                              onChange={(e) => updateField("signature", e.target.value)}
                            />
                          </div>

                          <div className={styles.field}>
                            <label className={styles.fieldLabel}>
                              <span>Date</span>
                            </label>
                            <input
                              type="text"
                              disabled
                              className={styles.textInput}
                              value={new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                              style={{ background: "#eef5ed", color: "#557263", cursor: "not-allowed" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error feedback if any */}
              {validationError && (
                <div className={styles.dockValidationError}>
                  <AlertCircle size={16} style={{ flexShrink: 0 }} />
                  <span>{validationError}</span>
                </div>
              )}

              {/* Bottom Action Dock */}
              <div className={styles.actionDock}>
                {currentStage > 1 ? (
                  <button type="button" className={styles.backActionBtn} onClick={handleBack}>
                    <ChevronLeft size={16} />
                    <span>Previous Stage</span>
                  </button>
                ) : (
                  <div />
                )}

                <div className={styles.stepIndicators}>
                  {stages.map((st) => (
                    <div
                      key={st.id}
                      className={`${styles.stepDot} ${st.id === currentStage ? styles.active : ""} ${st.id < currentStage ? styles.completed : ""}`}
                    />
                  ))}
                </div>

                <button type="button" className={styles.continueActionBtn} onClick={handleNext}>
                  <span>{currentStage === stages.length ? "Submit & Send to Sujitha" : "Save & Continue"}</span>
                  {currentStage === stages.length ? <Send size={16} /> : <ChevronRight size={16} />}
                </button>
              </div>
            </div>
          </>
        ) : (
          /* =========================================================
             SUCCESS & NEXT STEPS SANCTUARY SCREEN (LUXURY REDESIGN)
             ========================================================= */
          <div className={styles.successSanctuaryCard}>
            {/* Top Success Icon & Eyebrow */}
            <div className={styles.successIconWrap}>
              <CheckCircle2 size={38} />
            </div>

            <div className={styles.successEyebrowPill}>
              <Sparkles size={13} className={styles.sparkleGold} />
              <span>INTAKE RECORDED &amp; SYNCHRONIZED</span>
            </div>

            <h1 className={styles.successTitle}>
              Your Clinical Sanctuary is Ready, <br />
              <em>{formData.fullName}.</em>
            </h1>

            <p className={styles.successDesc}>
              Your 13-point baseline measurements, metabolic indicators, and food routines have been saved to your personal ChatHeal profile. Choose your next step below:
            </p>

            {/* Vitals Snapshot Summary Strip */}
            <div className={styles.successVitalsStrip}>
              <div className={styles.successVitalItem}>
                <span className={styles.successVitalLabel}>Calculated BMI</span>
                <strong className={styles.successVitalValue}>
                  {bmi ? bmi.toFixed(1) : "--.-"}
                </strong>
                <small className={styles.successVitalSub}>{bmiCategory}</small>
              </div>

              <div className={styles.successVitalItem}>
                <span className={styles.successVitalLabel}>Measurements</span>
                <strong className={styles.successVitalValue}>
                  {formData.weightKg} kg · {formData.heightCm} cm
                </strong>
                <small className={styles.successVitalSub}>
                  {formData.bloodGroup ? `Blood: ${formData.bloodGroup}` : "Standard Baseline"}
                </small>
              </div>

              <div className={styles.successVitalItem}>
                <span className={styles.successVitalLabel}>Diet &amp; Sleep Rhythm</span>
                <strong className={styles.successVitalValue}>
                  {formData.dietType || "Whole Food"}
                </strong>
                <small className={styles.successVitalSub}>
                  {formData.totalSleepHours ? `${formData.totalSleepHours} hrs/night` : "Circadian Care"}
                </small>
              </div>

              <div className={styles.successVitalItem}>
                <span className={styles.successVitalLabel}>Primary Target</span>
                <strong className={styles.successVitalValue} style={{ fontSize: "13.5px", lineHeight: "1.3" }}>
                  {formData.mainGoal || "Personalized Nutrition"}
                </strong>
                <small className={styles.successVitalSub}>Active Focus</small>
              </div>
            </div>

            {/* Dual Next-Steps Action Cards */}
            <div className={styles.successDualActions}>
              {/* Card 1: Open Member Portal */}
              <div className={styles.successActionCard}>
                <div className={styles.successActionBadge}>
                  <Sparkles size={12} />
                  <span>Interactive Member Dashboard</span>
                </div>
                <h3>Explore Your Wellness Space</h3>
                <p>
                  View your daily hydration ring, log nutritious meals, track consistency, and access longevity articles personalized to you.
                </p>
                <Link href="/wellness" className={styles.btnLaunchPortalAction}>
                  <span>Open Your Dashboard</span>
                  <ArrowRight size={16} />
                </Link>
              </div>

              {/* Card 2: Send on WhatsApp */}
              <div className={`${styles.successActionCard} ${styles.successActionCardWhatsapp}`}>
                <div className={styles.successActionBadgeWhatsapp}>
                  <Send size={12} />
                  <span>Clinical Founder Connect</span>
                </div>
                <h3>Transmit to Dietitian Sujitha C.</h3>
                <p>
                  Send your pre-formatted 13-point clinical assessment to Sujitha’s verified line (+91 82488 62343) for 1-on-1 video onboarding.
                </p>
                <a
                  href={`https://wa.me/918248862343?text=${encodeURIComponent(formatWhatsAppText())}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.btnWhatsappAction}
                >
                  <Send size={16} />
                  <span>Send via WhatsApp (+91 82488 62343)</span>
                </a>
              </div>
            </div>

            {/* Secondary Utility Actions */}
            <div className={styles.secondaryActionsRow}>
              <button type="button" className={styles.secActionBtn} onClick={copyToClipboard}>
                {copied ? <Check size={16} /> : <Copy size={16} />}
                <span>{copied ? "Copied to Clipboard!" : "Copy Full Summary"}</span>
              </button>

              <button
                type="button"
                className={styles.secActionBtn}
                onClick={() => window.print()}
              >
                <Printer size={16} />
                <span>Print / Save PDF</span>
              </button>

              <button
                type="button"
                className={styles.secActionBtn}
                onClick={() => setIsSubmitted(false)}
              >
                <RotateCcw size={16} />
                <span>Edit / Review Responses</span>
              </button>

              <Link href="/health-assessment" className={styles.secActionBtn}>
                <ClipboardCheck size={16} />
                <span>View Full Clinical Profile</span>
              </Link>
            </div>

            <div style={{ marginTop: "24px" }}>
              <Link href="/wellness" className={styles.returnPortalBtn}>
                <ChevronLeft size={16} />
                <span>Return to Member Portal</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
