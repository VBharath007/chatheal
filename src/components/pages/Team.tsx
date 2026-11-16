"use client";

import { GraduationCap, Heart, Leaf, Award, CheckCircle, Shield, Droplet, Activity, Sun, Moon, ArrowRight, Sparkles } from "lucide-react";
import { SectionHeading, FeatureCard, Action, Reveal, IconTile } from "@/components/design/GlassUI";
import SujithaHero from "@/components/store/SujithaHero";
import Link from "next/link";

export default function Team() {
  return (
    <main className="gl-page">
      {/* EXECUTIVE HERO BANNER */}
      <SujithaHero />

      {/* SUJITHA'S STORY & PROFILE SECTION */}
      <section className="gl-container gl-section gl-section-compact">
        <div className="gl-team-grid">
          <Reveal className="gl-glass gl-coach-profile">
            <div className="gl-profile-art">
              <div className="gl-profile-circle" style={{ overflow: "hidden", border: "2px solid #5ADE96" }}>
                <img
                  src="/images/sujitha_executive_portrait.jpeg"
                  alt="Sujitha - Founder of Chat Heal"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <Leaf className="gl-profile-leaf" size={120} strokeWidth={0.8} />
              <span className="gl-profile-label">FOUNDER & NUTRITIONIST</span>
            </div>

            <div className="gl-profile-body">
              <span className="gl-kicker" style={{ color: "#0d7261", fontWeight: 700 }}>
                FOUNDER · CHAT HEAL
              </span>
              <h2>Sujitha</h2>
              <p>Nutrition & Dietetics Practitioner</p>

              {/* EXACT QUALIFICATIONS FROM PPT */}
              <div className="gl-credentials" style={{ display: "flex", flexWrap: "wrap", gap: "8px", margin: "16px 0" }}>
                <span className="gl-pill" style={{ background: "#e2f2e7", color: "#1d684f", fontWeight: 700 }}>
                  <GraduationCap size={15} style={{ display: "inline", marginRight: "4px" }} /> PGND
                </span>
                <span className="gl-pill" style={{ background: "#f2f8f3", color: "#244c34", fontWeight: 600 }}>MPhil</span>
                <span className="gl-pill" style={{ background: "#f2f8f3", color: "#244c34", fontWeight: 600 }}>MBA</span>
                <span className="gl-pill" style={{ background: "#f2f8f3", color: "#244c34", fontWeight: 600 }}>MCA</span>
              </div>

              <p style={{ fontSize: "12px", color: "#647d76", lineHeight: "1.6", margin: "12px 0 20px" }}>
                *Credentials verified from official Chat Heal presentation: PGND (Nutrition & Dietetics), MPhil, MBA, MCA.
              </p>

              <Action href="/contact">Book a Consultation</Action>
            </div>
          </Reveal>

          <Reveal className="gl-coach-story">
            <span className="gl-kicker">PERSONALIZED NUTRITION PHILOSOPHY</span>
            <h2>
              "One Body.<br />
              <span>One Unique Health Plan."</span>
            </h2>
            <p className="gl-copy">
              Sujitha founded Chat Heal with the conviction that no two individuals have the same nutritional requirements. While standard diet charts treat people as numbers, her approach centers around understanding your personal daily life, food culture, stress patterns and internal biochemical signals.
            </p>
            <p className="gl-copy">
              Combining clinical nutrition principles (PGND) with systematic analytical rigor (MCA, MBA, MPhil), Sujitha evaluates the complete picture — from gut health and cellular hydration to natural detox routines and mindful eating.
            </p>

            <div className="gl-glass gl-coach-note" style={{ margin: "24px 0", padding: "20px", borderRadius: "16px" }}>
              <IconTile icon={Heart} tone="rose" />
              <div>
                <h3 style={{ fontSize: "16px", fontWeight: 700, margin: "0 0 6px" }}>Core Commitment</h3>
                <p style={{ fontSize: "14px", margin: 0, color: "var(--gl-muted)" }}>
                  "We don't give everyone the same diet plan. We listen first, understand your unique body, and craft a sustainable natural pathway to wellness."
                </p>
              </div>
            </div>

            <p className="gl-copy">
              Through compassionate 1-on-1 mentorship, Sujitha empowers clients to reverse detrimental habits, manage chronic metabolic challenges, and experience lasting cellular energy through the power of unadulterated food.
            </p>
          </Reveal>
        </div>
      </section>

      {/* AREAS OF FOCUS & WELLNESS GUIDANCE */}
      <section className="gl-soft-band">
        <div className="gl-container gl-section">
          <SectionHeading
            eyebrow="NUTRITION & WELLNESS GUIDANCE"
            title={<>Specialized Areas of Focus<br /><span>Guided Personally by Sujitha.</span></>}
            text="Evidence-informed, easy-to-follow whole-food nutrition and mindful lifestyle guidance designed for every stage of your life."
            centered
          />
          <div className="gl-guidance-grid">
            <Reveal className="gl-guidance-card">
              <div className="gl-guidance-img-wrap">
                <img
                  src="/images/biochemical_nutrition.jpg"
                  alt="Metabolic Health & Diabetes Nutrition"
                />
                <span className="gl-guidance-badge">Blood Sugar & Energy</span>
                <div style={{ position: "absolute", top: "12px", right: "12px", zIndex: 2 }}>
                  <IconTile icon={Activity} tone="green" small />
                </div>
              </div>
              <div className="gl-guidance-body">
                <div>
                  <div className="gl-guidance-chips">
                    <span className="gl-guidance-chip">✨ Normal Home Food</span>
                    <span className="gl-guidance-chip">🩺 Steady Glucose</span>
                    <span className="gl-guidance-chip">⚡ No Energy Crash</span>
                  </div>
                  <h3>Metabolic Health & Diabetes</h3>
                  <p>
                    Say goodbye to sudden sugar spikes and afternoon fatigue. Enjoy balanced home meals with complex fiber and smart timings that naturally stabilize insulin without starvation.
                  </p>
                </div>
                <Link href="/assessment" className="gl-guidance-link">
                  Start Your Guidance <ArrowRight size={15} />
                </Link>
              </div>
            </Reveal>

            <Reveal className="gl-guidance-card">
              <div className="gl-guidance-img-wrap">
                <img
                  src="/images/pillar2_hydration_detox.jpg"
                  alt="Natural Detox & Clean Hydration"
                />
                <span className="gl-guidance-badge">Organ Cleanse</span>
                <div style={{ position: "absolute", top: "12px", right: "12px", zIndex: 2 }}>
                  <IconTile icon={Droplet} tone="blue" small />
                </div>
              </div>
              <div className="gl-guidance-body">
                <div>
                  <div className="gl-guidance-chips">
                    <span className="gl-guidance-chip">🌿 Natural Flush</span>
                    <span className="gl-guidance-chip">💧 Anti-Bloating</span>
                    <span className="gl-guidance-chip">🍋 Kitchen Elixirs</span>
                  </div>
                  <h3>Detox & Cellular Renewal</h3>
                  <p>
                    No extreme juice fasts or synthetic powders. We use natural kitchen botanicals (ginger, mint, lemon, turmeric) to support your body's natural liver and kidney cleanse.
                  </p>
                </div>
                <Link href="/assessment" className="gl-guidance-link">
                  Start Your Guidance <ArrowRight size={15} />
                </Link>
              </div>
            </Reveal>

            <Reveal className="gl-guidance-card">
              <div className="gl-guidance-img-wrap">
                <img
                  src="/images/natural_wholefoods.jpg"
                  alt="Heart Health & Cholesterol Care"
                />
                <span className="gl-guidance-badge">Heart & Lipids</span>
                <div style={{ position: "absolute", top: "12px", right: "12px", zIndex: 2 }}>
                  <IconTile icon={Heart} tone="rose" small />
                </div>
              </div>
              <div className="gl-guidance-body">
                <div>
                  <div className="gl-guidance-chips">
                    <span className="gl-guidance-chip">❤️ Lower Bad LDL</span>
                    <span className="gl-guidance-chip">🫀 Clean Arteries</span>
                    <span className="gl-guidance-chip">🥑 Omega-3 Rich</span>
                  </div>
                  <h3>Lipid & Cardiovascular Care</h3>
                  <p>
                    Protect your heart naturally with anti-inflammatory foods, garlic, seeds, and soluble fiber that keep bad cholesterol (LDL) and triglycerides in healthy check.
                  </p>
                </div>
                <Link href="/assessment" className="gl-guidance-link">
                  Start Your Guidance <ArrowRight size={15} />
                </Link>
              </div>
            </Reveal>

            <Reveal className="gl-guidance-card">
              <div className="gl-guidance-img-wrap">
                <img
                  src="/images/steaming-bowl-bg.jpg"
                  alt="Thyroid & Hormonal Support"
                />
                <span className="gl-guidance-badge">Hormones & Thyroid</span>
                <div style={{ position: "absolute", top: "12px", right: "12px", zIndex: 2 }}>
                  <IconTile icon={Shield} tone="violet" small />
                </div>
              </div>
              <div className="gl-guidance-body">
                <div>
                  <div className="gl-guidance-chips">
                    <span className="gl-guidance-chip">⚖️ Hormone Reset</span>
                    <span className="gl-guidance-chip">🦋 Thyroid Boost</span>
                    <span className="gl-guidance-chip">💆‍♀️ Hair & Skin Vitality</span>
                  </div>
                  <h3>Thyroid, PCOD & Hormones</h3>
                  <p>
                    End sluggish metabolism, unexplained weight gain, and fatigue. Targeted zinc, selenium, and gut-nourishing whole foods that restore natural endocrine harmony.
                  </p>
                </div>
                <Link href="/assessment" className="gl-guidance-link">
                  Start Your Guidance <ArrowRight size={15} />
                </Link>
              </div>
            </Reveal>

            <Reveal className="gl-guidance-card">
              <div className="gl-guidance-img-wrap">
                <img
                  src="/images/fresh_harvest_board.jpg"
                  alt="Sustainable Weight Management"
                />
                <span className="gl-guidance-badge">Fat Loss & Fitness</span>
                <div style={{ position: "absolute", top: "12px", right: "12px", zIndex: 2 }}>
                  <IconTile icon={Sun} tone="amber" small />
                </div>
              </div>
              <div className="gl-guidance-body">
                <div>
                  <div className="gl-guidance-chips">
                    <span className="gl-guidance-chip">🔥 Burn Belly Fat</span>
                    <span className="gl-guidance-chip">🥗 Never Starve</span>
                    <span className="gl-guidance-chip">🎯 Lifelong Results</span>
                  </div>
                  <h3>Sustainable Weight Management</h3>
                  <p>
                    Tackle visceral fat through appetizing, nutrient-packed plates designed around your family cooking. Keep the weight off permanently without crash dieting.
                  </p>
                </div>
                <Link href="/assessment" className="gl-guidance-link">
                  Start Your Guidance <ArrowRight size={15} />
                </Link>
              </div>
            </Reveal>

            <Reveal className="gl-guidance-card">
              <div className="gl-guidance-img-wrap">
                <img
                  src="/images/pillar4_restorative_sleep.jpg"
                  alt="Restorative Sleep & Yoga Stamina"
                />
                <span className="gl-guidance-badge">Sleep & Stamina</span>
                <div style={{ position: "absolute", top: "12px", right: "12px", zIndex: 2 }}>
                  <IconTile icon={Moon} tone="orange" small />
                </div>
              </div>
              <div className="gl-guidance-body">
                <div>
                  <div className="gl-guidance-chips">
                    <span className="gl-guidance-chip">😴 8-Hour Deep Sleep</span>
                    <span className="gl-guidance-chip">🧘‍♀️ Stress Release</span>
                    <span className="gl-guidance-chip">🌅 Wake Up Energized</span>
                  </div>
                  <h3>Sleep, Yoga & Daily Stamina</h3>
                  <p>
                    Circadian rhythm alignment, calming evening wind-downs, and gentle joint-mobility yoga stretches so you fall asleep peacefully and wake up revitalized every morning.
                  </p>
                </div>
                <Link href="/assessment" className="gl-guidance-link">
                  Start Your Guidance <ArrowRight size={15} />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="gl-container gl-section">
        <Reveal className="gl-cta">
          <div>
            <span className="gl-kicker">WORK DIRECTLY WITH SUJITHA</span>
            <h2>Take the First Step Toward<br /><span>A Healthier You.</span></h2>
            <p>Schedule your 1-on-1 intake assessment with Sujitha and receive a nutrition plan tailored to your body.</p>
          </div>
          <div className="gl-cta-actions">
            <Action href="/assessment">BOOK NOW</Action>
            <Link href="/contact" style={{ color: "#365c3e", fontWeight: 650 }}>Ask a question</Link>
          </div>
          <Leaf className="gl-cta-decoration" size={190} strokeWidth={0.7} aria-hidden="true" />
        </Reveal>
      </section>
    </main>
  );
}
