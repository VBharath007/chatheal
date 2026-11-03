"use client";
import { useState } from "react";
import { Search, Compass, Check, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { programmes } from "@/lib/catalog";
import { faqs } from "@/lib/design/content";
import { ProgrammeCard } from "@/components/design/ProgrammeCard";
import { SectionHeading, FAQ, CTA } from "@/components/design/GlassUI";
import ProgrammesHero from "@/components/store/ProgrammesHero";

export default function Programmes() {
 const [category,setCategory]=useState('All programmes'),[query,setQuery]=useState('');
 const filtered=programmes.filter(p=>(category==='All programmes'||p.category===category)&&`${p.title} ${p.description}`.toLowerCase().includes(query.toLowerCase()));
 return (
  <main className="gl-page">
   <ProgrammesHero />
   <section id="explore-programmes" className="gl-container gl-section gl-section-compact"><div className="gl-glass gl-filter-bar"><div className="gl-filter-tabs" aria-label="Programme categories">{['All programmes',...new Set(programmes.map(p=>p.category))].map(c=><button key={c} aria-pressed={category===c} className={category===c?'is-active':''} onClick={()=>setCategory(c)}>{c}</button>)}</div><label className="gl-search"><Search size={18}/><input aria-label="Search programmes" placeholder="Find your programme" value={query} onChange={e=>setQuery(e.target.value)}/></label></div><div className="gl-results" role="status"><SlidersHorizontal size={15}/>{filtered.length} programmes to explore</div><div className="grid gap-6 md:grid-cols-3">{filtered.map(p=><ProgrammeCard key={p.slug} programme={p} index={programmes.indexOf(p)}/>)}</div>{!filtered.length&&<div className="gl-glass gl-empty"><h2>No programmes found</h2><p>Try a different search or reset your filters.</p><button className="gl-button" onClick={()=>{setCategory('All programmes');setQuery('')}}>Clear filters</button></div>}<p className="gl-note">Prices, durations and inclusions are illustrative. Your final plan is agreed with ChatHeal. No online payment is collected.</p></section>
   <section className="gl-soft-band"><div className="gl-container gl-section"><SectionHeading eyebrow="A CLEARER PICTURE" title={<>Find your level<br/><span>of support.</span></>} centered/><p className="gl-scroll-hint">Swipe sideways to compare all programmes.</p><div className="gl-glass gl-compare-wrap" tabIndex={0} role="region" aria-label="Scrollable programme comparison"><table className="gl-compare"><caption className="sr-only">Programme support comparison</caption><thead><tr><th>What’s included</th>{programmes.map(p=><th key={p.slug}>{p.title}</th>)}</tr></thead><tbody>{[['Whole-food focus',true,true,true],['Personal nutrition assessment',true,true,true],['Scheduled one-to-one check-ins',false,true,true],['Movement & mindfulness resources',false,false,true]].map(([name,...values])=><tr key={String(name)}><th scope="row">{name}</th>{values.map((v,i)=><td key={i}>{v?<><Check size={18} aria-hidden="true"/><span className="sr-only">Included</span></>:'—'}</td>)}</tr>)}</tbody></table></div></div></section>
   <section className="gl-container gl-section"><div className="gl-faq-layout"><SectionHeading eyebrow="LET’S MAKE IT SIMPLE" title={<>A few questions,<br/><span>answered.</span></>} text="Still wondering about something? Contact ChatHeal for a personal conversation."/><FAQ items={faqs}/></div></section>
   <CTA/>
  </main>
 );
}
