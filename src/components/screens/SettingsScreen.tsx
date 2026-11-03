"use client";

import {
  BadgeCheck,
  Check,
  Globe,
  Lock,
  ShieldCheck,
  User,
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
import { Field } from "../ui";

export default function SettingsScreen() {
  const {
    admin,
    section,
    user,
    setUser,
    busy,
    setBusy,
    setError,
    setNotice,
    form,
    call,
    update,
  } = usePortal();

  return (
    <>
      {section === "settings" && (
        <PageTransition>
          <StaggerWrap className="settings-grid">
            {/* Member Profile Settings */}
            <StaggerItem>
              <section className="panel">
                <div className="section-heading" style={{ marginBottom: "20px" }}>
                  <div>
                    <span className="eyebrow">PERSONAL PROFILE</span>
                    <h2>Your Account & Preferences</h2>
                  </div>
                </div>

                {/* Avatar Preview */}
                <motion.div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "16px 20px",
                    background: "linear-gradient(135deg, #f0f8f4 0%, #e6f5ec 100%)",
                    border: "1px solid rgba(13, 114, 97, 0.15)",
                    borderRadius: "var(--radius-md)",
                    marginBottom: "24px",
                  }}
                  whileHover={{ scale: 1.01 }}
                >
                  <motion.span
                    className="avatar large"
                    style={{ width: "52px", height: "52px", fontSize: "20px" }}
                    whileHover={{ scale: 1.08, rotate: 4 }}
                  >
                    {user.name.slice(0, 1)}
                  </motion.span>
                  <div>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: "6px" }}
                    >
                      <b style={{ fontSize: "16px", color: "var(--ink)" }}>
                        {user.name}
                      </b>
                      <BadgeCheck size={18} style={{ color: "var(--primary)" }} />
                    </div>
                    <small style={{ color: "var(--primary)", fontWeight: 600 }}>
                      Active Wellness Member
                    </small>
                    <div
                      style={{
                        fontSize: "11px",
                        color: "var(--muted)",
                        marginTop: "2px",
                      }}
                    >
                      Guided by: ChatHeal Certified Health Coaches
                    </div>
                  </div>
                </motion.div>

                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setBusy(true);
                    try {
                      const u = await call("/profile", "PATCH", {
                        name: form.name || user.name,
                      });
                      setUser(u);
                      setNotice("Your profile details have been saved");
                    } catch (e) {
                      setError((e as Error).message);
                    } finally {
                      setBusy(false);
                    }
                  }}
                >
                  <Field label="Full Name" hint="How your coach addresses you">
                    <input
                      defaultValue={user.name}
                      required
                      minLength={2}
                      placeholder="Your full name"
                      onChange={(e) => update("name", e.target.value)}
                    />
                  </Field>

                  <Field
                    label="Registered Email"
                    hint="Used for sign in and session reminders"
                  >
                    <input
                      value={user.email}
                      disabled
                      style={{ background: "#f8faf9", color: "var(--muted)" }}
                    />
                  </Field>

                  <Field label="Account Type">
                    <input
                      value="Personal Wellness Portal (Member Access)"
                      disabled
                      style={{ background: "#f8faf9", color: "var(--muted)" }}
                    />
                  </Field>

                  <AnimatedButton
                    className="btn primary"
                    disabled={busy}
                    style={{ marginTop: "12px" }}
                    type="submit"
                  >
                    {busy ? "Saving…" : "Save Profile Details"}
                    <Check size={16} />
                  </AnimatedButton>
                </form>
              </section>
            </StaggerItem>

            {/* Privacy & Trust Card */}
            <StaggerItem>
              <section className="panel settings-note">
                <motion.div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: "rgba(13, 114, 97, 0.12)",
                    color: "var(--primary)",
                    display: "grid",
                    placeItems: "center",
                    marginBottom: "16px",
                  }}
                  animate={{ y: [0, -3, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                >
                  <ShieldCheck size={28} />
                </motion.div>

                <span className="eyebrow">YOUR PEACE OF MIND</span>
                <h2>Your Wellness, Thoughtfully Handled</h2>

                <p>
                  <strong>Private & Confidential:</strong> Your food diary entries,
                  caloric goals, and consultation notes are strictly visible only to
                  you and your assigned wellness coach. Other members cannot view
                  your activity.
                </p>

                <p>
                  <strong>Personalized Portioning:</strong> Calorie estimates are
                  tailored to standard nutritional databases. Your coach will
                  periodically review your portions and goals to keep you feeling
                  energized.
                </p>

                <div
                  style={{
                    marginTop: "24px",
                    paddingTop: "18px",
                    borderTop: "1px solid rgba(13, 114, 97, 0.15)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    fontSize: "12px",
                    color: "var(--muted)",
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: "8px" }}
                  >
                    <Lock size={14} style={{ color: "var(--primary)" }} />
                    <span>Encrypted Health Records</span>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: "8px" }}
                  >
                    <Globe size={14} style={{ color: "var(--primary)" }} />
                    <span>Automatic Local Timezone Adjustments</span>
                  </div>
                </div>

                <p className="fine-print">
                  Need to change your email or update your health plan? Message your
                  coach directly in your next session.
                </p>
              </section>
            </StaggerItem>
          </StaggerWrap>
        </PageTransition>
      )}
    </>
  );
}
