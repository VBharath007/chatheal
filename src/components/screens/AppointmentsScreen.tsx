"use client";

import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Heart,
  Plus,
  ShieldCheck,
  Video,
} from "lucide-react";
import {
  PageTransition,
  FadeUp,
  StaggerWrap,
  StaggerItem,
  AnimatedButton,
  FloatingBadge,
  motion,
  AnimatePresence,
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

export default function AppointmentsScreen() {
  const { admin, section, appointments, slots, open } = usePortal();

  const confirmedAppointments = appointments.filter(
    (a) => a.status === "confirmed",
  );

  return (
    <>
      {section === "appointments" && (
        <PageTransition>
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Member Consultation Banner */}
            <FadeUp
              className="discovery-banner"
              style={{
                background: "linear-gradient(135deg, #eef7f3 0%, #e2eff5 100%)",
              }}
            >
              <div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--primary)",
                    marginBottom: "8px",
                  }}
                >
                  <Heart size={14} />
                  PERSONAL COACHING APPOINTMENTS
                </div>
                <h2>Make Time for Yourself</h2>
                <p>
                  Reserve a dedicated 30-minute check-in with your wellness coach.
                  Align your dietary routine, celebrate weekly wins, and get
                  answers to your questions.
                </p>
              </div>
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              >
                <CalendarDays
                  size={72}
                  strokeWidth={1.2}
                  style={{ color: "var(--primary)", opacity: 0.75 }}
                />
              </motion.div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="booking-layout">
                {/* Left: Available Slots to Book */}
                <section className="panel">
                  <div className="section-heading">
                    <div>
                      <span className="eyebrow">CHOOSE A TIME</span>
                      <h2>Available Coaching Slots</h2>
                    </div>
                    <FloatingBadge className="pill">
                      {slots.length} Slots Open
                    </FloatingBadge>
                  </div>

                  <p className="muted" style={{ marginBottom: "20px" }}>
                    Select any open slot below to confirm your personal check-in.
                    All times are displayed in your local timezone.
                  </p>

                  <StaggerWrap className="slots">
                    {slots.slice(0, 21).map((s) => {
                      const d = new Date(s.starts_at);
                      return (
                        <StaggerItem key={s.id}>
                          <motion.button
                            className="slot"
                            whileHover={{ y: -3, scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() =>
                              open("booking", {
                                slot_id: s.id,
                                note: "",
                                starts_at: s.starts_at,
                              })
                            }
                          >
                            <div
                              style={{
                                width: "32px",
                                height: "32px",
                                borderRadius: "8px",
                                background: "var(--primary-light)",
                                color: "var(--primary)",
                                display: "grid",
                                placeItems: "center",
                                marginBottom: "2px",
                              }}
                            >
                              <CalendarDays size={16} />
                            </div>
                            <b>
                              {d.toLocaleDateString("en-IN", {
                                weekday: "short",
                                day: "numeric",
                                month: "short",
                              })}
                            </b>
                            <span>
                              {d.toLocaleTimeString("en-IN", {
                                hour: "numeric",
                                minute: "2-digit",
                              })}
                            </span>
                            <small
                              className="pill"
                              style={{ fontSize: "10px", padding: "2px 8px" }}
                            >
                              {s.minutes} min check-in
                            </small>
                          </motion.button>
                        </StaggerItem>
                      );
                    })}
                  </StaggerWrap>

                  {!slots.length && (
                    <Empty
                      title="More coaching slots coming soon"
                      text="Your wellness coach will publish new availability slots here shortly."
                    />
                  )}
                </section>

                {/* Right: Confirmed Appointments */}
                <section className="panel">
                  <div className="section-heading">
                    <div>
                      <span className="eyebrow">YOUR SCHEDULE</span>
                      <h2>Your Bookings</h2>
                    </div>
                    <FloatingBadge className="pill amber">
                      {confirmedAppointments.length} Confirmed
                    </FloatingBadge>
                  </div>

                  {appointments.length ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                      }}
                    >
                      <AnimatePresence mode="popLayout">
                        {appointments.map((a) => (
                          <motion.div
                            key={a.id}
                            className="appointment-card"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -20, height: 0 }}
                            transition={{ duration: 0.35 }}
                            whileHover={{ y: -2 }}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <span
                                className={
                                  "pill " + (a.status === "confirmed" ? "" : "grey")
                                }
                                style={{
                                  fontWeight: 700,
                                  textTransform: "capitalize",
                                }}
                              >
                                {a.status === "confirmed" && (
                                  <CheckCircle2 size={12} />
                                )}
                                {a.status}
                              </span>
                              <span
                                style={{ fontSize: "11px", color: "var(--muted)" }}
                              >
                                1-on-1 Check-in
                              </span>
                            </div>

                            <h3>Wellness Check-in with Coach</h3>

                            <p>
                              <Clock size={15} style={{ color: "var(--primary)" }} />
                              {fmt(a.starts_at)}
                            </p>

                            <small>
                              &ldquo;
                              {a.note ||
                                "A calm space to talk about your routine, questions, or a recent win."}
                              &rdquo;
                            </small>

                            {a.status === "confirmed" && (
                              <div
                                className="inline-actions"
                                style={{ marginTop: "12px" }}
                              >
                                <AnimatedButton
                                  className="btn secondary"
                                  style={{ padding: "6px 14px", fontSize: "11px" }}
                                  onClick={() => open("reschedule", a)}
                                >
                                  Reschedule
                                </AnimatedButton>
                                <AnimatedButton
                                  className="btn danger"
                                  style={{ padding: "6px 14px", fontSize: "11px" }}
                                  onClick={() => open("cancel", a)}
                                >
                                  Cancel Appointment
                                </AnimatedButton>
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Empty
                      title="Your next step awaits"
                      text="Select an available time slot on the left to schedule your next wellness conversation."
                    />
                  )}
                </section>
              </div>
            </FadeUp>
          </div>
        </PageTransition>
      )}
    </>
  );
}
