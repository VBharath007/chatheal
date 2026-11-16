"use client";
import { useState } from "react";
import { Leaf, Heart, Activity, Moon, Check, ArrowUpRight, Droplet, Sun, ClipboardCheck, UserCheck, FileSearch, Sparkles, RefreshCw, ShieldCheck, Info, ChevronLeft, ChevronRight, Lightbulb, SlidersHorizontal, ChevronDown } from "lucide-react";
import Link from "next/link";
import { PageHero, SectionHeading, FeatureCard, Action, Reveal, IconTile } from "@/components/design/GlassUI";

export default function Approach() {
  const [activeCategory, setActiveCategory] = useState("All");

  const steps = [
    {
      step: "STEP 01",
      num: "01",
      title: "Initial Assessment",
      icon: ClipboardCheck,
      tone: "green" as const,
      image: "/images/stage1_assessment_clean.jpg",
      desc: "We gather relevant, comprehensive information about your current health status, everyday dietary patterns, metabolic background, stress levels, and daily routine."
    },
    {
      step: "STEP 02",
      num: "02",
      title: "Understanding Client Needs",
      icon: UserCheck,
      tone: "rose" as const,
      image: "/images/stage2_client_needs_clean.jpg",
      desc: "We take the time to understand your personal wellness goals, individual food culture, family kitchen habits, working hours, and specific dietary needs."
    },
    {
      step: "STEP 03",
      num: "03",
      title: "Health and Nutrition Review",
      icon: FileSearch,
      tone: "blue" as const,
      image: "/images/stage3_health_review_clean.jpg",
      desc: "Careful review of your available health information, recent metabolic reports and biomarker trends to identify underlying nutritional and digestive imbalances."
    },
    {
      step: "STEP 04",
      num: "04",
      title: "Customized Nutrition Plans",
      icon: Sparkles,
      tone: "amber" as const,
      image: "/images/stage4_custom_plan_clean.jpg",
      desc: "Creation of bespoke whole-food nutrition recommendations crafted specifically for your unique biochemistry — because we don't give everyone the same diet plan."
    },
    {
      step: "STEP 05",
      num: "05",
      title: "Holistic Wellness Guidance",
      icon: Sun,
      tone: "violet" as const,
      image: "/images/stage5_holistic_wellness_clean.jpg",
      desc: "Integration of complete lifestyle guidance: natural whole-food selections, deep hydration practices, natural detox drinks, yoga, physical workouts, and restorative sleep."
    },
    {
      step: "STEP 06",
      num: "06",
      title: "Progress Monitoring",
      icon: RefreshCw,
      tone: "green" as const,
      image: "/images/stage6_progress_monitoring_clean.jpg",
      desc: "Regular progress tracking, continuous feedback, and thoughtful plan calibrations to ensure your health transformation is gentle, enjoyable and lifelong."
    }
  ];

  const simplifiedBiomarkers = [
    {
      id: "01",
      num: "01",
      category: "Energy & Blood",
      emoji: "🩸",
      simpleTitle: "Oxygen & Immune Soldiers",
      formalTitle: "Complete Blood Count (CBC) • Red & White Cells",
      kidAnalogy: "Think of your blood like a superhero army! Red cells are delivery trucks carrying oxygen so you can play without getting tired, and white cells are brave shields that fight off colds and fevers.",
      chips: ["🛡️ Fights Invasions", "🏃 All-Day Energy", "🩸 Fresh Blood Flow"],
      foods: "Beetroot, pomegranate, fresh spinach, sweet apples & dates",
      image: "/images/bio_cbc_blood.jpg",
      whyItMatters: "Tells us if your cells have enough oxygen to play, study, and stay active without feeling sluggish or weak."
    },
    {
      id: "02",
      num: "02",
      category: "Sugar & Energy",
      emoji: "⚡",
      simpleTitle: "Sugar & Energy Fuel",
      formalTitle: "Fasting Glucose & 3-Month HbA1c",
      kidAnalogy: "Like checking how your body uses fuel from food! When blood sugar is balanced, food gives you smooth, steady playtime energy all day without sudden afternoon sleepiness or crankiness.",
      chips: ["⚡ Smooth Fuel", "🍬 No Sugar Crashes", "🔋 Steady Energy"],
      foods: "Steamed sprouts, cinnamon infusions, methi seeds & steel-cut oats",
      image: "/images/bio_glucose_sugar.jpg",
      whyItMatters: "Ensures the carbohydrates you eat get turned into active energy rather than causing tiredness or insulin stress."
    },
    {
      id: "03",
      num: "03",
      category: "Heart & Pipes",
      emoji: "❤️",
      simpleTitle: "Clean Blood Pipes",
      formalTitle: "Lipid Profile • Good (HDL) & Bad (LDL) Fats",
      kidAnalogy: "Like water pipes in a house! Good fats (HDL) act like friendly pipe cleaners that keep blood moving smoothly, while bad fats (LDL) are sticky grease we want to keep away so your heart pumps easily.",
      chips: ["❤️ Happy Heart", "🚰 Clear Blood Flow", "🥑 Healthy Good Fats"],
      foods: "Flaxseeds, walnuts, chia seeds, avocado & extra virgin cold-pressed oils",
      image: "/images/bio_lipid_heart.jpg",
      whyItMatters: "Keeps your blood vessels clean and flexible so blood flows effortlessly to your brain, muscles, and heart."
    },
    {
      id: "04",
      num: "04",
      category: "Cleanse & Detox",
      emoji: "🧼",
      simpleTitle: "The Master Body Filter",
      formalTitle: "Liver Function Test (LFT) • Enzymes & Bile",
      kidAnalogy: "Your liver is like the body's superpower washing machine! It washes and filters everything you eat, clears out chemicals or junk, and packages clean nutrients for your body.",
      chips: ["🧼 Natural Filter", "🌿 Toxin Cleaning", "🍽️ Smooth Digestion"],
      foods: "Turmeric-ginger water, fresh amla, cucumber-mint cooler & lemon water",
      image: "/images/bio_lft_liver.jpg",
      whyItMatters: "Ensures your body naturally purifies itself without needing harsh detox products or artificial supplements."
    },
    {
      id: "05",
      num: "05",
      category: "Cleanse & Detox",
      emoji: "💧",
      simpleTitle: "Pure Water & Waste Flusher",
      formalTitle: "Kidney Function Test (KFT) • Creatinine & Urea",
      kidAnalogy: "Your kidneys are twin water filters! They sift through your blood 24/7, wash out waste into pee, balance your body's water level, and stop your face or feet from feeling bloated.",
      chips: ["💧 Water Balance", "🚽 Waste Flusher", "🥒 Zero Water Retention"],
      foods: "Coconut water, cucumber slices, barley water & plenty of structured fluids",
      image: "/images/bio_kft_kidney.jpg",
      whyItMatters: "Monitors fluid balance, hydration levels, and how efficiently your kidneys clear metabolic waste."
    },
    {
      id: "06",
      num: "06",
      category: "Sugar & Energy",
      emoji: "⏱️",
      simpleTitle: "The Body's Speedometer",
      formalTitle: "Thyroid Panel • TSH, Free T3 & Free T4",
      kidAnalogy: "The thyroid is like the gas pedal in a car! It tells every cell how fast or slow to burn fuel. If it's too slow, you feel cold and sleepy; if it's just right, you feel active, warm, and happy.",
      chips: ["🏎️ Metabolism Speed", "🔥 Body Warmth", "⚖️ Healthy Weight Control"],
      foods: "Brazil nuts (selenium), pumpkin seeds, iodine-rich greens & seaweed",
      image: "/images/bio_thyroid_speed.jpg",
      whyItMatters: "Governs metabolic burn rate, body temperature regulation, daily enthusiasm, and hormone harmony."
    },
    {
      id: "07",
      num: "07",
      category: "Brain & Bones",
      emoji: "☀️",
      simpleTitle: "Sunshine Super-Vitamin",
      formalTitle: "Vitamin D3 (25-Hydroxy)",
      kidAnalogy: "The magical sunshine vitamin! It acts like super-strong cement that binds calcium into your bones and teeth so they never get brittle, and it keeps your mood smiling and sunny.",
      chips: ["🦴 Rock-Solid Bones", "☀️ Sunshine Power", "😊 Cheerful Mood"],
      foods: "Morning sunlight exposure (15 mins), fortified mushrooms & whole seeds",
      image: "/images/bio_vitamind_sun.jpg",
      whyItMatters: "Critical for immune defense, bone strength, deep muscle contraction, and uplifting emotional resilience."
    },
    {
      id: "08",
      num: "08",
      category: "Brain & Bones",
      emoji: "🧠",
      simpleTitle: "Brain Spark Plug",
      formalTitle: "Vitamin B12 & Folate",
      kidAnalogy: "Like high-speed Wi-Fi wires connecting your brain and nerves! It helps you think fast in school, memorize things easily, stops your hands from feeling tingling, and gives you vibrant energy.",
      chips: ["🧠 Lightning Thinking", "⚡ Sharp Memory", "🔌 Strong Nerve Wires"],
      foods: "Curd/yogurt, fortified nutritional yeast, fermented dosas & sprouted pulses",
      image: "/images/natural_wholefoods.jpg",
      whyItMatters: "Prevents brain fog, keeps the nervous system razor-sharp, and supports new red blood cell creation."
    },
    {
      id: "09",
      num: "09",
      category: "Energy & Blood",
      emoji: "🚚",
      simpleTitle: "Oxygen Delivery Trucks",
      formalTitle: "Iron Profile & Ferritin Reserve",
      kidAnalogy: "Iron particles are like tiny delivery trucks inside your red blood cells. When your iron tank is full, plenty of oxygen reaches your muscles, so you can play soccer or dance without panting!",
      chips: ["🚚 Oxygen Carriers", "💪 No Weakness", "🏃 Great Playtime Stamina"],
      foods: "Moringa leaves, black raisins, roasted sesame chikki & dark leafy greens",
      image: "/images/plated_quinoa_nourish.jpg",
      whyItMatters: "Reveals both your active iron and deep backup storage (ferritin) to prevent hidden exhaustion and hair thinning."
    },
    {
      id: "10",
      num: "10",
      category: "Cleanse & Detox",
      emoji: "🚨",
      simpleTitle: "Internal Fire Alarm",
      formalTitle: "Inflammatory Marker • High-Sensitivity CRP",
      kidAnalogy: "Like a smoke detector inside your body! It tells us if your cells are quiet and peaceful, or if there's any hidden redness, soreness, or irritation that needs soothing cooling food.",
      chips: ["🚨 Smoke Detector", "❄️ Calms Cell Stress", "🌿 Soothing Healing"],
      foods: "Raw turmeric latte, ginger infusions, antioxidant berries & green tea",
      image: "/images/ginger_turmeric_tonic.jpg",
      whyItMatters: "Detects low-grade silent irritation before it turns into chronic joint pain, digestive distress, or fatigue."
    },
    {
      id: "11",
      num: "11",
      category: "Heart & Pipes",
      emoji: "🔋",
      simpleTitle: "Electric Battery Salts",
      formalTitle: "Electrolytes • Sodium, Potassium, Magnesium",
      kidAnalogy: "Your body is powered by tiny electric sparks! These minerals are like natural battery salts that stop muscle cramps when you exercise, keep your heart rhythm steady, and help you sleep like a baby.",
      chips: ["🔋 Battery Minerals", "🚫 Zero Muscle Cramps", "😴 Deep Relaxed Sleep"],
      foods: "Tender coconut water, soaked almonds, pumpkin seeds & banana smoothies",
      image: "/images/iced_matcha_detox.jpg",
      whyItMatters: "Maintains optimal hydration inside cells, prevents leg cramps, and relaxes muscle tension after long busy days."
    }
  ];

  const categories = [
    { label: "All Checks", value: "All", emoji: "🌟", count: 11 },
    { label: "Energy & Blood", value: "Energy & Blood", emoji: "🩸", count: 2 },
    { label: "Sugar & Energy", value: "Sugar & Energy", emoji: "⚡", count: 2 },
    { label: "Heart & Pipes", value: "Heart & Pipes", emoji: "❤️", count: 3 },
    { label: "Cleanse & Detox", value: "Cleanse & Detox", emoji: "🧼", count: 2 },
    { label: "Brain & Bones", value: "Brain & Bones", emoji: "🧠", count: 2 }
  ];

  const filteredBiomarkers = activeCategory === "All"
    ? simplifiedBiomarkers
    : simplifiedBiomarkers.filter(b => b.category === activeCategory);

  return (
    <main className="gl-page">
      <PageHero
        eyebrow="OUR UNIQUE APPROACH"
        title={<>One Body.<br /><span>One Unique Health Plan.</span></>}
        text="A transparent, six-stage personalized methodology that bridges natural whole-food science, mindful lifestyle practices, and compassionate 1-on-1 mentorship."
        icon={Activity}
        image="/images/nature.jpg"
      />

      {/* 6-STAGE PROCESS */}
      <section id="assessment" className="gl-container gl-section">
        <SectionHeading
          eyebrow="THE 6-STAGE METHODOLOGY"
          title={<>How We Craft Your Personal<br /><span>Nutrition & Wellness Plan.</span></>}
          text="Grounding every decision in your individual health data and day-to-day realities."
          centered
        />
        <div className="gl-stage-grid">
          {steps.map((p) => (
            <Reveal className="gl-stage-card" key={p.step}>
              <div className="gl-stage-img-wrap">
                <img src={p.image} alt={p.title} />
                <span className="gl-stage-kicker-badge">{p.step}</span>
                <div style={{ position: "absolute", top: "12px", right: "12px", zIndex: 2 }}>
                  <IconTile icon={p.icon} tone={p.tone} small />
                </div>
              </div>
              <div className="gl-stage-body">
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 4 CONNECTED PILLARS & HOLISTIC WELLNESS */}
      <section id="pillars" className="gl-soft-band">
        <div className="gl-container gl-section">
          <SectionHeading
            eyebrow="HOLISTIC WELLNESS FOUNDATION"
            title={<>A Whole-Person Wellness Approach.<br /><span>Beyond Restrictive Diets.</span></>}
            text="Natural food achieves its highest cellular efficacy when harmonized with clean hydration, physical resilience, restorative sleep, and mindful living."
          />
          <div className="gl-pillar-grid">
            <Reveal className="gl-pillar-card">
              <div className="gl-pillar-img-wrap">
                <img
                  src="/images/pillar1_whole_foods.jpg"
                  alt="Whole Foods & Mindful Eating"
                />
                <span className="gl-pillar-badge">Pillar 01 • Nutrition</span>
                <div style={{ position: "absolute", top: "12px", right: "12px", zIndex: 2 }}>
                  <IconTile icon={Leaf} tone="green" small />
                </div>
              </div>
              <div className="gl-pillar-body">
                <h3>Whole Foods & Mindful Eating</h3>
                <p>
                  Unprocessed, colourful, nutrient-dense whole ingredients prepared with traditional awareness. Conscious chewing and mindful meal timing to support digestive ease and cellular replenishment.
                </p>
              </div>
            </Reveal>

            <Reveal className="gl-pillar-card">
              <div className="gl-pillar-img-wrap">
                <img
                  src="/images/pillar2_hydration_detox.jpg"
                  alt="Hydration & Botanical Detox Drinks"
                />
                <span className="gl-pillar-badge">Pillar 02 • Hydration</span>
                <div style={{ position: "absolute", top: "12px", right: "12px", zIndex: 2 }}>
                  <IconTile icon={Droplet} tone="blue" small />
                </div>
              </div>
              <div className="gl-pillar-body">
                <h3>Hydration & Detox Drinks</h3>
                <p>
                  Strategic daily fluid intake paired with natural botanical detox drinks (ginger, lemon, mint, turmeric) that support the body's innate liver and kidney functions, flush cellular waste, and refresh vitality.
                </p>
              </div>
            </Reveal>

            <Reveal className="gl-pillar-card">
              <div className="gl-pillar-img-wrap">
                <img
                  src="/images/pillar3_yoga_movement.jpg"
                  alt="Yoga & Strengthening Workouts"
                />
                <span className="gl-pillar-badge">Pillar 03 • Movement</span>
                <div style={{ position: "absolute", top: "12px", right: "12px", zIndex: 2 }}>
                  <IconTile icon={Activity} tone="orange" small />
                </div>
              </div>
              <div className="gl-pillar-body">
                <h3>Yoga & Strengthening Workouts</h3>
                <p>
                  Restorative yoga poses for joint mobility and mind-body harmony, combined with progressive strengthening exercises to build endurance, muscle stamina, insulin sensitivity, and bone density.
                </p>
              </div>
            </Reveal>

            <Reveal className="gl-pillar-card">
              <div className="gl-pillar-img-wrap">
                <img
                  src="/images/pillar4_restorative_sleep.jpg"
                  alt="Restorative Sleep & Circadian Stamina"
                />
                <span className="gl-pillar-badge">Pillar 04 • Recovery</span>
                <div style={{ position: "absolute", top: "12px", right: "12px", zIndex: 2 }}>
                  <IconTile icon={Moon} tone="violet" small />
                </div>
              </div>
              <div className="gl-pillar-body">
                <h3>Restorative Sleep & Stamina</h3>
                <p>
                  Aligning circadian rhythms, winding down without screen exposure, and prioritizing 7-8 hours of sound sleep for cellular regeneration, metabolic repair, hormonal rebalance, and lasting daily energy.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* DETOXIFICATION & NATURAL ELIXIRS GUIDE (DETAILED PPT TOPICS) */}
      {/* <section id="detox-guide" className="gl-container gl-section">
        <SectionHeading
          eyebrow="DETOX & NATURAL WELLNESS GUIDE"
          title={<>The Science of Natural Detoxification.<br /><span>Everyday Cleansing & Vitality.</span></>}
          text="How targeted botanical infusions, clean whole-food transitions and natural hydration work together to ease cellular toxin burdens."
          centered
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px", marginTop: "32px" }}>
          {[
            {
              title: "1. The Ubiquity of Toxins in Our Food",
              desc: "Processed additives, synthetic preservatives, pesticides and environmental chemicals constantly challenge our natural elimination channels. Understanding what enters your body is the first step toward cellular renewal.",
              tag: "Food Awareness"
            },
            {
              title: "2. The Power of Detox Drinks",
              desc: "Fresh, nutrient-dense natural infusions deliver bioavailable antioxidants, micronutrients and hydration that help support your liver, kidneys and digestive tract in their daily cleansing tasks.",
              tag: "Hydration Therapy"
            },
            {
              title: "3. Key Ingredients for Effective Detox",
              desc: "Mother nature’s most potent botanicals: fresh ginger, raw turmeric, cold-pressed lemon, cucumber, mint, amla and tender greens work in synergy to gently restore metabolic balance.",
              tag: "Natural Actives"
            },
            {
              title: "4. Simple Natural Drink Recipes",
              desc: "Easily prepared morning and midday infusions: Warm Lemon-Ginger Elixir, Cucumber-Mint Cooler, and Amla-Cumin Digestive Tonic — everyday hydration routines you can prepare in 5 minutes.",
              tag: "Everyday Recipes"
            },
            {
              title: "5. Beyond Drinks: A Holistic Approach",
              desc: "True detoxification doesn't happen in a glass alone. It requires restorative sleep, mindful eating, gut biome nourishment, stress management and daily gentle physical movement.",
              tag: "Whole Lifestyle"
            },
            {
              title: "6. Tackling Food Toxins for a Healthier You",
              desc: "Transition smoothly from preservative-laden packaged meals to colourful, unadulterated whole foods that fuel your cells and naturally reduce systemic inflammatory burdens.",
              tag: "Clean Nutrition"
            }
          ].map((dt) => (
            <Reveal key={dt.title} className="gl-glass" style={{ padding: "30px", borderRadius: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <span className="gl-pill" style={{ background: "#e1f3e7", color: "#1d684f", marginBottom: "14px" }}>
                  <Droplet size={13} /> {dt.tag}
                </span>
                <h3 style={{ fontSize: "18px", fontWeight: 700, margin: "10px 0 12px", color: "var(--gl-ink)" }}>{dt.title}</h3>
                <p style={{ fontSize: "14px", lineHeight: "1.7", color: "var(--gl-muted)" }}>{dt.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section> */}

      {/* HEALTH FOCUS CONVERSATIONS */}
      {/* <section className="gl-container gl-section">
        <SectionHeading
          eyebrow="HEALTH FOCUS AREAS"
          title={<>Targeted Wellness Guidance<br /><span>Built Around Your Needs.</span></>}
          text="We provide thoughtful nutritional counseling across a wide spectrum of lifestyle and chronic health concerns."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            'Autoimmune Disease Management',
            'Diabetes Reversal Strategies',
            'Thyroid Health & Optimization',
            'Tackling Obesity & Visceral Fat',
            'Lowering Bad Cholesterol Naturally',
            'Reversing Chronic Fatigue & Conditions',
            'Gut Microbiome & Digestive Renewal',
            'Hormonal Balance & Cellular Wellness',
            'Post-Recovery Energy & Vitality'
          ].map((t) => (
            <Link className="gl-glass gl-support-link" href="/contact" key={t} style={{ padding: "20px 24px", borderRadius: "14px" }}>
              <Check size={19} style={{ color: "#1d684f" }} />
              <span style={{ fontSize: "14px", fontWeight: 600 }}>{t}</span>
              <ArrowUpRight size={17} />
            </Link>
          ))}
        </div>
        <p className="gl-note">
          *Important Notice: These are areas for nutritional guidance and lifestyle education. Chat Heal does not offer automated diagnosis, medical prescriptions, or guaranteed reversal claims. Nutrition plans are designed to safely complement your healthcare provider's care.
        </p>
      </section> */}

      {/* SECTION: A COMPLETE PICTURE & BIOMARKER OVERVIEW */}
      <section className="gl-container gl-biomarker-section" id="biomarkers">
        <SectionHeading
          eyebrow="CLEAR & SIMPLE HEALTH CHECKS"
          title={<>Inside Your Body's Health Engine.<br /><span>Explained So Simply Anyone Can Understand.</span></>}
          text="No confusing medical jargon. Here is exactly what our 11 vital wellness checks look for — and the wholesome foods that power them every day."
        />

        {/* CATEGORY FILTER BAR */}
        <div className="gl-bio-filter-bar">
          {/* Mobile Header: Quick Select & Count */}
          <div className="gl-bio-mobile-header">
            <div className="gl-bio-mobile-select-wrap">
              <SlidersHorizontal size={14} className="gl-bio-select-icon" />
              <select
                value={activeCategory}
                onChange={(e) => {
                  const val = e.target.value;
                  setActiveCategory(val);
                  const btn = document.getElementById(`bio-pill-${val.replace(/\s+/g, '-')}`);
                  btn?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                }}
                className="gl-bio-mobile-select"
                aria-label="Filter Biomarkers"
              >
                {categories.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.emoji} {c.label} ({c.count})
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="gl-bio-select-caret" />
            </div>

            <div className="gl-bio-counter-badge gl-bio-counter-mobile">
              <span>{filteredBiomarkers.length}</span> / {simplifiedBiomarkers.length} Checks
            </div>
          </div>

          {/* Swipeable Pills Track on Mobile / Flex Row on Desktop */}
          <div className="gl-bio-pills-scroll-wrapper">
            <div className="gl-bio-filter-pills" role="tablist">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.value;
                return (
                  <button
                    key={cat.value}
                    id={`bio-pill-${cat.value.replace(/\s+/g, '-')}`}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`gl-bio-filter-btn ${isActive ? "is-active" : ""}`}
                    onClick={() => {
                      setActiveCategory(cat.value);
                      const btn = document.getElementById(`bio-pill-${cat.value.replace(/\s+/g, '-')}`);
                      btn?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                    }}
                  >
                    <span className="gl-bio-pill-emoji">{cat.emoji}</span>
                    <span className="gl-bio-pill-text">{cat.label}</span>
                    <span className={`gl-bio-pill-count ${isActive ? "is-active-count" : ""}`}>
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Desktop-only Counter Badge */}
          <div className="gl-bio-counter-badge gl-bio-counter-desktop">
            Showing {filteredBiomarkers.length} of {simplifiedBiomarkers.length} Checks
          </div>
        </div>

        {/* 3-COLUMN FULL CARDS GRID - 100% VISIBLE, NO TRUNCATION */}
        <div className="gl-bio-cards-grid">
          {filteredBiomarkers.map((item) => (
            <Reveal key={item.id} className="gl-bio-card">
              <div className="gl-bio-card-media">
                <img src={item.image} alt={item.simpleTitle} />
                <div className="gl-bio-card-top-badges">
                  <span className="gl-bio-badge-tag">{item.category}</span>
                  <span className="gl-bio-badge-num">CHECK {item.num}</span>
                </div>
              </div>

              <div className="gl-bio-card-body">
                <h3 className="gl-bio-card-heading">
                  <span>{item.emoji}</span>
                  <span>{item.simpleTitle}</span>
                </h3>

                <span className="gl-bio-card-formal">
                  {item.formalTitle}
                </span>

                {/* 10-YEAR OLD FRIENDLY ANALOGY BOX - FULL TEXT, NO CUTOFF */}
                <div className="gl-bio-analogy-box">
                 
                  <p className="gl-bio-analogy-text">
                    "{item.kidAnalogy}"
                  </p>
                </div>

                {/* HIGHLIGHT CHIPS */}
                <div className="gl-bio-chips-row">
                  {item.chips.map((chip) => (
                    <span key={chip} className="gl-bio-highlight-chip">
                      {chip}
                    </span>
                  ))}
                </div>

                {/* NATURAL FOODS THAT POWER IT */}
                <div className="gl-bio-foods-row">
                  <Leaf size={16} style={{ color: "#1d684f", flexShrink: 0, marginTop: "2px" }} />
                  <div>
                    <strong>Foods That Fuel This: </strong>
                    <span>{item.foods}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* TWO QA HIGHLIGHT CARDS & TRANSPARENCY NOTICE */}
        <div className="gl-bio-qa-row">
          <Reveal className="gl-biomarker-qa-card">
            <h4>
              <Leaf size={18} style={{ color: "#1d684f" }} />
              What does wellness & detox mean here?
            </h4>
            <p>
              The focus is on wholesome natural foods, purposeful hydration, restorative sleep, yoga, and progressive stamina workouts. Clean botanical drinks support daily liver and kidney hydration — they are not extreme medical flushes or artificial promises.
            </p>
          </Reveal>

          <Reveal className="gl-biomarker-qa-card">
            <h4>
              <RefreshCw size={18} style={{ color: "#1d684f" }} />
              How will my plan evolve over time?
            </h4>
            <p>
              Your weekly review assesses your ongoing metabolic response and how smoothly the recommendations fit your daily routine. Recipes, portions, and wellness practices are continuously and gently recalibrated with Sujitha.
            </p>
          </Reveal>
        </div>

        <div style={{ marginTop: "24px", padding: "16px 20px", background: "#f5f9f4", borderRadius: "18px", border: "1px solid #dcece2", display: "flex", gap: "14px", alignItems: "start" }}>
          <Info size={19} style={{ color: "#286b50", flexShrink: 0, marginTop: "2px" }} />
          <p style={{ fontSize: "12.5px", lineHeight: "1.7", color: "#4f6e5e", margin: 0 }}>
            <strong>Clinical Transparency:</strong> Biomarker reviews provide physiological context to tailor nutrient density safely. ChatHeal does not replace medical diagnostics or prescribe treatments; always consult your primary physician.
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="gl-container gl-section">
        <Reveal className="gl-cta">
          <div>
            <span className="gl-kicker">GET STARTED TODAY</span>
            <h2>Experience the Power of<br /><span>Personalized Nutrition.</span></h2>
            <p>"We don't give everyone the same diet plan." Start your assessment with Sujitha now.</p>
          </div>
          <div className="gl-cta-actions">
            <Action href="/assessment">BOOK NOW</Action>
            <Link href="/contact" style={{ color: "#365c3e", fontWeight: 650 }}>Speak with Sujitha</Link>
          </div>
          <Leaf className="gl-cta-decoration" size={190} strokeWidth={0.7} aria-hidden="true" />
        </Reveal>
      </section>
    </main>
  );
}
