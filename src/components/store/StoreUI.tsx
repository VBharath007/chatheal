"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/design/GlassUI";
export { ProgrammeCard } from "@/components/design/ProgrammeCard";
export { CTA } from "@/components/design/GlassUI";
export function SectionTitle({eyebrow,title,text,href,link='Explore more'}:{eyebrow:string;title:React.ReactNode;text?:string;href?:string;link?:string}){return <div className="gl-section-row"><SectionHeading eyebrow={eyebrow} title={title} text={text}/>{href&&<Link className="gl-text-link" href={href}>{link}<ArrowUpRight size={17}/></Link>}</div>}
export function Breadcrumb({items}:{items:{label:string;href?:string}[]}){return null;}
export function PreviewNote(){return <p className="ch-preview-note">Programme durations, inclusions and prices are previews. Confirm your plan with ChatHeal. Online payment is not enabled.</p>}
