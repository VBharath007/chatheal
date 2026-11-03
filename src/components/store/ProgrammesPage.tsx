"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Search,
  ArrowUpRight,
  Check,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { programmes, Programme, money } from "@/lib/catalog";
import { ProgrammeCard, Breadcrumb, PreviewNote, CTA } from "./StoreUI";
import { useStore } from "./StoreProvider";
import { motion } from "framer-motion";

const easeSpring = [0.16, 1, 0.3, 1] as const;

export { default as ProgrammesPage } from "@/components/pages/Programmes";
export function ProgrammeDetail({ programme: p }: { programme: Programme }) {
  const { add, cart } = useStore();
  const selected = cart.some((c) => c.slug === p.slug);
  return (
    <main className="ch-product-page">
      <div className="ch-section">
        <div className="ch-product-layout">
          <div className="ch-product-photo">
            <img src={p.image} alt={p.title} />
            <span className="ch-photo-tag">{p.category}</span>
          </div>
          <div className="ch-product-copy">
            <span className="ch-overline">{p.eyebrow}</span>
            <h1>{p.title}</h1>
            <p className="ch-product-description">{p.description}</p>
            <div className="ch-duration">
              <span>Programme preview</span>
              <strong>{p.weeks} weeks of thoughtful support</strong>
            </div>
            <ul className="ch-feature-list">
              {p.features.map((f) => (
                <li key={f}>
                  <Check size={16} />
                  {f}
                </li>
              ))}
            </ul>
            <div className="ch-product-price">
              <strong>{money(p.price)}</strong>
              <span>
                Illustrative price
                <br />
                Final plan subject to consultation
              </span>
            </div>
            <button className="ch-button wide" onClick={() => add(p.slug)}>
              {selected ? "Added — add to bag again" : "Add programme to bag"}
              {selected ? <Check size={18} /> : <ShoppingBag size={18} />}
            </button>
            {selected && (
              <Link href="/cart" className="ch-text-link ch-view-bag">
                Continue to your bag
                <ArrowUpRight size={17} />
              </Link>
            )}
            <PreviewNote />
          </div>
        </div>
        <section className="ch-product-details">
          <div>
            <span className="ch-overline">WHAT TO EXPECT</span>
            <h2>
              Designed around
              <br />
              <em>your everyday.</em>
            </h2>
          </div>
          <div>
            <details open>
              <summary>
                Your first conversation<span>−</span>
              </summary>
              <p>
                Start with your routines, food preferences and goals. Your coach
                will help you understand what this programme can offer and
                whether it is suitable for you.
              </p>
            </details>
            <details>
              <summary>
                Your personal nutrition space<span>+</span>
              </summary>
              <p>
                Keep a food diary, review daily and weekly calorie totals,
                access recipe and wellness resources, and manage your
                consultation appointments.
              </p>
            </details>
            <details>
              <summary>
                Important programme information<span>+</span>
              </summary>
              <p>
                This catalogue is a design preview. Durations, fees and session
                frequency need final approval. Programmes support nutrition and
                lifestyle goals and do not promise a cure or replace medical
                care.
              </p>
            </details>
          </div>
        </section>
      </div>
      <CTA />
    </main>
  );
}
