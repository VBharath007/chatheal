"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Leaf, 
  Heart, 
  Check, 
  Activity, 
  Sparkles, 
  ArrowUpRight, 
  Droplet, 
  Sun, 
  Moon, 
  Flame, 
  ShieldCheck, 
  Zap, 
  Clock, 
  Smile, 
  Dna, 
  GlassWater,
  FileText,
  UserCheck,
  Award,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { programmes } from "@/lib/catalog";
import { Action, FeatureCard, IconTile, Reveal, SectionHeading } from "@/components/design/GlassUI";
import { ProgrammeCard } from "@/components/design/ProgrammeCard";

export default function Home() {
  const steps = [
    {
      num: "01",
      title: "Initial Assessment",
      desc: "Gather relevant information about your current health, nutrition, lifestyle habits and daily routine.",
      image: "/images/stage1_assessment_clean.jpg"
    },
    {
      num: "02",
      title: "Understanding Client Needs",
      desc: "Understand your personal wellness goals, individual food culture, schedule and dietary preferences.",
      image: "/images/stage2_client_needs_clean.jpg"
    },
    {
      num: "03",
      title: "Health & Nutrition Review",
      desc: "Review your available health background, biomarkers and nutritional indicators thoroughly.",
      image: "/images/stage3_health_review_clean.jpg"
    },
    
  ];

  return (
    <main className="gl-page">
      {/* SECTION 1: HERO */}
      <section className="gl-home-hero gl-container"><Reveal className="gl-home-copy"><span className="gl-pill"><Leaf size={15} /> NUTRITION, WITH A PERSONAL TOUCH</span><h1>A healthier life.<br />A happier you.<br /><span>One little step.</span></h1><p>Real food. Thoughtful guidance. A wellness journey that feels like you — with someone in your corner, every step of the way.</p><div className="gl-actions"><Action href="/assessment">Start your journey</Action><Action href="/packages" secondary>Care Packages</Action></div><div className="gl-coach-mini"><span className="gl-avatar">SC</span><div><strong>Personal guidance by Sujitha C.</strong><small>Nutrition & Dietetics · Founder, ChatHeal</small></div><span className="gl-mini-check"><Check size={17} /></span></div></Reveal>
            <Reveal className="gl-home-art"><div className="gl-hero-orbit" /><img className="gl-home-photo" src="/images/hero.jpg" alt="A colourful plate of wholesome food" /><div className="gl-float-card gl-float-top"><IconTile icon={Heart} tone="rose" small /><div><strong>Care that feels personal</strong><small>Built around your everyday.</small></div></div><div className="gl-float-card gl-float-bottom"><IconTile icon={Leaf} small /><div><strong>Real food. Real balance.</strong><small>Nourishment, made simple.</small></div><span className="gl-spark"><Sparkles size={21} /></span></div><span className="gl-photo-edge">GOOD FOOD. BETTER DAYS.</span></Reveal></section>

      {/* SECTION 2: NUTRITION & WELLNESS GUIDANCE */}
      {/* <section className="gl-container gl-section" style={{ paddingBlock: "50px" }}>
        <SectionHeading
          eyebrow="NUTRITION & WELLNESS GUIDANCE"
          title={<>We Don't Give Everyone<br /><span>The Same Diet Plan.</span></>}
          text="Simple, everyday whole-food guidance crafted specifically for your body, kitchen, and lifestyle — easy to understand, easy to follow, and made to last."
          centered
        />
        <div className="grid gap-6 md:grid-cols-3">
          
          <Reveal className="gl-wellness-card">
            <div className="gl-card-img-wrap">
              <img
                src="/images/biochemical_nutrition.jpg"
                alt="Personalized clinical biochemical nutrition ingredients"
              />
              <span className="gl-card-badge gl-card-badge-green">
                <UserCheck size={14} strokeWidth={2.5} />
                <span>Cellular Precision</span>
              </span>
            </div>
            <div className="gl-card-content">
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "12px" }}>
                <span className="gl-guidance-chip">🧬 100% Personal</span>
                <span className="gl-guidance-chip">🩺 Blood Sugar Care</span>
                <span className="gl-guidance-chip">✨ Zero Copy-Paste</span>
              </div>
              <h3 style={{ fontSize: "19px", fontWeight: 750, color: "#133829", margin: "0 0 10px" }}>
                Biochemically Unique
              </h3>
              <p style={{ fontSize: "14px", lineHeight: "1.75", color: "#546e61", margin: 0 }}>
                Every body processes carbohydrates, fats, and minerals differently. We analyze your health markers and design a plan matching your exact metabolism.
              </p>
              <div style={{ marginTop: "20px", paddingTop: "14px", borderTop: "1px solid #e5ede7" }}>
                <Link
                  href="/assessment"
                  className="gl-button"
                  style={{
                    width: "100%",
                    minHeight: "42px",
                    padding: "10px 18px",
                    fontSize: "13.5px",
                    fontWeight: 700,
                    borderRadius: "12px",
                    gap: "8px"
                  }}
                >
                  Start Your Journey <ArrowUpRight size={15} />
                </Link>
              </div>
            </div>
          </Reveal>

          
          <Reveal className="gl-wellness-card">
            <div className="gl-card-img-wrap">
              <img
                src="/images/natural_wholefoods.jpg"
                alt="Fresh wholesome natural greens, avocado, berries and whole foods"
              />
              <span className="gl-card-badge gl-card-badge-rose">
                <Leaf size={14} strokeWidth={2.5} />
                <span>Pure Whole Food</span>
              </span>
            </div>
            <div className="gl-card-content">
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "12px" }}>
                <span className="gl-guidance-chip">🥗 Real Kitchen Food</span>
                <span className="gl-guidance-chip">🚫 No Powder Fads</span>
                <span className="gl-guidance-chip">🥑 Nutrient Rich</span>
              </div>
              <h3 style={{ fontSize: "19px", fontWeight: 750, color: "#133829", margin: "0 0 10px" }}>
                Natural Whole Foods
              </h3>
              <p style={{ fontSize: "14px", lineHeight: "1.75", color: "#546e61", margin: 0 }}>
                No synthetic supplements, starvation cleanses, or expensive superfoods. We harness the healing power of everyday local ingredients, kitchen herbs, and pure hydration.
              </p>
              <div style={{ marginTop: "20px", paddingTop: "14px", borderTop: "1px solid #e5ede7" }}>
                <Link
                  href="/assessment"
                  className="gl-button"
                  style={{
                    width: "100%",
                    minHeight: "42px",
                    padding: "10px 18px",
                    fontSize: "13.5px",
                    fontWeight: 700,
                    borderRadius: "12px",
                    gap: "8px"
                  }}
                >
                  Start Your Journey <ArrowUpRight size={15} />
                </Link>
              </div>
            </div>
          </Reveal>

         
          <Reveal className="gl-wellness-card">
            <div className="gl-card-img-wrap">
              <img
                src="/images/sustainable_lifestyle.jpg"
                alt="Sustainable healthy living, morning herbal tea and mindful lifestyle"
              />
              <span className="gl-card-badge gl-card-badge-blue">
                <Smile size={14} strokeWidth={2.5} />
                <span>Sustainable Habit</span>
              </span>
            </div>
            <div className="gl-card-content">
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "12px" }}>
                <span className="gl-guidance-chip">🏡 Fits Family Meals</span>
                <span className="gl-guidance-chip">💼 Work-Life Friendly</span>
                <span className="gl-guidance-chip">🔄 Lifelong Habit</span>
              </div>
              <h3 style={{ fontSize: "19px", fontWeight: 750, color: "#133829", margin: "0 0 10px" }}>
                Sustainable for Real Life
              </h3>
              <p style={{ fontSize: "14px", lineHeight: "1.75", color: "#546e61", margin: 0 }}>
                A plan only works if it fits your real life. Your family food culture, working hours, and social schedule are seamlessly integrated so healthy living feels effortless.
              </p>
              <div style={{ marginTop: "20px", paddingTop: "14px", borderTop: "1px solid #e5ede7" }}>
                <Link
                  href="/assessment"
                  className="gl-button"
                  style={{
                    width: "100%",
                    minHeight: "42px",
                    padding: "10px 18px",
                    fontSize: "13.5px",
                    fontWeight: 700,
                    borderRadius: "12px",
                    gap: "8px"
                  }}
                >
                  Start Your Journey <ArrowUpRight size={15} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section> */}

      {/* SECTION 3: OUR UNIQUE APPROACH */}
      <section className="gl-container gl-section">
        <SectionHeading
          eyebrow="OUR UNIQUE APPROACH"
          title={<>The 6 Stages of Personalised<br /><span>Assessment & Guidance.</span></>}
          centered
        />

        <div className="gl-stages-grid">
          {steps.map((st) => (
            <Reveal
              key={st.num}
              className="gl-stage-card-clean"
            >
              <div className="stage-img-wrap">
                <img
                  src={st.image}
                  alt={st.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 0.5s ease"
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    top: "14px",
                    left: "14px",
                    background: "rgba(255, 255, 255, 0.92)",
                    backdropFilter: "blur(12px)",
                    color: "#1d684f",
                    fontWeight: 800,
                    fontSize: "11px",
                    letterSpacing: "0.08em",
                    padding: "6px 12px",
                    borderRadius: "20px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                    border: "1px solid rgba(255,255,255,0.8)"
                  }}
                >
                  STAGE {st.num}
                </span>
              </div>

              <div style={{ padding: "20px 22px 24px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <h3 style={{ fontSize: "18.5px", fontWeight: 750, color: "#14372a", margin: "0 0 10px", letterSpacing: "-0.02em" }}>
                    {st.title}
                  </h3>
                  <p style={{ fontSize: "14px", lineHeight: "1.75", color: "#546e62", margin: 0 }}>
                    {st.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "32px" }}>
          <Action href="/approach" secondary>Read More About Our Approach</Action>
        </div>
      </section>

      {/* SECTION 4: DETOX & NATURAL WELLNESS (3 SLEEK ELIXIR CARDS) */}
      <section id="detox" className="gl-soft-band" style={{ background: "linear-gradient(135deg, #e7f5ea 0%, #f4fbf6 50%, #e2f1e8 100%)", borderBlock: "1px solid #c8e5d3", paddingBlock: "44px" }}>
        <div className="gl-container">
          <SectionHeading
            eyebrow="DETOX & NATURAL HYDRATION"
            title={<>Nourish Every Cell.<br /><span>Natural Daily Cleansing.</span></>}
            centered
          />

          <div className="gl-detox-grid">
            {/* Drink Card 1: Iced Matcha Detox */}
            <Reveal className="gl-matcha-card">
              <div className="gl-matcha-inner">
                <img
                  src="/images/iced_matcha_detox.jpg"
                  alt="Iced Matcha Detox Elixir"
                />
              </div>
              <div className="gl-matcha-details" style={{ padding: "18px 16px 16px" }}>
                <div className="gl-matcha-title-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <h3 style={{ fontSize: "17px", fontWeight: 800, margin: 0, color: "#163a2c" }}>ICED MATCHA DETOX</h3>
                  <span className="gl-pill" style={{ background: "#e8f6ec", color: "#1d684f", fontSize: "10px", padding: "4px 10px" }}>CELLULAR RESET</span>
                </div>
                
                {/* 3 Core Benefits */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "13px", color: "#425e51" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ color: "#1d684f", fontWeight: 700 }}>✓</span>
                    <span>Flushes metabolic waste & free radicals</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ color: "#1d684f", fontWeight: 700 }}>✓</span>
                    <span>Steady daily energy without caffeine jitters</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ color: "#1d684f", fontWeight: 700 }}>✓</span>
                    <span>Supports liver bile flow & natural detox</span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Drink Card 2: Ginger Turmeric Tonic */}
            <Reveal className="gl-matcha-card">
              <div className="gl-matcha-inner">
                <img
                  src="/images/ginger_turmeric_tonic.jpg"
                  alt="Ginger Turmeric Vitality Tonic"
                />
              </div>
              <div className="gl-matcha-details" style={{ padding: "18px 16px 16px" }}>
                <div className="gl-matcha-title-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <h3 style={{ fontSize: "17px", fontWeight: 800, margin: 0, color: "#163a2c" }}>GINGER TURMERIC TONIC</h3>
                  <span className="gl-pill" style={{ background: "#fef3c7", color: "#b45309", fontSize: "10px", padding: "4px 10px" }}>GUT & IMMUNITY</span>
                </div>

                {/* 3 Core Benefits */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "13px", color: "#425e51" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ color: "#b45309", fontWeight: 700 }}>✓</span>
                    <span>Soothes deep gut inflammation & acidity</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ color: "#b45309", fontWeight: 700 }}>✓</span>
                    <span>Ignites digestion and relieves bloating</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ color: "#b45309", fontWeight: 700 }}>✓</span>
                    <span>Boosts natural seasonal immunity & warmth</span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Drink Card 3: Cucumber Mint Cooler */}
            <Reveal className="gl-matcha-card">
              <div className="gl-matcha-inner">
                <img
                  src="/images/cucumber_mint_cooler.jpg"
                  alt="Cucumber Mint Hydration Cooler"
                />
              </div>
              <div className="gl-matcha-details" style={{ padding: "18px 16px 16px" }}>
                <div className="gl-matcha-title-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <h3 style={{ fontSize: "17px", fontWeight: 800, margin: 0, color: "#163a2c" }}>CUCUMBER MINT COOLER</h3>
                  <span className="gl-pill" style={{ background: "#e0f2fe", color: "#0369a1", fontSize: "10px", padding: "4px 10px" }}>DEEP HYDRATE</span>
                </div>

                {/* 3 Core Benefits */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "13px", color: "#425e51" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ color: "#0284c7", fontWeight: 700 }}>✓</span>
                    <span>Replenishes vital cellular electrolytes</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ color: "#0284c7", fontWeight: 700 }}>✓</span>
                    <span>Cools internal heat & eases reflux</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ color: "#0284c7", fontWeight: 700 }}>✓</span>
                    <span>Supports kidney filtration & skin radiance</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SECTION 5: HEALTH CONCERNS WE ADDRESS (FAST INTERACTIVE CHIPS - HIGH UTILITY, ZERO CLUTTER) */}
      <section className="gl-container" style={{ paddingBlock: "44px 36px" }}>
        <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 24px" }}>
          <span className="gl-kicker">PERSONALIZED CARE FOR YOUR BODY</span>
          <h2 style={{ fontSize: "clamp(26px, 3.5vw, 36px)", fontWeight: 800, margin: "8px 0 0", color: "var(--gl-ink)" }}>
            What Health Goals Bring You Here?
          </h2>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px", maxWidth: "980px", margin: "0 auto" }}>
          {[
            { label: "Diabetes & Insulin Resistance", icon: Activity, tone: "#1d684f", bg: "#e6f4ea" },
            { label: "Thyroid & Hormonal Optimization", icon: Zap, tone: "#1d4ed8", bg: "#eff6ff" },
            { label: "Healthy Visceral Weight Loss", icon: Flame, tone: "#b45309", bg: "#fffbeb" },
            { label: "Gut Microbiome & Acidity Relief", icon: ShieldCheck, tone: "#047857", bg: "#ecfdf5" },
            { label: "Lipid Profile & Cholesterol Care", icon: Heart, tone: "#be185d", bg: "#fdf2f8" },
            { label: "Chronic Fatigue & Cellular Energy", icon: Dna, tone: "#7c3aed", bg: "#f5f3ff" },
            { label: "PCOS / PCOD Natural Nutrition", icon: Sparkles, tone: "#db2777", bg: "#fdf2f8" },
            { label: "Post-Illness Vitality & Immunity", icon: UserCheck, tone: "#0f766e", bg: "#f0fdfa" }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href="/assessment"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "12px 20px",
                  borderRadius: "999px",
                  background: "#ffffff",
                  border: `1px solid #dce8e0`,
                  boxShadow: "0 4px 14px -3px rgba(22, 60, 42, 0.07)",
                  textDecoration: "none",
                  transition: "all 0.25s ease",
                  cursor: "pointer"
                }}
                className="gl-health-chip"
              >
                <span
                  style={{
                    display: "grid",
                    placeItems: "center",
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: item.bg,
                    color: item.tone
                  }}
                >
                  <Icon size={15} strokeWidth={2.4} />
                </span>
                <span style={{ fontSize: "14px", fontWeight: 650, color: "#1c3c2e" }}>{item.label}</span>
                <ArrowUpRight size={15} style={{ color: "#7a9586" }} />
              </Link>
            );
          })}
        </div>
      </section>

      {/* SECTION 8: FEATURED PROGRAMS */}
      <section className="gl-container gl-section">
        <div className="gl-section-row">
          <SectionHeading
            eyebrow="OUR MENTORSHIP PROGRAMS"
            title={<>Tailored Care Packages.<br /><span>One-on-One Guidance.</span></>}
          />
          <Action href="/packages" secondary>View All Programs</Action>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {programmes.map((p, i) => (
            <ProgrammeCard key={p.slug} programme={p} index={i} />
          ))}
        </div>
      </section>
    </main>
  );
}
