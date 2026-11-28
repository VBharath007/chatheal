"use client";
import { useEffect, useState } from "react";
import {
  AlertCircle,
  Calendar,
  Camera,
  Check,
  CheckCircle2,
  Clock,
  FileSpreadsheet,
  Flame,
  Plus,
  Sparkles,
  Trash2,
  Utensils,
  X,
} from "lucide-react";
import { usePortal } from "../portal-context";
import { request, download, today, Item, units } from "./shared";
import "./diet.css";
import CareWorkspace from "../care/CareWorkspace";

type Entry = {
  id: string;
  status: "planned" | "changed" | "skipped";
  quantity: number | null;
  unit: string;
  note: string;
  replacement_food?: string;
  calories?: number | null;
  protein?: number | null;
  carbs?: number | null;
  fat?: number | null;
  fiber?: number | null;
  image?: string;
};

type Extra = {
  food: string;
  quantity: number;
  unit: string;
  calories?: number | null;
  protein?: number | null;
  carbs?: number | null;
  fat?: number | null;
  fiber?: number | null;
  note?: string;
  image?: string;
};

type Daily = {
  plan: null | {
    id: string;
    title: string;
    category_name: string;
    items: Item[];
  };
  report: null | {
    entries: Entry[];
    extras: Extra[];
    submitted_at: string | null;
  };
};

async function compressMealImage(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Please select a valid image file (JPG, PNG, or WebP).");
  }
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Could not read image file."));
    reader.readAsDataURL(file);
  });
  return new Promise<string>((resolve) => {
    const img = new Image();
    img.onload = () => {
      const maxDim = 800;
      let { width, height } = img;
      if (width > maxDim || height > maxDim) {
        if (width >= height) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.78));
      } else {
        resolve(dataUrl);
      }
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}

function numOrNull(v: string): number | null {
  if (v === "") return null;
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? n : null;
}

export default function DietScreen() {
  const { demo, user } = usePortal();
  const [date, setDate] = useState(today());
  const [data, setData] = useState<Daily | null>(null);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [extras, setExtras] = useState<Extra[]>([]);
  const [expandedNutrition, setExpandedNutrition] = useState<Record<string, boolean>>({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [changed, setChanged] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    let active = true;
    setBusy(true);
    setData(null);
    setError("");
    setMessage("");
    setConfirmed(false);
    request("/today?date=" + date)
      .then((d) => {
        if (active) {
          setData(d);
          setEntries(d.report?.entries || []);
          setExtras(d.report?.extras || []);
          setChanged(false);
        }
      })
      .catch((e) => {
        if (active) setError(e.message);
      })
      .finally(() => {
        if (active) setBusy(false);
      });
    return () => {
      active = false;
    };
  }, [date, demo]);

  useEffect(() => {
    const leave = (e: BeforeUnloadEvent) => {
      if (changed) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", leave);
    return () => window.removeEventListener("beforeunload", leave);
  }, [changed]);

  const locked = !!data?.report?.submitted_at;
  const future = date > today();
  const items = data?.plan?.items || [];

  function edit(id: string, patch: Partial<Entry>) {
    setChanged(true);
    setConfirmed(false);
    setEntries((old) => {
      const found = old.find((e) => e.id === id) || {
        id,
        status: "planned" as const,
        quantity: null,
        unit: "g",
        note: "",
      };
      return [...old.filter((e) => e.id !== id), { ...found, ...patch }];
    });
  }

  function updateExtra(index: number, patch: Partial<Extra>) {
    setChanged(true);
    setConfirmed(false);
    setExtras((old) =>
      old.map((x, j) => (j === index ? { ...x, ...patch } : x)),
    );
  }

  async function run(fn: () => Promise<void>) {
    setBusy(true);
    setError("");
    setMessage("");
    try {
      await fn();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function save(submit: boolean) {
    if (!data?.plan) return;
    await request("/report", "PUT", {
      date,
      plan_id: data.plan.id,
      entries,
      extras,
      submit,
    });
    setChanged(false);
    const d = await request("/today?date=" + date);
    setData(d);
    setMessage(
      submit
        ? "Submitted. Your coach can now view and download your report."
        : "Draft saved. Return later to finish and submit.",
    );
  }

  const firstName = (user?.name || "there").split(" ")[0];

  return (
    <section className="diet">
      {/* Luxury Hero & Date Selector Card */}
      <div className="diet-card diet-hero-card">
        <div className="diet-hero-top">
          <span className="pill">
            <Sparkles size={12} />
            <span>Your Daily Nourishment</span>
          </span>
          <h2>One meal at a time, {firstName}.</h2>
          <p className="hint">
            Follow your coach’s tailored clinical plan. Ate outside or at a
            hotel? Upload your meal photo and enter grams &amp; macros below.
          </p>
        </div>

        <div className="diet-date-toolbar">
          <label className="diet-date-field">
            <span className="diet-date-label">
              <Calendar size={13} />
              <span>Plan date · India time</span>
            </span>
            <input
              disabled={busy}
              type="date"
              value={date}
              onChange={(e) => {
                if (
                  !changed ||
                  window.confirm(
                    "Leave unsaved entries? Use Save draft to keep them.",
                  )
                )
                  setDate(e.target.value);
              }}
            />
          </label>

          <button
            type="button"
            className="diet-today-btn"
            disabled={busy || date === today()}
            onClick={() => {
              if (!changed || window.confirm("Leave unsaved entries?"))
                setDate(today());
            }}
          >
            <Clock size={14} />
            <span>Today</span>
          </button>

          {data?.plan && (
            <span className="pill pill-category">{data.plan.category_name}</span>
          )}
        </div>
      </div>

      <CareWorkspace />

      {/* Status Messages */}
      {error && (
        <div role="alert" className="message error">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}
      {message && (
        <div role="status" className="message">
          <CheckCircle2 size={18} />
          <span>{message}</span>
        </div>
      )}
      {busy && (
        <div role="status" className="diet-loading-pill">
          <Clock size={14} />
          <span>Loading your meal plan…</span>
        </div>
      )}

      {/* Empty Plan State */}
      {data && !data.plan && (
        <div className="diet-card diet-empty-card">
          <div className="diet-empty-icon">
            <Utensils size={26} />
          </div>
          <h3>No plan assigned for this date</h3>
          <p>
            Your coach hasn’t published a meal plan for{" "}
            <strong>{date}</strong> yet. Select another date above or reach out
            to your coach to activate your schedule.
          </p>
        </div>
      )}

      {/* Active Diet Plan */}
      {data?.plan && (
        <>
          <div className="diet-card">
            <div className="diet-plan-header">
              <div>
                <h3 style={{ margin: 0 }}>{data.plan.title}</h3>
              </div>
              <span className="pill">
                {locked
                  ? "Submitted"
                  : future
                    ? "Preview"
                    : `${entries.length} / ${items.length} foods recorded`}
              </span>
            </div>

            {locked && (
              <p className="hint spaced">
                Submitted reports are locked so your coach’s report stays
                consistent.
              </p>
            )}
            {future && (
              <p className="hint spaced">
                You can preview future meals. Recording opens on that date.
              </p>
            )}
            {!items.length && (
              <p className="hint spaced">No meals planned for this day.</p>
            )}

            <fieldset disabled={busy || locked || future}>
              {Array.from(new Set(items.map((i) => i.meal))).map((meal) => (
                <div key={meal} className="diet-meal-section">
                  <h4 className="diet-meal-heading">
                    <Utensils size={14} />
                    <span>{meal}</span>
                  </h4>
                  {items
                    .filter((i) => i.meal === meal)
                    .map((i) => {
                      const e = entries.find((x) => x.id === i.id);
                      const hasNutritionData =
                        !!e?.image ||
                        !!e?.replacement_food ||
                        e?.calories != null ||
                        e?.protein != null ||
                        e?.carbs != null ||
                        e?.fat != null ||
                        e?.fiber != null;
                      const showNutritionBox =
                        e?.status === "changed" ||
                        !!expandedNutrition[i.id] ||
                        hasNutritionData;

                      return (
                        <div className="item" key={i.id}>
                          <b className="diet-item-title">{i.food}</b>
                          <p className="hint">
                            Planned:{" "}
                            {i.planned ||
                              "Follow the instructions above; no separate quantity specified."}
                          </p>
                          <div className="diet-status-group">
                            {[
                              ["planned", "✓ As planned"],
                              ["changed", "Change / Hotel food"],
                              ["skipped", "Not eaten"],
                            ].map(([v, l]) => (
                              <button
                                key={v}
                                type="button"
                                aria-pressed={e?.status === v}
                                onClick={() =>
                                  edit(i.id, {
                                    status: v as Entry["status"],
                                    quantity:
                                      v === "changed" ? e?.quantity ?? null : null,
                                  })
                                }
                              >
                                {l}
                              </button>
                            ))}
                          </div>

                          {e?.status === "changed" && (
                            <div className="diet-qty-row">
                              <label>
                                Amount eaten (grams / units)
                                <input
                                  type="number"
                                  min="0.01"
                                  max="100000"
                                  step="any"
                                  placeholder="e.g. 200"
                                  value={e.quantity ?? ""}
                                  onChange={(ev) =>
                                    edit(i.id, {
                                      quantity: ev.target.value
                                        ? Number(ev.target.value)
                                        : null,
                                    })
                                  }
                                />
                              </label>
                              <label>
                                Unit
                                <select
                                  value={e.unit}
                                  onChange={(ev) =>
                                    edit(i.id, { unit: ev.target.value })
                                  }
                                >
                                  {units.map((u) => (
                                    <option key={u}>{u}</option>
                                  ))}
                                </select>
                              </label>
                            </div>
                          )}

                          {e && e.status !== "skipped" && !showNutritionBox && (
                            <div className="spaced">
                              <button
                                type="button"
                                className="diet-photo-toggle-btn"
                                onClick={() =>
                                  setExpandedNutrition((prev) => ({
                                    ...prev,
                                    [i.id]: true,
                                  }))
                                }
                              >
                                <Camera size={14} />
                                <span>Add Photo, Hotel Food &amp; Macros</span>
                              </button>
                            </div>
                          )}

                          {e && e.status !== "skipped" && showNutritionBox && (
                            <div className="diet-nutrition-box">
                              <div className="diet-nutrition-header">
                                <span className="diet-nutrition-title">
                                  <Flame size={14} />
                                  <span>Meal Photo &amp; Nutrition Details</span>
                                </span>
                                {e.status !== "changed" && !hasNutritionData && (
                                  <button
                                    type="button"
                                    className="diet-photo-toggle-btn"
                                    onClick={() =>
                                      setExpandedNutrition((prev) => ({
                                        ...prev,
                                        [i.id]: false,
                                      }))
                                    }
                                  >
                                    Hide
                                  </button>
                                )}
                              </div>

                              {e.status === "changed" && (
                                <label>
                                  What food did you eat? (Hotel / Replacement food)
                                  <input
                                    maxLength={300}
                                    placeholder="e.g. Hotel Masala Dosa, Paneer Tikka, Outside Meal"
                                    value={e.replacement_food || ""}
                                    onChange={(ev) =>
                                      edit(i.id, {
                                        replacement_food: ev.target.value,
                                      })
                                    }
                                  />
                                </label>
                              )}

                              <div className="diet-macros-grid">
                                <label>
                                  Calories (kcal)
                                  <input
                                    type="number"
                                    min="0"
                                    step="any"
                                    placeholder="e.g. 380"
                                    value={e.calories ?? ""}
                                    onChange={(ev) =>
                                      edit(i.id, {
                                        calories: numOrNull(ev.target.value),
                                      })
                                    }
                                  />
                                </label>
                                <label>
                                  Protein (g)
                                  <input
                                    type="number"
                                    min="0"
                                    step="any"
                                    placeholder="e.g. 18"
                                    value={e.protein ?? ""}
                                    onChange={(ev) =>
                                      edit(i.id, {
                                        protein: numOrNull(ev.target.value),
                                      })
                                    }
                                  />
                                </label>
                                <label>
                                  Carbs (g)
                                  <input
                                    type="number"
                                    min="0"
                                    step="any"
                                    placeholder="e.g. 42"
                                    value={e.carbs ?? ""}
                                    onChange={(ev) =>
                                      edit(i.id, {
                                        carbs: numOrNull(ev.target.value),
                                      })
                                    }
                                  />
                                </label>
                                <label>
                                  Fat (g)
                                  <input
                                    type="number"
                                    min="0"
                                    step="any"
                                    placeholder="e.g. 12"
                                    value={e.fat ?? ""}
                                    onChange={(ev) =>
                                      edit(i.id, {
                                        fat: numOrNull(ev.target.value),
                                      })
                                    }
                                  />
                                </label>
                                <label>
                                  Fiber (g)
                                  <input
                                    type="number"
                                    min="0"
                                    step="any"
                                    placeholder="e.g. 5"
                                    value={e.fiber ?? ""}
                                    onChange={(ev) =>
                                      edit(i.id, {
                                        fiber: numOrNull(ev.target.value),
                                      })
                                    }
                                  />
                                </label>
                              </div>

                              <div className="diet-photo-row">
                                {!e.image ? (
                                  <label className="diet-photo-upload-btn">
                                    <Camera size={16} />
                                    <span>Upload Meal / Hotel Photo</span>
                                    <input
                                      type="file"
                                      accept="image/*"
                                      style={{ display: "none" }}
                                      onChange={async (ev) => {
                                        const file = ev.target.files?.[0];
                                        ev.target.value = "";
                                        if (!file) return;
                                        try {
                                          const compressed =
                                            await compressMealImage(file);
                                          edit(i.id, { image: compressed });
                                        } catch (err) {
                                          setError((err as Error).message);
                                        }
                                      }}
                                    />
                                  </label>
                                ) : (
                                  <div className="diet-photo-preview-wrap">
                                    <img
                                      src={e.image}
                                      alt="Uploaded meal"
                                      className="diet-photo-thumb"
                                    />
                                    <button
                                      type="button"
                                      className="diet-photo-remove"
                                      onClick={() =>
                                        edit(i.id, { image: undefined })
                                      }
                                    >
                                      <X size={13} />
                                      <span>Remove photo</span>
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {e && (
                            <label className="spaced">
                              Note (optional)
                              <input
                                maxLength={1000}
                                placeholder="Replacement food, hotel name, reason, or preparation"
                                value={e.note}
                                onChange={(ev) =>
                                  edit(i.id, { note: ev.target.value })
                                }
                              />
                            </label>
                          )}
                        </div>
                      );
                    })}
                </div>
              ))}
            </fieldset>
          </div>

          {!!items.length && (
            <div className="diet-card">
              <h3>Anything extra? (Hotel / Outside Food)</h3>
              <p className="hint" style={{ marginBottom: "14px" }}>
                Ate outside at a hotel or had extra snacks? Add the food name,
                grams/quantity, meal photo, and nutrition details below.
              </p>
              <fieldset disabled={busy || locked || future}>
                {extras.map((e, i) => (
                  <div className="item" key={i}>
                    <div className="diet-extra-row">
                      <label>
                        Food name (e.g. Hotel Biryani / Idli)
                        <input
                          value={e.food}
                          maxLength={2000}
                          placeholder="Enter food name"
                          onChange={(ev) =>
                            updateExtra(i, { food: ev.target.value })
                          }
                        />
                      </label>
                      <label>
                        Quantity (Grams / Units)
                        <input
                          type="number"
                          min="0.01"
                          step="any"
                          placeholder="e.g. 250"
                          value={e.quantity || ""}
                          onChange={(ev) =>
                            updateExtra(i, {
                              quantity: Number(ev.target.value),
                            })
                          }
                        />
                      </label>
                      <label>
                        Unit
                        <select
                          value={e.unit}
                          onChange={(ev) =>
                            updateExtra(i, { unit: ev.target.value })
                          }
                        >
                          {units.map((u) => (
                            <option key={u}>{u}</option>
                          ))}
                        </select>
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setChanged(true);
                          setConfirmed(false);
                          setExtras(extras.filter((_, j) => j !== i));
                        }}
                      >
                        <Trash2 size={14} />
                        <span>Remove</span>
                      </button>
                    </div>

                    <div className="diet-nutrition-box">
                      <div className="diet-nutrition-header">
                        <span className="diet-nutrition-title">
                          <Flame size={14} />
                          <span>Nutrition &amp; Photo</span>
                        </span>
                      </div>

                      <div className="diet-macros-grid">
                        <label>
                          Calories (kcal)
                          <input
                            type="number"
                            min="0"
                            step="any"
                            placeholder="e.g. 420"
                            value={e.calories ?? ""}
                            onChange={(ev) =>
                              updateExtra(i, {
                                calories: numOrNull(ev.target.value),
                              })
                            }
                          />
                        </label>
                        <label>
                          Protein (g)
                          <input
                            type="number"
                            min="0"
                            step="any"
                            placeholder="e.g. 22"
                            value={e.protein ?? ""}
                            onChange={(ev) =>
                              updateExtra(i, {
                                protein: numOrNull(ev.target.value),
                              })
                            }
                          />
                        </label>
                        <label>
                          Carbs (g)
                          <input
                            type="number"
                            min="0"
                            step="any"
                            placeholder="e.g. 48"
                            value={e.carbs ?? ""}
                            onChange={(ev) =>
                              updateExtra(i, {
                                carbs: numOrNull(ev.target.value),
                              })
                            }
                          />
                        </label>
                        <label>
                          Fat (g)
                          <input
                            type="number"
                            min="0"
                            step="any"
                            placeholder="e.g. 14"
                            value={e.fat ?? ""}
                            onChange={(ev) =>
                              updateExtra(i, {
                                fat: numOrNull(ev.target.value),
                              })
                            }
                          />
                        </label>
                        <label>
                          Fiber (g)
                          <input
                            type="number"
                            min="0"
                            step="any"
                            placeholder="e.g. 6"
                            value={e.fiber ?? ""}
                            onChange={(ev) =>
                              updateExtra(i, {
                                fiber: numOrNull(ev.target.value),
                              })
                            }
                          />
                        </label>
                      </div>

                      <div className="diet-photo-row">
                        {!e.image ? (
                          <label className="diet-photo-upload-btn">
                            <Camera size={16} />
                            <span>Upload Meal / Hotel Photo</span>
                            <input
                              type="file"
                              accept="image/*"
                              style={{ display: "none" }}
                              onChange={async (ev) => {
                                const file = ev.target.files?.[0];
                                ev.target.value = "";
                                if (!file) return;
                                try {
                                  const compressed =
                                    await compressMealImage(file);
                                  updateExtra(i, { image: compressed });
                                } catch (err) {
                                  setError((err as Error).message);
                                }
                              }}
                            />
                          </label>
                        ) : (
                          <div className="diet-photo-preview-wrap">
                            <img
                              src={e.image}
                              alt="Uploaded extra meal"
                              className="diet-photo-thumb"
                            />
                            <button
                              type="button"
                              className="diet-photo-remove"
                              onClick={() => updateExtra(i, { image: undefined })}
                            >
                              <X size={13} />
                              <span>Remove photo</span>
                            </button>
                          </div>
                        )}
                      </div>

                      <label>
                        Note (optional)
                        <input
                          maxLength={1000}
                          placeholder="Hotel / restaurant details or preparation note"
                          value={e.note || ""}
                          onChange={(ev) =>
                            updateExtra(i, { note: ev.target.value })
                          }
                        />
                      </label>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  disabled={extras.length >= 30}
                  onClick={() => {
                    setChanged(true);
                    setConfirmed(false);
                    setExtras([...extras, { food: "", quantity: 0, unit: "g" }]);
                  }}
                >
                  <Plus size={15} />
                  <span>Add Extra / Hotel Food</span>
                </button>
              </fieldset>
            </div>
          )}

          {!!items.length && (
            <div className="diet-card sticky">
              {!locked && !future && (
                <>
                  <label className="check">
                    <input
                      disabled={busy}
                      type="checkbox"
                      checked={confirmed}
                      onChange={(e) => setConfirmed(e.target.checked)}
                    />
                    <span>
                      I reviewed today’s entries. Submit sends the report to my
                      coach and locks editing.
                    </span>
                  </label>
                  <div className="diet-actions-row">
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => void run(() => save(false))}
                    >
                      Save draft
                    </button>
                    <button
                      type="button"
                      className="primary"
                      disabled={
                        busy || !confirmed || entries.length !== items.length
                      }
                      onClick={() => void run(() => save(true))}
                    >
                      <Check size={15} />
                      <span>Submit today’s report</span>
                    </button>
                  </div>
                </>
              )}
              {locked && (
                <div className="diet-actions-row">
                  <button
                    type="button"
                    disabled={busy}
                    className="primary"
                    onClick={() =>
                      void run(() =>
                        download(
                          "/my-report.xlsx?date=" + date,
                          "My-food-report-" + date + ".xlsx",
                        ),
                      )
                    }
                  >
                    <FileSpreadsheet size={16} />
                    <span>Download my Excel report</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
}
