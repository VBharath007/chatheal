"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Droplets,
  Flame,
  Leaf,
  Plus,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Video,
  Zap,
} from "lucide-react";

import { usePortal } from "../portal-context";
import { Chart } from "../ui";
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
  HeroText,
  motion,
} from "../motion";

const fmt = (s: string) =>
  new Date(s).toLocaleString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
const number = (n: number) => Math.round(n || 0).toLocaleString("en-IN");

export default function OverviewScreen() {
  const {
    section,
    content,
    progress,
    appointments,
    open,
    total,
    goal,
    nutrients,
    cards,
    user,
  } = usePortal();

  const nextAppointment = appointments.find((a) => a.status === "confirmed");

  const [waterMl, setWaterMl] = useState<number>(1500);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const todayKey = new Date().toISOString().slice(0, 10);
      const saved = localStorage.getItem("chatheal-water-" + todayKey);
      if (saved) setWaterMl(parseInt(saved, 10) || 1500);
    }
  }, []);

  const addWater = (amount: number = 250) => {
    setWaterMl((prev) => {
      const next = Math.min(3500, prev + amount);
      if (typeof window !== "undefined") {
        const todayKey = new Date().toISOString().slice(0, 10);
        localStorage.setItem("chatheal-water-" + todayKey, String(next));
      }
      return next;
    });
  };

  const resetWater = () => {
    setWaterMl(0);
    if (typeof window !== "undefined") {
      const todayKey = new Date().toISOString().slice(0, 10);
      localStorage.setItem("chatheal-water-" + todayKey, "0");
    }
  };

  const targetGoal = goal || 2000;
  const calorieRatio = Math.min(1, total / targetGoal);
  const waterRatio = Math.min(1, waterMl / 2500);
  const vitalityScore = Math.round(calorieRatio * 55 + waterRatio * 45);

  const hour = new Date().getHours();
  const timeGreeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <>
      {section === "overview" && (
        <PageTransition>
          <div className="overview-container">
            {/* =========================================================
                1. EXECUTIVE SANCTUARY LOUNGE HERO
                ========================================================= */}
            <motion.section
              className="sanctuary-hero"
              initial={{ opacity: 0, y: 32, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="sanctuary-hero-glow" />

              {/* Header badges */}
              <motion.div
                className="sanctuary-hero-header"
                initial={{ opacity: 0, y: -14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.18 }}
              >
                <FloatingBadge className="sanctuary-badge">
                  <span className="sanctuary-badge-dot" />
                  <span>YOUR PERSONAL WELLNESS SPACE</span>
                </FloatingBadge>
                <FloatingBadge className="sanctuary-sync-badge">
                  <span className="sync-pulse" />
                  <span>Your daily overview</span>
                </FloatingBadge>
              </motion.div>

              <div className="sanctuary-hero-body">
                <div className="sanctuary-hero-text">
                  <HeroText as="span" delay={0.22} className="sanctuary-eyebrow">
                    A LITTLE CARE, EVERY DAY
                  </HeroText>

                  <HeroText as="h2" delay={0.3}>
                    {timeGreeting}, <em>{user?.name || "Member"}.</em>
                  </HeroText>

                  <HeroText as="p" delay={0.38}>
                    Your meals, daily habits and personal check-ins, together in one thoughtful space.
                  </HeroText>

                  {/* Quick Concierge Action Dock */}
                  <StaggerWrap className="sanctuary-actions" style={{ marginTop: "24px" }}>
                    {[
                      {
                        label: "Log a meal",
                        icon: Plus,
                        className: "btn-sanctuary primary",
                        action: () => open("food", { meal: "Breakfast", grams: 100 }),
                      },
                      {
                        label: "Hydrate (+250ml)",
                        icon: Droplets,
                        className: "btn-sanctuary water-btn",
                        action: () => addWater(250),
                      },
                    ].map((btn) => (
                      <StaggerItem key={btn.label} variant="pop">
                        <AnimatedButton
                          className={btn.className}
                          onClick={btn.action}
                        >
                          <btn.icon size={15} />
                          <span>{btn.label}</span>
                        </AnimatedButton>
                      </StaggerItem>
                    ))}
                    <StaggerItem variant="pop">
                      <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.96 }}>
                        <Link href="/appointments" className="btn-sanctuary secondary">
                          <CalendarDays size={15} />
                          <span>Book Coach Check-in</span>
                        </Link>
                      </motion.div>
                    </StaggerItem>
                    <StaggerItem variant="pop">
                      <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.96 }}>
                        <Link href="/discover" className="btn-sanctuary glass">
                         
                          <span>Longevity Library</span>
                        </Link>
                      </motion.div>
                    </StaggerItem>
                  </StaggerWrap>
                </div>

                {/* Vitality Score Gauge Dock */}
                <motion.div
                  className="sanctuary-vitality-dock"
                  initial={{ opacity: 0, x: 28, scale: 0.94 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="vitality-gauge">
                    <motion.div
                      className="vitality-ring"
                      style={
                        {
                          "--score-deg": `${Math.round((vitalityScore / 100) * 360)}deg`,
                        } as React.CSSProperties
                      }
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="vitality-ring-inner">
                        <motion.span
                          className="vitality-val"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 380, damping: 24, delay: 0.7 }}
                        >
                          {vitalityScore}%
                        </motion.span>
                        <span className="vitality-lbl">Daily Score</span>
                      </div>
                    </motion.div>
                  </div>

                  <StaggerWrap className="vitality-stats-list" slow>
                    {[
                      {
                        icon: Flame,
                        theme: "amber",
                        label: `${number(total)} / ${number(targetGoal)} kcal`,
                        sub: "Energy Flux Target",
                        badge: `${Math.min(100, Math.round((total / targetGoal) * 100))}%`,
                      },
                      {
                        icon: Droplets,
                        theme: "cyan",
                        label: `${number(waterMl)} / 2,500 ml`,
                        sub: "Hydration Status",
                        badge: `${Math.min(100, Math.round((waterMl / 2500) * 100))}%`,
                      },
                      {
                        icon: Zap,
                        theme: "emerald",
                        label: "6-Day Streak",
                        sub: "Consistent Habit",
                        badge: "Active",
                      },
                    ].map((item) => (
                      <StaggerItem key={item.sub} variant="slideRight">
                        <div className="vitality-micro-item">
                          <div className={"vitality-micro-icon " + item.theme}>
                            <item.icon size={15} />
                          </div>
                          <div className="vitality-micro-info">
                            <b>{item.label}</b>
                            <small>{item.sub}</small>
                          </div>
                          <span className={"vitality-micro-badge " + item.theme}>
                            {item.badge}
                          </span>
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerWrap>
                </motion.div>
              </div>

              {/* Footer tags */}
              <motion.div
                className="sanctuary-hero-footer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <div className="sanctuary-footer-tag">
                  <ShieldCheck size={14} />
                  <span>Dedicated Clinician Supervised Protocol</span>
                </div>
                <div className="sanctuary-footer-tag">
                  <Leaf size={14} />
                  <span>Circadian Optimization & Whole Food Nutrition</span>
                </div>
              </motion.div>
            </motion.section>

            {/* =========================================================
                2. METABOLIC BENTO GRID
                ========================================================= */}
            <FadeUp delay={0.1}>
              <div>
                <div className="section-heading compact">
                  <div>
                    <span className="eyebrow">YOUR DAILY NUTRITION</span>
                    <h2>Today&apos;s Nutritional Balance</h2>
                  </div>
                  <motion.div whileHover={{ x: 3 }}>
                    <Link href="/diary" className="text-link">
                      Open full food diary
                      <ArrowRight size={15} />
                    </Link>
                  </motion.div>
                </div>

                <StaggerWrap className="stats-grid luxury-bento">
                  {/* Calorie Ring Card */}
                  <StaggerItem>
                    <AnimatedCard className="stat-card luxury-card calorie-card">
                      <div className="stat-top">
                        <span className="stat-title">Daily energy</span>
                        <motion.span
                          className="stat-badge-icon amber"
                          animate={{ rotate: [0, 10, -8, 0] }}
                          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                        >
                          <Flame size={16} />
                        </motion.span>
                      </div>

                      <div className="calorie-body">
                        <div className="calorie-meta">
                          <strong>
                            <CountUp value={total} />
                            <small>/ {number(targetGoal)} kcal</small>
                          </strong>
                          <div className="calorie-status-pill">
                            {total <= targetGoal ? (
                              <FloatingBadge className="status-on-track">
                                {number(targetGoal - total)} kcal remaining
                              </FloatingBadge>
                            ) : (
                              <FloatingBadge className="status-over">
                                +{number(total - targetGoal)} kcal over target
                              </FloatingBadge>
                            )}
                          </div>
                        </div>

                        <motion.div
                          className="calorie-conic-ring"
                          style={
                            {
                              "--fill-deg": `${Math.min(360, Math.round((total / targetGoal) * 360))}deg`,
                            } as React.CSSProperties
                          }
                          title={`${Math.round((total / targetGoal) * 100)}% of goal`}
                          whileHover={{ scale: 1.08 }}
                          transition={{ type: "spring", stiffness: 360, damping: 24 }}
                        >
                          <div className="conic-ring-inner">
                            <Flame size={20} className="pulse-icon" />
                          </div>
                        </motion.div>
                      </div>

                      <ProgressBar
                        percent={Math.min(100, Math.round((total / targetGoal) * 100))}
                        className="macro-line-fill amber-gradient"
                        style={{ height: "6px", borderRadius: "10px" }}
                      />
                    </AnimatedCard>
                  </StaggerItem>

                  {/* Macro Cards */}
                  {nutrients.map((n, i) => {
                    const targetMax = [100, 220, 65][i];
                    const percent = Math.min(100, Math.round((n.value / targetMax) * 100));
                    const themes = ["indigo", "amber", "emerald"];
                    const labels = ["Pure Protein", "Complex Carbs", "Beneficial Fats"];
                    const icons = [Zap, Flame, Leaf];
                    const IconComponent = icons[i];

                    return (
                      <StaggerItem key={n.name}>
                        <AnimatedCard className={"stat-card luxury-card macro-card " + themes[i]} delay={i * 0.06}>
                          <div className="stat-top">
                            <span className="stat-title">{labels[i]}</span>
                            <span className={"stat-badge-icon " + themes[i]}>
                              <IconComponent size={15} />
                            </span>
                          </div>

                          <div className="macro-metric">
                            <strong>
                              <CountUp value={n.value} />
                              <small> g</small>
                            </strong>
                            <FloatingBadge className={"macro-pill " + themes[i]}>
                              {percent}% target
                            </FloatingBadge>
                          </div>

                          <div className="macro-line-track">
                            <ProgressBar
                              percent={percent}
                              className={"macro-line-fill " + themes[i] + "-gradient"}
                            />
                          </div>

                          <div className="macro-footer-info">
                            <small>{targetMax}g daily target</small>
                            <small className="macro-rem">
                              {Math.max(0, targetMax - Math.round(n.value))}g to go
                            </small>
                          </div>
                        </AnimatedCard>
                      </StaggerItem>
                    );
                  })}
                </StaggerWrap>
              </div>
            </FadeUp>

            {/* =========================================================
                3. INTERACTIVE HYDRATION TRACKER
                ========================================================= */}
            <FadeUp delay={0.12}>
              <div className="hydration-strip panel luxury-panel">
                <div className="hydration-left">
                  <motion.div
                    className="hydration-icon-wrap"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                  >
                    <Droplets size={24} />
                  </motion.div>
                  <div className="hydration-text">
                    <div className="hydration-title-row">
                      <h3>Daily Cellular Hydration</h3>
                      <FloatingBadge className="hydration-status-tag">
                        {Math.round((waterMl / 2500) * 100)}% Reached
                      </FloatingBadge>
                    </div>
                    <p>
                      Adequate water intake accelerates metabolic clearance, enhances cognitive focus, and supports digestion.
                    </p>
                    <div className="hydration-progress-bar">
                      <ProgressBar
                        percent={Math.min(100, Math.round((waterMl / 2500) * 100))}
                        className="hydration-progress-fill"
                      />
                    </div>
                  </div>
                </div>

                <div className="hydration-actions-dock">
                  <div className="hydration-readout">
                    <motion.b
                      key={waterMl}
                      initial={{ scale: 1.2, color: "#0284c7" }}
                      animate={{ scale: 1, color: "#0369a1" }}
                      transition={{ duration: 0.35 }}
                    >
                      {number(waterMl)}
                    </motion.b>
                    <span>/ 2,500 ml</span>
                  </div>
                  <div className="hydration-buttons">
                    <AnimatedButton className="btn-water-quick" onClick={() => addWater(250)}>
                      <Plus size={14} />
                      <span>+250 ml</span>
                    </AnimatedButton>
                    <AnimatedButton className="btn-water-quick" onClick={() => addWater(500)}>
                      <Plus size={14} />
                      <span>+500 ml</span>
                    </AnimatedButton>
                    <AnimatedButton className="btn-water-reset" onClick={resetWater}>
                      <RotateCcw size={13} />
                    </AnimatedButton>
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* =========================================================
                4. 7-DAY CHART & COACH CONCIERGE
                ========================================================= */}
            <FadeUp delay={0.15}>
              <div className="dashboard-columns">
                {/* Chart Panel */}
                <AnimatedCard className="panel chart-panel luxury-panel" delay={0}>
                  <div className="section-heading">
                    <div>
                      <span className="eyebrow">METABOLIC ADHERENCE</span>
                      <h2>7-Day Balance & Consistency</h2>
                    </div>
                    <FloatingBadge className="pill gold-pill">
                      Goal: {number(targetGoal)} kcal / day
                    </FloatingBadge>
                  </div>

                  <Chart data={progress} goal={targetGoal} />

                  <div className="chart-legend-luxury">
                    <div className="legend-item">
                      <span className="legend-indicator fill" />
                      <span>Logged Daily Intake</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-indicator line" />
                      <span>Personalized Target ({number(targetGoal)} kcal)</span>
                    </div>
                  </div>
                </AnimatedCard>

                {/* Coach Concierge Suite */}
                <AnimatedCard className="next-session panel luxury-panel concierge-card" delay={0.06}>
                  <div className="concierge-card-badge">
                    <span className="eyebrow">PERSONAL CONCIERGE</span>
                    <FloatingBadge className="verified-shield">
                      <ShieldCheck size={14} />
                      <span>Verified Coach</span>
                    </FloatingBadge>
                  </div>

                  <h2>Your Next Coaching Touchpoint</h2>

                  {nextAppointment ? (
                    <div className="coach-booking-luxury">
                      <motion.div
                        className="coach-profile-row"
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                      >
                        <motion.span
                          className="avatar luxury-avatar"
                          whileHover={{ scale: 1.08, rotate: 5 }}
                        >
                          <Leaf size={24} />
                        </motion.span>
                        <div className="coach-info">
                          <b>Clinical Wellness Coach</b>
                          <small>1-on-1 Personalized Telehealth Session</small>
                          <span className="coach-tag">High Definition Video Consult</span>
                        </div>
                      </motion.div>

                      <motion.div
                        className="session-time-luxury"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.42 }}
                      >
                        <CalendarDays size={18} />
                        <span>{fmt(nextAppointment.starts_at)}</span>
                      </motion.div>

                      <StaggerWrap className="session-actions-luxury">
                        <StaggerItem>
                          <motion.div whileHover={{ y: -2, scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                            <Link className="btn primary luxury-btn wide" href="/sessions">
                              <Video size={16} />
                              <span>Join Private Telehealth Suite</span>
                            </Link>
                          </motion.div>
                        </StaggerItem>
                        <StaggerItem>
                          <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
                            <Link className="btn secondary luxury-btn-outline wide" href="/appointments">
                              <span>Reschedule or View Agenda</span>
                              <ArrowUpRight size={14} />
                            </Link>
                          </motion.div>
                        </StaggerItem>
                      </StaggerWrap>
                    </div>
                  ) : (
                    <div className="coach-empty-luxury">
                      <motion.div
                        className="coach-empty-icon"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                      >
                        <CalendarDays size={32} />
                      </motion.div>
                      <p>
                        Have questions about micronutrients, intermittent fasting, or exercise synergy?
                        Book an exclusive 30-minute check-in with your clinical coach.
                      </p>
                      <motion.div whileHover={{ y: -2, scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                        <Link href="/appointments" className="btn primary luxury-btn wide">
                          <span>Schedule Coaching Consultation</span>
                          <ArrowRight size={15} />
                        </Link>
                      </motion.div>
                    </div>
                  )}

                  <p className="concierge-fine-print">
                    <ShieldCheck size={13} />
                    <span>End-to-end encrypted private telehealth consultations.</span>
                  </p>
                </AnimatedCard>
              </div>
            </FadeUp>

            {/* =========================================================
                5. CURATED WELLNESS LIBRARY
                ========================================================= */}
            <FadeUp delay={0.18}>
              <section className="recommendations panel luxury-panel">
                <div className="section-heading">
                  <div>
                    <span className="eyebrow">CURATED LONGEVITY WISDOM</span>
                    <h2>Handpicked for Your Journey</h2>
                  </div>
                  <motion.div whileHover={{ x: 4 }}>
                    <Link href="/discover" className="text-link">
                      Explore entire wellness library
                      <ArrowRight size={16} />
                    </Link>
                  </motion.div>
                </div>
                {cards(content.slice(0, 3))}
              </section>
            </FadeUp>

            {/* =========================================================
                6. DAILY LONGEVITY WISDOM QUOTE
                ========================================================= */}
            <FadeUp delay={0.22}>
              <motion.div
                className="daily-wisdom-card"
                whileHover={{ scale: 1.01, boxShadow: "0 8px 30px rgba(180,130,80,0.12)" }}
              >
                <motion.div
                  className="wisdom-icon-box"
                  animate={{ rotate: [0, 8, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                >
                  
                </motion.div>
                <div className="wisdom-text">
                  <span className="wisdom-kicker">DAILY LONGEVITY RITUAL</span>
                  <blockquote>
                    &ldquo;Small, mindful choices repeated each day quietly compound into extraordinary health, vitality, and peace of mind.&rdquo;
                  </blockquote>
                  <cite>— ChatHeal Clinical Health Philosophy</cite>
                </div>
              </motion.div>
            </FadeUp>
          </div>
        </PageTransition>
      )}
    </>
  );
}
