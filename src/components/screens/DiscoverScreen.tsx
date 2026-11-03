"use client";

import { Heart, Leaf, Search, Sparkles, X } from "lucide-react";
import {
  PageTransition,
  FadeUp,
  StaggerWrap,
  StaggerItem,
  AnimatedButton,
  motion,
} from "../motion";
import { usePortal } from "../portal-context";

export default function DiscoverScreen() {
  const {
    admin,
    section,
    search,
    setSearch,
    category,
    setCategory,
    saved,
    onlySaved,
    setOnlySaved,
    filtered,
    content,
    cards,
  } = usePortal();

  const categories = ["All", "Recipe", "Wellness", "Movement", "Mindfulness"];

  const getCategoryCount = (cat: string) => {
    if (cat === "All") return content.length;
    return content.filter((c) => c.category === cat).length;
  };

  return (
    <>
      {section === "discover" && (
        <PageTransition>
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Feel-Good Collection Banner */}
            <FadeUp className="discovery-banner">
              <div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--primary)",
                    marginBottom: "8px",
                  }}
                >
                  
                  NOURISH • MOVE • UNWIND
                </div>
                <h2>Your Personal Feel-Good Collection</h2>
                <p>
                  Simple whole-food recipes, gentle daily movement, and mindful
                  pauses designed to support your vitality.
                </p>
              </div>
              <motion.div
                animate={{ rotate: [0, 6, -6, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                <Leaf
                  size={74}
                  strokeWidth={1.2}
                  style={{ color: "var(--primary)", opacity: 0.75 }}
                />
              </motion.div>
            </FadeUp>

            {/* Search & Category Filter Toolbar */}
            <FadeUp delay={0.1}>
              <section className="panel" style={{ padding: "22px 28px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "16px",
                    marginBottom: "20px",
                  }}
                >
                  <div
                    className="search-input"
                    style={{ maxWidth: "480px", width: "100%" }}
                  >
                    <Search size={18} />
                    <input
                      aria-label="Search resources"
                      placeholder="Search recipes, movements, mindfulness guides…"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    {search && (
                      <button
                        onClick={() => setSearch("")}
                        aria-label="Clear search"
                        style={{ color: "var(--muted)", padding: "4px" }}
                      >
                        <X size={15} />
                      </button>
                    )}
                  </div>

                  <AnimatedButton
                    className={"btn " + (onlySaved ? "primary" : "secondary")}
                    onClick={() => setOnlySaved(!onlySaved)}
                  >
                    <Heart size={16} fill={onlySaved ? "currentColor" : "none"} />
                    Saved Bookmarks ({saved.length})
                  </AnimatedButton>
                </div>

                <div
                  className="chips"
                  role="group"
                  aria-label="Categories"
                  style={{ margin: 0 }}
                >
                  {categories.map((c) => {
                    const count = getCategoryCount(c);
                    return (
                      <motion.button
                        aria-pressed={category === c}
                        className={category === c ? "selected" : ""}
                        key={c}
                        onClick={() => setCategory(c)}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <span>{c === "All" ? "All Discoveries" : c}</span>
                        <span
                          style={{
                            fontSize: "10px",
                            padding: "1px 6px",
                            borderRadius: "10px",
                            background:
                              category === c
                                ? "rgba(255, 255, 255, 0.25)"
                                : "#eef3f0",
                            color: category === c ? "#ffffff" : "var(--muted)",
                          }}
                        >
                          {count}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </section>
            </FadeUp>

            {/* Results Counter & Cards Grid */}
            <FadeUp delay={0.15}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "4px",
                }}
              >
                <p className="result-count" style={{ margin: 0 }}>
                  Displaying{" "}
                  <strong style={{ color: "var(--ink)" }}>{filtered.length}</strong>{" "}
                  feel-good discoveries in {category}
                </p>
              </div>
            </FadeUp>

            <motion.div
              key={category + search + (onlySaved ? "saved" : "all")}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              {cards(filtered)}
            </motion.div>
          </div>
        </PageTransition>
      )}
    </>
  );
}
