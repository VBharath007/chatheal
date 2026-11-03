"use client";
import { useState } from "react";
import Link from "next/link";
import { BookOpen, Search, Clock, ArrowUpRight } from "lucide-react";
import { articles, recipes } from "@/lib/catalog";
import { CTA } from "@/components/design/GlassUI";
import RecipesHero from "@/components/store/RecipesHero";

export default function Journal() {
 const [tab,setTab]=useState('All'),[query,setQuery]=useState('');
 const items=[...recipes.map(r=>({title:r.title,text:r.description,image:r.image,tag:r.tag,kind:'Recipes',meta:`${r.time} min · ~${r.calories} kcal`,href:'/recipes/'+r.slug})),...articles.map(a=>({title:a.title,text:a.intro,image:a.image,tag:a.category,kind:'Stories',meta:'5 min read',href:'/journal/'+a.slug}))];
 const filtered=items.filter(i=>(tab==='All'||i.kind===tab)&&`${i.title} ${i.text} ${i.tag}`.toLowerCase().includes(query.toLowerCase()));
 return <main className="gl-page">
  <RecipesHero />
  <section id="explore-recipes" className="gl-container gl-section gl-section-compact"><div className="gl-glass gl-filter-bar"><div className="gl-filter-tabs" aria-label="Content categories">{['All','Recipes','Stories'].map(t=><button key={t} aria-pressed={tab===t} className={tab===t?'is-active':''} onClick={()=>setTab(t)}>{t}</button>)}</div><label className="gl-search"><Search size={18}/><input aria-label="Search recipes and stories" placeholder="Find a little inspiration" value={query} onChange={e=>setQuery(e.target.value)}/></label></div><div className="gl-results" role="status">{filtered.length} things to explore</div><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{filtered.map(i=><Link key={i.href} href={i.href} className="gl-glass gl-read-card"><div><img src={i.image} alt={i.title} loading="lazy"/><span className="gl-pill">{i.tag}</span></div><section><span className="gl-read-meta"><Clock size={14}/>{i.meta}</span><h2>{i.title}</h2><p>{i.text}</p><span className="gl-text-link">{i.kind==='Recipes'?'View recipe':'Read story'}<ArrowUpRight size={17}/></span></section></Link>)}</div>{!filtered.length&&<div className="gl-glass gl-empty"><h2>No matches just yet</h2><button className="gl-button" onClick={()=>{setTab('All');setQuery('')}}>Clear filters</button></div>}<p className="gl-note">Recipe nutrition values are approximate and depend on ingredients and portions.</p></section><CTA/></main>;
}
