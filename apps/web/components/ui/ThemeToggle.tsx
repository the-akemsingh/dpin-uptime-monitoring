"use client";

import { useRef } from "react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleClick = () => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            toggleTheme({ x, y });
        } else {
            toggleTheme();
        }
    };

    return (
        <button
            ref={buttonRef}
            type="button"
            onClick={handleClick}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="flex h-9 w-9 items-center justify-center rounded-full cursor-pointer
                       bg-zinc-200 dark:bg-zinc-800
                       text-zinc-600 dark:text-zinc-400
                       ring-2 ring-transparent
                       transition-all duration-300
                       hover:ring-zinc-300 dark:hover:ring-zinc-600
                       hover:text-amber-500 dark:hover:text-yellow-400"
        >
            {theme === "dark" ? (
                /* Sun icon – shown when dark, clicking switches to light */
                <svg
                    className="h-[18px] w-[18px] transition-transform duration-300 rotate-0 hover:rotate-45"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    />
                </svg>
            ) : (
                /* Moon icon – shown when light, clicking switches to dark */
                <svg
                    className="h-[18px] w-[18px] transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                    />
                </svg>
            )}
        </button>
    );
}
