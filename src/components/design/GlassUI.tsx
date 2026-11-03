"use client";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Leaf, type LucideIcon } from "lucide-react";

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={`gl-reveal ${className}`} initial={reduced ? false : { y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .08 }} transition={{ duration: .45, delay, ease: [.16, 1, .3, 1] }}>{children}</motion.div>;
}
export function IconTile({ icon: Icon, tone = "green", small = false }: { icon: LucideIcon; tone?: string; small?: boolean }) {
  return <span className={`gl-icon gl-icon-${tone} ${small ? 'gl-icon-small' : ''}`}><Icon size={small ? 18 : 23} strokeWidth={1.8} aria-hidden="true"/></span>;
}
export function Action({ children, href, secondary = false, className = "" }: { children: ReactNode; href: string; secondary?: boolean; className?: string }) {
  return <Link href={href} className={`gl-button ${secondary ? 'gl-button-secondary' : ''} ${className}`}>{children}<ArrowUpRight size={18} aria-hidden="true"/></Link>;
}
export function SectionHeading({ eyebrow, title, text, centered = false }: { eyebrow: string; title: ReactNode; text?: string; centered?: boolean }) {
  return <Reveal className={`gl-section-heading ${centered ? 'gl-centered' : ''}`}><span className="gl-kicker">{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</Reveal>;
}
export function PageHero({ eyebrow, title, text, icon: Icon = Leaf, image, children }: { eyebrow: string; title: ReactNode; text: string; icon?: LucideIcon; image?: string; children?: ReactNode }) {
  return <section className={`gl-page-hero ${image ? 'gl-page-hero-split' : ''}`}><div className="gl-container"><Reveal className="gl-page-hero-copy"><IconTile icon={Icon}/><span className="gl-kicker">{eyebrow}</span><h1>{title}</h1><p>{text}</p>{children}</Reveal>{image && <Reveal className="gl-hero-photo"><img src={image} alt="Fresh food and mindful everyday living"/><span className="gl-photo-caption"><Leaf size={16}/> Nourish your everyday.</span></Reveal>}</div></section>;
}
export function FeatureCard({ icon, tone = "green", title, children }: { icon: LucideIcon; tone?: string; title: string; children: ReactNode }) {
  return <Reveal className="gl-glass gl-feature"><IconTile icon={icon} tone={tone}/><h3>{title}</h3><p>{children}</p></Reveal>;
}
export function CTA() {
  return <section className="gl-container gl-section"><Reveal className="gl-cta"><div><span className="gl-kicker">YOUR NEXT SMALL STEP</span><h2>Feeling better begins<br/>with <span>being heard.</span></h2><p>A little guidance. A plan that fits. A companion along the way.</p></div><div className="gl-cta-actions"><Action href="/assessment">Find my starting point</Action><Link href="/contact">Have a question? Let’s talk.</Link></div><Leaf className="gl-cta-decoration" size={190} strokeWidth={.7} aria-hidden="true"/></Reveal></section>;
}
export function FAQ({ items }: { items: { question: string; answer: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return <div className="gl-faq">{items.map((item, i) => <div className="gl-glass" key={item.question}><h3><button type="button" aria-expanded={open === i} aria-controls={`faq-answer-${i}`} onClick={() => setOpen(open === i ? null : i)}>{item.question}<ChevronDown size={20} className={open === i ? 'gl-rotate' : ''}/></button></h3><div id={`faq-answer-${i}`} hidden={open !== i}><p>{item.answer}</p></div></div>)}</div>;
}
