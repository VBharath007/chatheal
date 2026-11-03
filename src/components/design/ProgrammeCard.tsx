"use client";
import Link from "next/link";
import { Check, Plus, ArrowUpRight, Clock } from "lucide-react";
import { Programme, money } from "@/lib/catalog";
import { useStore } from "@/components/store/StoreProvider";
import { Reveal } from "./GlassUI";
export function ProgrammeCard({ programme: p, index = 0 }: { programme: Programme; index?: number }) {
 const { add, cart } = useStore(); const selected = cart.some(c => c.slug === p.slug);
 return <Reveal className={`gl-glass gl-programme ${index === 1 ? 'gl-programme-featured' : ''}`}>
  <Link href={'/programmes/' + p.slug} className="gl-programme-image"><img src={p.image} alt={p.title + ' nutrition programme'} loading="lazy"/><span><Clock size={14}/>{p.weeks} week preview</span><span className="gl-image-arrow"><ArrowUpRight size={20}/></span></Link>
  <div className="gl-programme-body"><div className="gl-card-label">{p.category}</div><Link href={'/programmes/' + p.slug}><h3>{p.title}</h3></Link><p>{p.description}</p><ul>{p.features.slice(0,3).map(f => <li key={f}><Check size={15}/>{f}</li>)}</ul><div className="gl-price-row"><div><small>Illustrative price</small><strong>{money(p.price)}</strong></div><button type="button" className="gl-add-button" onClick={() => add(p.slug)} aria-label={'Add ' + p.title + ' to bag'}>{selected ? <Check size={19}/> : <Plus size={19}/>}</button></div></div>
 </Reveal>;
}
