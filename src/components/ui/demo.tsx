import { Hero04, type Hero04Props } from "@/components/ui/hero-04"

/**
 * Curated high-resolution Unsplash stock images for ChatHeal's luxury wellness identity.
 */
export const chatHealValues: Hero04Props = {
  title: "Thoughtful nutrition for the way",
  titleLine2: "you want to feel.",
  description:
    "Personal guidance, whole-food programmes, and mindful daily rituals—tailored to your unique lifestyle, not a rigid checklist.",
  washImage:
    "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1600&q=80",
  primaryImage:
    "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80",
  secondaryImage:
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
  primaryAlt: "Fresh nourishing bowl with wholesome greens and grains",
  secondaryAlt: "Vibrant organic healthy ingredients",
  animation: "subtle",
  primaryCTA: {
    ctaEnabled: true,
    text: "Find your starting point",
    link: "/assessment",
    variant: "default",
    size: "default",
  },
  secondaryCTA: {
    ctaEnabled: true,
    text: "Explore programmes",
    link: "/programmes",
    variant: "link",
  },
}

export const galleryValues: Hero04Props = {
  title: "A gallery for the work",
  titleLine2: "you are proud of.",
  description:
    "Collect, arrange, and publish your art in a space that feels like a studio, not a spreadsheet.",
  washImage:
    "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1600&q=80",
  primaryImage:
    "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
  secondaryImage:
    "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=800&q=80",
  primaryAlt: "Featured artwork",
  secondaryAlt: "Abstract artwork",
  animation: "subtle",
  primaryCTA: {
    ctaEnabled: true,
    text: "Start your gallery",
    link: "",
    variant: "default",
    size: "default",
  },
  secondaryCTA: {
    ctaEnabled: true,
    text: "See examples",
    link: "",
    variant: "link",
  },
}

export default function Hero04Demo({
  mode = "chatheal",
}: {
  mode?: "chatheal" | "gallery"
}) {
  return <Hero04 {...(mode === "gallery" ? galleryValues : chatHealValues)} />
}
