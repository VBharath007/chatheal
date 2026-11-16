"use client";
import { Heart, Leaf, Sun, Compass, Users, Droplet, ShieldCheck, Eye, Target, Sparkles, Activity, ArrowUpRight } from "lucide-react";
import { SectionHeading, FeatureCard, Action, Reveal, IconTile, Button } from "@/components/design/GlassUI";
import OrganicHero from "@/components/store/OrganicHero";
import Link from "next/link";

export default function About() {
  return (
    <main className="gl-page">
      <OrganicHero />

      {/* FOUNDER SPOTLIGHT: MEET SUJITHA */}
      <section className="gl-container gl-section gl-section-compact">
        <Reveal className="gl-founder-hero-card">
          {/* Left: Founder Portrait Frame */}
          <div className="gl-founder-portrait-wrap">
            <div className="gl-founder-img-frame">
              <img
                src="/images/sujitha_executive_portrait.jpeg"
                alt="Sujitha C. - Founder & Clinical Nutritionist at ChatHeal"
              />
              <span className="gl-founder-floating-badge">
                <Leaf size={14} style={{ color: "#1d684f" }} /> FOUNDER · CHATHEAL
              </span>
            </div>
          </div>

          {/* Right: Content & Credentials */}
          <div className="gl-founder-content">
            <span className="gl-kicker">MEET SUJITHA · CHIEF CLINICAL NUTRITIONIST</span>
            <h2 className="gl-founder-title">
              Care begins with<br />
              <span>understanding you.</span>
            </h2>
            <p className="gl-founder-lead">
              A personal approach to clinical nutrition, with your individual biochemistry, lifestyle, and goals at its heart.
            </p>
            <p className="gl-founder-desc">
              Sujitha founded ChatHeal to help people build lifelong vitality through natural, unadulterated whole-food nutrition. Guided by clinical science and empathetic mentorship, she listens to your personal story first — your health history, family kitchen culture, and the goals that matter most to you.
            </p>

            {/* Verified Academic Credentials */}
            <div className="gl-founder-credentials">
              <span className="gl-pill" style={{ background: "#e2f2e7", color: "#1d684f", fontWeight: 700 }}>
                🎓 PGND in Nutrition & Dietetics
              </span>
              <span className="gl-pill" style={{ background: "#f1f8f2", color: "#244c34", fontWeight: 600 }}>M.Phil</span>
              <span className="gl-pill" style={{ background: "#f1f8f2", color: "#244c34", fontWeight: 600 }}>MBA</span>
              <span className="gl-pill" style={{ background: "#f1f8f2", color: "#244c34", fontWeight: 600 }}>MCA</span>
            </div>

            <div className="gl-founder-actions">
              <Action href="/contact">Talk About Your Health Goals</Action>
            </div>
          </div>
        </Reveal>
      </section>

      {/* MISSION & VISION BANNER */}
      <section className="gl-container gl-section gl-section-compact">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "24px", marginBottom: "48px" }}>
          <Reveal className="gl-glass" style={{ padding: "36px", borderRadius: "20px", border: "1px solid #d4e7db" }}>
            <span className="gl-pill" style={{ background: "#e2f2e7", color: "#1d684f", marginBottom: "16px" }}>
              <Target size={14} /> OUR MISSION
            </span>
            <h3 style={{ fontSize: "22px", fontWeight: 700, margin: "12px 0 16px", color: "#0f2b25" }}>
              To Empower Healthier Lives
            </h3>
            <p style={{ fontSize: "16px", lineHeight: "1.8", color: "var(--gl-muted)" }}>
              "To empower healthier lives through natural, whole-food nutrition that supports cellular health, the body's natural renewal processes, and lifelong well-being."
            </p>
          </Reveal>

          <Reveal className="gl-glass" style={{ padding: "36px", borderRadius: "20px", border: "1px solid #d4e7db" }}>
            <span className="gl-pill" style={{ background: "#e8effc", color: "#2563eb", marginBottom: "16px" }}>
              <Eye size={14} /> OUR VISION
            </span>
            <h3 style={{ fontSize: "22px", fontWeight: 700, margin: "12px 0 16px", color: "#0f2b25" }}>
              To Build a Healthier World
            </h3>
            <p style={{ fontSize: "16px", lineHeight: "1.8", color: "var(--gl-muted)" }}>
              "To build a healthier world by making natural nutrition the foundation of cellular wellness, vitality, and healthy aging."
            </p>
          </Reveal>
        </div>

        <Reveal className="gl-about-collage">
          <img src="/images/greens.jpg" alt="Fresh wholesome green vegetables and natural ingredients" />
          <img src="/images/nature.jpg" alt="A quiet peaceful moment in nature" />
          <img src="/images/breakfast.jpg" alt="A nourishing natural breakfast bowl" />
        </Reveal>

        <div className="gl-story-grid gl-about-story" style={{ marginTop: "32px" }}>
          <SectionHeading
            eyebrow="ABOUT CHAT HEAL"
            title={<>Rooted in Natural Nutrition.<br /><span>Growing with You.</span></>}
          />
          <Reveal>
            <p className="gl-large-copy">
              Chat Heal was founded by Sujitha with a singular belief: <strong>"ONE BODY. ONE UNIQUE HEALTH PLAN."</strong>
            </p>
            <p className="gl-copy">
              We are not an ordinary diet-plan company. We reject mass-produced, one-size-fits-all diets because we know that every individual has a unique metabolic signature, daily rhythm, food culture, and lifestyle challenge.
            </p>
            <p className="gl-copy">
              Our philosophy combines whole-food nourishment, cellular hydration, natural detox drinks, and mindful eating practices alongside restorative sleep and yoga to create sustainable lifelong vitality.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CORE VALUES & NUTRITION PHILOSOPHY */}
      {/* <section className="gl-soft-band">
        <div className="gl-container gl-section">
          <SectionHeading
            eyebrow="CORE VALUES & PRINCIPLES"
            title={<>The Chat Heal Philosophy:<br /><span>Natural, Whole-Food Wellness.</span></>}
            centered
          />
          <div className="grid gap-6 md:grid-cols-3">
            <FeatureCard icon={Leaf} title="Whole Foods First">
              Unprocessed, natural ingredients and wholesome everyday meals form the cornerstone of every plan.
            </FeatureCard>
            <FeatureCard icon={Heart} tone="rose" title="Deep Personalization">
              We don't give everyone the same diet plan. Your individual biochemistry and preferences lead every recommendation.
            </FeatureCard>
            <FeatureCard icon={Droplet} tone="blue" title="Detox & Cellular Renewal">
              Harnessing natural detox drinks, hydration therapy, and clean culinary botanicals to lighten the body's toxic burden.
            </FeatureCard>
            <FeatureCard icon={Activity} tone="violet" title="Gut Health & Digestion">
              Supporting the gut microbiome with natural prebiotics, fermented staples, and mindful chewing practices.
            </FeatureCard>
            <FeatureCard icon={Sun} tone="amber" title="Holistic Balance">
              Connecting natural nutrition with restorative sleep, stress resilience, and age-appropriate yoga postures.
            </FeatureCard>
            <FeatureCard icon={ShieldCheck} tone="green" title="Integrity & Empathy">
              Honest, compassionate care with zero artificial shortcuts, extreme fasting, or unsustainable restrictions.
            </FeatureCard>
          </div>
        </div>
      </section> */}

      {/* FINAL CTA */}
      <section className="gl-container gl-section">
        <Reveal className="gl-cta">
          <div>
            <span className="gl-kicker">JOIN OUR COMMUNITY</span>
            <h2>Feeling better begins<br />with <span>being heard.</span></h2>
            <p>One body. One unique health plan. Start your consultation with Sujitha today.</p>
          </div>
          <div className="gl-cta-actions">
            <Action href="/assessment">BOOK NOW</Action>
            <Link href="/contact" style={{ color: "#365c3e", fontWeight: 650 }}>Have questions? Let's talk</Link>
          </div>
          <Leaf className="gl-cta-decoration" size={190} strokeWidth={0.7} aria-hidden="true" />
        </Reveal>
      </section>
    </main>
  );
}
