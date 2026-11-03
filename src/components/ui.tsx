"use client";

import { useEffect, useRef } from "react";
import { Leaf, X } from "lucide-react";
import { RecordData } from "@/lib/api";

const number = (n: number) => Math.round(n || 0).toLocaleString("en-IN");

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="field">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>{label}</span>
        {hint && (
          <span
            style={{
              fontSize: "11px",
              color: "var(--muted-light)",
              fontWeight: 400,
            }}
          >
            {hint}
          </span>
        )}
      </div>
      {children}
    </label>
  );
}

export function Empty({
  title,
  text,
  icon,
}: {
  title: string;
  text: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="empty">
      <div
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "16px",
          background: "linear-gradient(135deg, #e6f6f1, #d1fae5)",
          display: "grid",
          placeItems: "center",
          margin: "0 auto 16px",
          color: "var(--primary)",
          boxShadow: "0 4px 14px rgba(13, 114, 97, 0.12)",
        }}
      >
        {icon || <Leaf size={28} />}
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

export function Modal({
  title,
  eyebrow = "YOUR WELLNESS ACTION",
  close,
  children,
}: {
  title: string;
  eyebrow?: string;
  close: () => void;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const old = document.activeElement as HTMLElement;
    ref.current?.focus();
    const listener = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab") {
        const nodes = ref.current?.querySelectorAll<HTMLElement>(
          'button,input,select,textarea,a[href],[tabindex="0"]',
        );
        if (!nodes?.length) return;
        const first = nodes[0],
          last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", listener);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", listener);
      document.body.style.overflow = overflow;
      old?.focus();
    };
  }, [close]);

  return (
    <div className="modal-backdrop" onClick={close} role="presentation">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        ref={ref}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="section-heading modal-header">
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h2>{title}</h2>
          </div>
        </div>
        <div className="modal-content-scroll">
          {children}
        </div>
      </div>
    </div>
  );
}

export function Chart({
  data,
  goal = 2000,
}: {
  data: RecordData[];
  goal?: number;
}) {
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - 6 + i);
    const dateStr = d.toLocaleDateString("en-CA");
    const val = data.find((x) => x.date === dateStr)?.calories || 0;
    return {
      date: dateStr,
      label: d.toLocaleDateString("en", { weekday: "short" }),
      value: val,
      percent: Math.round((val / goal) * 100),
    };
  });

  const max = Math.max(goal, ...days.map((d) => d.value), 1) * 1.18;

  return (
    <div
      className="chart"
      role="img"
      aria-label={days
        .map(
          (d) =>
            `${d.label}: ${number(d.value)} calories (${d.percent}% of goal)`,
        )
        .join(", ")}
    >
      <div
        className="chart-goal"
        style={{ bottom: `${Math.min(95, (goal / max) * 100)}%` }}
      >
        <span>
          Daily Target: <strong>{number(goal)} kcal</strong>
        </span>
      </div>
      {days.map((d, i) => {
        const isCurrent = i === 6;
        const heightPercent = Math.max(4, Math.min(100, (d.value / max) * 100));
        return (
          <div className="bar-group" key={d.date}>
            <span
              className="bar-value"
              style={{
                color: isCurrent ? "var(--primary)" : "var(--muted)",
                fontWeight: isCurrent ? 800 : 600,
              }}
            >
              {number(d.value)}
            </span>
            <div
              className={"bar " + (isCurrent ? "current" : "")}
              style={{
                height: `${heightPercent}%`,
              }}
              title={`${d.label}: ${number(d.value)} kcal (${d.percent}% of goal)`}
            />
            <small
              style={{
                color: isCurrent ? "var(--primary)" : "var(--muted)",
                fontWeight: isCurrent ? 700 : 500,
              }}
            >
              {d.label}
            </small>
          </div>
        );
      })}
    </div>
  );
}
