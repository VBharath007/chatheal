"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  Trash2,
  ShoppingBag,
  LockKeyhole,
  Check,
  CheckCircle2,
  Wallet,
  Smartphone,
  CreditCard,
  ChevronLeft,
  Sparkles,
  ShieldCheck,
  MessageSquareHeart,
  Leaf,
  Clock,
  User,
} from "lucide-react";
import { useStore } from "./StoreProvider";
import { money } from "@/lib/catalog";
import styles from "./CheckoutPages.module.css";

export function CartPage() {
  const { cart, remove, ready } = useStore();
  const total = cart.reduce((n, p) => n + p.price, 0);

  return (
    <main className={`gl-container ${styles.page}`}>
      {/* Ambient background lighting */}
      <div className={styles.ambientGlow} aria-hidden="true" />
      <div className={styles.ambientGlowRight} aria-hidden="true" />

      {/* Page Heading */}
      <div className={styles.headingSection}>
        <span className="gl-pill">
         
          YOUR PERSONAL SELECTION
        </span>
        <h1 className={styles.heroHeading}>
          Your wellness <em>bag.</em>
        </h1>
        <p className={styles.heroDesc}>
          {cart.length
            ? `${cart.length} personalised programme${
                cart.length === 1 ? "" : "s"
              } selected for your health journey.`
            : "Your bag is currently empty. Explore our programmes to begin."}
        </p>
      </div>

      {!ready ? (
        <div style={{ padding: "60px 0", textAlign: "center", color: "#556e5d" }}>
          Loading your bag…
        </div>
      ) : cart.length ? (
        <div className={styles.layout}>
          {/* Left Column: List of Programmes in Bag */}
          <div className={styles.itemsColumn}>
            {cart.map((p) => (
              <article className={styles.cartCard} key={p.slug}>
                <Link href={"/programmes/" + p.slug} className={styles.itemImageLink}>
                  <img src={p.image} alt={p.title} className={styles.itemImage} />
                </Link>

                <div className={styles.itemInfo}>
                  <div className={styles.itemBadgeRow}>
                    <span className={styles.itemTag}>{p.weeks}-WEEK PREVIEW</span>
                    <span className={styles.itemCategory}>{p.category}</span>
                  </div>

                  <h2 className={styles.itemTitle}>
                    <Link href={"/programmes/" + p.slug}>{p.title}</Link>
                  </h2>

                  <div className={styles.itemFeatures}>
                    {p.features?.slice(0, 3).map((feat) => (
                      <span key={feat} className={styles.itemFeature}>
                        <Check size={13} style={{ color: "#277856", flexShrink: 0 }} />
                        {feat}
                      </span>
                    )) || (
                      <span className={styles.itemFeature}>
                        <Check size={13} style={{ color: "#277856" }} />
                        One individual guided programme
                      </span>
                    )}
                  </div>
                </div>

                <div className={styles.itemPriceAction}>
                  <span className={styles.itemPrice}>Personalised Care</span>
                  <button
                    onClick={() => remove(p.slug)}
                    className={styles.removeBtn}
                    aria-label={`Remove ${p.title} from bag`}
                  >
                    <Trash2 size={13} />
                    <span>Remove</span>
                  </button>
                </div>
              </article>
            ))}

            <div className={styles.continueExploreWrap}>
              <Link href="/programmes" className={styles.continueLink}>
                <ChevronLeft size={16} />
                Continue exploring programmes
              </Link>
            </div>

            {/* Coach Sujitha Advice Strip */}
            <div className={styles.coachNoteCard}>
              <div className={styles.coachAvatar}>SC</div>
              <div className={styles.coachNoteText}>
                <strong>Have a question before enrolling?</strong>
                <p>
                  Nutritionist Sujitha C. can review your current routine and help you
                  choose the right programme duration.
                </p>
              </div>
              <Link href="/contact" className={styles.coachConsultLink}>
                Ask Sujitha <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>

          {/* Right Column: Order Summary Floating Card */}
          <aside className={styles.orderSummaryCard}>
            <div className={styles.summaryHeader}>
              <h2 className={styles.summaryTitle}>Order summary</h2>
              <div className={styles.summaryIconBadge}>
                <ShoppingBag size={18} />
              </div>
            </div>

            <div className={styles.summaryLineItems}>
              {cart.map((p) => (
                <div key={p.slug} className={styles.summaryRow}>
                  <span>{p.title}</span>
                  <strong>Included</strong>
                </div>
              ))}

              <div className={styles.summaryRow}>
                <span>Personal Nutrition Assessment</span>
                <span className={styles.includedBadge}>Included</span>
              </div>

              <div className={styles.summaryRow}>
                <span>Coach Guidance & Food Diary Access</span>
                <span className={styles.includedBadge}>Included</span>
              </div>

              <div className={styles.summaryRow}>
                <span>Care Inclusions</span>
                <span style={{ fontSize: "12.5px", color: "#6a8270" }}>
                  Full Access
                </span>
              </div>
            </div>

            <div className={styles.totalRow}>
              <div className={styles.totalLabel}>
                Enrolment Plan
                <small>Subject to final consultation</small>
              </div>
              <span className={styles.totalAmount}>Personalised Care</span>
            </div>

            <Link href="/checkout" className={styles.checkoutCtaBtn}>
              <span>Continue to checkout</span>
              <ArrowRight size={17} />
            </Link>

            <div className={styles.disclaimerBox}>
              Programme durations and personalised inclusions are design previews for
              client intake. Consultations are coordinated upon enquiry.
            </div>

            <div className={styles.trustList}>
              <div className={styles.trustItem}>
                <LockKeyhole size={14} />
                <span>100% Risk-Free Care Intake · Dedicated support</span>
              </div>
              <div className={styles.trustItem}>
                <ShieldCheck size={14} />
                <span>Nutritionist Sujitha C. certified care</span>
              </div>
              <div className={styles.trustItem}>
                <Leaf size={14} />
                <span>Customised whole-food meal guidance</span>
              </div>
            </div>
          </aside>
        </div>
      ) : (
        /* Empty State */
        <div className={styles.emptyCard}>
          <div className={styles.emptyEmblem}>
            <ShoppingBag size={38} strokeWidth={1.5} />
          </div>
          <h2 className={styles.emptyHeading}>Your bag is waiting.</h2>
          <p className={styles.emptyDesc}>
            Make room for a healthier everyday. Choose a programme built around
            your life, or discover your personalized starting point.
          </p>
          <div className={styles.emptyActions}>
            <Link href="/programmes" className="gl-button">
              Explore programmes <ArrowUpRight size={17} />
            </Link>
            <Link href="/assessment" className="gl-button gl-button-secondary">
              Take the assessment <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}

export function CheckoutPage() {
  const { cart, ready } = useStore();
  const [method, setMethod] = useState("UPI");
  const [review, setReview] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");

  const total = cart.reduce((n, p) => n + p.price, 0);

  if (!ready) {
    return (
      <main className={`gl-container ${styles.page}`}>
        <p style={{ textAlign: "center", padding: "60px 0" }}>Loading checkout…</p>
      </main>
    );
  }

  if (!cart.length) {
    return (
      <main className={`gl-container ${styles.page}`}>
        <div className={styles.emptyCard}>
          <div className={styles.emptyEmblem}>
            <ShoppingBag size={38} strokeWidth={1.5} />
          </div>
          <h1 className={styles.emptyHeading}>Your bag is empty.</h1>
          <p className={styles.emptyDesc}>
            Please select a programme before proceeding to checkout.
          </p>
          <Link className="gl-button" href="/programmes">
            Explore programmes <ArrowUpRight size={18} />
          </Link>
        </div>
      </main>
    );
  }

  if (review) {
    return (
      <main className={`gl-container ${styles.page}`}>
        <div className={styles.completeCard}>
          <div className={styles.completeCrest}>
            <CheckCircle2 size={38} strokeWidth={1.8} />
          </div>
          <span className="gl-pill" style={{ marginBottom: "12px" }}>
             CHECKOUT DESIGN PREVIEW
          </span>
          <h1 className={styles.heroHeading} style={{ margin: "8px 0" }}>
            A thoughtful start,
            <br />
            <em>{name || "for your journey"}.</em>
          </h1>
          <p className={styles.heroDesc} style={{ margin: "0 auto", maxWidth: "560px" }}>
            Your selection is ready for review. This is an interactive design preview;
            no order has been submitted and no payment has been taken.
          </p>

          <div className={styles.receiptCard}>
            <div style={{ marginBottom: "12px", borderBottom: "1px solid #dce8d5", paddingBottom: "8px" }}>
              <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", color: "#607c65", textTransform: "uppercase" }}>
                RESERVED PROGRAMME DETAILS
              </span>
            </div>
            {cart.map((p) => (
              <div key={p.slug} className={styles.receiptItem}>
                <span>
                  <strong>{p.title}</strong> · {p.weeks} Weeks Guided Care
                </span>
                <strong>Included</strong>
              </div>
            ))}
            <div className={styles.receiptItem}>
              <span>Client Name</span>
              <span>{name || "Prospective Client"}</span>
            </div>
            <div className={styles.receiptItem}>
              <span>Care Consultation</span>
              <span>Dedicated Intake</span>
            </div>
            <div className={styles.receiptItem}>
              <span>Care Enrolment</span>
              <span>Personalised Protocol</span>
            </div>
          </div>

          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              className="gl-button gl-button-secondary"
              onClick={() => setReview(false)}
            >
              <ChevronLeft size={16} />
              Edit details
            </button>
            <Link href="/contact" className="gl-button">
              Discuss with ChatHeal <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={`gl-container ${styles.page}`}>
      <div className={styles.ambientGlow} aria-hidden="true" />
      <div className={styles.ambientGlowRight} aria-hidden="true" />

      <div className={styles.headingSection}>
        <span className="gl-pill">
           YOUR JOURNEY STARTS HERE
        </span>
        <h1 className={styles.heroHeading}>
          A little closer
          <br />
          <em>to feeling good.</em>
        </h1>
        <p className={styles.heroDesc}>
          Interactive checkout preview. Payment gateway integration will be
          enabled upon final launch.
        </p>
      </div>

      <form
        className={styles.layout}
        onSubmit={(e) => {
          e.preventDefault();
          setReview(true);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <div className={styles.checkoutFormCard}>
          {/* Section 01: Client Details */}
          <section>
            <div className={styles.sectionHeader}>
              <span className={styles.stepNumberTag}>01 / YOUR CONTACT DETAILS</span>
              <h2 className={styles.sectionTitle}>Let’s get to know you.</h2>
              <p className={styles.sectionSubtitle}>
                Your coach will use these details to coordinate your personal onboarding.
              </p>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Full name *</label>
                <input
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ananya Sharma"
                  className={styles.textInput}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Email address *</label>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. ananya@example.com"
                  className={styles.textInput}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Mobile / WhatsApp number *</label>
                <input
                  type="tel"
                  required
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  pattern="[+0-9 ()-]{8,18}"
                  placeholder="+91 98765 43210"
                  className={styles.textInput}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>City & State *</label>
                <input
                  required
                  autoComplete="address-level2"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Chennai, Tamil Nadu"
                  className={styles.textInput}
                />
              </div>
            </div>
          </section>

          {/* Section 02: Payment Preference */}
          <section>
            <div className={styles.sectionHeader}>
              <span className={styles.stepNumberTag}>02 / PAYMENT PREFERENCE</span>
              <h2 className={styles.sectionTitle}>Choose your preferred method.</h2>
              <p className={styles.sectionSubtitle}>
                Preview only. No payment gateway transaction will be triggered today.
              </p>
            </div>

            <div className={styles.paymentMethodsGrid}>
              {[
                [Smartphone, "UPI", "Google Pay, PhonePe, Paytm & BHIM UPI"],
                [CreditCard, "Card", "Debit or Credit Cards (Visa, Mastercard, RuPay)"],
                [Wallet, "Net Banking", "All major Indian banks supported"],
              ].map(([Icon, title, desc]: any) => (
                <button
                  type="button"
                  aria-pressed={method === title}
                  className={`${styles.paymentMethodCard} ${
                    method === title ? styles.selected : ""
                  }`}
                  key={title}
                  onClick={() => setMethod(title)}
                >
                  <span className={styles.paymentIconWrap}>
                    <Icon size={22} strokeWidth={1.8} />
                  </span>
                  <div className={styles.paymentDetails}>
                    <span className={styles.paymentTitle}>{title}</span>
                    <span className={styles.paymentDesc}>{desc}</span>
                  </div>
                  <span className={styles.radioIndicator}>
                    {method === title && <Check size={13} strokeWidth={2.6} />}
                  </span>
                </button>
              ))}
            </div>

            <div className={styles.gatewayNoteBox} style={{ marginTop: "18px" }}>
              <LockKeyhole size={18} />
              <p style={{ margin: 0 }}>
                The {method} payment provider will be securely connected during launch.
                This form currently previews the seamless checkout workflow.
              </p>
            </div>
          </section>

          <label className={styles.termsCheckboxLabel}>
            <input type="checkbox" required />
            <span>
              I understand this is a design preview. My contact details will not be
              charged, and no financial transaction will take place.
            </span>
          </label>
        </div>

        {/* Aside: Order Summary */}
        <aside className={styles.orderSummaryCard}>
          <div className={styles.summaryHeader}>
            <h2 className={styles.summaryTitle}>Order summary</h2>
            <div className={styles.summaryIconBadge}>
              <ShoppingBag size={18} />
            </div>
          </div>

          <div className={styles.summaryLineItems}>
            {cart.map((p) => (
              <div key={p.slug} className={styles.summaryRow}>
                <span>
                  <strong>{p.title}</strong>
                  <small style={{ display: "block", color: "#6a8270" }}>
                    {p.weeks}-week personalised programme
                  </small>
                </span>
                <strong>Included</strong>
              </div>
            ))}

            <div className={styles.summaryRow}>
              <span>Coach Assessment & Setup</span>
              <span className={styles.includedBadge}>Included</span>
            </div>

            <div className={styles.summaryRow}>
              <span>Care Inclusions</span>
              <span style={{ fontSize: "12px", color: "#6a8270" }}>Full Access</span>
            </div>
          </div>

          <div className={styles.totalRow}>
            <div className={styles.totalLabel}>
              Enrolment Plan
              <small>Subject to consultation intake</small>
            </div>
            <span className={styles.totalAmount}>Personalised Care</span>
          </div>

          <button className={styles.checkoutCtaBtn} type="submit">
            <span>Review checkout preview</span>
            <ArrowRight size={17} />
          </button>

          <div className={styles.disclaimerBox}>
            Final plan confirmation and consultation slot will be coordinated by ChatHeal.
          </div>

          <div style={{ marginTop: "16px", textAlign: "center" }}>
            <Link href="/cart" className={styles.continueLink} style={{ fontSize: "13px" }}>
              <ChevronLeft size={14} /> Back to edit your bag
            </Link>
          </div>
        </aside>
      </form>
    </main>
  );
}
