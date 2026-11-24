"use client";

import { Children, cloneElement, createContext, isValidElement, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { Moon, Sun } from "lucide-react";
import { english } from "@/lib/english";

type Language = "en" | "id";
type Theme = "light" | "dark";
type Preferences = { language: Language; theme: Theme; setLanguage: (value: Language) => void; setTheme: (value: Theme) => void; translate: (value: string) => string };
const PreferencesContext = createContext<Preferences | null>(null);
const storageKey = "bukanota.preferences.v1";

export function SitePreferences({ children, initialLanguage, initialTheme }: { children: ReactNode; initialLanguage: Language; initialTheme: Theme }) {
  const [language, updateLanguage] = useState<Language>(initialLanguage);
  const [theme, updateTheme] = useState<Theme>(initialTheme);
  useEffect(() => {
    const root = document.documentElement;
    updateTheme(root.dataset.theme === "dark" ? "dark" : "light");
  }, []);

  const persist = useCallback((nextLanguage: Language, nextTheme: Theme) => {
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.lang = nextLanguage;
    const options = `; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
    try {
      document.cookie = `bukanota-language=${nextLanguage}${options}`;
      document.cookie = `bukanota-theme=${nextTheme}${options}`;
    } catch { /* Preferences still work in memory if cookies are restricted. */ }
    try { localStorage.setItem(storageKey, JSON.stringify({ language: nextLanguage, theme: nextTheme })); } catch { /* In-memory preferences still work. */ }
  }, []);
  const setLanguage = useCallback((value: Language) => { updateLanguage(value); persist(value, theme); }, [persist, theme]);
  const setTheme = useCallback((value: Theme) => { updateTheme(value); persist(language, value); }, [language, persist]);
  useEffect(() => {
    document.documentElement.lang = language;
    const description = language === "en"
      ? "BukaNota by PT Mega Homan Indonesia connects transaction records, inventory, checkout, and business finances in one system."
      : "BukaNota, produk PT Mega Homan Indonesia, membantu mencatat transaksi, mengelola stok, menjalankan kasir, dan memantau keuangan usaha dalam satu sistem.";
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
  }, [language]);

  const translate = useCallback((value: string): string => {
    if (language === "id" || !value.trim()) return value;
    const key = value.trim().replace(/\s+/g, " ");
    let result = english[key];
    if (!result && key.startsWith("Perbesar ")) result = `Enlarge ${english[key.slice(9)] ?? key.slice(9)}`;
    if (!result) return value;
    return `${value.match(/^\s*/)?.[0] ?? ""}${result}${value.match(/\s*$/)?.[0] ?? ""}`;
  }, [language]);
  const value = useMemo(() => ({ language, theme, setLanguage, setTheme, translate }), [language, theme, setLanguage, setTheme, translate]);
  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

function usePreferences() {
  const value = useContext(PreferencesContext);
  if (!value) throw new Error("SitePreferences provider is required.");
  return value;
}

/** Localize React text and accessible labels while keeping component state and IDs intact. */
export function Translate({ children }: { children: ReactNode }) {
  const { translate } = usePreferences();
  const visit = (nodes: ReactNode): ReactNode => Children.map(nodes, (node) => {
    if (typeof node === "string") return translate(node);
    if (!isValidElement<Record<string, unknown>>(node)) return node;
    if (node.props.translate === "no") return node;
    const patch: Record<string, unknown> = {};
    for (const field of ["alt", "title", "aria-label", "placeholder"]) {
      if (typeof node.props[field] === "string") patch[field] = translate(node.props[field]);
    }
    if (node.props.children !== undefined) patch.children = visit(node.props.children as ReactNode);
    return Object.keys(patch).length ? cloneElement(node, patch) : node;
  });
  return <>{visit(children)}</>;
}

export function DisplayControls() {
  const { language, theme, setLanguage, setTheme } = usePreferences();
  return <Translate><div className="display-controls">
    <button className="language-control" type="button" data-language-toggle
      aria-label={language === "id" ? "Bahasa Indonesia. Ganti ke bahasa Inggris" : "Bahasa Inggris. Ganti ke bahasa Indonesia"}
      title={language === "id" ? "Ganti ke bahasa Inggris" : "Ganti ke bahasa Indonesia"}
      onClick={() => setLanguage(language === "id" ? "en" : "id")}>
      {language.toUpperCase()}
    </button>
    <button className="theme-control" type="button" data-theme-toggle aria-label={theme === "dark" ? "Gunakan mode terang" : "Gunakan mode gelap"} title={theme === "dark" ? "Gunakan mode terang" : "Gunakan mode gelap"} onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
    </button>
  </div></Translate>;
}
