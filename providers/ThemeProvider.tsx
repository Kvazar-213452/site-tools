"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type ThemeId = "light" | "dark" | "paper" | "ocean";

export type Theme = {
  id: ThemeId;
  name: string;
  emoji: string;
};

export const THEMES: Theme[] = [
  { id: "light",  name: "Light", emoji: "☀" },
  { id: "dark",   name: "Dark",  emoji: "☾" },
  { id: "paper",  name: "Paper", emoji: "✎" },
  { id: "ocean",  name: "Ocean", emoji: "≈" },
];

const STORAGE_KEY = "toolsxm-theme";
const VALID_THEMES = THEMES.map((t) => t.id);

type ThemeContextValue = {
  theme: ThemeId;
  setTheme: (id: ThemeId) => void;
  themes: Theme[];
  currentTheme: Theme;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>("light");

  // Читаємо збережену тему після гідрації
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as ThemeId | null;
    if (saved && VALID_THEMES.includes(saved)) {
      setThemeState(saved);
      // setAttribute вже виконано inline-скриптом у layout, але
      // на всяк випадок синхронізуємо ще раз після гідрації
      document.documentElement.setAttribute("data-theme", saved);
    }
  }, []);

  const setTheme = (id: ThemeId) => {
    setThemeState(id);
    document.documentElement.setAttribute("data-theme", id);
    localStorage.setItem(STORAGE_KEY, id);
  };

  const currentTheme = THEMES.find((t) => t.id === theme) ?? THEMES[0];

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES, currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}