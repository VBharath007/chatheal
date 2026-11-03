"use client";
import Link from "next/link";
import {
  ArrowUpRight,
  Leaf,
  Heart,
  Sun,
  Activity,
  Utensils,
  Phone,
  CalendarDays,
  Check,
  Clock,
} from "lucide-react";
import { Breadcrumb, CTA, SectionTitle } from "./StoreUI";
import { recipes, articles } from "@/lib/catalog";
import { motion } from "framer-motion";
const easeSpring = [0.16, 1, 0.3, 1] as const;

export { default as AboutPage } from "@/components/pages/About";
export { default as ApproachPage } from "@/components/pages/Approach";
export { default as RecipesPage } from "@/components/pages/Journal";
export { default as ContactPage } from "@/components/pages/Contact";

export function RecipeDetail({
  recipe: r,
}: {
  recipe: (typeof recipes)[number];
}) {
  return (
    <main className="ch-section">
      <div className="ch-recipe-detail">
        <div>
          <span className="ch-overline">{r.tag} / THE CHATHEAL KITCHEN</span>
          <h1>{r.title}</h1>
          <p>{r.description}</p>
          <div className="ch-recipe-facts">
            <span>
              <Clock size={17} />
              {r.time} min
            </span>
            <span>~{r.calories} kcal / serving*</span>
          </div>
          <h2>What you’ll need</h2>
          <ul>
            {r.ingredients.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
          <h2>A little time in the kitchen</h2>
          <ol>
            {r.steps.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ol>
          <p className="ch-preview-note">
            *Illustrative nutrition estimate. Actual values depend on
            ingredients and quantities.
          </p>
          <Link href="/diary" className="ch-button">
            Open your food diary
            <ArrowUpRight size={17} />
          </Link>
        </div>
        <img src={r.image} alt={r.title} />
      </div>
    </main>
  );
}
export function ArticlePage({
  article: a,
}: {
  article: (typeof articles)[number];
}) {
  return (
    <main className="ch-section">
      <article className="ch-article">
        <span className="ch-overline">{a.category}</span>
        <h1>{a.title}</h1>
        <p className="ch-article-intro">{a.intro}</p>
        <img src={a.image} alt={a.title} />
        {a.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <Link href="/assessment" className="ch-text-link">
          Find your starting point
          <ArrowUpRight size={17} />
        </Link>
      </article>
    </main>
  );
}
export function PolicyPage({ kind }: { kind: "privacy" | "terms" }) {
  return (
    <main className="ch-section">
      <article className="ch-policy">
        <span className="ch-overline">DESIGN PREVIEW / DRAFT FOR REVIEW</span>
        <h1>
          {kind === "privacy"
            ? "Your information, thoughtfully handled."
            : "A clear beginning."}
        </h1>
        {kind === "privacy" ? (
          <>
            <h2>Information used by the portal</h2>
            <p>
              Signed-in features use account details, food logs, appointments
              and session information to provide the wellness experience. The
              coach can access client nutrition records; other clients cannot.
            </p>
            <h2>Browser-only design previews</h2>
            <p>
              The shopping bag is saved in your browser. The assessment and
              checkout preview use information only in the current page; no
              payment details are collected. These previews do not submit an
              order or send an assessment to the coach.
            </p>
            <h2>Before launch</h2>
            <p>
              ChatHeal must finalise its privacy notice, retention periods,
              contact process and provider details before collecting real client
              information through the new forms.
            </p>
          </>
        ) : (
          <>
            <h2>Programme previews</h2>
            <p>
              Programme descriptions, prices and durations currently demonstrate
              the proposed shopping experience. They are not a binding offer.
              Payment processing and order fulfilment are not enabled.
            </p>
            <h2>Wellness guidance</h2>
            <p>
              Content provides general nutrition and lifestyle information.
              Individual programme suitability is discussed with the coach. No
              specific health outcome or disease reversal is guaranteed.
            </p>
            <h2>Final terms</h2>
            <p>
              Consultation policies, subscriptions, cancellation, refunds and
              service terms require business approval before online purchases
              are enabled.
            </p>
          </>
        )}
        <Link href="/contact" className="ch-text-link">
          Contact ChatHeal
          <ArrowUpRight size={17} />
        </Link>
      </article>
    </main>
  );
}
