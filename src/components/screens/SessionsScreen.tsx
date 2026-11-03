"use client";

import Link from "next/link";
import {
  CalendarDays,
  Camera,
  CheckCircle2,
  Clock,
  Mic,
  ShieldCheck,
  Video,
} from "lucide-react";
import {
  PageTransition,
  FadeUp,
  StaggerWrap,
  StaggerItem,
  AnimatedButton,
  motion,
} from "../motion";

import { usePortal } from "../portal-context";
import { Empty } from "../ui";

const fmt = (s: string) =>
  new Date(s).toLocaleString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });

export default function SessionsScreen() {
  const { admin, section, setError, sessions, setModal, setJoinUrl, call } =
    usePortal();

  return (
    <>
      {section === "sessions" && (
        <PageTransition>
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Member Telehealth Banner */}
            <FadeUp className="session-banner">
              <motion.span
                className="video-symbol"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              >
                <Video size={36} />
              </motion.span>
              <div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "7px",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--primary)",
                    marginBottom: "8px",
                  }}
                >
                  <motion.span
                    animate={{ scale: [1, 1.35, 1], opacity: [1, 0.7, 1] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#10b981",
                      boxShadow: "0 0 0 3px rgba(16, 185, 129, 0.2)",
                      display: "inline-block",
                    }}
                  />
                  ONE-TO-ONE COACHING CLINIC
                </div>
                <h2>A Real Conversation. A Fresh Perspective.</h2>
                <p>Personal video conversations with your wellness coach.</p>
              </div>
            </FadeUp>

            {/* Diagnostics & Trust Strip */}
            <FadeUp delay={0.1}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "14px",
                  padding: "14px 22px",
                  background: "#ffffff",
                  border: "1px solid var(--line)",
                  borderRadius: "var(--radius-md)",
                  boxShadow: "var(--shadow-xs)",
                  fontSize: "12px",
                  color: "var(--muted)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "18px",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      color: "#059669",
                      fontWeight: 600,
                    }}
                  >
                    <CheckCircle2 size={15} /> Browser Video & Mic Ready
                  </span>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <Camera size={14} /> 1080p HD Video
                  </span>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <ShieldCheck size={14} style={{ color: "var(--primary)" }} />{" "}
                    End-to-End Encrypted Session
                  </span>
                </div>
                <span style={{ fontSize: "11px", fontWeight: 500 }}>
                  No extra apps required • Works directly in your browser
                </span>
              </div>
            </FadeUp>

            {/* Sessions Grid */}
            <StaggerWrap className="content-grid">
              {sessions.map((s) => (
                <StaggerItem key={s.id}>
                  <motion.section
                    className="panel live-card"
                    whileHover={{
                      y: -4,
                      boxShadow: "0 20px 40px -8px rgba(13,114,97,0.18)",
                    }}
                  >
                    <div
                      className="section-heading"
                      style={{ marginBottom: "12px" }}
                    >
                      <span
                        className="pill"
                        style={{ fontWeight: 700, fontSize: "10px" }}
                      >
                        PERSONAL SESSION
                      </span>
                      <div
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "8px",
                          background: "var(--primary-light)",
                          color: "var(--primary)",
                          display: "grid",
                          placeItems: "center",
                        }}
                      >
                        <Video size={16} />
                      </div>
                    </div>

                    <h2
                      style={{
                        fontSize: "18px",
                        color: "var(--ink)",
                        margin: "8px 0",
                      }}
                    >
                      {s.title}
                    </h2>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        color: "var(--primary)",
                        fontWeight: 600,
                        fontSize: "13px",
                        margin: "4px 0 10px",
                      }}
                    >
                      <CalendarDays size={15} />
                      <span>{fmt(s.starts_at)}</span>
                    </div>

                    <p
                      className="muted"
                      style={{ fontSize: "12px", marginBottom: "18px" }}
                    >
                      <Clock
                        size={13}
                        style={{
                          display: "inline",
                          marginRight: "4px",
                          verticalAlign: "middle",
                        }}
                      />
                      {s.minutes} minutes · 1-on-1 personal check-in
                    </p>

                    <AnimatedButton
                      className="btn primary wide"
                      onClick={async () => {
                        try {
                          const result = await call(
                            "/live-sessions/" + s.id + "/join",
                          );
                          setJoinUrl(result.url);
                          setModal("join");
                        } catch (e) {
                          setError((e as Error).message);
                        }
                      }}
                    >
                      <Camera size={16} />
                      Join Live Room
                    </AnimatedButton>

                    <small
                      style={{ marginTop: "12px", color: "var(--muted-light)" }}
                    >
                      Room access opens 10 minutes prior to session
                    </small>
                  </motion.section>
                </StaggerItem>
              ))}
            </StaggerWrap>

            {!sessions.length && (
              <FadeUp delay={0.2}>
                <div
                  style={{
                    textAlign: "center",
                    padding: "48px 20px",
                    background: "#ffffff",
                    borderRadius: "var(--radius-xl)",
                    border: "1px solid var(--line)",
                  }}
                >
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                  >
                    <Video
                      size={36}
                      style={{
                        color: "var(--primary)",
                        opacity: 0.6,
                        margin: "0 auto 12px",
                      }}
                    />
                  </motion.div>
                  <h3
                    style={{
                      fontSize: "17px",
                      color: "var(--ink)",
                      marginBottom: "8px",
                    }}
                  >
                    A conversation to look forward to
                  </h3>
                  <p
                    style={{
                      color: "var(--muted)",
                      fontSize: "13px",
                      maxWidth: "380px",
                      margin: "0 auto 20px",
                    }}
                  >
                    Scheduled one-to-one video consultations with your wellness
                    coach will appear right here.
                  </p>
                  <Link href="/appointments" className="btn primary">
                    Book a Check-in with Coach
                  </Link>
                </div>
              </FadeUp>
            )}
          </div>
        </PageTransition>
      )}
    </>
  );
}
