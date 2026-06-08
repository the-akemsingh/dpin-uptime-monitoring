"use client";

import { useEffect, useRef, useState } from "react";
import GoogleSignupButton from "./LoginButton";
import ThemeToggle from "./ThemeToggle";

type LoggedInUser = {
    id: string;
    email: string;
    name: string | null;
    image?: string | null;
};

export default function Navbar() {
    const [user, setUser] = useState<LoggedInUser | null>(null);
    const [showMenu, setShowMenu] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch {
            setUser(null);
        }
    }, []);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (!showMenu) {
                return;
            }

            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [showMenu]);

    useEffect(() => {
        const handleTriggerLoginModal = () => {
            setIsLoginModalOpen(true);
        };

        window.addEventListener("trigger-login-modal", handleTriggerLoginModal);

        return () => {
            window.removeEventListener("trigger-login-modal", handleTriggerLoginModal);
        };
    }, []);

    const handleLoginSuccess = (loggedInUser: LoggedInUser) => {
        setUser(loggedInUser);
        setIsLoginModalOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.dispatchEvent(new Event("auth-changed"));
        setUser(null);
        setShowMenu(false);
    };

    return (
        <header className="fixed inset-x-0 top-4 z-50 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto flex h-16 w-full items-center justify-between rounded-2xl px-5 transition-all duration-300 liquid-glass">
                <div className="flex items-center gap-2">
                    <h1 className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight">Pingsy</h1>
                </div>

                {user ? (
                    <div ref={menuRef} className="relative flex items-center gap-3">
                        <ThemeToggle />
                        <button
                            type="button"
                            onClick={() => setShowMenu((prev) => !prev)}
                            className="rounded-full ring-2 cursor-pointer ring-transparent transition-all hover:ring-zinc-300 dark:hover:ring-zinc-700"
                            aria-label="Open user menu"
                        >
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-800 text-sm font-medium text-zinc-600 dark:text-zinc-300 transition-colors duration-300">
                                {(user.name || "U").charAt(0).toUpperCase()}
                            </div>
                        </button>

                        {showMenu ? (
                            <div className="absolute flex flex-col right-0 top-12 z-20 min-w-32 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111] p-1 shadow-xl transition-colors duration-300">
                                <span className="w-full rounded px-3 py-2 text-left text-sm text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors">{user.name}</span>
                                <span className="w-full rounded px-3 py-2 text-left text-sm text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors">{user.email}</span>
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="w-full rounded px-3 py-2 text-left text-sm text-red-500 dark:text-red-400 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : null}
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        <GoogleSignupButton onLoginSuccess={handleLoginSuccess} />
                    </div>
                )}
            </div>

            {isLoginModalOpen && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
                    onClick={() => setIsLoginModalOpen(false)}
                >
                    <div 
                        className="relative w-full max-w-sm overflow-hidden rounded-3xl p-8 text-center transition-all duration-300 animate-in zoom-in-95 duration-200 liquid-glass"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            onClick={() => setIsLoginModalOpen(false)}
                            className="absolute right-4 top-4 rounded-full p-1.5 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-700 dark:hover:text-zinc-200 transition-all cursor-pointer"
                            aria-label="Close modal"
                        >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500 border border-blue-500/20">
                            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                            </svg>
                        </div>

                        <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white transition-colors duration-300">Sign in to Pingsy</h3>
                        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 transition-colors duration-300">
                            Create an account or sign in to start monitoring your web properties in real-time.
                        </p>

                        <div className="mt-8 flex justify-center w-full">
                            <GoogleSignupButton onLoginSuccess={handleLoginSuccess} />
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
