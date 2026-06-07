"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
    type ReactNode,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: (coords?: { x: number; y: number }) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function applyThemeClass(nextTheme: Theme) {
    const root = document.documentElement;
    if (nextTheme === "dark") {
        root.classList.add("dark");
    } else {
        root.classList.remove("dark");
    }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>("dark");
    const [mounted, setMounted] = useState(false);
    const isAnimating = useRef(false);

    useEffect(() => {
        const stored = localStorage.getItem("theme") as Theme | null;
        const initial = stored ?? "dark";
        setTheme(initial);
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        applyThemeClass(theme);
        localStorage.setItem("theme", theme);
    }, [theme, mounted]);

    const toggleTheme = useCallback(
        (coords?: { x: number; y: number }) => {
            if (isAnimating.current) return;

            const nextTheme = theme === "dark" ? "light" : "dark";

            // Fallback for browsers without View Transition API
            if (
                !document.startViewTransition ||
                window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ) {
                setTheme(nextTheme);
                return;
            }

            // Calculate the max radius needed to cover the entire viewport
            const x = coords?.x ?? window.innerWidth / 2;
            const y = coords?.y ?? 0;
            const maxRadius = Math.hypot(
                Math.max(x, window.innerWidth - x),
                Math.max(y, window.innerHeight - y),
            );

            // Set CSS custom properties for the animation origin
            document.documentElement.style.setProperty("--theme-x", `${x}px`);
            document.documentElement.style.setProperty("--theme-y", `${y}px`);
            document.documentElement.style.setProperty(
                "--theme-r",
                `${maxRadius}px`,
            );

            isAnimating.current = true;

            const transition = document.startViewTransition(() => {
                applyThemeClass(nextTheme);
                setTheme(nextTheme);
            });

            transition.finished.then(() => {
                isAnimating.current = false;
            });
        },
        [theme],
    );

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {!mounted ? (
                <div style={{ visibility: "hidden" }}>{children}</div>
            ) : (
                children
            )}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
