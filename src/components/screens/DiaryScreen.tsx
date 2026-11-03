"use client";

import {
  Apple,
  Calendar,
  CheckCircle2,
  Coffee,
  Flame,
  Plus,
  Soup,
  Trash2,
  Utensils,
} from "lucide-react";
import { today } from "@/lib/api";
import { usePortal } from "../portal-context";
import {
  FadeUp,
  StaggerWrap,
  StaggerItem,
  AnimatedCard,
  AnimatedButton,
  PageTransition,
  ProgressBar,
  CountUp,
  FloatingBadge,
  motion,
  AnimatePresence,
} from "../motion";

const number = (n: number) => Math.round(n || 0).toLocaleString("en-IN");

export default function DiaryScreen() {
  const {
    admin,
    section,
    logs,
    date,
    setDate,
    mutate,
    open,
    total,
    goal,
    nutrients,
  } = usePortal();

  const mealCategories = [
    { name: "Breakfast", icon: Coffee, desc: "Morning nourishment & hydration", color: "#f59e0b" },
    { name: "Lunch", icon: Soup, desc: "Midday energizing fuel", color: "#0d7261" },
    { name: "Dinner", icon: Utensils, desc: "Evening wholesome dinner", color: "#6366f1" },
    { name: "Snack", icon: Apple, desc: "Mindful nutrient boosters", color: "#e11d48" },
  ];

  return (
    <>
      {section === "diary" && (
        <PageTransition>
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Main Diary Panel */}
            <FadeUp>
              <section className="panel luxury-panel">
                <div className="section-heading">
                  <div>
                    <span className="eyebrow">DAILY NOURISHMENT LOG</span>
                    <h2>Personal Food Diary</h2>
                  </div>
                  <div className="inline-actions" style={{ flexWrap: "wrap" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Calendar size={16} style={{ color: "var(--primary)" }} />
                      <input
                        aria-label="Diary date"
                        type="date"
                        value={date}
                        max={today()}
                        onChange={(e) => setDate(e.target.value)}
                        style={{ padding: "8px 12px", fontSize: "13px" }}
                      />
                      <AnimatedButton
                        className="btn secondary"
                        style={{ padding: "7px 12px", fontSize: "11px" }}
                        onClick={() => setDate(today())}
                      >
                        Today
                      </AnimatedButton>
                    </div>
                    <AnimatedButton
                      className="btn primary"
                      onClick={() => open("food", { meal: "Breakfast", grams: 100 })}
                    >
                      <Plus size={16} />
                      Log a Meal
                    </AnimatedButton>
                  </div>
                </div>

                {/* Calorie Summary Banner */}
                <motion.div
                  className="diary-summary"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.45 }}
                >
                  <div>
                    <strong style={{ display: "block", lineHeight: 1.1, fontSize: "28px", fontWeight: 800 }}>
                      <CountUp value={total} />
                    </strong>
                    <span style={{ fontSize: "12px", color: "var(--muted)" }}>
                      kcal consumed / {number(goal)} kcal target
                    </span>
                    <div style={{ width: "160px", height: "6px", background: "#d7e8de", borderRadius: "6px", marginTop: "8px", overflow: "hidden" }}>
                      <ProgressBar
                        percent={Math.min(100, (total / goal) * 100)}
                        className="macro-line-fill"
                        style={{
                          height: "100%",
                          background: total > goal * 1.1 ? "var(--accent-amber)" : "var(--primary)",
                          borderRadius: "6px",
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "28px", flexWrap: "wrap", flex: 1, justifyContent: "flex-end" }}>
                    {nutrients.map((n, i) => {
                      const color = i === 0 ? "var(--primary)" : i === 1 ? "var(--accent-amber)" : "var(--accent-purple)";
                      const targetWeight = i === 0 ? 100 : i === 1 ? 220 : 65;
                      return (
                        <motion.div
                          key={n.name}
                          style={{ minWidth: "90px" }}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + i * 0.08 }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: color, display: "block" }} />
                            <span style={{ fontSize: "11.5px", textTransform: "capitalize", color: "var(--muted)", fontWeight: 600 }}>
                              {n.name}
                            </span>
                          </div>
                          <strong style={{ fontSize: "20px", color: "var(--ink)" }}>
                            <CountUp value={n.value} suffix="g" />
                          </strong>
                          <div style={{ width: "100%", height: "4px", background: "#edf3ef", borderRadius: "4px", marginTop: "6px", overflow: "hidden" }}>
                            <ProgressBar
                              percent={Math.min(100, (n.value / targetWeight) * 100)}
                              style={{ height: "100%", background: color, borderRadius: "4px" }}
                            />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Meal Category Sections */}
                <StaggerWrap slow style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "20px" }}>
                  {mealCategories.map(({ name: meal, icon: MealIcon, desc, color }) => {
                    const mealLogs = logs.filter((l) => l.meal === meal);
                    const mealCalories = mealLogs.reduce((t, l) => t + l.calories, 0);

                    return (
                      <StaggerItem key={meal} variant="fadeUp">
                        <motion.div
                          className="meal-group"
                          whileHover={{ borderColor: color, boxShadow: `0 4px 18px rgba(0,0,0,0.06)` }}
                          transition={{ duration: 0.25 }}
                        >
                          <div className="section-heading" style={{ marginBottom: "12px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                              <motion.div
                                style={{ width: "36px", height: "36px", borderRadius: "10px", background: color + "18", color, display: "grid", placeItems: "center" }}
                                whileHover={{ scale: 1.12, rotate: 8 }}
                              >
                                <MealIcon size={17} />
                              </motion.div>
                              <div>
                                <h3 style={{ margin: 0, fontSize: "15px" }}>{meal}</h3>
                                <small style={{ color: "var(--muted)", fontSize: "11px" }}>{desc}</small>
                              </div>
                            </div>
                            <FloatingBadge className="pill" style={{ fontSize: "12px", fontWeight: 700, padding: "4px 10px" }}>
                              {number(mealCalories)} kcal
                            </FloatingBadge>
                          </div>

                          <AnimatePresence>
                            {mealLogs.length ? (
                              mealLogs.map((l) => (
                                <motion.div
                                  className="food-row"
                                  key={l.id}
                                  initial={{ opacity: 0, x: -12 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: 12, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                  layout
                                >
                                  <div>
                                    <b>{l.name}</b>
                                    <small>
                                      {l.grams}g portion • Protein: {number(l.protein)}g •
                                      Carbs: {number(l.carbs)}g • Fat: {number(l.fat)}g
                                    </small>
                                  </div>
                                  <span>{number(l.calories)} kcal</span>
                                  <AnimatedButton
                                    className="icon-btn"
                                    onClick={() => mutate("/logs/" + l.id, "DELETE")}
                                  >
                                    <Trash2 size={15} />
                                  </AnimatedButton>
                                </motion.div>
                              ))
                            ) : (
                              <motion.p
                                className="muted"
                                style={{ padding: "8px 0", fontSize: "12px" }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                              >
                                Nothing logged yet for {meal.toLowerCase()}. Every meal is a fresh mindful start.
                              </motion.p>
                            )}
                          </AnimatePresence>

                          <AnimatedButton
                            className="text-link"
                            style={{ marginTop: "10px" }}
                            onClick={() => open("food", { meal, grams: 100 })}
                          >
                            <Plus size={14} />
                            Add item to {meal.toLowerCase()}
                          </AnimatedButton>
                        </motion.div>
                      </StaggerItem>
                    );
                  })}
                </StaggerWrap>
              </section>
            </FadeUp>
          </div>
        </PageTransition>
      )}
    </>
  );
}
