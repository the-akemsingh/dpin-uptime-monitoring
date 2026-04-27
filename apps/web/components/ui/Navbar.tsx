"use client";

import { useEffect, useState } from "react";
import GoogleSignupButton from "./LoginButton";

type LoggedInUser = {
    id: string;
    email: string;
    name: string | null;
    image?: string | null;
};

export default function Navbar() {
    const [user, setUser] = useState<LoggedInUser | null>(null);
    const [showMenu, setShowMenu] = useState(false);

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

    const handleLoginSuccess = (loggedInUser: LoggedInUser) => {
        setUser(loggedInUser);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.dispatchEvent(new Event("auth-changed"));
        setUser(null);
        setShowMenu(false);
    };

    return (
        <header className="w-full border-b border-zinc-200 bg-white">
            <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
                <h1 className="text-lg font-semibold text-zinc-900">DPIN Uptime</h1>

                {user ? (
                    <div className="relative flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setShowMenu((prev) => !prev)}
                            className="rounded-full"
                            aria-label="Open user menu"
                        >
                            {user.image ? (
                                <img
                                    src={user.image}
                                    alt={user.name || "User avatar"}
                                    className="h-9 w-9 rounded-full border border-zinc-200 object-cover"
                                />
                            ) : (
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 text-sm font-medium text-zinc-700">
                                    {(user.name || "U").charAt(0).toUpperCase()}
                                </div>
                            )}
                        </button>
                        <span className="text-sm font-medium text-zinc-800">
                            {user.name || user.email}
                        </span>

                        {showMenu ? (
                            <div className="absolute right-0 top-12 z-20 min-w-32 rounded-md border border-zinc-200 bg-white p-1 shadow-sm">
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="w-full rounded px-3 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-100"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : null}
                    </div>
                ) : (
                    <GoogleSignupButton onLoginSuccess={handleLoginSuccess} />
                )}
            </div>
        </header>
    );
}
