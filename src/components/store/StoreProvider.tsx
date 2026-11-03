"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { programmes, Programme } from "@/lib/catalog";
type Store = {
  cart: Programme[];
  add: (slug: string) => void;
  remove: (slug: string) => void;
  ready: boolean;
  message: string;
};
const Context = createContext<Store | null>(null);
export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>([]),
    [ready, setReady] = useState(false),
    [message, setMessage] = useState("");
  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("chatheal-cart-v2") || "[]",
      );
      if (Array.isArray(saved))
        setIds(
          saved.filter(
            (s: unknown) =>
              typeof s === "string" && programmes.some((p) => p.slug === s),
          ),
        );
    } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) localStorage.setItem("chatheal-cart-v2", JSON.stringify(ids));
  }, [ids, ready]);
  useEffect(() => {
    if (message) {
      const t = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(t);
    }
  }, [message]);
  return (
    <Context.Provider
      value={{
        cart: programmes.filter((p) => ids.includes(p.slug)),
        ready,
        message,
        add: (slug) => {
          setIds((a) => (a.includes(slug) ? a : [...a, slug]));
          setMessage("Programme added to your bag");
        },
        remove: (slug) => setIds((a) => a.filter((x) => x !== slug)),
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function useStore() {
  const value = useContext(Context);
  if (!value) throw new Error("StoreProvider missing");
  return value;
}
