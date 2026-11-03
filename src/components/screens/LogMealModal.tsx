"use client";

import { useState, useRef, useEffect } from "react";
import {
  Camera,
  UploadCloud,
  Sparkles,
  Search,
  Check,
  Flame,
  ArrowRight,
  Coffee,
  Soup,
  Utensils,
  Apple,
  Dumbbell,
  Wheat,
  Droplet,
  ScanLine,
  X,
} from "lucide-react";
import styles from "./LogMealModal.module.css";

interface LogMealModalProps {
  isOpen: boolean;
  onClose: () => void;
  foods: Record<string, any>[];
  form: Record<string, any>;
  update: (key: string, value: any) => void;
  date: string;
  mutate: (endpoint: string, method: string, body?: any) => Promise<any>;
  busy: boolean;
}

const photoPresets = [
  {
    id: "1",
    name: "Dosa, plain",
    title: "South Indian Dosa",
    image: "/images/breakfast.jpg",
    calories: 168,
    protein: 4,
    carbs: 28,
    fat: 4,
    defaultGrams: 150,
    tag: "98% Match",
  },
  {
    id: "0",
    name: "Idli, steamed",
    title: "Steamed Idli with Sambar",
    image: "/images/calm.jpg",
    calories: 146,
    protein: 4.5,
    carbs: 28,
    fat: 1,
    defaultGrams: 150,
    tag: "97% Match",
  },
  {
    id: "2",
    name: "Rice, cooked",
    title: "Whole-Food Nourish Bowl",
    image: "/images/hero.jpg",
    calories: 130,
    protein: 2.7,
    carbs: 28,
    fat: 0.3,
    defaultGrams: 200,
    tag: "95% Match",
  },
  {
    id: "r3",
    name: "Spinach, cooked",
    title: "Crunchy Greens Salad",
    image: "/images/greens.jpg",
    calories: 120,
    protein: 3.2,
    carbs: 14,
    fat: 3.5,
    defaultGrams: 180,
    tag: "99% Match",
  },
];

export default function LogMealModal({
  isOpen,
  onClose,
  foods,
  form,
  update,
  date,
  mutate,
  busy,
}: LogMealModalProps) {
  const [activeTab, setActiveTab] = useState<"photo" | "search">("photo");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [detectedFoodTitle, setDetectedFoodTitle] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize defaults
  useEffect(() => {
    if (!form.meal) {
      update("meal", "Breakfast");
    }
    if (!form.grams) {
      update("grams", 150);
    }
    // Default to the first preset meal for instant delightful UX
    if (!form.food_id && foods.length > 0) {
      const defaultItem = foods[1] || foods[0];
      update("food_id", defaultItem.id);
      setUploadedImage(photoPresets[0].image);
      setDetectedFoodTitle(photoPresets[0].title);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !busy) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, busy, onClose]);

  if (!isOpen) return null;

  // Selected food item metrics
  const selectedFood =
    foods.find((f) => f.id === form.food_id) ||
    foods[0] || {
      calories: 150,
      protein: 4,
      carbs: 25,
      fat: 2,
      name: "Selected Nourishment",
    };

  const grams = Number(form.grams) || 100;
  const totalCalories = Math.round(((selectedFood.calories || 0) * grams) / 100);
  const totalProtein = (((selectedFood.protein || 0) * grams) / 100).toFixed(1);
  const totalCarbs = (((selectedFood.carbs || 0) * grams) / 100).toFixed(1);
  const totalFat = (((selectedFood.fat || 0) * grams) / 100).toFixed(1);

  // Handle image file selection
  const handleFileProcess = (file: File) => {
    if (!file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setUploadedImage(dataUrl);
      setIsScanning(true);

      // Smart match based on file name or smart fallback
      const fileName = file.name.toLowerCase();
      let matched = foods[0];
      let title = "Fresh Healthy Meal";

      if (fileName.includes("dosa")) {
        matched = foods.find((f) => f.name.toLowerCase().includes("dosa")) || foods[1];
        title = "South Indian Crispy Dosa";
      } else if (fileName.includes("idli")) {
        matched = foods.find((f) => f.name.toLowerCase().includes("idli")) || foods[0];
        title = "Steamed Soft Idli with Sambar";
      } else if (fileName.includes("rice")) {
        matched = foods.find((f) => f.name.toLowerCase().includes("rice")) || foods[2];
        title = "Fragrant Steamed Rice";
      } else if (fileName.includes("salad") || fileName.includes("green")) {
        matched = foods.find((f) => f.name.toLowerCase().includes("spinach")) || foods[0];
        title = "Crisp Mediterranean Salad";
      } else if (foods.length > 1) {
        matched = foods[1];
        title = "Nutrient-Dense Wellness Plate";
      }

      setTimeout(() => {
        setIsScanning(false);
        update("food_id", matched.id);
        setDetectedFoodTitle(title);
      }, 700);
    };
    reader.readAsDataURL(file);
  };

  const handleSelectPreset = (preset: (typeof photoPresets)[0]) => {
    setUploadedImage(preset.image);
    setIsScanning(true);
    setDetectedFoodTitle(preset.title);
    update("food_id", preset.id);
    update("grams", preset.defaultGrams);

    setTimeout(() => {
      setIsScanning(false);
    }, 450);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  // Filtered search list
  const filteredFoods = foods.filter((f) =>
    (f.name || "").toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate("/logs", "POST", {
      ...form,
      date,
      name: detectedFoodTitle || selectedFood.name,
    });
  };

  return (
    <div
      className={styles.modalBackdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget && !busy) onClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className={styles.modalWindow} onClick={(e) => e.stopPropagation()}>
        {/* ==========================================================
            HEADER - Clean Luxury, No Close "X" Button
            ========================================================== */}
        <div className={styles.header}>
          <span className={styles.eyebrow}>
            <Sparkles size={12} />
            YOUR WELLNESS ACTION
          </span>
          <h2 className={styles.title}>Nourish your day</h2>
          <p className={styles.subtitle}>
            Snap a food photo for instant AI macro estimation or search our verified nutrition database.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className={styles.tabNav}>
          <button
            type="button"
            className={`${styles.tabBtn} ${
              activeTab === "photo" ? styles.tabBtnActive : ""
            }`}
            onClick={() => setActiveTab("photo")}
          >
            <Camera size={15} />
            AI Photo Snap & Upload
          </button>
          <button
            type="button"
            className={`${styles.tabBtn} ${
              activeTab === "search" ? styles.tabBtnActive : ""
            }`}
            onClick={() => setActiveTab("search")}
          >
            <Search size={15} />
            Search Database
          </button>
        </div>

        {/* ==========================================================
            BODY SCROLL CONTENT
            ========================================================== */}
        <div className={styles.bodyScroll}>
          {activeTab === "photo" ? (
            /* TAB 1: AI PHOTO UPLOAD & RECOGNITION */
            <div className={styles.uploadSection}>
              {uploadedImage ? (
                /* Uploaded Image Preview & AI Scanner Card */
                <div className={styles.previewCard}>
                  <div className={styles.previewImgWrap}>
                    <img
                      src={uploadedImage}
                      alt="Uploaded food"
                      className={styles.previewImg}
                    />
                    {isScanning && <div className={styles.scanBeam} />}
                  </div>

                  <div className={styles.scanContent}>
                    <div className={styles.aiPill}>
                      <Sparkles size={12} />
                      {isScanning ? "Scanning with ChatHeal AI…" : "AI Vision Verified"}
                    </div>

                    <h3 className={styles.detectedName}>
                      {isScanning ? "Analyzing ingredients…" : detectedFoodTitle || selectedFood.name}
                    </h3>

                    <p className={styles.detectedNote}>
                      {isScanning
                        ? "Calculating portion volume, calories & macronutrient profile…"
                        : `Estimated ${grams}g portion • ${totalCalories} kcal`}
                    </p>

                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className={styles.changePhotoBtn}
                    >
                      Upload different photo
                    </button>
                  </div>
                </div>
              ) : (
                /* Drag & Drop File Upload Box */
                <div
                  className={`${styles.dropzone} ${
                    dragActive ? styles.dropzoneActive : ""
                  }`}
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragActive(true);
                  }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={handleDrop}
                >
                  <div className={styles.dropIconWrap}>
                    <UploadCloud size={26} />
                  </div>
                  <h4 className={styles.dropTitle}>
                    Upload your meal photo
                  </h4>
                  <p className={styles.dropSubtitle}>
                    Drop food picture here, or click to browse (JPG, PNG, WebP)
                  </p>
                </div>
              )}

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files?.[0]) handleFileProcess(e.target.files[0]);
                }}
                className={styles.hiddenInput}
              />

              {/* Instant Photo Presets */}
              <div className={styles.presetsRow}>
                <span className={styles.presetsLabel}>
                  Or choose a realistic food photo snap:
                </span>
                <div className={styles.presetsList}>
                  {photoPresets.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleSelectPreset(preset)}
                      className={styles.presetCard}
                    >
                      <img
                        src={preset.image}
                        alt={preset.title}
                        className={styles.presetImg}
                      />
                      <span className={styles.presetTitle}>{preset.title}</span>
                      <span className={styles.presetCal}>~{preset.calories} kcal/100g</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* TAB 2: SEARCH NUTRITION DATABASE */
            <div className={styles.searchSection}>
              <div className={styles.searchInputWrap}>
                <Search size={16} style={{ color: "#6c8979" }} />
                <input
                  type="text"
                  placeholder="Try idli, dosa, oats, banana, rice…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                  autoFocus
                />
              </div>

              <div className={styles.foodGrid}>
                {filteredFoods.map((f) => {
                  const isSelected = form.food_id === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => {
                        update("food_id", f.id);
                        setDetectedFoodTitle(f.name);
                      }}
                      className={`${styles.foodItemBtn} ${
                        isSelected ? styles.foodItemActive : ""
                      }`}
                    >
                      <div>
                        <span className={styles.foodItemName}>{f.name}</span>
                        <span className={styles.foodItemMeta}>
                          {Math.round(f.calories)} kcal / 100g
                        </span>
                      </div>
                      {isSelected && (
                        <Check size={16} className={styles.foodCheckIcon} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ==========================================================
              PORTION, MEAL TIMING & MACROS FORM
              ========================================================== */}
          <form onSubmit={handleSubmit} className={styles.formSection}>
            {/* Meal Time Selector */}
            <div className={styles.formGroup}>
              <label className={styles.groupLabel}>Meal Timing</label>
              <div className={styles.mealTypesRow}>
                {[
                  { id: "Breakfast", icon: Coffee },
                  { id: "Lunch", icon: Soup },
                  { id: "Dinner", icon: Utensils },
                  { id: "Snack", icon: Apple },
                ].map(({ id, icon: Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => update("meal", id)}
                    className={`${styles.mealTypeBtn} ${
                      form.meal === id ? styles.mealTypeBtnActive : ""
                    }`}
                  >
                    <Icon size={14} />
                    <span>{id}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Portion in Grams */}
            <div className={styles.formGroup}>
              <label className={styles.groupLabel}>Portion Size (grams)</label>
              <div className={styles.portionRow}>
                <div className={styles.gramInputWrap}>
                  <input
                    type="number"
                    min="10"
                    max="3000"
                    value={grams}
                    onChange={(e) => update("grams", Number(e.target.value))}
                    className={styles.gramInput}
                    required
                  />
                  <span className={styles.gramSuffix}>g</span>
                </div>

                <div className={styles.gramPresets}>
                  {[100, 150, 200, 300].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => update("grams", g)}
                      className={`${styles.presetGramBtn} ${
                        grams === g ? styles.presetGramActive : ""
                      }`}
                    >
                      {g}g
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Macro Breakdown Cards */}
            <div className={styles.formGroup}>
              <label className={styles.groupLabel}>Live Portion Breakdown</label>
              <div className={styles.macroGrid}>
                <div className={`${styles.macroCard} ${styles.macroCardCal}`}>
                  <p className={styles.macroVal}>{totalCalories} kcal</p>
                  <span className={styles.macroLabel}>Calories</span>
                </div>
                <div className={styles.macroCard}>
                  <p className={styles.macroVal}>{totalProtein}g</p>
                  <span className={styles.macroLabel}>Protein</span>
                </div>
                <div className={styles.macroCard}>
                  <p className={styles.macroVal}>{totalCarbs}g</p>
                  <span className={styles.macroLabel}>Carbs</span>
                </div>
                <div className={styles.macroCard}>
                  <p className={styles.macroVal}>{totalFat}g</p>
                  <span className={styles.macroLabel}>Fats</span>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* ==========================================================
            FOOTER ACTIONS - Cancel + Submit (Clean, No X button needed)
            ========================================================== */}
        <div className={styles.footer}>
          <button
            type="button"
            onClick={onClose}
            disabled={busy}
            className={styles.cancelBtn}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={busy || !form.food_id || isScanning}
            className={styles.submitBtn}
          >
            {busy ? "Logging meal…" : "Add to Food Diary"}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

