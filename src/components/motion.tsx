"use client";

/**
 * ChatHeal Privé — Framer Motion Animation Primitives
 * Central hub for all animation variants used across user-frontend.
 */

import { motion, AnimatePresence, type HTMLMotionProps } from "framer-motion";
import React from "react";

/* ================================================================
   SHARED EASING CURVES
   ================================================================ */
export const ease = {
  spring: [0.16, 1, 0.3, 1] as [number, number, number, number],
  smooth: [0.4, 0, 0.2, 1] as [number, number, number, number],
  bounce: { type: "spring" as const, stiffness: 400, damping: 28 },
  gentle: { type: "spring" as const, stiffness: 260, damping: 24 },
  luxury: { type: "spring" as const, stiffness: 180, damping: 22 },
};

/* ================================================================
   ANIMATION VARIANTS
   ================================================================ */
export const variants = {
  /** Fade + Slide UP — for page sections, cards */
  fadeUp: {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: ease.spring } },
  },

  /** Fade + Slide DOWN — for dropdowns / banners */
  fadeDown: {
    hidden: { opacity: 0, y: -18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: ease.spring } },
  },

  /** Gentle Scale In — for cards, badges, icons */
  scaleIn: {
    hidden: { opacity: 0, scale: 0.88 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: ease.spring } },
  },

  /** Slide in from LEFT — for sidebar */
  slideLeft: {
    hidden: { opacity: 0, x: -30 },
    show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: ease.spring } },
  },

  /** Slide in from RIGHT */
  slideRight: {
    hidden: { opacity: 0, x: 30 },
    show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: ease.spring } },
  },

  /** Stagger container — wraps children with staggered reveal */
  stagger: {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.09, delayChildren: 0.06 },
    },
  },

  /** Stagger container — slower, for long lists */
  staggerSlow: {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.13, delayChildren: 0.1 },
    },
  },

  /** Pop — for interactive elements (like badges, CTAs) */
  pop: {
    hidden: { opacity: 0, scale: 0.72 },
    show: { opacity: 1, scale: 1, transition: ease.bounce },
  },

  /** Blur reveal — luxury editorial entrance */
  blurIn: {
    hidden: { opacity: 0, filter: "blur(12px)", y: 14 },
    show: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { duration: 0.65, ease: ease.smooth },
    },
  },

  /** Sidebar nav item */
  navItem: {
    hidden: { opacity: 0, x: -14 },
    show: { opacity: 1, x: 0, transition: { duration: 0.3, ease: ease.spring } },
  },
};

/* ================================================================
   REUSABLE ANIMATED WRAPPERS
   ================================================================ */

/** FadeUp: use around any section/card/element for an up-fade reveal */
export function FadeUp({
  children,
  delay = 0,
  className,
  style,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  as?: keyof typeof motion;
}) {
  const Component = (motion as any)[Tag] as React.ComponentType<any>;
  return (
    <Component
      initial="hidden"
      animate="show"
      variants={variants.fadeUp}
      transition={{ delay }}
      className={className}
      style={style}
    >
      {children}
    </Component>
  );
}

/** StaggerWrap: wraps children, staggering their reveal */
export function StaggerWrap({
  children,
  slow = false,
  className,
  style,
}: {
  children: React.ReactNode;
  slow?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={slow ? variants.staggerSlow : variants.stagger}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/** StaggerItem: direct child of StaggerWrap */
export function StaggerItem({
  children,
  className,
  style,
  variant = "fadeUp",
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  variant?: keyof typeof variants;
}) {
  return (
    <motion.div
      variants={variants[variant]}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/** AnimatedCard: hover lift + shadow glow on any card */
export function AnimatedCard({
  children,
  className,
  style,
  onClick,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  delay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={variants.fadeUp}
      transition={{ delay }}
      whileHover={{ y: -5, boxShadow: "0 20px 44px -8px rgba(13,114,97,0.16)" }}
      whileTap={{ scale: 0.98 }}
      className={className}
      style={{ cursor: onClick ? "pointer" : undefined, ...style }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

/** AnimatedButton: tap press + hover rise */
export function AnimatedButton({
  children,
  className,
  style,
  onClick,
  disabled,
  type = "button",
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}) {
  return (
    <motion.button
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      className={className}
      style={style}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </motion.button>
  );
}

/** PageTransition: wraps each page content for route change */
export function PageTransition({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.38, ease: ease.spring }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/** ModalEntrance: animated backdrop + modal card */
export function ModalEntrance({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence>
      <motion.div
        className="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={ease.gentle}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/** SidebarEntry: slide + fade for sidebar */
export function SidebarEntry({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <motion.aside
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: ease.spring }}
      className={className}
      style={style}
    >
      {children}
    </motion.aside>
  );
}

/** CountUp: animated number counter */
export function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: ease.spring }}
    >
      {Math.round(value).toLocaleString("en-IN")}{suffix}
    </motion.span>
  );
}

/** ProgressBar: animated width fill */
export function ProgressBar({
  percent,
  className,
  style,
}: {
  percent: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${Math.min(100, percent)}%` }}
      transition={{ duration: 0.8, delay: 0.3, ease: ease.smooth }}
      className={className}
      style={style}
    />
  );
}

/** Toast: animated notification */
export function AnimatedToast({ children, visible }: { children: React.ReactNode; visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.94 }}
          transition={ease.gentle}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** FloatingBadge: pop-in badge */
export function FloatingBadge({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={ease.bounce}
      className={className}
      style={style}
    >
      {children}
    </motion.span>
  );
}

/** HeroText: blur + fade for headline text */
export function HeroText({ children, delay = 0, as: Tag = "div", className, style }: {
  children: React.ReactNode;
  delay?: number;
  as?: keyof typeof motion;
  className?: string;
  style?: React.CSSProperties;
}) {
  const Component = (motion as any)[Tag] as React.ComponentType<any>;
  return (
    <Component
      initial={{ opacity: 0, filter: "blur(12px)", y: 20 }}
      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      transition={{ duration: 0.65, delay, ease: ease.smooth }}
      className={className}
      style={style}
    >
      {children}
    </Component>
  );
}

export { motion, AnimatePresence };

