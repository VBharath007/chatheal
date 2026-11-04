export type PackagePlan = {
  id: "monthly" | "six-month" | "yearly";
  slug: string;
  title: string;
  eyebrow: string;
  period: string;
  durationLabel: string;
  billingNote: string;
  price: number;
  effectiveMonthly: number;
  savingsPercent?: number;
  savingsText?: string;
  badge?: string;
  popular?: boolean;
  featured?: boolean;
  tagline: string;
  description: string;
  image: string;
  accent: string;
  features: string[];
  inclusions: { label: string; value: string }[];
};

export const packages: PackagePlan[] = [
  {
    id: "monthly",
    slug: "monthly-care",
    title: "Per Month Care",
    eyebrow: "FLEXIBLE STARTER",
    period: "Per Month",
    durationLabel: "30-Day Guided Reset",
    billingNote: "Billed monthly · Cancel or pause anytime",
    price: 3000,
    effectiveMonthly: 3000,
    badge: "FLEXIBLE ENTRY",
    popular: false,
    featured: false,
    tagline: "A gentle 30-day guided reset with clinical dietitian mentorship.",
    description:
      "Ideal for establishing dietary awareness, calibrating daily macros, and experiencing high-touch nutrition coaching with zero long-term commitment.",
    image: "/images/breakfast.jpg",
    accent: "sand",
    features: [
      "Personal clinical nutrition assessment",
      "1-on-1 onboarding intake consultation with Sujitha C.",
      "Custom calorie, macro & portion framework",
      "30 days of active food diary & meal log review",
      "Weekly routine calibrations & habit feedback",
      "Full ChatHeal Portal: 100+ Whole-Food Recipes",
      "Dedicated WhatsApp direct support (Mon–Fri)",
    ],
    inclusions: [
      { label: "1:1 Consultations", value: "2 Sessions" },
      { label: "Food Diary Coaching", value: "Daily Feedback" },
      { label: "Diet Recalibration", value: "Weekly" },
      { label: "Support Access", value: "WhatsApp Direct" },
    ],
  },
  {
    id: "six-month",
    slug: "six-month-transformation",
    title: "6-Month Transformation",
    eyebrow: "SUSTAINABLE TRANSFORMATION",
    period: "6 Month Package",
    durationLabel: "6 Months Habit Mastery",
    billingNote: "₹12,000 for 6 months (Just ₹2,000/mo)",
    price: 12000,
    effectiveMonthly: 2000,
    savingsPercent: 33,
    savingsText: "Save ₹6,000 (33% off)",
    badge: "MOST POPULAR CHOICE ★",
    popular: true,
    featured: true,
    tagline: "Deep metabolic habit mastery & long-term physiological transformation.",
    description:
      "The gold-standard timeframe for hormonal balancing, visceral fat reduction, gut health repair, and building unconscious healthy habits that last.",
    image: "/images/greens.jpg",
    accent: "sage",
    features: [
      "Everything in Monthly Care, plus:",
      "12 Scheduled 1-on-1 video consultations (bi-weekly)",
      "Comprehensive blood report & pathology gap analysis",
      "Personalized anti-inflammatory & gut-health protocol",
      "Custom dining-out, social events & travel guidance",
      "Dynamic metabolic adjustments as weight/routine evolves",
      "Priority WhatsApp coach access (Mon–Sat)",
      "14-day pause flexibility during vacations",
    ],
    inclusions: [
      { label: "1:1 Consultations", value: "12 Video Sessions" },
      { label: "Biomarker Review", value: "Bi-Annual Analysis" },
      { label: "Gut & Hormone Focus", value: "Full Protocol" },
      { label: "Pause Flexibility", value: "Up to 14 Days" },
    ],
  },
  {
    id: "yearly",
    slug: "yearly-vip",
    title: "Yearly Package",
    eyebrow: "COMPLETE HEALTH MASTERY",
    period: "Yearly Package (12 Months)",
    durationLabel: "365-Day VIP Partnership",
    billingNote: "₹20,000 billed annually (Only ₹1,667/mo)",
    price: 20000,
    effectiveMonthly: 1667,
    savingsPercent: 44,
    savingsText: "Save ₹16,000 (44% off · Best Value)",
    badge: "BEST VALUE · VIP PARTNERSHIP",
    popular: false,
    featured: true,
    tagline: "365 days of dedicated clinical mentorship for lifelong vitality.",
    description:
      "Our premier VIP partnership. A year-long transformative alliance with Nutritionist Sujitha C. covering seasonal adaptations, longevity protocols, and total lifestyle harmony.",
    image: "/images/hero.jpg",
    accent: "emerald",
    features: [
      "Everything in 6-Month Transformation, plus:",
      "24 Scheduled 1-on-1 video consultations + on-demand check-ins",
      "Quarterly clinical pathology & biomarker progress tracking (4x/year)",
      "Bespoke grocery list & pantry makeover consultation",
      "Seasonal dietary resets & festival detox frameworks",
      "VIP 24/7 priority response & direct coach line",
      "Family nutrition alignment & mindful cooking coaching",
      "30-day vacation pause protection anytime",
      "Complimentary access to all future wellness masterclasses",
    ],
    inclusions: [
      { label: "1:1 Consultations", value: "24+ Video Sessions" },
      { label: "Biomarker Review", value: "Quarterly (4x/year)" },
      { label: "Grocery & Pantry", value: "Personalized Curation" },
      { label: "Support Level", value: "VIP 24/7 Priority" },
    ],
  },
];

export type Programme = {
  slug: string;
  title: string;
  eyebrow: string;
  category: string;
  description: string;
  image: string;
  weeks: number;
  price: number;
  features: string[];
  accent: string;
};
// Presentation-only catalogue. Durations and inclusions require client approval.
export const programmes: Programme[] = [
  {
    slug: "everyday-nourish",
    title: "Everyday Nourish",
    eyebrow: "A GENTLER START",
    category: "Everyday wellness",
    description:
      "Make everyday meals work for your everyday life. Build a foundation of whole foods, mindful eating and sustainable routines.",
    image: "/images/greens.jpg",
    weeks: 4,
    price: 1499,
    features: [
      "Personal nutrition assessment",
      "Coach-reviewed food routine",
      "Daily calorie & macro diary",
      "Recipe and wellness library",
    ],
    accent: "sage",
  },
  {
    slug: "balanced-living",
    title: "Balanced Living",
    eyebrow: "MORE PERSONAL SUPPORT",
    category: "Weight & habits",
    description:
      "A more considered approach to weight and wellbeing. Understand your habits, enjoy familiar foods and find a routine you can return to.",
    image: "/images/hero.jpg",
    weeks: 8,
    price: 3499,
    features: [
      "Everything in Everyday Nourish",
      "Personalised nutrition guidance",
      "Scheduled one-to-one check-ins",
      "Weekly progress conversations",
    ],
    accent: "sand",
  },
  {
    slug: "whole-you",
    title: "The Whole You",
    eyebrow: "FOOD. MOVEMENT. REST.",
    category: "Holistic wellbeing",
    description:
      "Bring nourishment, gentle movement and restorative routines together, with personal support that sees the bigger picture.",
    image: "/images/yoga.jpg",
    weeks: 12,
    price: 5999,
    features: [
      "Personalised wellness roadmap",
      "Nutrition and lifestyle review",
      "Movement & mindfulness resources",
      "Ongoing coach check-ins",
    ],
    accent: "blue",
  },
];
export const topics = [
  {
    title: "Weight & everyday habits",
    text: "Practical nutrition support built around your routine.",
    icon: "leaf",
  },
  {
    title: "Metabolic wellbeing",
    text: "Food and lifestyle conversations alongside your existing care.",
    icon: "activity",
  },
  {
    title: "Thyroid & nutrition",
    text: "Individual food habits discussed with your coach.",
    icon: "heart",
  },
  {
    title: "Whole-body wellbeing",
    text: "Connect movement, sleep, hydration and mindful eating.",
    icon: "sun",
  },
];
export const recipes = [
  {
    slug: "everyday-nourish-bowl",
    title: "The everyday nourish bowl",
    image: "/images/greens.jpg",
    tag: "Lunch",
    time: 15,
    calories: 380,
    description:
      "A colourful bowl with chickpeas, crunchy vegetables and a lemon dressing.",
    ingredients: [
      "100 g cooked chickpeas",
      "½ cucumber",
      "1 tomato",
      "½ avocado",
      "Lemon juice and olive oil",
    ],
    steps: [
      "Rinse and drain the chickpeas.",
      "Chop your vegetables into bite-sized pieces.",
      "Whisk lemon juice with a little olive oil.",
      "Toss everything together and enjoy.",
    ],
  },
  {
    slug: "slow-morning-oats",
    title: "Slow-morning berry oats",
    image: "/images/breakfast.jpg",
    tag: "Breakfast",
    time: 10,
    calories: 290,
    description: "Warm, creamy oats, fresh berries and a scattering of seeds.",
    ingredients: [
      "40 g rolled oats",
      "150 ml milk of your choice",
      "75 g fresh berries",
      "1 tsp pumpkin seeds",
    ],
    steps: [
      "Simmer the oats and milk gently for five minutes.",
      "Spoon into your favourite bowl.",
      "Add the berries and seeds just before serving.",
    ],
  },
  {
    slug: "colourful-weekday-bowl",
    title: "A colourful weekday bowl",
    image: "/images/hero.jpg",
    tag: "Lunch",
    time: 20,
    calories: 420,
    description:
      "A satisfying mix of seasonal vegetables, cooked grains and your favourite protein.",
    ingredients: [
      "100 g cooked rice",
      "100 g cooked chickpeas",
      "Mixed seasonal vegetables",
      "Fresh herbs",
      "Lemon dressing",
    ],
    steps: [
      "Cook your grains and allow to cool slightly.",
      "Prepare the vegetables and protein.",
      "Arrange in a bowl, add herbs and finish with dressing.",
    ],
  },
];
export const articles = [
  {
    slug: "whole-foods",
    category: "NUTRITION",
    title: "Good food. Fewer complications.",
    image: "/images/greens.jpg",
    intro:
      "Whole-food nutrition starts with ingredients you recognise and meals you enjoy.",
    paragraphs: [
      "Build a routine around familiar vegetables, fruits, grains, pulses and other foods that fit your preferences. A sustainable eating pattern should feel possible on your busiest days.",
      "Your coach can help you review portions and combinations. The goal is a flexible routine, with space for the foods and traditions that matter to you.",
    ],
  },
  {
    slug: "mindful-routines",
    category: "MINDFUL LIVING",
    title: "A little space for yourself.",
    image: "/images/calm.jpg",
    intro: "Eating, resting and moving all have a place in your day.",
    paragraphs: [
      "Start by noticing your routine. When do you make time for meals? What makes it easier to pause? Which small changes feel realistic?",
      "Use your journal to reflect on the habits you want to practise. Bring your questions to your next check-in and choose one manageable step together.",
    ],
  },
  {
    slug: "move-your-way",
    category: "MOVEMENT",
    title: "Movement that meets you where you are.",
    image: "/images/yoga.jpg",
    intro: "Create a little more room for movement in a way that suits you.",
    paragraphs: [
      "Your preferences and current ability matter. Discuss suitable yoga, strength or endurance activities with your coach and an appropriate professional where needed.",
      "Consistency can begin with a small, comfortable routine. Your programme should adapt to you, and leave room for rest.",
    ],
  },
];
export const money = (n?: number) => (n !== undefined ? "₹" + n.toLocaleString("en-IN") : "Personalised Care");
