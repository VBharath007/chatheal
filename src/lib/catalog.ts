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
export const money = (_n?: number) => "Personalised Care";
