"use client";
import { Heart, Leaf, Sun, Compass, Users } from "lucide-react";
import { SectionHeading, FeatureCard, CTA, Action, Reveal, IconTile } from "@/components/design/GlassUI";
import OrganicHero from "@/components/store/OrganicHero";

export default function About() {
 return (
  <main className="gl-page">
   <OrganicHero />
   <section className="gl-container gl-section gl-section-compact"><Reveal className="gl-about-collage"><img src="/images/greens.jpg" alt="Fresh wholesome food"/><img src="/images/nature.jpg" alt="A quiet moment in nature"/><img src="/images/breakfast.jpg" alt="A nourishing breakfast"/></Reveal><div className="gl-story-grid gl-about-story"><SectionHeading eyebrow="OUR STORY" title={<>Rooted in nourishment.<br/><span>Growing with you.</span></>}/><Reveal><p className="gl-large-copy">ChatHeal was founded by Sujitha C. with a focus on natural nutrition, personal wellness and lifelong wellbeing.</p><p className="gl-copy">Every journey starts with understanding your everyday: your family traditions, your relationship with food, your working hours and the goals that matter to you. We bring those pieces together with individual guidance and practical routines.</p><Action href="/team" secondary>Meet the person behind ChatHeal</Action></Reveal></div></section>
   <section className="gl-soft-band"><div className="gl-container gl-section"><SectionHeading eyebrow="WHAT WE BELIEVE" title={<>Good care starts<br/><span>with understanding.</span></>} centered/><div className="grid gap-6 md:grid-cols-3"><FeatureCard icon={Leaf} title="Whole foods first">Simple ingredients and familiar meals at the heart of your routine.</FeatureCard><FeatureCard icon={Heart} tone="rose" title="You are the starting point">Your goals, preferences and personal circumstances guide every conversation.</FeatureCard><FeatureCard icon={Sun} tone="amber" title="Wellbeing is connected">Nourishment, movement, rest and everyday habits all deserve care.</FeatureCard></div></div></section>
   <section className="gl-container gl-section"><SectionHeading eyebrow="OUR PROMISE" title={<>Support that meets you<br/><span>where you are.</span></>}/><div className="grid gap-6 md:grid-cols-2"><Reveal className="gl-glass gl-promise"><IconTile icon={Compass} tone="blue"/><div><h3>Clear, practical guidance</h3><p>Space to learn about your food and your habits, with manageable steps you can come back to.</p></div></Reveal><Reveal className="gl-glass gl-promise"><IconTile icon={Users} tone="violet"/><div><h3>A personal connection</h3><p>Conversations with your coach, reflection on your progress and encouragement along the way.</p></div></Reveal></div></section>
   <CTA/>
  </main>
 );
}
