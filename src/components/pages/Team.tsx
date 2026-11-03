"use client";

import { GraduationCap, Heart, Leaf, MessageCircle, CalendarDays } from "lucide-react";
import { SectionHeading, FeatureCard, CTA, Action, Reveal, IconTile } from "@/components/design/GlassUI";
import SujithaHero from "@/components/store/SujithaHero";

export default function Team() {
  return (
    <main className="gl-page">
      {/* ========================================================
          EXECUTIVE HERO BANNER (MATCHES REFERENCE 1b143854)
          Accent Color: #5ADE96
          ======================================================== */}
      <SujithaHero />

      {/* ========================================================
          SUJITHA'S STORY & PROFILE SECTION
          ======================================================== */}
      <section className="gl-container gl-section gl-section-compact">
        <div className="gl-team-grid">
          <Reveal className="gl-glass gl-coach-profile">
            <div className="gl-profile-art">
              <div className="gl-profile-circle" style={{ overflow: "hidden", border: "2px solid #5ADE96" }}>
                <img
                  src="/images/sujitha_executive_portrait.jpg"
                  alt="Sujitha C."
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
              <Leaf className="gl-profile-leaf" size={120} strokeWidth={0.8} />
              <span className="gl-profile-label">YOUR WELLNESS COMPANION</span>
            </div>

            <div className="gl-profile-body">
              <span className="gl-kicker" style={{ color: "#0d7261", fontWeight: 700 }}>
                FOUNDER · CHATHEAL
              </span>
              <h2>Sujitha C.</h2>
              <p>Nutrition & Dietetics</p>
              <div className="gl-credentials">
                <span>
                  <GraduationCap size={16} /> PGND
                </span>
                <span>MPhil</span>
                <span>MBA</span>
                <span>MCA</span>
              </div>
              <Action href="/contact">Start a conversation</Action>
            </div>
          </Reveal>

          <Reveal className="gl-coach-story">
            <span className="gl-kicker">A PERSONAL APPROACH</span>
            <h2>
              Every journey starts
              <br />
              <span>with being heard.</span>
            </h2>
            <p>
              Sujitha C. founded ChatHeal with a focus on natural nutrition, personal wellness and lifelong wellbeing.
            </p>
            <p>
              Her approach begins with understanding your unique rhythm: everyday routines, food preferences, family
              traditions and the goals you want to work towards.
            </p>
            <div className="gl-glass gl-coach-note">
              <IconTile icon={Heart} tone="rose" />
              <div>
                <h3>Care for your whole everyday</h3>
                <p>Personal guidance that connects nourishment, habits and thoughtful support.</p>
              </div>
            </div>
            <p>
              Through individual whole-food plans, daily awareness and regular check-ins, ChatHeal supports small
              choices that can become part of a lasting routine.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ========================================================
          YOUR CONNECTION WITH CHATHEAL
          ======================================================== */}
      <section className="gl-soft-band">
        <div className="gl-container gl-section">
          <SectionHeading
            eyebrow="YOUR CONNECTION WITH CHATHEAL"
            title={
              <>
                A little guidance.
                <br />
                <span>A lot of listening.</span>
              </>
            }
            centered
          />
          <div className="grid gap-6 md:grid-cols-3">
            <FeatureCard icon={MessageCircle} tone="blue" title="Talk about your goals">
              Bring your questions and preferences to a personal conversation.
            </FeatureCard>
            <FeatureCard icon={Leaf} title="Make food feel simpler">
              Explore whole-food routines that fit your culture and everyday life.
            </FeatureCard>
            <FeatureCard icon={CalendarDays} tone="violet" title="Stay connected">
              Members can manage consultations and check-ins through their wellness space.
            </FeatureCard>
          </div>
        </div>
      </section>

      <CTA />
    </main>
  );
}
