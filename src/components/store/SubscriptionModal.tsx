"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  Building2,
  ShieldCheck,
  Check,
  X,
  Lock,
  ChevronDown,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import styles from "./SubscriptionModal.module.css";

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  initialPackage?: "monthly" | "six-month" | "yearly";
}

export default function SubscriptionModal({
  isOpen,
  onClose,
  onSuccess,
  initialPackage = "yearly",
}: SubscriptionModalProps) {
  // Plan selection: monthly (₹3,000), six-month (₹12,000), yearly (₹20,000)
  const [plan, setPlan] = useState<"monthly" | "six-month" | "yearly">(
    initialPackage
  );

  useEffect(() => {
    if (initialPackage) {
      setPlan(initialPackage);
    }
  }, [initialPackage]);

  // Payment method: card vs bank
  const [paymentMethod, setPaymentMethod] = useState<"card" | "bank">("card");

  // Common fields
  const [billedTo, setBilledTo] = useState("Jane Smith");

  // Credit / Debit / RuPay Card fields
  const [cardNumber, setCardNumber] = useState("4532 8234 3354 7832");
  const [expiry, setExpiry] = useState("08/29");
  const [cvc, setCvc] = useState("786");
  const [country, setCountry] = useState("India");
  const [postalCode, setPostalCode] = useState("600028");

  // Bank Transfer (NetBanking / UPI / Direct)
  const [selectedBank, setSelectedBank] = useState("HDFC Bank");
  const [ifscCode, setIfscCode] = useState("HDFC0001234");
  const [accountNumber, setAccountNumber] = useState("50100492819201");
  const [accountType, setAccountType] = useState<"savings" | "current">(
    "savings"
  );

  // Form submission states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Exact package pricing values
  const packagePrice =
    plan === "yearly" ? "₹20,000" : plan === "six-month" ? "₹12,000" : "₹3,000";
  const packageBillingText =
    plan === "yearly"
      ? "Yearly VIP (₹1,667/mo)"
      : plan === "six-month"
      ? "6-Month Package (₹2,000/mo)"
      : "Per Month";

  // Card brand detection helper
  const getCardBrand = (num: string) => {
    const clean = num.replace(/\s+/g, "");
    if (clean.startsWith("4")) return "visa";
    if (/^(5[1-5]|2[2-7])/.test(clean)) return "mastercard";
    if (/^6(0|5)/.test(clean) || clean.startsWith("8")) return "rupay";
    return "mastercard";
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 16);
    const formatted = digits.replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) {
      setExpiry(`${digits.slice(0, 2)}/${digits.slice(2, 4)}`);
    } else {
      setExpiry(digits);
    }
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 4);
    setCvc(digits);
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isSubmitting) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isSubmitting, onClose]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        if (onSuccess) onSuccess();
      }, 1600);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className={styles.modalOverlay}
        role="dialog"
        aria-modal="true"
        onClick={(e) => {
          if (e.target === e.currentTarget && !isSubmitting) onClose();
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 14 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className={styles.modalWindow}
        >
          {/* ==========================================================
              MODAL HEADER BAR (Clean Luxury - No Fake Browser Bar)
              ========================================================== */}
          <div className={styles.modalHeader}>
            <div className={styles.headerBrandGroup}>
              <img src="/logo.png" alt="ChatHeal" className={styles.brandLogo} />
              <span className={styles.headerBadge}>Plus Sanctuary</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div className={styles.securityPill}>
                <Lock size={11} />
                <span>256-Bit SSL Encrypted</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className={styles.closeBtn}
                aria-label="Close dialog"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* ==========================================================
              MODAL BODY (2-Column Split: Form + Plan Summary)
              ========================================================== */}
          <div className={styles.modalBody}>
            {/* LEFT COLUMN: Dynamic Payment Process Form */}
            <div className={styles.formCol}>
              <div className={styles.headingWrap}>
                <div className={styles.kickerRow}>
                  <span className={styles.kickerDot} />
                  <span>CHATHEAL PLUS MEMBERSHIP</span>
                </div>
                <h2 className={styles.mainTitle}>Upgrade to Plus</h2>
                <p className={styles.subTitle}>
                  Unlimited nutrition logs, custom recipes, and 1-on-1 coach
                  consultations.
                </p>
              </div>

              <form onSubmit={handleSubscribe} className={styles.formBody}>
                {/* Field: Billed To */}
                <div className={styles.sectionGroup}>
                  <label className={styles.sectionLabel}>
                    <span>Billed To</span>
                  </label>
                  <div className={styles.inputWrap}>
                    <input
                      type="text"
                      required
                      value={billedTo}
                      onChange={(e) => setBilledTo(e.target.value)}
                      placeholder="Full Name"
                    />
                  </div>
                </div>

                {/* Field: Payment Details */}
                <div className={styles.sectionGroup}>
                  <div className={styles.sectionLabel}>
                    <span>Payment Details</span>
                    <span className={styles.sectionLabelHint}>
                      {paymentMethod === "card"
                        ? "Card / RuPay / UPI"
                        : "NetBanking / Direct Transfer"}
                    </span>
                  </div>

                  {/* 2 Interactive Payment Method Tabs */}
                  <div className={styles.paymentTabsRow}>
                    {/* Tab 1: Credit / Debit / RuPay */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`${styles.paymentTabBtn} ${
                        paymentMethod === "card"
                          ? styles.paymentTabBtnActive
                          : ""
                      }`}
                    >
                      <CreditCard
                        size={17}
                        className={
                          paymentMethod === "card"
                            ? styles.paymentTabIconGreen
                            : styles.paymentTabIconMuted
                        }
                      />
                      <span className={styles.paymentTabTitle}>
                        Card / UPI
                      </span>
                    </button>

                    {/* Tab 2: Bank Transfer / NetBanking */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("bank")}
                      className={`${styles.paymentTabBtn} ${
                        paymentMethod === "bank"
                          ? styles.paymentTabBtnActive
                          : ""
                      }`}
                    >
                      <Building2
                        size={17}
                        className={
                          paymentMethod === "bank"
                            ? styles.paymentTabIconGreen
                            : styles.paymentTabIconMuted
                        }
                      />
                      <span className={styles.paymentTabTitle}>
                        NetBanking
                      </span>
                    </button>
                  </div>

                  {/* ==========================================================
                      DYNAMIC SECTION A: CARD / RUPAY / UPI
                      ========================================================== */}
                  {paymentMethod === "card" && (
                    <motion.div
                      key="card-view"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{ display: "flex", flexDirection: "column", gap: "8px" }}
                    >
                      {/* Card Number Input */}
                      <div className={styles.inputWrap}>
                        <input
                          type="text"
                          required
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          placeholder="Card Number (RuPay, Visa, Mastercard)"
                        />
                        <div className={styles.cardBrandsWrap}>
                          {getCardBrand(cardNumber) === "rupay" ? (
                            <span className={`${styles.brandBadge} ${styles.badgeRupay}`}>
                              RuPay
                            </span>
                          ) : getCardBrand(cardNumber) === "visa" ? (
                            <span className={`${styles.brandBadge} ${styles.badgeVisa}`}>
                              VISA
                            </span>
                          ) : (
                            <div className={styles.badgeMastercard}>
                              <div
                                style={{
                                  width: "14px",
                                  height: "14px",
                                  borderRadius: "50%",
                                  background: "#dc2626",
                                }}
                              />
                              <div
                                style={{
                                  width: "14px",
                                  height: "14px",
                                  borderRadius: "50%",
                                  background: "#f59e0b",
                                  marginLeft: "-5px",
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Expiry & CVC Grid */}
                      <div className={styles.gridTwoCol}>
                        <div className={styles.inputWrap}>
                          <input
                            type="text"
                            required
                            value={expiry}
                            onChange={handleExpiryChange}
                            placeholder="MM / YY"
                          />
                        </div>
                        <div className={styles.inputWrap}>
                          <input
                            type="text"
                            required
                            value={cvc}
                            onChange={handleCvcChange}
                            placeholder="CVC / CVV"
                          />
                          <Lock size={12} style={{ color: "#94a3b8", marginLeft: "6px" }} />
                        </div>
                      </div>

                      {/* Country & PIN Code Grid */}
                      <div className={styles.gridTwoCol}>
                        <div className={styles.inputWrap}>
                          <select
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                          >
                            <option value="India">India</option>
                            <option value="United States">United States</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="Canada">Canada</option>
                            <option value="Australia">Australia</option>
                            <option value="United Arab Emirates">UAE</option>
                            <option value="Singapore">Singapore</option>
                          </select>
                          <ChevronDown
                            size={14}
                            style={{
                              position: "absolute",
                              right: "12px",
                              color: "#64748b",
                              pointerEvents: "none",
                            }}
                          />
                        </div>

                        <div className={styles.inputWrap}>
                          <input
                            type="text"
                            required
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            placeholder="PIN / Postal Code"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* ==========================================================
                      DYNAMIC SECTION B: NETBANKING / DIRECT TRANSFER
                      ========================================================== */}
                  {paymentMethod === "bank" && (
                    <motion.div
                      key="bank-view"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{ display: "flex", flexDirection: "column", gap: "8px" }}
                    >
                      {/* Bank Selector */}
                      <div className={styles.inputWrap}>
                        <select
                          value={selectedBank}
                          onChange={(e) => setSelectedBank(e.target.value)}
                        >
                          <option value="HDFC Bank">HDFC Bank</option>
                          <option value="State Bank of India">State Bank of India (SBI)</option>
                          <option value="ICICI Bank">ICICI Bank</option>
                          <option value="Axis Bank">Axis Bank</option>
                          <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                          <option value="JPMorgan Chase">JPMorgan Chase</option>
                        </select>
                        <ChevronDown
                          size={14}
                          style={{
                            position: "absolute",
                            right: "12px",
                            color: "#64748b",
                            pointerEvents: "none",
                          }}
                        />
                      </div>

                      {/* IFSC & Account Number */}
                      <div className={styles.gridTwoCol}>
                        <div className={styles.inputWrap}>
                          <input
                            type="text"
                            required
                            value={ifscCode}
                            onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
                            placeholder="IFSC / Sort Code"
                          />
                        </div>
                        <div className={styles.inputWrap}>
                          <input
                            type="text"
                            required
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            placeholder="Account Number"
                          />
                        </div>
                      </div>

                      {/* Account Type Toggle */}
                      <div className={styles.bankRadioGroup}>
                        <button
                          type="button"
                          onClick={() => setAccountType("savings")}
                          className={`${styles.bankRadioBtn} ${
                            accountType === "savings"
                              ? styles.bankRadioBtnActive
                              : ""
                          }`}
                        >
                          <span
                            className={`${styles.bankRadioDot} ${
                              accountType === "savings"
                                ? styles.bankRadioDotActive
                                : ""
                            }`}
                          />
                          <span>Savings Account</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setAccountType("current")}
                          className={`${styles.bankRadioBtn} ${
                            accountType === "current"
                              ? styles.bankRadioBtnActive
                              : ""
                          }`}
                        >
                          <span
                            className={`${styles.bankRadioDot} ${
                              accountType === "current"
                                ? styles.bankRadioDotActive
                                : ""
                            }`}
                          />
                          <span>Current Account</span>
                        </button>
                      </div>

                      <div className={styles.bankInfoBanner}>
                        <ShieldCheck size={14} style={{ color: "#059669", flexShrink: 0 }} />
                        <span>Instant NetBanking authorization via NPCI &amp; RBI verified gateway.</span>
                      </div>
                    </motion.div>
                  )}

                </div>

                {/* Action Buttons */}
                <div className={styles.actionsRow}>
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={isSubmitting}
                    className={styles.cancelBtn}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting || isSuccess}
                    className={styles.subscribeBtn}
                  >
                    {isSuccess ? (
                      <>
                        <Check size={16} strokeWidth={2.5} />
                        <span>Enrolment Confirmed!</span>
                      </>
                    ) : isSubmitting ? (
                      <span>Processing Enrolment…</span>
                    ) : (
                      <span>Enrol Now — {packagePrice}</span>
                    )}
                  </button>
                </div>

                <p className={styles.termsText}>
                  By confirming, you authorize enrollment into your selected ChatHeal care package.
                  100% money-back satisfaction guarantee after first consultation.
                </p>
              </form>
            </div>

            {/* RIGHT COLUMN: 3 Package Selector & Inclusions */}
            <div className={styles.summaryCol}>
              <div className={styles.summaryColTop}>
                <h3 className={styles.planSectionHeading}>Select Care Package</h3>

                {/* Plan Selection Cards: 3 Packages */}
                <div className={styles.planOptionsGroup}>
                  {/* Option 1: Per Month (₹3,000) */}
                  <div
                    onClick={() => setPlan("monthly")}
                    className={`${styles.planCard} ${
                      plan === "monthly" ? styles.planCardActive : ""
                    }`}
                  >
                    <div
                      className={`${styles.planRadioCircle} ${
                        plan === "monthly" ? styles.planRadioCircleActive : ""
                      }`}
                    >
                      {plan === "monthly" && (
                        <div className={styles.planRadioInnerDot} />
                      )}
                    </div>
                    <div className={styles.planDetails}>
                      <span className={styles.planTitle}>Per Month</span>
                      <span className={styles.planPriceSub}>
                        ₹3,000 / month · Flexible reset
                      </span>
                    </div>
                  </div>

                  {/* Option 2: 6-Month Package (₹12,000) */}
                  <div
                    onClick={() => setPlan("six-month")}
                    className={`${styles.planCard} ${
                      plan === "six-month" ? styles.planCardActive : ""
                    }`}
                  >
                    <div
                      className={`${styles.planRadioCircle} ${
                        plan === "six-month" ? styles.planRadioCircleActive : ""
                      }`}
                    >
                      {plan === "six-month" && (
                        <div className={styles.planRadioInnerDot} />
                      )}
                    </div>
                    <div className={styles.planDetails}>
                      <span className={styles.planTitle}>6-Month Package</span>
                      <span className={styles.planPriceSub}>
                        ₹12,000 (Just ₹2,000/mo)
                      </span>
                    </div>
                    <span className={styles.savingsBadge}>Save 33%</span>
                  </div>

                  {/* Option 3: Yearly Package (₹20,000) */}
                  <div
                    onClick={() => setPlan("yearly")}
                    className={`${styles.planCard} ${
                      plan === "yearly" ? styles.planCardActive : ""
                    }`}
                  >
                    <div
                      className={`${styles.planRadioCircle} ${
                        plan === "yearly" ? styles.planRadioCircleActive : ""
                      }`}
                    >
                      {plan === "yearly" && (
                        <div className={styles.planRadioInnerDot} />
                      )}
                    </div>
                    <div className={styles.planDetails}>
                      <span className={styles.planTitle}>Yearly VIP Package</span>
                      <span className={styles.planPriceSub}>
                        ₹20,000 (Only ₹1,667/mo)
                      </span>
                    </div>
                    <span className={styles.savingsBadge}>Save 44% ★</span>
                  </div>
                </div>

                {/* Dynamic Feature Inclusions */}
                <div className={styles.breakdownBox}>
                  <div className={styles.breakdownLine}>
                    <span>Package Tier:</span>
                    <span>{packageBillingText}</span>
                  </div>
                  <div className={styles.breakdownLine}>
                    <span>Dietitian Consultations:</span>
                    <span className={styles.discountGreen}>
                      {plan === "yearly"
                        ? "24+ Video Sessions"
                        : plan === "six-month"
                        ? "12 Video Sessions"
                        : "2 Intake Sessions"}
                    </span>
                  </div>
                  <div className={styles.breakdownLine}>
                    <span>Daily Food Diary Coaching:</span>
                    <span>Full Access</span>
                  </div>
                  <div className={styles.breakdownLine}>
                    <span>WhatsApp Direct Access:</span>
                    <span>{plan === "yearly" ? "VIP 24/7 Priority" : "Included"}</span>
                  </div>
                </div>
              </div>

              {/* Inclusions Summary & Guarantee */}
              <div className={styles.summaryColBottom}>
                <div className={styles.totalRow}>
                  <span className={styles.totalLabel}>Total Package Price</span>
                  <span className={styles.totalPrice}>
                    {packagePrice}
                  </span>
                </div>

                <div className={styles.securityGuaranteeBox}>
                  <ShieldCheck size={16} className={styles.guaranteeIcon} />
                  <span>
                    Guaranteed safe &amp; secure, protected with RBI compliant
                    256-bit encryption standards.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
