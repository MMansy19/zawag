"use client";

import { useState, useEffect } from "react";

interface FontLoadingState {
  loaded: boolean;
  error: boolean;
  loading: boolean;
}

/**
 * Hook to monitor font loading status for better UX
 */
export function useFontLoading(fontFamilies: string[] = []): FontLoadingState {
  const [state, setState] = useState<FontLoadingState>({
    loaded: false,
    error: false,
    loading: true,
  });
  useEffect(() => {
    // If no specific fonts provided, check for our main Arabic fonts
    const fontsToCheck =
      fontFamilies.length > 0 ? fontFamilies : ["Noto Kufi Arabic", "Amiri"];

    let loadedCount = 0;
    let errorCount = 0;
    const totalFonts = fontsToCheck.length;

    const checkFont = (fontFamily: string) => {
      return new Promise<boolean>((resolve) => {
        const testString = "الزواج السعيد AbCdEfGhIjKlMnOpQrStUvWxYz";
        const testSize = "72px";

        // Create test elements
        const container = document.createElement("div");
        container.style.position = "absolute";
        container.style.visibility = "hidden";
        container.style.top = "-9999px";
        container.style.left = "-9999px";

        const defaultSpan = document.createElement("span");
        defaultSpan.textContent = testString;
        defaultSpan.style.fontSize = testSize;
        defaultSpan.style.fontFamily = "monospace";

        const testSpan = document.createElement("span");
        testSpan.textContent = testString;
        testSpan.style.fontSize = testSize;
        testSpan.style.fontFamily = `${fontFamily}, monospace`;

        container.appendChild(defaultSpan);
        container.appendChild(testSpan);
        document.body.appendChild(container);

        const defaultWidth = defaultSpan.offsetWidth;
        const testWidth = testSpan.offsetWidth;

        // Clean up
        document.body.removeChild(container);

        // If widths are different, font is loaded
        const isLoaded = defaultWidth !== testWidth;
        resolve(isLoaded);
      });
    };

    const checkAllFonts = async () => {
      try {
        // Use font loading API if available
        if ("fonts" in document) {
          const fontPromises = fontsToCheck.map(async (fontFamily) => {
            try {
              await document.fonts.load(`16px "${fontFamily}"`);
              return true;
            } catch {
              return false;
            }
          });

          const results = await Promise.allSettled(fontPromises);
          results.forEach((result) => {
            if (result.status === "fulfilled" && result.value) {
              loadedCount++;
            } else {
              errorCount++;
            }
          });
        } else {
          // Fallback method
          const fontPromises = fontsToCheck.map(checkFont);
          const results = await Promise.allSettled(fontPromises);

          results.forEach((result) => {
            if (result.status === "fulfilled" && result.value) {
              loadedCount++;
            } else {
              errorCount++;
            }
          });
        }

        setState({
          loaded: loadedCount > 0,
          error: errorCount === totalFonts,
          loading: false,
        });
      } catch (error) {
        console.warn("Font loading check failed:", error);
        setState({
          loaded: false,
          error: true,
          loading: false,
        });
      }
    };

    // Check if fonts are already loaded
    if ("fonts" in document && document.fonts.ready) {
      document.fonts.ready.then(() => {
        checkAllFonts();
      });
    } else {
      // Fallback: check after a short delay
      const timer = setTimeout(checkAllFonts, 100);
      return () => clearTimeout(timer);
    }

    // Cleanup function for the effect
    return () => {
      // No cleanup needed in this case
    };
  }, [fontFamilies]);

  return state;
}

/**
 * Hook to get optimal font class based on loading state
 */
export function useFontClass(): string {
  const { loaded, loading } = useFontLoading();

  if (loading) {
    return "font-loading";
  }

  return loaded ? "arabic-optimized" : "font-sans";
}

/**
 * Hook for font display with fallback
 */
export function useFontDisplay() {
  const fontState = useFontLoading();

  const getFontClass = (
    variant: "heading" | "body" | "display" | "serif" = "body",
  ) => {
    const baseClass = fontState.loaded ? "arabic-optimized" : "font-loading";

    const variantClasses = {
      heading: fontState.loaded ? "font-heading" : "font-sans",
      body: fontState.loaded ? "font-body" : "font-sans",
      display: fontState.loaded ? "font-display" : "font-sans",
      serif: fontState.loaded ? "font-serif" : "serif",
    };

    return `${baseClass} ${variantClasses[variant]}`;
  };

  return {
    ...fontState,
    getFontClass,
  };
}

export default useFontLoading;
