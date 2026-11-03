"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Flame,
  Leaf,
  Sparkles,
  TrendingUp,
  Video,
} from "lucide-react";
import {
  PageTransition,
  FadeUp,
  StaggerWrap,
  StaggerItem,
  CountUp,
  motion,
} from "../motion";

import { usePortal } from "../portal-context";
import { Chart, Empty } from "../ui";

const fmt = (s: string) =>
  new Date(s).toLocaleString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
const number = (n: number) => Math.round(n || 0).toLocaleString("en-IN");

export default function ProgressScreen() {
  const { admin, section, progress, appointments, goal } = usePortal();

  const nextAppointment = appointments.find((a) => a.status === "confirmed");

  return (
    <>
      {((section === "overview" && !admin) || section === "progress") && (
        <PageTransition>
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Milestone Metrics Ribbon */}
            <StaggerWrap className="stats-grid">
              <StaggerItem>
                <motion.div
                  className="stat-card"
                  whileHover={{ y: -4, boxShadow: "0 14px 28px -6px rgba(13,114,97,0.14)" }}
                >
                  <div className="stat-top">
                    <span>Daily Target Budget</span>
                    <Flame size={17} style={{ color: "var(--accent-amber)" }} />
                  </div>
                  <strong style={{ color: "var(--primary)" }}>
                    <CountUp value={goal} /> <small>kcal</small>
                  </strong>
                  <small>Prescribed by your wellness coach</small>
                </motion.div>
              </StaggerItem>

              <StaggerItem>
                <motion.div
                  className="stat-card"
                  whileHover={{ y: -4, boxShadow: "0 14px 28px -6px rgba(13,114,97,0.14)" }}
                >
                  <div className="stat-top">
                    <span>Weekly Adherence</span>
                    <TrendingUp size={17} style={{ color: "var(--primary)" }} />
                  </div>
                  <strong style={{ color: "#059669" }}>Consistent</strong>
                  <small>Consistent logging over past 7 days</small>
                </motion.div>
              </StaggerItem>

              <StaggerItem>
                <motion.div
                  className="stat-card"
                  whileHover={{ y: -4, boxShadow: "0 14px 28px -6px rgba(13,114,97,0.14)" }}
                >
                  <div className="stat-top">
                    <span>Mindful Habit Streak</span>
                    
                  </div>
                  <strong style={{ color: "var(--primary)" }}>
                    7 <small>Days Active</small>
                  </strong>
                  <small>Building sustainable daily routines</small>
                </motion.div>
              </StaggerItem>

              <StaggerItem>
                <motion.div
                  className="stat-card"
                  whileHover={{ y: -4, boxShadow: "0 14px 28px -6px rgba(13,114,97,0.14)" }}
                >
                  <div className="stat-top">
                    <span>Coach Guidance</span>
                    <CheckCircle2 size={17} style={{ color: "var(--primary)" }} />
                  </div>
                  <strong style={{ color: "var(--ink)" }}>Connected</strong>
                  <small>1-on-1 check-ins available</small>
                </motion.div>
              </StaggerItem>
            </StaggerWrap>

            {/* 7-Day Chart & Next Check-in */}
            <div className="dashboard-columns">
              <FadeUp delay={0.15} as="section" className="panel chart-panel">
                <div className="section-heading">
                  <div>
                    <span className="eyebrow">CONSISTENCY OVER PERFECTION</span>
                    <h2>Your 7-Day Week in Balance</h2>
                  </div>
                  <span className="pill">Daily Target: {number(goal)} kcal</span>
                </div>

                <Chart data={progress} goal={goal} />

                <p className="chart-caption">
                  <span className="legend-dot" /> Daily calories logged{" "}
                  <span className="legend-line" /> Coach-approved daily target
                </p>
              </FadeUp>

              <FadeUp delay={0.25} as="section" className="next-session panel">
                <div className="section-heading">
                  <span className="eyebrow">COACHING CONNECTION</span>
                  <Video size={18} style={{ color: "var(--primary)" }} />
                </div>
                <h2>Your Next Check-in</h2>

                {nextAppointment ? (
                  <>
                    <motion.div
                      className="coach-person"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <span
                        className="avatar large"
                        style={{
                          background: "linear-gradient(135deg, #dcfce7, #bbf7d0)",
                        }}
                      >
                        <Leaf size={24} style={{ color: "var(--primary)" }} />
                      </span>
                      <div>
                        <b>Your Wellness Coach</b>
                        <small>Personal 1-on-1 Consultation</small>
                      </div>
                    </motion.div>
                    <div className="session-time">
                      <CalendarDays size={18} />
                      <span>{fmt(nextAppointment.starts_at)}</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        flexDirection: "column",
                      }}
                    >
                      <Link className="btn primary wide" href="/sessions">
                        <Video size={15} /> Join Live Telehealth Room
                      </Link>
                      <Link className="btn secondary wide" href="/appointments">
                        View Appointment
                        <ArrowUpRight size={15} />
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <p
                      style={{
                        margin: "18px 0",
                        color: "var(--muted)",
                        lineHeight: "1.7",
                      }}
                    >
                      Have questions about your nutritional progress or daily
                      energy? Book a dedicated 30-minute check-in with your
                      wellness coach.
                    </p>
                    <Link href="/appointments" className="btn primary wide">
                      Book a Check-in
                      <ArrowRight size={16} />
                    </Link>
                  </>
                )}
                <p
                  className="fine-print"
                  style={{ textAlign: "center", marginTop: "16px" }}
                >
                  One conversation. Greater clarity and sustainable motivation.
                </p>
              </FadeUp>
            </div>
          </div>
        </PageTransition>
      )}
    </>
  );
}
