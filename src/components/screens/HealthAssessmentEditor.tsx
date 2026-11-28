"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { api } from "@/lib/api";

const STEPS = [
  { num: "STEP 01", title: "Personal & Body" },
  { num: "STEP 02", title: "Work & Sleep" },
  { num: "STEP 03", title: "Health & Mind" },
  { num: "STEP 04", title: "Physical Activity" },
  { num: "STEP 05", title: "Diet & Meal Timings" },
  { num: "STEP 06", title: "Goals & Declaration" },
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "11px 14px",
  borderRadius: "12px",
  border: "1px solid #d5e2d8",
  background: "#fbfdfb",
  color: "#16302b",
  fontSize: "14px",
  outline: "none",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "12px",
  fontWeight: 700,
  color: "#2b4740",
  marginBottom: "6px",
};

function FieldBox({
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
}: {
  label: string;
  value?: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input
        type={type}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={inputStyle}
      />
    </div>
  );
}

function SelectBox({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value?: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <select
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        style={inputStyle}
      >
        <option value="">Select...</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function HealthAssessmentEditor({
  initialData,
  userName,
  onSave,
  onCancel,
}: {
  initialData: Record<string, any>;
  userName?: string;
  onSave: (updated: Record<string, any>) => void;
  onCancel: () => void;
}) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Record<string, any>>({
    ...initialData,
    fullName: initialData?.fullName || userName || "",
  });
  const [saving, setSaving] = useState(false);

  const set = (key: string, val: string) => {
    setForm((prev) => {
      const next = { ...prev, [key]: val };
      try {
        localStorage.setItem("chatheal_client_assessment", JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleSave = async () => {
    setSaving(true);
    const updated = {
      ...form,
      submittedAt: new Date().toISOString(),
    };
    try {
      localStorage.setItem("chatheal_client_assessment", JSON.stringify(updated));
    } catch {}
    await api("/assessment", "PUT", updated).catch(() => {});
    setSaving(false);
    onSave(updated);
  };

  const pct = Math.round(((step + 1) / STEPS.length) * 100);

  return (
    <div
      style={{
        minHeight: "100%",
        background:
          "radial-gradient(circle at top center, #edf5ee 0%, #f6f9f6 65%, #f9fbf9 100%)",
        padding: "14px 10px 36px",
        boxSizing: "border-box",
      }}
    >
      <div style={{ maxWidth: "1020px", margin: "0 auto" }}>
        {/* Top Action Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "22px",
          }}
        >
          <button
            type="button"
            onClick={onCancel}
            style={{
              background: "#ffffff",
              border: "1px solid #d5e2d8",
              color: "#16302b",
              borderRadius: "999px",
              padding: "9px 16px",
              fontSize: "13px",
              fontWeight: 600,
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(22, 48, 43, 0.04)",
            }}
          >
            <ArrowLeft size={14} />
            Return to Profile
          </button>

          <span
            style={{
              background: "#e4f3e8",
              border: "1px solid #c5e4cd",
              color: "#0d7261",
              borderRadius: "999px",
              padding: "7px 14px",
              fontSize: "12px",
              fontWeight: 700,
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <Sparkles size={13} />
            Intake Studio
          </span>
        </div>

        {/* Centered Editorial Header */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "#e4f3e8",
              color: "#0d7261",
              padding: "6px 14px",
              borderRadius: "999px",
              fontSize: "11px",
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "14px",
            }}
          >
            <ShieldCheck size={13} />
            CLINICAL INTAKE ASSESSMENT
          </span>
          <h1
            style={{
              margin: 0,
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 800,
              color: "#16302b",
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
            }}
          >
            Health, Lifestyle &amp; Diet
            <br />
            Assessment
          </h1>
          <p
            style={{
              margin: "12px auto 0",
              maxWidth: "560px",
              fontSize: "14px",
              color: "#526862",
              lineHeight: 1.55,
            }}
          >
            Please fill in your authentic daily habits and measurements.
            Dietitian Sujitha C. uses this data to craft your personalized
            whole-food diet chart.
          </p>
        </div>

        {/* Floating 6-Step Progress Card */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "20px",
            border: "1px solid #e1ebe3",
            boxShadow: "0 12px 32px rgba(22, 48, 43, 0.05)",
            padding: "16px 20px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(135px, 1fr))",
              gap: "8px",
              marginBottom: "14px",
            }}
          >
            {STEPS.map((s, idx) => {
              const active = step === idx;
              return (
                <button
                  key={s.num}
                  type="button"
                  onClick={() => setStep(idx)}
                  style={{
                    textAlign: "left",
                    padding: "10px 14px",
                    borderRadius: "12px",
                    border: active
                      ? "1px solid #133c2e"
                      : "1px solid transparent",
                    background: active ? "#133c2e" : "transparent",
                    color: active ? "#ffffff" : "#16302b",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  <div
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      color: active ? "#a7f3d0" : "#64748b",
                      marginBottom: "2px",
                    }}
                  >
                    {s.num}
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {s.title}
                  </div>
                </button>
              );
            })}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                flex: 1,
                minWidth: "180px",
                height: "6px",
                background: "#e8efe9",
                borderRadius: "999px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${pct}%`,
                  height: "100%",
                  background: "linear-gradient(90deg, #0d7261, #10b981)",
                  borderRadius: "999px",
                  transition: "width 0.25s ease",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontSize: "12px",
                color: "#475569",
                fontWeight: 600,
              }}
            >
              <span>
                Stage {step + 1} of 6 &bull; {pct}%
              </span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  background: "#e6f4ea",
                  color: "#059669",
                  padding: "4px 10px",
                  borderRadius: "999px",
                  fontSize: "11px",
                  fontWeight: 700,
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#10b981",
                  }}
                />
                Auto-saved draft
              </span>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "20px",
            border: "1px solid #e1ebe3",
            boxShadow: "0 12px 32px rgba(22, 48, 43, 0.05)",
            padding: "26px 28px",
          }}
        >
          <div
            style={{
              marginBottom: "20px",
              paddingBottom: "14px",
              borderBottom: "1px solid #eef4ef",
            }}
          >
            <div
              style={{
                fontSize: "11px",
                fontWeight: 800,
                color: "#0d7261",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              {STEPS[step].num}
            </div>
            <h2
              style={{
                margin: "2px 0 0",
                fontSize: "20px",
                fontWeight: 800,
                color: "#16302b",
              }}
            >
              {STEPS[step].title}
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "16px",
            }}
          >
            {step === 0 && (
              <>
                <FieldBox label="Full Name" value={form.fullName} onChange={(v) => set("fullName", v)} />
                <FieldBox label="Age (years)" value={form.age} onChange={(v) => set("age", v)} placeholder="e.g. 29" />
                <FieldBox label="Date of Birth" value={form.dob} onChange={(v) => set("dob", v)} type="date" />
                <SelectBox label="Blood Group" value={form.bloodGroup} onChange={(v) => set("bloodGroup", v)} options={["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]} />
                <FieldBox label="Contact / WhatsApp" value={form.contactNumber} onChange={(v) => set("contactNumber", v)} placeholder="+91 9876543210" />
                <FieldBox label="Weight (kg)" value={form.weightKg} onChange={(v) => set("weightKg", v)} placeholder="e.g. 68" />
                <FieldBox label="Height (cm)" value={form.heightCm} onChange={(v) => set("heightCm", v)} placeholder="e.g. 170" />
                <FieldBox label="Waist (cm)" value={form.waistCm} onChange={(v) => set("waistCm", v)} placeholder="e.g. 82" />
                <FieldBox label="Hip (cm)" value={form.hipCm} onChange={(v) => set("hipCm", v)} placeholder="e.g. 96" />
                <FieldBox label="Chest (cm)" value={form.chestCm} onChange={(v) => set("chestCm", v)} placeholder="e.g. 94" />
                <FieldBox label="Arm (cm)" value={form.armCm} onChange={(v) => set("armCm", v)} placeholder="e.g. 30" />
                <FieldBox label="Thigh (cm)" value={form.thighCm} onChange={(v) => set("thighCm", v)} placeholder="e.g. 52" />
              </>
            )}

            {step === 1 && (
              <>
                <FieldBox label="Qualification" value={form.qualification} onChange={(v) => set("qualification", v)} />
                <FieldBox label="Occupation" value={form.occupation} onChange={(v) => set("occupation", v)} />
                <SelectBox label="Work Type" value={form.workType} onChange={(v) => set("workType", v)} options={["Sedentary / Desk", "Moderate Activity", "Field / Active", "Shift Work"]} />
                <FieldBox label="Working Hours" value={form.workingHours} onChange={(v) => set("workingHours", v)} placeholder="e.g. 9:30 AM - 6:30 PM" />
                <FieldBox label="Usual Bedtime" value={form.sleepTime} onChange={(v) => set("sleepTime", v)} placeholder="e.g. 10:30 PM" />
                <FieldBox label="Usual Wake Time" value={form.wakeTime} onChange={(v) => set("wakeTime", v)} placeholder="e.g. 6:30 AM" />
                <FieldBox label="Total Sleep Hours" value={form.totalSleepHours} onChange={(v) => set("totalSleepHours", v)} placeholder="e.g. 7.5" />
                <SelectBox label="Fall Asleep Immediately?" value={form.fallAsleepImmediately} onChange={(v) => set("fallAsleepImmediately", v)} options={["Yes", "No"]} />
                <FieldBox label="Time to Fall Asleep" value={form.fallAsleepDuration} onChange={(v) => set("fallAsleepDuration", v)} placeholder="e.g. 15 mins" />
                <SelectBox label="Wake During Night?" value={form.wakeDuringNight} onChange={(v) => set("wakeDuringNight", v)} options={["No", "Once", "Frequently"]} />
                <SelectBox label="Feel Refreshed on Waking?" value={form.refreshedAfterWaking} onChange={(v) => set("refreshedAfterWaking", v)} options={["Yes", "Sometimes", "No"]} />
              </>
            )}

            {step === 2 && (
              <>
                <SelectBox label="Taking Medicines?" value={form.takingMedicines} onChange={(v) => set("takingMedicines", v)} options={["No", "Yes"]} />
                <FieldBox label="Medication Details" value={form.medicinesDetails} onChange={(v) => set("medicinesDetails", v)} placeholder="Thyroid, Vitamin D, etc." />
                <SelectBox label="Constipation / Bloating?" value={form.constipation} onChange={(v) => set("constipation", v)} options={["No", "Occasional", "Yes"]} />
                <SelectBox label="Irregular Periods?" value={form.irregularPeriods} onChange={(v) => set("irregularPeriods", v)} options={["Not Applicable", "No", "Yes"]} />
                <SelectBox label="Past Surgeries?" value={form.surgeries} onChange={(v) => set("surgeries", v)} options={["No", "Yes"]} />
                <FieldBox label="Surgery Details" value={form.surgeriesDetails} onChange={(v) => set("surgeriesDetails", v)} />
                <SelectBox label="Joint or Body Pain?" value={form.jointOrBodyPain} onChange={(v) => set("jointOrBodyPain", v)} options={["No", "Yes"]} />
                <FieldBox label="Pain Details" value={form.painDetails} onChange={(v) => set("painDetails", v)} />
                <FieldBox label="Other Health Concerns" value={form.otherHealthConcerns} onChange={(v) => set("otherHealthConcerns", v)} placeholder="PCOS, Gut health, Diabetes, etc." />
                <SelectBox label="Meditation?" value={form.meditation} onChange={(v) => set("meditation", v)} options={["No", "Yes"]} />
                <FieldBox label="Meditation Frequency" value={form.meditationFrequency} onChange={(v) => set("meditationFrequency", v)} />
              </>
            )}

            {step === 3 && (
              <>
                <SelectBox label="Regular Exercise?" value={form.exercise} onChange={(v) => set("exercise", v)} options={["Yes", "No", "Occasionally"]} />
                <SelectBox label="Gym Workout?" value={form.gym} onChange={(v) => set("gym", v)} options={["No", "Yes"]} />
                <FieldBox label="Gym Days / Week" value={form.gymDays} onChange={(v) => set("gymDays", v)} placeholder="e.g. 4 days" />
                <SelectBox label="Daily Walking?" value={form.walking} onChange={(v) => set("walking", v)} options={["Yes", "No"]} />
                <FieldBox label="Walking Duration" value={form.walkingDuration} onChange={(v) => set("walkingDuration", v)} placeholder="e.g. 30 mins" />
                <SelectBox label="Cardio?" value={form.cardio} onChange={(v) => set("cardio", v)} options={["No", "Yes"]} />
                <FieldBox label="Cardio Type" value={form.cardioType} onChange={(v) => set("cardioType", v)} placeholder="Running, Cycling, Swimming" />
                <SelectBox label="Yoga?" value={form.yoga} onChange={(v) => set("yoga", v)} options={["No", "Yes"]} />
                <FieldBox label="Yoga Days / Week" value={form.yogaDays} onChange={(v) => set("yogaDays", v)} />
                <FieldBox label="Other Sports" value={form.otherSports} onChange={(v) => set("otherSports", v)} />
                <SelectBox label="Alcohol?" value={form.alcohol} onChange={(v) => set("alcohol", v)} options={["No", "Occasionally", "Yes"]} />
                <SelectBox label="Tobacco?" value={form.tobacco} onChange={(v) => set("tobacco", v)} options={["No", "Yes"]} />
              </>
            )}

            {step === 4 && (
              <>
                <SelectBox label="Diet Preference" value={form.dietType} onChange={(v) => set("dietType", v)} options={["Vegetarian", "Eggetarian", "Non-Vegetarian", "Vegan", "Pescatarian"]} />
                <SelectBox label="Food Allergies?" value={form.foodAllergies} onChange={(v) => set("foodAllergies", v)} options={["No", "Yes"]} />
                <FieldBox label="Allergy Details" value={form.allergiesDetails} onChange={(v) => set("allergiesDetails", v)} placeholder="Lactose, Nuts, Gluten" />
                <FieldBox label="Disliked Foods" value={form.dislikedFoods} onChange={(v) => set("dislikedFoods", v)} />
                <SelectBox label="Drink Tea?" value={form.drinkTea} onChange={(v) => set("drinkTea", v)} options={["No", "Yes"]} />
                <FieldBox label="Tea Cups / Day" value={form.teaCups} onChange={(v) => set("teaCups", v)} placeholder="e.g. 2" />
                <SelectBox label="Drink Coffee?" value={form.drinkCoffee} onChange={(v) => set("drinkCoffee", v)} options={["No", "Yes"]} />
                <FieldBox label="Coffee Cups / Day" value={form.coffeeCups} onChange={(v) => set("coffeeCups", v)} placeholder="e.g. 1" />
                <SelectBox label="Add Sugar?" value={form.addSugar} onChange={(v) => set("addSugar", v)} options={["No", "Yes"]} />
                <FieldBox label="Usual Breakfast Time" value={form.usualBreakfastTime} onChange={(v) => set("usualBreakfastTime", v)} placeholder="e.g. 8:30 AM" />
                <FieldBox label="Usual Lunch Time" value={form.usualLunchTime} onChange={(v) => set("usualLunchTime", v)} placeholder="e.g. 1:30 PM" />
                <FieldBox label="Usual Dinner Time" value={form.usualDinnerTime} onChange={(v) => set("usualDinnerTime", v)} placeholder="e.g. 8:00 PM" />
                <FieldBox label="Convenient Breakfast Time" value={form.convenientBreakfastTime} onChange={(v) => set("convenientBreakfastTime", v)} />
                <FieldBox label="Convenient Lunch Time" value={form.convenientLunchTime} onChange={(v) => set("convenientLunchTime", v)} />
                <FieldBox label="Convenient Dinner Time" value={form.convenientDinnerTime} onChange={(v) => set("convenientDinnerTime", v)} />
              </>
            )}

            {step === 5 && (
              <>
                <FieldBox label="Primary Health Goal" value={form.mainGoal} onChange={(v) => set("mainGoal", v)} placeholder="Sustainable Fat Loss, Gut Reset, Hormone Balance" />
                <SelectBox label="Plan Required" value={form.planRequired} onChange={(v) => set("planRequired", v)} options={["Personalized Whole-Food Nutrition", "Gut & Hormone Reset", "Metabolic Weight Loss", "Clinical Maintenance"]} />
                <SelectBox label="Plan Duration" value={form.planDuration} onChange={(v) => set("planDuration", v)} options={["1 Month", "3 Months", "6 Months", "12 Months"]} />
                <FieldBox label="Digital Signature" value={form.signature} onChange={(v) => set("signature", v)} placeholder="Your full name" />
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={labelStyle}>Additional Notes &amp; Dietary Context</label>
                  <textarea
                    rows={3}
                    value={form.additionalInfo || ""}
                    onChange={(e) => set("additionalInfo", e.target.value)}
                    placeholder="Any special schedule, travel, or clinical notes..."
                    style={inputStyle}
                  />
                </div>
              </>
            )}
          </div>

          {/* Footer Navigation */}
          <div
            style={{
              marginTop: "24px",
              paddingTop: "18px",
              borderTop: "1px solid #eef4ef",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              disabled={step === 0}
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              style={{
                padding: "10px 18px",
                borderRadius: "999px",
                border: "1px solid #d5e2d8",
                background: "#ffffff",
                color: step === 0 ? "#94a3b8" : "#16302b",
                fontWeight: 700,
                fontSize: "13px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                whiteSpace: "nowrap",
                flex: "1 1 120px",
                cursor: step === 0 ? "not-allowed" : "pointer",
              }}
            >
              <ArrowLeft size={15} />
              Previous
            </button>

            {step < 5 ? (
              <button
                type="button"
                onClick={() => setStep((s) => Math.min(5, s + 1))}
                style={{
                  padding: "10px 18px",
                  borderRadius: "999px",
                  border: "none",
                  background: "#133c2e",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "13px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  whiteSpace: "nowrap",
                  flex: "1 1 130px",
                  cursor: "pointer",
                }}
              >
                Next Step
                <ArrowRight size={15} />
              </button>
            ) : (
              <button
                type="button"
                disabled={saving}
                onClick={handleSave}
                style={{
                  padding: "10px 18px",
                  borderRadius: "999px",
                  border: "none",
                  background: "#0d7261",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "13px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  whiteSpace: "nowrap",
                  flex: "1 1 160px",
                  cursor: "pointer",
                }}
              >
                <CheckCircle2 size={15} />
                {saving ? "Saving..." : "Save & Sync Assessment"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
