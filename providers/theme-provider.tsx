"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ThemeConfig } from "@/lib/types";
import { DEFAULT_THEME, STORAGE_KEYS } from "@/lib/constants";

interface ThemeContextType {
  theme: ThemeConfig;
  updateTheme: (newTheme: Partial<ThemeConfig>) => void;
  resetTheme: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeConfig>(DEFAULT_THEME);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME_SETTINGS);
      if (savedTheme) {
        const parsedTheme = JSON.parse(savedTheme);
        setTheme({ ...DEFAULT_THEME, ...parsedTheme });
      }
    } catch (error) {
      console.error("Failed to load theme from localStorage:", error);
    }
  }, []);

  // Apply theme variables to CSS
  useEffect(() => {
    const root = document.documentElement;

    // Apply color variables
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}-color`, value);
    });

    // Apply font variables
    Object.entries(theme.fonts).forEach(([key, value]) => {
      root.style.setProperty(`--font-${key}`, value);
    });

    // Apply spacing variables
    Object.entries(theme.spacing).forEach(([key, value]) => {
      root.style.setProperty(`--spacing-${key}`, value);
    });
  }, [theme]);

  const updateTheme = (newTheme: Partial<ThemeConfig>) => {
    const updatedTheme = {
      ...theme,
      ...newTheme,
      colors: { ...theme.colors, ...newTheme.colors },
      fonts: { ...theme.fonts, ...newTheme.fonts },
      spacing: { ...theme.spacing, ...newTheme.spacing },
    };

    setTheme(updatedTheme);

    // Save to localStorage
    try {
      localStorage.setItem(
        STORAGE_KEYS.THEME_SETTINGS,
        JSON.stringify(updatedTheme),
      );
    } catch (error) {
      console.error("Failed to save theme to localStorage:", error);
    }
  };

  const resetTheme = () => {
    setTheme(DEFAULT_THEME);
    localStorage.removeItem(STORAGE_KEYS.THEME_SETTINGS);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Note: Currently the app is light-mode only as per requirements
    // This is a placeholder for future dark mode support
  };

  const value: ThemeContextType = {
    theme,
    updateTheme,
    resetTheme,
    isDarkMode,
    toggleDarkMode,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
