"use client";

import Link from "next/link";
import { Field, Modal } from "./ui";

import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Check,
  ChevronRight,
  Clock,
  Flame,
  Heart,
  LayoutDashboard,
  Leaf,
  LogOut,
  Menu,
  Play,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Utensils,
  Video,
  X,
  Trash2,
  Sun,
  CheckCircle2,
} from "lucide-react";
import { api, demoUser } from "@/lib/api";
import ClientAuthScreen from "./screens/ClientAuthScreen";
import LogMealModal from "./screens/LogMealModal";
const imageHero = "/images/hero.jpg";
const fmt = (s: string) =>
  new Date(s).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
const number = (n: number) => Math.round(n || 0).toLocaleString("en-IN");
const userNav = [
  ["Overview", "/wellness", LayoutDashboard],
  ["Food diary", "/diary", Utensils],
  ["Discover", "/discover", BookOpen],
  ["Appointments", "/appointments", CalendarDays],
  ["Live sessions", "/sessions", Video],
  ["My progress", "/progress", TrendingUp],
] as const;
const adminNav = [
  ["Overview", "/wellness", LayoutDashboard],
  ["Clients", "/clients", Users],
  ["Content library", "/discover", BookOpen],
  ["Appointments", "/appointments", CalendarDays],
  ["Live sessions", "/sessions", Video],
  ["Nutrition insights", "/progress", Activity],
] as const;
import { usePortalState } from "./portal-state";
import { PortalContext } from "./portal-context";
import {
  motion,
  AnimatePresence,
  AnimatedButton,
  AnimatedToast,
  FadeUp,
} from "./motion";
export default function Portal({
  admin = false,
  children,
}: {
  admin?: boolean;
  children: React.ReactNode;
}) {
  const state = usePortalState(admin);
  const {
    path,
    router,
    section,
    user,
    setUser,
    demo,
    setDemo,
    ready,
    setReady,
    menu,
    setMenu,
    loading,
    setLoading,
    busy,
    setBusy,
    error,
    setError,
    notice,
    setNotice,
    content,
    setContent,
    logs,
    setLogs,
    progress,
    setProgress,
    appointments,
    setAppointments,
    slots,
    setSlots,
    sessions,
    setSessions,
    clients,
    setClients,
    foods,
    setFoods,
    date,
    setDate,
    target,
    setTarget,
    search,
    setSearch,
    category,
    setCategory,
    modal,
    setModal,
    selected,
    setSelected,
    form,
    setForm,
    foodSearch,
    setFoodSearch,
    foodSource,
    setFoodSource,
    saved,
    setSaved,
    onlySaved,
    setOnlySaved,
    joinUrl,
    setJoinUrl,
    key,
    call,
    refresh,
    mutate,
    open,
    toggleSaved,
    update,
    total,
    goal,
    nutrients,
    filtered,
    nav,
    cards,
  } = state;
  if (!ready)
    return (
      <div className="loading-screen">
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.15, 1] }}
          transition={{
            rotate: { repeat: Infinity, duration: 2, ease: "linear" },
            scale: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
          }}
        >
          <Leaf size={36} style={{ color: "var(--primary)" }} />
        </motion.div>
        <p style={{ fontWeight: 600, color: "var(--primary)", marginTop: "14px" }}>
          Making space for your wellbeing…
        </p>
      </div>
    );
  if (!user) {
    return (
      <ClientAuthScreen
        admin={admin}
        form={form}
        update={update}
        busy={busy}
        setBusy={setBusy}
        error={error}
        setError={setError}
        sessionKey={key}
        setDemo={setDemo}
        setUser={setUser}
      />
    );
  }
  return (
    <PortalContext.Provider value={{ ...state, user }}>
      <div className="app-shell gl-portal">
        <aside className={"sidebar " + (menu ? "open" : "")}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "4px",
            }}
          >
            <Link
              className="brand"
              href="/"
              aria-label="ChatHeal Member Portal"
              onClick={() => setMenu(false)}
              style={{ display: "block", background: "transparent", padding: 0 }}
            >
              <img src="/logo.png" alt="ChatHeal" className="sidebar-logo" />
            </Link>
            <button
              className="icon-btn mobile-close"
              aria-label="Close navigation menu"
              onClick={() => setMenu(false)}
            >
              <X size={20} />
            </button>
          </div>
          <div className="workspace-label">
            <span>YOUR WELLNESS SPACE</span>
            <span className="status-dot" title="Connected" />
          </div>
          <nav aria-label="Main navigation">
            {nav.map(([label, url, Icon]) => {
              const isActive = path === url;
              let badge: React.ReactNode = null;
              if (label === "Food diary" && logs.length > 0) {
                badge = (
                  <span
                    className="pill"
                    style={{
                      marginLeft: "auto",
                      fontSize: "10px",
                      padding: "2px 7px",
                    }}
                  >
                    {logs.length} logged
                  </span>
                );
              } else if (label === "Live sessions") {
                badge = <span className="nav-dot" title="Telehealth Live" />;
              }
              return (
                <Link
                  href={url}
                  key={url}
                  className={isActive ? "active" : ""}
                  onClick={() => setMenu(false)}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                  {badge}
                </Link>
              );
            })}
          </nav>
          <div className="sidebar-bottom">
            <div className="care-card">
              <span className="care-icon">
                <Leaf size={18} />
              </span>
              <h3>Better, together.</h3>
              <p>Your wellness coach is ready for your next check-in.</p>
              <Link href="/appointments" onClick={() => setMenu(false)}>
                Meet your coach
                <ArrowUpRight size={14} />
              </Link>
            </div>
            <Link
              className={
                "settings-link " + (section === "settings" ? "active" : "")
              }
              href="/settings"
              onClick={() => setMenu(false)}
            >
              <Settings size={17} />
              Account Settings
            </Link>
            <button
              className="profile"
              title="Click to sign out"
              onClick={async () => {
                if (!demo) await call("/auth/logout", "POST").catch(() => { });
                sessionStorage.removeItem(key);
                setUser(null);
                setDemo(false);
                router.push("/");
              }}
            >
              <span className="avatar">{user.name.slice(0, 1)}</span>
              <span>
                <b>{user.name}</b>
                <small>Personal Wellness Journey</small>
              </span>
              <LogOut
                size={16}
                style={{ color: "var(--muted)", marginLeft: "auto" }}
              />
            </button>
          </div>
        </aside>
        <AnimatePresence>
          {menu && (
            <motion.button
              className="mobile-scrim"
              aria-label="Close menu"
              onClick={() => setMenu(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>
        <div className="main-shell">
          <header className="topbar">
            <div className="breadcrumb">
              <button
                className="icon-btn mobile-toggle"
                aria-label="Open menu"
                onClick={() => setMenu(true)}
              >
                <Menu size={18} />
              </button>
              <img src="/logo.png" alt="ChatHeal" className="topbar-logo" />
              <b>{nav.find((n) => n[1] === path)?.[0] || "Settings"}</b>
            </div>
            <div className="topbar-right">
              <div className="ch-member-tools">
                <Link href="/settings" title="Account settings">
                  <Settings size={14} />
                  <span>Account</span>
                </Link>
                <button
                  title="Sign out"
                  onClick={async () => {
                    if (!demo)
                      await call("/auth/logout", "POST").catch(() => { });
                    sessionStorage.removeItem(key);
                    setUser(null);
                    setDemo(false);
                    router.push("/");
                  }}
                >
                  <LogOut size={14} />
                  <span>Sign out</span>
                </button>
              </div>
              <span className="today">
                <Sun size={15} style={{ color: "var(--accent-amber)" }} />
                {new Date().toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
              <span className="top-divider" />
              <span className="status-dot" />
              <span className="top-status">
                {demo ? "Demo Workspace" : "Sync Active"}
              </span>
              <span className="avatar small" title={user.name}>
                {user.name.slice(0, 1)}
              </span>
            </div>
          </header>
          <main>
            {demo && (
              <div className="demo-banner">
                
                <span>
                  <strong>Interactive Wellness Space:</strong> Sample meals,
                  personalized caloric goals, and telehealth check-ins.
                </span>
                <button
                  onClick={() => {
                    localStorage.removeItem("chatheal-demo-v1");
                    refresh();
                    setNotice("Demo space reset");
                  }}
                >
                  Reset Demo
                </button>
              </div>
            )}
            <AnimatePresence>
              {error && (
                <motion.div
                  className="error"
                  role="alert"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <span>{error}</span>
                  <button onClick={() => setError("")} aria-label="Dismiss error">
                    <X size={16} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatedToast visible={!!notice}>
              <div className="toast" role="status">
                <CheckCircle2 size={18} />
                <span>{notice}</span>
              </div>
            </AnimatedToast>
            <FadeUp key={section} className="page-heading">
              <div>
                <span className="eyebrow">
                  {section === "overview"
                    ? "FEEL GOOD EVERY DAY"
                    : section === "diary"
                      ? "DAILY NOURISHMENT"
                      : section === "discover"
                        ? "CURATED RITUALS"
                        : section === "appointments"
                          ? "HUMAN CONNECTION"
                          : section === "sessions"
                            ? "TELEHEALTH SESSIONS"
                            : section === "progress"
                              ? "CONSISTENCY OVER PERFECTION"
                              : "PREFERENCES"}
                </span>
                <h1>
                  {section === "overview"
                    ? `Feeling good starts here, ${user.name.split(" ")[0]}.`
                    : (
                      {
                        diary: "A little awareness. Better nourishment.",
                        discover: "Find your next feel-good habit.",
                        appointments: "Make time for yourself.",
                        sessions: "Your coach, a little closer.",
                        progress: "Look how far you’ve come.",
                        settings: "Make this space your own.",
                      } as Record<string, string>
                    )[section] || "Page not found"}
                </h1>
                <p>
                  {section === "overview"
                    ? "Good food, mindful moments, and personalized coaching support. All in one calm space."
                    : (
                      {
                        diary:
                          "Log your daily meals, track macronutrients, and maintain your coach-approved calorie target.",
                        discover:
                          "Explore delicious nourishing recipes, gentle movement rituals, and mindful pauses.",
                        appointments:
                          "Book a 1-on-1 check-in with your wellness coach at a time that fits your day.",
                        sessions:
                          "Join your private encrypted telehealth video room for personalized coaching.",
                        progress:
                          "Celebrate your weekly consistency, calorie balance, and mindful lifestyle habits.",
                        settings:
                          "Manage your profile name, account security, and coaching privacy preferences.",
                      } as Record<string, string>
                    )[section] || "Your wellness journey, at your own pace."}
                </p>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                {section === "appointments" && (
                  <AnimatedButton
                    className="btn primary"
                    onClick={() => {
                      const firstSlot = slots[0];
                      if (firstSlot) {
                        open("booking", {
                          slot_id: firstSlot.id,
                          note: "",
                          starts_at: firstSlot.starts_at,
                        });
                      } else {
                        setNotice("Checking for upcoming slots…");
                      }
                    }}
                  >
                    <Plus size={16} />
                    Book Next Slot
                  </AnimatedButton>
                )}
              </div>
              {loading && <span className="loading-dot" aria-label="Loading" />}
            </FadeUp>
            {children}

            <footer>
              <span className="footer-brand">
                ChatHeal<span> / </span>Your Wellness Companion
              </span>
              <span>
                Small steps. A healthier, happier you.
                <Leaf size={14} style={{ color: "var(--primary)" }} />
              </span>
            </footer>
          </main>
        </div>
        {/* Rich AI Photo Snap & Nutrition Logger Modal */}
        <LogMealModal
          isOpen={modal === "food"}
          onClose={() => setModal("")}
          foods={foods}
          form={form}
          update={update}
          date={date}
          mutate={mutate}
          busy={busy}
        />

        {modal && modal !== "food" && (
          <Modal
            title={
              (
                {
                  detail: selected?.title,
                  content: selected
                    ? "Edit resource"
                    : "Create a little inspiration",
                  client: "Welcome a new client",
                  clientEdit: "Client care settings",
                  booking: "Your next small step",
                  reschedule: "Find a better time",
                  cancel: "Cancel this appointment?",
                  slot: "Make time for your clients",
                  live: "Schedule a personal session",
                  join: "Your live session",
                } as Record<string, string>
              )[modal] || "Details"
            }
            close={() => setModal("")}
          >
            {error && (
              <div className="error" role="alert">
                {error}
              </div>
            )}
            {modal === "detail" && selected && (
              <div className="detail">
                <img src={selected.image} alt={selected.title} />
                <div className="chips">
                  <span className="pill pill-category">
                    <Leaf size={12} />
                    {selected.category}
                  </span>
                  <span className="pill pill-duration">
                    <Clock size={12} />
                    {selected.duration} minutes
                  </span>
                  {!!selected.calories && (
                    <span className="pill pill-calories">
                      <Flame size={12} />
                      ~{selected.calories} kcal / serving
                    </span>
                  )}
                </div>
                <p>{selected.description}</p>
                {selected.video_url ? (
                  <video
                    src={selected.video_url}
                    controls
                    preload="metadata"
                    className="video-player"
                  />
                ) : (
                  <div className="video-placeholder">
                    <div className="video-placeholder-icon">
                      <Play size={18} fill="currentColor" />
                    </div>
                    <div>
                      <strong>Video Demonstration</strong>
                      <p>
                        Video will be available when your coach adds a supported
                        MP4/WebM link.
                      </p>
                    </div>
                  </div>
                )}
                {selected.ingredients && (
                  <div className="detail-section">
                    <h3>What you’ll need</h3>
                    <ul>
                      {selected.ingredients
                        .split("\n")
                        .filter(Boolean)
                        .map((x: string, i: number) => (
                          <li key={i}>{x}</li>
                        ))}
                    </ul>
                  </div>
                )}
                {selected.instructions && (
                  <div className="detail-section">
                    <h3>
                      {selected.category === "Recipe"
                        ? "Let’s make it"
                        : "Try this today"}
                    </h3>
                    <ol>
                      {selected.instructions
                        .split("\n")
                        .filter(Boolean)
                        .map((x: string, i: number) => (
                          <li key={i}>{x}</li>
                        ))}
                    </ol>
                  </div>
                )}
                <button
                  className={`btn primary save-collection-btn ${
                    saved.includes(selected.id) ? "is-saved" : ""
                  }`}
                  onClick={() => toggleSaved(selected.id)}
                >
                  <Heart
                    size={16}
                    fill={saved.includes(selected.id) ? "currentColor" : "none"}
                  />
                  <span>
                    {saved.includes(selected.id)
                      ? "Saved to your collection"
                      : "Save for later"}
                  </span>
                </button>
              </div>
            )}
            {[
              "client",
              "clientEdit",
              "content",
              "slot",
              "live",
              "booking",
              "reschedule",
            ].includes(modal) && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    let endpoint = "",
                      method = "POST",
                      body = { ...form };
                    if (modal === "client") endpoint = "/clients";
                    if (modal === "clientEdit") {
                      endpoint = "/clients/" + selected!.id;
                      method = "PATCH";
                      body = { goal: form.goal, active: form.active };
                    }
                    if (modal === "content") {
                      endpoint = "/content" + (selected ? "/" + selected.id : "");
                      method = selected ? "PUT" : "POST";
                    }
                    if (modal === "slot" || modal === "live") {
                      endpoint = modal === "slot" ? "/slots" : "/live-sessions";
                      body.starts_at = new Date(form.starts_at).toISOString();
                    }
                    if (modal === "booking") endpoint = "/appointments";
                    if (modal === "reschedule") {
                      endpoint = "/appointments/" + selected!.id;
                      method = "PATCH";
                    }
                    mutate(endpoint, method, body);
                  }}
                >
                  {modal === "client" && (
                    <>
                      <Field label="Full name">
                        <input
                          required
                          minLength={2}
                          onChange={(e) => update("name", e.target.value)}
                        />
                      </Field>
                      <Field label="Email address">
                        <input
                          type="email"
                          required
                          onChange={(e) => update("email", e.target.value)}
                        />
                      </Field>
                      <Field label="Initial password (12+ characters)">
                        <input
                          type="password"
                          required
                          minLength={12}
                          onChange={(e) => update("password", e.target.value)}
                        />
                      </Field>
                    </>
                  )}
                  {["client", "clientEdit"].includes(modal) && (
                    <Field label="Coach-approved calorie goal (kcal / day)">
                      <input
                        type="number"
                        min={800}
                        max={6000}
                        value={form.goal || 2000}
                        onChange={(e) => update("goal", Number(e.target.value))}
                      />
                    </Field>
                  )}
                  {modal === "clientEdit" && (
                    <Field label="Account status">
                      <select
                        value={form.active}
                        onChange={(e) => update("active", Number(e.target.value))}
                      >
                        <option value={1}>Active</option>
                        <option value={0}>Paused — revoke login access</option>
                      </select>
                    </Field>
                  )}
                  {modal === "content" && (
                    <>
                      <Field label="Title">
                        <input
                          required
                          minLength={3}
                          value={form.title || ""}
                          onChange={(e) => update("title", e.target.value)}
                        />
                      </Field>
                      <div className="form-grid">
                        <Field label="Category">
                          <select
                            value={form.category}
                            onChange={(e) => update("category", e.target.value)}
                          >
                            {[
                              "Recipe",
                              "Wellness",
                              "Movement",
                              "Mindfulness",
                            ].map((c) => (
                              <option key={c}>{c}</option>
                            ))}
                          </select>
                        </Field>
                        <Field label="Duration (minutes)">
                          <input
                            type="number"
                            required
                            min={1}
                            max={300}
                            value={form.duration}
                            onChange={(e) =>
                              update("duration", Number(e.target.value))
                            }
                          />
                        </Field>
                      </div>
                      <Field label="Description">
                        <textarea
                          required
                          minLength={5}
                          value={form.description || ""}
                          onChange={(e) => update("description", e.target.value)}
                        />
                      </Field>
                      <Field label="Cover image URL (HTTPS)">
                        <input
                          type="url"
                          required
                          value={form.image || ""}
                          onChange={(e) => update("image", e.target.value)}
                        />
                      </Field>
                      <Field label="Video URL (direct HTTPS MP4 / WebM)">
                        <input
                          type="url"
                          value={form.video_url || ""}
                          onChange={(e) => update("video_url", e.target.value)}
                        />
                      </Field>
                      {form.category === "Recipe" && (
                        <>
                          <Field label="Ingredients (one per line)">
                            <textarea
                              value={form.ingredients || ""}
                              onChange={(e) =>
                                update("ingredients", e.target.value)
                              }
                            />
                          </Field>
                          <Field label="Calories per serving (estimate)">
                            <input
                              type="number"
                              min={0}
                              max={5000}
                              value={form.calories || 0}
                              onChange={(e) =>
                                update("calories", Number(e.target.value))
                              }
                            />
                          </Field>
                        </>
                      )}
                      <Field label="Instructions (one step per line)">
                        <textarea
                          value={form.instructions || ""}
                          onChange={(e) => update("instructions", e.target.value)}
                        />
                      </Field>
                      <Field label="Visibility">
                        <select
                          value={form.published}
                          onChange={(e) =>
                            update("published", Number(e.target.value))
                          }
                        >
                          <option value={1}>Published</option>
                          <option value={0}>Draft</option>
                        </select>
                      </Field>
                    </>
                  )}
                  {modal === "live" && (
                    <>
                      <Field label="Session title">
                        <input
                          required
                          minLength={3}
                          onChange={(e) => update("title", e.target.value)}
                        />
                      </Field>
                      <Field label="Client">
                        <select
                          required
                          value={form.client_id || ""}
                          onChange={(e) => update("client_id", e.target.value)}
                        >
                          <option value="">Choose client</option>
                          {clients
                            .filter((c) => c.active)
                            .map((c) => (
                              <option key={c.id} value={c.id}>
                                {c.name}
                              </option>
                            ))}
                        </select>
                      </Field>
                    </>
                  )}
                  {["slot", "live"].includes(modal) && (
                    <>
                      <Field label="Start time (your local timezone)">
                        <input
                          type="datetime-local"
                          required
                          onChange={(e) => update("starts_at", e.target.value)}
                        />
                      </Field>
                      <Field label="Duration (minutes)">
                        <input
                          type="number"
                          required
                          min={15}
                          max={120}
                          value={form.minutes}
                          onChange={(e) =>
                            update("minutes", Number(e.target.value))
                          }
                        />
                      </Field>
                    </>
                  )}
                  {modal === "booking" && (
                    <p className="booking-confirm">
                      <CalendarDays />
                      {fmt(form.starts_at)}
                    </p>
                  )}
                  {modal === "reschedule" && (
                    <Field label="Choose an available time">
                      <select
                        required
                        value={form.slot_id}
                        onChange={(e) => update("slot_id", e.target.value)}
                      >
                        <option value="">Select a new time</option>
                        {slots.map((s) => (
                          <option key={s.id} value={s.id}>
                            {fmt(s.starts_at)}
                          </option>
                        ))}
                      </select>
                    </Field>
                  )}
                  {["booking", "reschedule"].includes(modal) && (
                    <Field label="Anything you’d like to discuss? (optional)">
                      <textarea
                        maxLength={1000}
                        value={form.note || ""}
                        onChange={(e) => update("note", e.target.value)}
                        placeholder="Your goals, questions, or a small win…"
                      />
                    </Field>
                  )}
                  <button className="btn primary wide" disabled={busy}>
                    {busy
                      ? "Saving…"
                      : modal === "booking"
                        ? "Confirm appointment"
                        : "Save changes"}
                    <Check size={16} />
                  </button>
                  {modal === "content" && selected && (
                    <button
                      type="button"
                      className="btn danger wide"
                      onClick={() => {
                        setModal("deleteContent");
                      }}
                    >
                      Delete resource
                      <Trash2 size={15} />
                    </button>
                  )}
                </form>
              )}
            {modal === "deleteContent" && (
              <>
                <p>This resource will be removed from the library.</p>
                <button
                  className="btn primary"
                  disabled={busy}
                  onClick={() => mutate("/content/" + selected!.id, "DELETE")}
                >
                  Delete resource
                </button>
              </>
            )}
            {modal === "cancel" && (
              <>
                <p>
                  This will release your slot on {fmt(selected!.starts_at)}. You
                  can book another available time.
                </p>
                <button
                  className="btn primary wide"
                  disabled={busy}
                  onClick={() =>
                    mutate("/appointments/" + selected!.id, "DELETE")
                  }
                >
                  Yes, cancel appointment
                </button>
              </>
            )}
            {modal === "join" && (
              <iframe
                className="meeting-frame"
                title="Live wellness session"
                src={joinUrl}
                allow="camera; microphone; fullscreen; display-capture"
              />
            )}
          </Modal>
        )}
      </div>
    </PortalContext.Provider>
  );
}
