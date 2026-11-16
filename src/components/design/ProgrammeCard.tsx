"use client";
import Link from "next/link";
import { Check, ArrowUpRight, Clock } from "lucide-react";
import { Programme } from "@/lib/catalog";
import { Reveal } from "./GlassUI";

export function ProgrammeCard({ programme: p, index = 0 }: { programme: Programme; index?: number }) {
  return (
    <Reveal className={`gl-glass gl-programme ${index === 1 ? 'gl-programme-featured' : ''}`}>
      <Link href={'/programmes/' + p.slug} className="gl-programme-image">
        <img src={p.image} alt={p.title + ' nutrition programme'} loading="lazy" />
        <span><Clock size={14} />{p.weeks} week preview</span>
        <span className="gl-image-arrow"><ArrowUpRight size={20} /></span>
      </Link>
      <div className="gl-programme-body">
        <div className="gl-card-label">{p.category}</div>
        <Link href={'/programmes/' + p.slug}><h3>{p.title}</h3></Link>
        <p>{p.description}</p>
        <ul>
          {p.features.slice(0, 3).map((f) => (
            <li key={f}><Check size={15} />{f}</li>
          ))}
        </ul>
        <div className="gl-price-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "13px", fontWeight: 650, color: "#1d684f" }}>
            Personalized Guidance
          </span>
          <Link
            href="/assessment"
            className="gl-button"
            style={{
              minHeight: "38px",
              padding: "8px 18px",
              fontSize: "13px",
              borderRadius: "10px",
              gap: "6px"
            }}
          >
            Book Consultation <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </Reveal>
  );
}
